import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext } from '../contexts/AuthContext';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import EditPostScreen from '../screens/EditPostScreen';
import TeachersScreen from '../screens/TeachersScreen';
import StudentsScreen from '../screens/StudentsScreen';
import CreateUserScreen from '../screens/CreateUserScreen';
import EditUserScreen from '../screens/EditUserScreen';
import ManagePostsScreen from '../screens/ManagePostsScreen';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  const auth = useContext(AuthContext);

  if (!auth) {
    return null;
  }

  const { signed } = auth;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {signed ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />

            <Stack.Screen
              name="PostDetails"
              component={PostDetailsScreen}
            />

            <Stack.Screen
              name="CreatePost"
              component={CreatePostScreen}
            />

            <Stack.Screen
              name="EditPost"
              component={EditPostScreen}
            />

            <Stack.Screen
              name="ManagePosts"
              component={ManagePostsScreen}
            />

            <Stack.Screen
              name="Teachers"
              component={TeachersScreen}
            />

            <Stack.Screen
              name="Students"
              component={StudentsScreen}
            />

            <Stack.Screen
              name="CreateUser"
              component={CreateUserScreen}
            />

            <Stack.Screen
              name="EditUser"
              component={EditUserScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}