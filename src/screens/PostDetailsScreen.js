import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function PostDetailsScreen({
  route,
  navigation,
}) {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {post.title}
      </Text>

      <Text style={styles.body}>
        {post.content}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('EditPost', {
            post,
          })
        }
      >
        <Text style={styles.buttonText}>
          Editar Post
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  body: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});