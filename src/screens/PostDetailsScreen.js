import React, { useContext } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
    <View style={styles.container}>
      <Text style={styles.title}>
        {post.title}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F6FB',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111',
  },

  body: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 30,
    color: '#333',
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