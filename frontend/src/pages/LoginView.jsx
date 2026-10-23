import React, { useState } from 'react';
import { useAuth } from '../AuthContext.jsx';
import { navigate } from '../utils/hooks.js';

export const LoginView = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginSuccess, API_URL } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validasi dasar
    if (!email || !password || (isRegister && !name)) {
      setErrorMessage('Mohon lengkapi semua kolom.');
      return;
    }
    if (isRegister && password !== confirmPassword) {
      setErrorMessage('Konfirmasi password tidak cocok.');
      return;
    }

    setLoading(true);

    try {
      const url = isRegister ? `${API_URL}/register` : `${API_URL}/login`;
      const body = isRegister
        ? { name, email, password, password_confirmation: confirmPassword }
        : { email, password };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        // Tampilkan error validasi dari Laravel
        if (data.errors) {
          setErrorMessage(Object.values(data.errors).flat().join(', '));
        } else {
          setErrorMessage(data.message || 'Terjadi kesalahan. Coba lagi.');
        }
        return;
      }

      // Sukses — simpan token & user
      loginSuccess(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage('Gagal terhubung ke server. Pastikan backend jalan di port 8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <div className="card-panel" style={{ maxWidth: '420px', width: '100%', padding: '32px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            🌱 LIFEHUB
          </h1>
          <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>
            {isRegister ? 'Buat akun untuk memulai perjalananmu' : 'Masuk untuk melanjutkan quest & kebiasaanmu'}
          </p>
        </div>

        {errorMessage && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#FEE2E2', color: '#DC2626', fontSize: '0.875rem', marginBottom: '16px', textAlign: 'center' }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px'}}>
          {isRegister && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>Nama Lengkap</label>
              <input
                type="text"
                className="input-field"
                placeholder="Contoh: Alex Rivers"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color, #ccc)' }}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color, #ccc)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color, #ccc)' }}
            />
          </div>

          {isRegister && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>Konfirmasi Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color, #ccc)' }}
              />
            </div>
          )}

          <button
            type="submit"
            className="primary-btn full-btn"
            disabled={loading}
            style={{ marginTop: '8px', padding:'12px', fontSize: '1rem', fontWeight: '600', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Memproses...' : (isRegister ? 'Daftar Sekarang' : 'Masuk Akun')}
          </button>
        </form>

        <div style={{ textAlign: 'center', margin: '20px 0 0', fontSize: '0.875rem' }}>
          <span>{isRegister ? 'Sudah punya akun?' : 'Belum punya akun?'} </span>
          <button
            type="button"
            onClick={() => { setIsRegister(!isRegister); setErrorMessage(''); }}
            style={{ background: 'none', border: 'none', color: '#4F46E5', fontWeight: '600', cursor: 'pointer', padding: 0 }}
          >
            {isRegister ? 'Masuk di sini' : 'Daftar di sini'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoginView;