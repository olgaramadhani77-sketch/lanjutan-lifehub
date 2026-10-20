import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    user: null,
    isGuest: false,
    isAuthenticated: false,
  });

  const enterGuestMode = () => {
    setAuth({ user: { role: 'guest' }, isGuest: true, isAuthenticated: false });
  };

  const loginSuccess = (userData) => {
    setAuth({ user: userData, isGuest: false, isAuthenticated: true });
  };

  const logout = () => {
    setAuth({ user: null, isGuest: false, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, enterGuestMode, loginSuccess, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);