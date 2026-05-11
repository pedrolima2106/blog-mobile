import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import api from '../services/api';

export default function EditPostScreen({
  route,
  navigation,
}) {
  const { post } = route.params;

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  async function handleUpdatePost() {
    try {
      await api.put(`/posts/${post.id}`, {
        title,
        body,
      });

      Alert.alert('Sucesso', 'Post atualizado!');

      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar');
    }
  }

  async function handleDeletePost() {
    try {
      await api.delete(`/posts/${post.id}`);

      Alert.alert('Sucesso', 'Post deletado!');

      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao deletar');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Conteúdo</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        value={body}
        onChangeText={setBody}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  editButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },

  deleteButton: {
    backgroundColor: '#dc3545',
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