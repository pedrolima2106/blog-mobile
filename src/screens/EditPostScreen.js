import React, {
  useState,
  useContext,
} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import api from '../services/api';

import { AuthContext } from '../contexts/AuthContext';

export default function EditPostScreen({
  route,
  navigation,
}) {
  const { post } = route.params;

  const { user } =
    useContext(AuthContext);

  const [title, setTitle] =
    useState(post.title);

  const [content, setContent] =
    useState(post.content);

  async function handleUpdatePost() {
    try {
      console.log(
        'Usuário logado:',
        user
      );

      console.log(
        'Role enviada:',
        user?.role
      );

      await api.put(
        `/Posts/${post.id}`,
        {
          title,
          content,
        },
        {
          headers: {
            role: user?.role,
          },
        }
      );

      Alert.alert(
        'Sucesso',
        'Post atualizado!'
      );

      navigation.navigate('Home');

    } catch (error) {
      console.log(
        'Erro update:',
        error.response?.status
      );

      console.log(
        error.response?.data
      );

      Alert.alert(
        'Erro',
        'Erro ao atualizar post'
      );
    }
  }

  async function handleDeletePost() {
    try {
      console.log(
        'Usuário logado:',
        user
      );

      console.log(
        'Role enviada:',
        user?.role
      );

      await api.delete(
        `/Posts/${post.id}`,
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

      navigation.navigate('Home');

    } catch (error) {
      console.log(
        'Erro delete:',
        error.response?.status
      );

      console.log(
        error.response?.data
      );

      Alert.alert(
        'Erro',
        'Erro ao excluir post'
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Editar Post
      </Text>

      <Text style={styles.label}>
        Título
      </Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título"
      />

      <Text style={styles.label}>
        Conteúdo
      </Text>

      <TextInput
        style={[
          styles.input,
          styles.textArea,
        ]}
        value={content}
        onChangeText={setContent}
        placeholder="Digite o conteúdo"
        multiline
      />

      <TouchableOpacity
        style={styles.editButton}
        onPress={handleUpdatePost}
      >
        <Text style={styles.buttonText}>
          Salvar Alterações
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeletePost}
      >
        <Text style={styles.buttonText}>
          Excluir Post
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#F4F6FB',
    },

    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 25,
      textAlign: 'center',
      color: '#111',
    },

    label: {
      fontSize: 18,
      marginBottom: 10,
      fontWeight: 'bold',
      color: '#111',
    },

    input: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 12,
      padding: 14,
      marginBottom: 20,
      fontSize: 16,
    },

    textArea: {
      height: 140,
      textAlignVertical: 'top',
    },

    editButton: {
      backgroundColor: '#6C63FF',
      padding: 16,
      borderRadius: 14,
      alignItems: 'center',
      marginBottom: 15,
    },

    deleteButton: {
      backgroundColor: '#FF4D4D',
      padding: 16,
      borderRadius: 14,
      alignItems: 'center',
    },

    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });