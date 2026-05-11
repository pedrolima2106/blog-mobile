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

export default function CreatePostScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  async function handleCreatePost() {
    try {
      await api.post('/posts', {
        title,
        body,
        userId: 1,
      });

      Alert.alert('Sucesso', 'Post criado com sucesso!');

      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar post');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título"
      />

      <Text style={styles.label}>Conteúdo</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        value={body}
        onChangeText={setBody}
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