import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_URL = 'http://127.0.0.1:8000/api';

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    user: null,
    isGuest: false,
    isAuthenticated: false,
    loading: true,
  });

  // Saat app pertama dibuka, cek apakah ada token tersimpan
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuth((prev) => ({ ...prev, loading: false }));
      return;
    }

    // Validasi token ke API /me
    fetch(`${API_URL}/me`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Token invalid');
        return res.json();
      })
      .then((data) => {
        setAuth({
          user: data.user,
          isGuest: false,
          isAuthenticated: true,
          loading: false,
        });
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuth({ user: null, isGuest: false, isAuthenticated: false, loading: false });
      });
  }, []);

  const enterGuestMode = () => {
    setAuth({ user: { role: 'guest' }, isGuest: true, isAuthenticated: false, loading: false });
  };

  // Dipanggil setelah login/register sukses — simpan token & user
  const loginSuccess = (userData, token) => {
    if (token) localStorage.setItem('token', token);
    if (userData) localStorage.setItem('user', JSON.stringify(userData));
    setAuth({ user: userData, isGuest: false, isAuthenticated: true, loading: false });
  };

  // Logout — panggil API + hapus token
  const logout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch(`${API_URL}/logout`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      } catch {
        // Abaikan error jaringan — tetap logout lokal
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ user: null, isGuest: false, isAuthenticated: false, loading: false });
  };

  return (
    <AuthContext.Provider
      value={{ ...auth, enterGuestMode, loginSuccess, logout, API_URL }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);