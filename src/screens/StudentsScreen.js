import React, {
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

export default function StudentsScreen({
  navigation,
}) {
  const [students, setStudents] =
    useState([]);

  async function loadStudents() {
    try {
      const response =
        await api.get('/Users');

      const onlyStudents =
        response.data.filter(
          (user) => user.role === 'Aluno'
        );

      setStudents(onlyStudents);

    } catch (error) {
      console.log(error);
    }
  }

  async function deleteStudent(id) {
    try {
      await api.delete(`/Users/${id}`);

      Alert.alert(
        'Sucesso',
        'Aluno excluído!'
      );

      loadStudents();

    } catch (error) {
      console.log(error.response?.data);

      Alert.alert(
        'Erro',
        'Erro ao excluir aluno'
      );
    }
  }

  useEffect(() => {
    const unsubscribe =
      navigation.addListener(
        'focus',
        () => {
          loadStudents();
        }
      );

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Alunos
      </Text>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() =>
          navigation.navigate(
            'CreateUser',
            {
              role: 'Aluno',
            }
          )
        }
      >
        <Text style={styles.createButtonText}>
          + Novo Aluno
        </Text>
      </TouchableOpacity>

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

            <Text style={styles.email}>
              {item.email}
            </Text>

            <Text style={styles.role}>
              {item.role}
            </Text>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate(
                    'EditUser',
                    {
                      user: item,
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
                  deleteStudent(item.id)
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

const styles = StyleSheet.create({
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
    backgroundColor: '#00B894',
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

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
  },

  role: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: 'bold',
    marginBottom: 15,
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