import {
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

export default function CreatePostScreen({
  navigation,
}) {

  const { user } =
    useContext(AuthContext);

  const [title, setTitle] =
    useState('');

  const [content, setContent] =
    useState('');

  async function handleCreatePost() {

    try {

      console.log(user);
      console.log(user?.role);

      await api.post(
        '/Posts',
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
        'Post criado com sucesso!'
      );

      navigation.goBack();

    } catch (error) {

      console.log(
        error.response?.data
      );

      Alert.alert(
        'Erro',
        'Erro ao criar post'
      );
    }
  }

  return (
    <View style={styles.container}>

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
        style={styles.button}
        onPress={handleCreatePost}
      >
        <Text style={styles.buttonText}>
          Criar Post
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F6FB',
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

  button: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});