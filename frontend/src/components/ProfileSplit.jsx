import React from 'react';
import Link from './Link.jsx';
import { getGamification, getProfile } from '../utils/core.js';
import { navigate } from '../utils/hooks.js';
import { useAuth } from '../AuthContext.jsx';

export default function ProfileSplit({ open, onClose, onNewQuest, onReset }) {
  const profile = getProfile();
  const game = getGamification();

  // Integrasi Auth State
  const { isAuthenticated, user, logout } = useAuth();

  const displayName = isAuthenticated ? (user?.name || profile.name) : 'Tamu';

  const xpBase = (game.level - 1) * 150;
  const xpNow = game.xp - xpBase;
  const pct = Math.min(100, (xpNow / 150) * 100);

  const handleLoginClick = () => {
    onClose();
    navigate('/login');
  };

  const handleLogoutClick = () => {
    logout();
    onClose();
    navigate('/login');
  };

  return (
    <>
      <div className={`profile-split-backdrop ${open ? 'show' : ''}`} onClick={onClose}></div>

      <aside className={`profile-split-panel ${open ? 'show' : ''}`} aria-hidden={!open}>
        <div className="profile-split-top">
          <div>
            <p className="panel-label">Profile</p>
            <h3>Account Info</h3>
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="profile-split-info" style={{ marginTop: '16px' }}>
          <h2>{displayName}</h2>
          <p>
            Level {game.level} {profile.role}
          </p>

          <div className="profile-split-xp">
            <div className="profile-split-xp-top">
              <span>EXP</span>
              <strong>{xpNow} / 150 XP</strong>
            </div>
            <div className="profile-split-xp-bar">
              <i style={{ width: `${pct}%` }}></i>
            </div>
          </div>

          {/* Statistik Eco-Points dihapus, hanya menyisakan Coins dan Focus */}
          <div className="profile-split-stats">
            <div>
              <strong>{game.coins}</strong>
              <span>Coins</span>
            </div>
            <div>
              <strong>{game.focusSessions}</strong>
              <span>Focus</span>
            </div>
          </div>
        </div>

        <Link to="/profile" className="primary-btn full-btn profile-split-view">
          View Profile
        </Link>

        <div className="profile-split-actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
          {!isAuthenticated ? (
            <button 
              className="primary-btn full-btn" 
              onClick={handleLoginClick}
              style={{ backgroundColor: '#4F46E5', color: '#fff' }}
            >
              Login / Register
            </button>
          ) : (
            <button 
              className="secondary-btn full-btn" 
              onClick={handleLogoutClick}
              style={{ backgroundColor: '#EF4444', color: '#fff' }}
            >
              Logout
            </button>
          )}

          <button className="secondary-btn full-btn" onClick={onNewQuest}>
            + New Quest
          </button>
        </div>

        <div className="profile-split-danger" style={{ marginTop: '8px' }}>
          <button className="danger-btn full-btn" onClick={onReset}>
            Reset Demo
          </button>
        </div>
      </aside>
    </>
  );
}