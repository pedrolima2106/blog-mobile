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

export default function TeachersScreen() {
  const [teachers, setTeachers] =
    useState([]);

  async function loadTeachers() {
    try {
      const response =
        await api.get('/users');

      setTeachers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTeacher(id) {
    try {
      await api.delete(`/users/${id}`);

      Alert.alert(
        'Sucesso',
        'Professor removido'
      );

      loadTeachers();
    } catch (error) {
      Alert.alert(
        'Erro',
        'Erro ao excluir'
      );
    }
  }

  useEffect(() => {
    loadTeachers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Professores
      </Text>

      <FlatList
        data={teachers}
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
                deleteTeacher(item.id)
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