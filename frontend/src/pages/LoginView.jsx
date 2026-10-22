import React, { useState } from 'react';
import { useAuth } from '../AuthContext.jsx';
import { navigate } from '../utils/hooks.js';

export const LoginView = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { loginSuccess } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password || (isRegister && !name)) {
      setErrorMessage('Mohon lengkapi semua kolom.');
      return;
    }

    loginSuccess({ email, name: name || email.split('@')[0] });
    navigate('/dashboard');
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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

          <button type="submit" className="primary-btn full-btn" style={{ marginTop: '8px', padding: '12px', fontSize: '1rem', fontWeight: '600' }}>
            {isRegister ? 'Daftar Sekarang' : 'Masuk Akun'}
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