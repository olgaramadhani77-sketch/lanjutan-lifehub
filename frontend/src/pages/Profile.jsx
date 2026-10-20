import React, { useState } from 'react';
import { useLifeHub, usePageStyles, navigate } from '../utils/hooks.js';
import { Nav, Link } from '../components/index.js';
import { useAuth } from '../AuthContext.jsx';

export default function Profile() {
  usePageStyles(['/css/pages.css']);

  const s = useLifeHub();
  const { isAuthenticated, user, logout } = useAuth();

  // Mengambil nama dari hasil login jika ada
  const displayName = isAuthenticated ? (user?.name || s.profile.name) : (s.profile.name || 'Tamu');

  const [form, setForm] = useState({
    name: displayName,
    bio: s.profile.bio || 'Building better routines through focused days.',
    goal: s.profile.goal || 'Stay consistent with study, focus, and personal growth.',
    location: s.profile.location || 'Indonesia',
    focusStyle: s.profile.focusStyle || 'Calm Focus',
    favoriteTime: s.profile.favoriteTime || 'Morning',
  });

  const [savedMessage, setSavedMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (s.updateProfile) {
      s.updateProfile(form);
    }
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login');
  };

  return (
    <>
      <Nav active="profile" />

      <div className="profile-page-container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
        
        {/* HEADER PROFILE */}
        <section className="panel" style={{ padding: '32px', borderRadius: '24px', backgroundColor: '#ffffff', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            <div>
              <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '1px', color: '#6b7280', marginBottom: '4px' }}>
                Personal Space
              </p>
              <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#111827', margin: '0 0 8px 0' }}>
                {form.name}
              </h1>
              <p style={{ color: '#4b5563', fontSize: '1rem', margin: 0, maxWidth: '500px' }}>
                {form.bio}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                onClick={handleLogout}
                style={{
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  backgroundColor: '#EF4444',
                  color: '#ffffff',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Logout
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="secondary-btn"
                style={{
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  backgroundColor: '#F3F4F6',
                  color: '#1F2937',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </section>

        {/* STATISTIK PRODUKTIVITAS MURNI (TANPA LEVEL, XP, COIN, ECO) */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div className="panel" style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#ffffff', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '600', marginBottom: '8px' }}>Total Quests</p>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: 0, color: '#111827' }}>{s.totalTasks || 0}</h2>
          </div>

          <div className="panel" style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#ffffff', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '600', marginBottom: '8px' }}>Completed</p>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: 0, color: '#10B981' }}>{s.completedTasks || 0}</h2>
          </div>

          <div className="panel" style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#ffffff', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '600', marginBottom: '8px' }}>Total Habits</p>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: 0, color: '#6366F1' }}>{s.habits?.length || 0}</h2>
          </div>
        </section>

        {/* MAIN CONTENT: EDIT FORM & SUMMARY */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          {/* FORM EDIT PROFILE */}
          <section className="panel" style={{ padding: '24px', borderRadius: '20px', backgroundColor: '#ffffff' }}>
            <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '800', color: '#6b7280', marginBottom: '4px' }}>EDIT</p>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px' }}>Profile Settings</h3>

            {savedMessage && (
              <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#D1FAE5', color: '#065F46', fontSize: '0.875rem', fontWeight: '600', marginBottom: '16px' }}>
                Profile saved successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Bio</label>
                <textarea
                  name="bio"
                  rows="2"
                  value={form.bio}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Personal Goal</label>
                <textarea
                  name="goal"
                  rows="2"
                  value={form.goal}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Focus Style</label>
                <select
                  name="focusStyle"
                  value={form.focusStyle}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', outline: 'none', backgroundColor: '#fff' }}
                >
                  <option value="Calm Focus">Calm Focus</option>
                  <option value="Sprint Focus">Sprint Focus</option>
                  <option value="Deep Work">Deep Work</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Favorite Time</label>
                <select
                  name="favoriteTime"
                  value={form.favoriteTime}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', outline: 'none', backgroundColor: '#fff' }}
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Night">Night</option>
                </select>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '8px',
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: '#111827',
                  color: '#ffffff',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                Save Profile
              </button>
            </form>
          </section>

          {/* SUMMARY PROFILE */}
          <section className="panel" style={{ padding: '24px', borderRadius: '20px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '800', color: '#6b7280', marginBottom: '4px' }}>SUMMARY</p>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>LifeHub Identity</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#E0F2FE' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0369A1', margin: '0 0 4px 0' }}>Name</p>
                <p style={{ fontSize: '1rem', fontWeight: '700', color: '#0C4A6E', margin: 0 }}>{form.name}</p>
              </div>

              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#E0F2FE' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0369A1', margin: '0 0 4px 0' }}>Location</p>
                <p style={{ fontSize: '1rem', fontWeight: '700', color: '#0C4A6E', margin: 0 }}>{form.location}</p>
              </div>

              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#E0F2FE' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0369A1', margin: '0 0 4px 0' }}>Favorite Time</p>
                <p style={{ fontSize: '1rem', fontWeight: '700', color: '#0C4A6E', margin: 0 }}>{form.favoriteTime}</p>
              </div>

              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#E0F2FE' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0369A1', margin: '0 0 4px 0' }}>Focus Style</p>
                <p style={{ fontSize: '1rem', fontWeight: '700', color: '#0C4A6E', margin: 0 }}>{form.focusStyle}</p>
              </div>
            </div>

            <div style={{ padding: '20px', borderRadius: '16px', border: '1px solid #E5E7EB', backgroundColor: '#FAFAFA' }}>
              <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '800', color: '#6b7280', marginBottom: '8px' }}>PERSONAL GOAL</p>
              <p style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>{form.goal}</p>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}