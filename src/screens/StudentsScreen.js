import {
  useEffect,
  useState,
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

export default function StudentsScreen() {
  const [students, setStudents] =
    useState([]);

  async function loadStudents() {
    try {
      const response =
        await api.get('/users');

      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteStudent(id) {
    try {
      await api.delete(`/users/${id}`);

      Alert.alert(
        'Sucesso',
        'Aluno removido'
      );

      loadStudents();
    } catch (error) {
      Alert.alert(
        'Erro',
        'Erro ao excluir'
      );
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Alunos
      </Text>

      <FlatList
        data={students}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text>{item.email}</Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() =>
                deleteStudent(item.id)
              }
            >
              <Text style={styles.buttonText}>
                Excluir
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});