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

export default function EditUserScreen({
  route,
  navigation,
}) {
  const { user } = route.params;

  const { user: loggedUser } =
    useContext(AuthContext);

  const [name, setName] =
    useState(user.name);

  const [email, setEmail] =
    useState(user.email);

  const [password, setPassword] =
    useState(user.password);

  const [role, setRole] =
    useState(user.role);

  const isAdmin =
    loggedUser?.role === 'Admin';

  async function handleUpdateUser() {
    try {
      await api.put(`/Users/${user.id}`, {
        name,
        email,
        password,
        role,
      });

      Alert.alert(
        'Sucesso',
        'Usuário atualizado!'
      );

      navigation.goBack();

    } catch (error) {
      console.log(error.response?.data);

      Alert.alert(
        'Erro',
        'Erro ao atualizar usuário'
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Editar Usuário
      </Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nome"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
      />

      <Text style={styles.label}>
        Perfil
      </Text>

      {isAdmin ? (
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === 'Aluno' &&
                styles.roleButtonActive,
            ]}
            onPress={() => setRole('Aluno')}
          >
            <Text
              style={[
                styles.roleText,
                role === 'Aluno' &&
                  styles.roleTextActive,
              ]}
            >
              Aluno
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleButton,
              role === 'Professor' &&
                styles.roleButtonActive,
            ]}
            onPress={() =>
              setRole('Professor')
            }
          >
            <Text
              style={[
                styles.roleText,
                role === 'Professor' &&
                  styles.roleTextActive,
              ]}
            >
              Professor
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleButton,
              role === 'Admin' &&
                styles.roleButtonActive,
            ]}
            onPress={() => setRole('Admin')}
          >
            <Text
              style={[
                styles.roleText,
                role === 'Admin' &&
                  styles.roleTextActive,
              ]}
            >
              Admin
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.lockedRoleBox}>
          <Text style={styles.lockedRoleText}>
            {role}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleUpdateUser}
      >
        <Text style={styles.buttonText}>
          Salvar Alterações
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EEF1F7',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    marginBottom: 18,
    fontSize: 16,
  },

  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  roleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#6C63FF',
    padding: 12,
    borderRadius: 10,
    width: '31%',
    alignItems: 'center',
  },

  roleButtonActive: {
    backgroundColor: '#6C63FF',
  },

  roleText: {
    color: '#6C63FF',
    fontWeight: 'bold',
  },

  roleTextActive: {
    color: '#fff',
  },

  lockedRoleBox: {
    backgroundColor: '#E5E7EB',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25,
  },

  lockedRoleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },

  button: {
    backgroundColor: '#6C63FF',
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