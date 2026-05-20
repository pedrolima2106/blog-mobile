import React, {
  useEffect,
  useState,
  useContext,
} from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import api from '../services/api';

import { AuthContext } from '../contexts/AuthContext';

export default function ManagePostsScreen({
  navigation,
}) {
  const [posts, setPosts] = useState([]);

  const { user } =
    useContext(AuthContext);

  async function loadPosts() {
    try {
      const response =
        await api.get('/Posts');

      setPosts(response.data);

    } catch (error) {
      console.log(error);
    }
  }

  function confirmDeletePost(id) {
    const confirm =
      window.confirm(
        'Deseja realmente excluir este post?'
      );

    if (confirm) {
      deletePost(id);
    }
  }

  async function deletePost(id) {
    try {
      console.log('Usuário logado:', user);
      console.log('Role enviada:', user?.role);

      await api.delete(
        `/Posts/${id}`,
        {
          headers: {
            role: user?.role,
          },
        }
      );

      Alert.alert(
        'Sucesso',
        'Post excluído!'
      );

      loadPosts();

    } catch (error) {
      console.log(
        'Erro ao excluir:',
        error.response?.status,
        error.response?.data
      );

      Alert.alert(
        'Erro',
        'Erro ao excluir post'
      );
    }
  }

  useEffect(() => {
    const unsubscribe =
      navigation.addListener(
        'focus',
        () => {
          loadPosts();
        }
      );

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Gerenciar Posts
      </Text>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() =>
          navigation.navigate('CreatePost')
        }
      >
        <Text style={styles.createButtonText}>
          + Novo Post
        </Text>
      </TouchableOpacity>

      <FlatList
        data={posts}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.postTitle}>
              {item.title}
            </Text>

            <Text style={styles.author}>
              Autor: {item.author || 'Não informado'}
            </Text>

            <Text
              style={styles.content}
              numberOfLines={3}
            >
              {item.content}
            </Text>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate(
                    'EditPost',
                    {
                      post: item,
                    }
                  )
                }
              >
                <Text style={styles.buttonText}>
                  Editar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  confirmDeletePost(item.id)
                }
              >
                <Text style={styles.buttonText}>
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#EEF1F7',
    },

    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
    },

    createButton: {
      backgroundColor: '#6C63FF',
      padding: 15,
      borderRadius: 14,
      alignItems: 'center',
      marginBottom: 20,
    },

    createButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },

    card: {
      backgroundColor: '#fff',
      padding: 18,
      marginBottom: 15,
      borderRadius: 16,
      elevation: 3,
    },

    postTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#111',
      marginBottom: 6,
    },

    author: {
      color: '#6C63FF',
      fontWeight: 'bold',
      marginBottom: 8,
    },

    content: {
      color: '#555',
      fontSize: 16,
      marginBottom: 15,
      lineHeight: 22,
    },

    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    editButton: {
      backgroundColor: '#6C63FF',
      padding: 12,
      borderRadius: 10,
      width: '48%',
      alignItems: 'center',
    },

    deleteButton: {
      backgroundColor: '#FF4D4D',
      padding: 12,
      borderRadius: 10,
      width: '48%',
      alignItems: 'center',
    },

    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });