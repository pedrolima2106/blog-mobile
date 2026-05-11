import {
  createContext,
  useState,
} from 'react';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function signIn(email, password) {
    if (
      email === 'admin@email.com' &&
      password === '123456'
    ) {
      const fakeUser = {
        name: 'Pedro',
        email,
      };

      setUser(fakeUser);

      return true;
    }

    return false;
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