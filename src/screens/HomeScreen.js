import {
  useEffect,
  useState,
  useContext,
} from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {
  MaterialIcons,
  FontAwesome5,
} from '@expo/vector-icons';

import api from '../services/api';

import { AuthContext } from '../contexts/AuthContext';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  const { logout, user } =
    useContext(AuthContext);

  async function loadPosts() {
    try {
      const response = await api.get('/posts');

      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>
            Bem-vindo 👋
          </Text>

          <Text style={styles.userName}>
            {user?.name}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
        >
          <MaterialIcons
            name="logout"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>
        Blog Mobile
      </Text>

      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={24}
          color="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Pesquisar posts..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* BOTÕES */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate('CreatePost')
          }
        >
          <MaterialIcons
            name="add"
            size={24}
            color="#fff"
          />

          <Text style={styles.actionText}>
            Novo Post
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButtonSecondary}
          onPress={() =>
            navigation.navigate('Teachers')
          }
        >
          <FontAwesome5
            name="chalkboard-teacher"
            size={18}
            color="#fff"
          />

          <Text style={styles.actionText}>
            Professores
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.studentButton}
          onPress={() =>
            navigation.navigate('Students')
          }
        >
          <FontAwesome5
            name="user-graduate"
            size={18}
            color="#fff"
          />

          <Text style={styles.actionText}>
            Estudantes
          </Text>
        </TouchableOpacity>
      </View>

      {/* LISTA POSTS */}
      <FlatList
        data={filteredPosts}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate(
                'PostDetails',
                {
                  post: item,
                }
              )
            }
          >
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                POST
              </Text>
            </View>

            <Text style={styles.postTitle}>
              {item.title}
            </Text>

            <Text
              style={styles.postBody}
              numberOfLines={3}
            >
              {item.body}
            </Text>

            <View style={styles.cardFooter}>
              <Text style={styles.readMore}>
                Ler mais
              </Text>

              <MaterialIcons
                name="arrow-forward-ios"
                size={18}
                color="#6C63FF"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF1F7',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },

  welcome: {
    fontSize: 16,
    color: '#666',
  },

  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
  },

  logoutButton: {
    backgroundColor: '#FF4D4D',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 20,
  },

  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 60,
    elevation: 3,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },

  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  actionButton: {
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 16,
    width: '48%',
  },

  actionButtonSecondary: {
    backgroundColor: '#00B894',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 16,
    width: '48%',
  },

  studentButton: {
    backgroundColor: '#FF8C42',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 16,
    width: '100%',
  },

  actionText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 15,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },

  badge: {
    backgroundColor: '#EAE8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },

  badgeText: {
    color: '#6C63FF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  postTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 12,
    textTransform: 'capitalize',
  },

  postBody: {
    color: '#666',
    fontSize: 16,
    lineHeight: 24,
  },

  cardFooter: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  readMore: {
    color: '#6C63FF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});