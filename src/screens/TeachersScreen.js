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

export default function TeachersScreen({
  navigation,
}) {
  const [teachers, setTeachers] =
    useState([]);

  async function loadTeachers() {
    try {
      const response =
        await api.get('/Users');

      const onlyTeachers =
        response.data.filter(
          (user) => user.role === 'Professor'
        );

      setTeachers(onlyTeachers);

    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTeacher(id) {
    try {
      await api.delete(`/Users/${id}`);

      Alert.alert(
        'Sucesso',
        'Professor excluído!'
      );

      loadTeachers();

    } catch (error) {
      console.log(error.response?.data);

      Alert.alert(
        'Erro',
        'Erro ao excluir professor'
      );
    }
  }

  useEffect(() => {
    const unsubscribe =
      navigation.addListener(
        'focus',
        () => {
          loadTeachers();
        }
      );

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Professores
      </Text>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() =>
          navigation.navigate(
            'CreateUser',
            {
              role: 'Professor',
            }
          )
        }
      >
        <Text style={styles.createButtonText}>
          + Novo Professor
        </Text>
      </TouchableOpacity>

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
                  deleteTeacher(item.id)
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