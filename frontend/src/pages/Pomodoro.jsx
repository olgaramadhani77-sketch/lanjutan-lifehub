import React, { useState, useEffect, useRef } from 'react';
import { Nav } from '../components/index.js';
import { usePageStyles } from '../utils/hooks.js';
import {
  fetchPomodoroSessions,
  startPomodoroSession,
  updatePomodoroSession,
} from '../utils/pomodoroApi.js';

export default function Pomodoro() {
  usePageStyles(['/css/dashboard.css', '/css/gamification.css']);

  const [mode, setMode] = useState('focus'); // 'focus' | 'break'
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const completingRef = useRef(false);

  const totalTime = mode === 'focus' ? 25 * 60 : 5 * 60;
  const percentage = Math.round(((totalTime - timeLeft) / totalTime) * 100);

  // Load riwayat saat mount
  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    setLoading(true);
    setError('');
    try {
      const data = await fetchPomodoroSessions();
      setHistory(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Timer logic
  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && sessionId && !completingRef.current) {
      completingRef.current = true;
      handleComplete(sessionId);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, sessionId]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const handleStart = async () => {
    setError('');
    try {
      const duration = mode === 'focus' ? 25 : 5;
      const session = await startPomodoroSession(mode, duration);
      setSessionId(session.id);
      setIsRunning(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = async () => {
    setIsRunning(false);

    if (sessionId) {
      try {
        await updatePomodoroSession(sessionId, 'cancelled');
        loadHistory();
      } catch (err) {
        // abaikan error
      }
    }

    setSessionId(null);
    completingRef.current = false;
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const handleComplete = async (id) => {
    try {
      await updatePomodoroSession(id, 'completed');
      loadHistory();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRunning(false);
      setSessionId(null);
      completingRef.current = false;
    }
  };

  return (
    <>
      <Nav active="pomodoro" />

      <div className="dashboard-layout" style={{ display: 'flex', justifyContent: 'center', padding:'40px 20px' }}>
        <div
          className="panel"
          style={{
            maxWidth: '480px',
            width: '100%',
            padding: '32px 24px',
            borderRadius: '24px',
            backgroundColor: '#ffffff',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p className="panel-label" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.8rem', color: '#6b7280' }}>Focus Tool</p>
            <h2 style={{ margin: '4px 0 0 0', fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>Focus Mode</h2>
          </div>

          {error && (
            <div style={{ padding: '8px 12px', background: '#FEE2E2', color: '#DC2626', borderRadius: '8px', fontSize: '0.85rem', textAlign: 'center', width: '100%' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'inline-flex', backgroundColor: '#f3f4f6', padding: '4px', borderRadius: '999px', gap: '4px' }}>
            <button
              onClick={() => handleModeChange('focus')}
              style={{
                border: 'none',
                padding: '8px 20px',
                borderRadius: '999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: mode === 'focus' ? '#0f172a' : 'transparent',
                color: mode === 'focus' ? '#ffffff' : '#6b7280',
                transition: 'all 0.2s ease',
              }}
            >
              Focus
            </button>
            <button
              onClick={() => handleModeChange('break')}
              style={{
                border: 'none',
                padding: '8px 20px',
                borderRadius: '999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: mode === 'break' ? '#0f172a' : 'transparent',
                color: mode === 'break' ? '#ffffff' : '#6b7280',
                transition: 'all 0.2s ease',
              }}
            >
              Break
            </button>
          </div>

          <div
            style={{
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              backgroundColor: '#dbeafe',
              border: '8px solid #eff6ff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.02)',
              margin: '8px 0'
            }}
          >
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#3b82f6', marginBottom: '2px' }}>
              {percentage}%
            </span>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '2px 0', color: '#1e293b', fontFamily: 'monospace', letterSpacing: '-1px' }}>
              {formatTime(timeLeft)}
            </h1>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>
              {isRunning ? (mode === 'focus' ? 'Focusing...' : 'Taking a break...') : 'Ready to focus'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="primary-btn"
                style={{
                  flex: 1,
                  maxWidth: '120px',
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: '#0f172a',
                  color: '#fff',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Start
              </button>
            ) : (
              <button
                onClick={handlePause}
                style={{
                  flex: 1,
                  maxWidth: '120px',
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: '#f59e0b',
                  color: '#fff',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Pause
              </button>
            )}

            <button
              onClick={handleReset}
              style={{
                flex: 1,
                maxWidth: '120px',
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                color: '#374151',
                fontWeight: 600,
                border: '1px solid #e5e7eb',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          </div>

          {/* Riwayat Sesi */}
          <div style={{ width: '100%', marginTop: '16px', borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', color: '#111827' }}>Riwayat Sesi</h3>
            {loading ? (
              <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Memuat...</p>
            ) : history.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Belum ada sesi.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                {history.map((s) => (
                  <li key={s.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#374151', padding: '6px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ textTransform: 'capitalize' }}>{s.mode} — {s.duration}m</span>
                    <span style={{ color: s.status === 'completed' ? '#10b981' : s.status === 'cancelled' ? '#ef4444' : '#6b7280', fontWeight: 600 }}>
                      {s.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}