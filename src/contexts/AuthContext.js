import React, {
  createContext,
  useState,
} from 'react';

import api from '../services/api';

export const AuthContext =
  createContext({});

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  async function signIn(
    email,
    password
  ) {
    try {
      const response =
        await api.post(
          '/Auth/login',
          {
            email,
            password,
          }
        );

      setUser(response.data);

      return true;

    } catch (error) {
      console.log(error);

      return false;
    }
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}