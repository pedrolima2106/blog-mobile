import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import api from '../services/api';

export default function CreateUserScreen({
  route,
  navigation,
}) {
  const role = route?.params?.role;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');

  async function handleCreateUser() {
    if (!name || !email || !password) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos'
      );
      return;
    }

    if (!role) {
      Alert.alert(
        'Erro',
        'Perfil do usuário não foi informado'
      );
      return;
    }

    try {
      console.log('Cadastrando:', {
        name,
        email,
        password,
        role,
      });

      await api.post('/Auth/register', {
        name,
        email,
        password,
        role,
      });

      Alert.alert(
        'Sucesso',
        `${role} cadastrado com sucesso!`
      );

      navigation.goBack();

    } catch (error) {
      console.log(
        'Erro cadastro:',
        error.response?.status,
        error.response?.data
      );

      Alert.alert(
        'Erro',
        error.response?.data ||
          'Erro ao cadastrar usuário'
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Cadastrar {role}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateUser}
      >
        <Text style={styles.buttonText}>
          Cadastrar
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

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});