import React, { useContext } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { AuthContext } from '../contexts/AuthContext';

export default function PostDetailsScreen({
  route,
  navigation,
}) {
  const { post } = route.params;

  const { user } = useContext(AuthContext);

  const canEdit =
    user?.role === 'Professor' ||
    user?.role === 'Admin';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.badge}>
          POST
        </Text>

        <Text style={styles.title}>
          {post.title}
        </Text>

        <Text style={styles.author}>
          Autor: {post.author || 'Não informado'}
        </Text>

        <Text style={styles.sectionTitle}>
          Conteúdo
        </Text>

        <Text style={styles.body}>
          {post.content}
        </Text>

        {canEdit && (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('EditPost', {
                post,
              })
            }
          >
            <Text style={styles.buttonText}>
              Editar Post
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF1F7',
    padding: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 22,
    elevation: 4,
  },

  badge: {
    backgroundColor: '#EAE8FF',
    color: '#6C63FF',
    fontWeight: 'bold',
    fontSize: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 10,
    textTransform: 'capitalize',
  },

  author: {
    color: '#6C63FF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 10,
  },

  body: {
    fontSize: 17,
    color: '#444',
    lineHeight: 28,
    marginBottom: 30,
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