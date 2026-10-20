import React, { useState, useEffect } from 'react';
import { Nav, Icon } from '../components/index.js';
import { usePageStyles } from '../utils/hooks.js';

export default function Pomodoro() {
  usePageStyles(['/css/dashboard.css', '/css/gamification.css']);

  const [mode, setMode] = useState('focus'); // 'focus' | 'break'
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const totalTime = mode === 'focus' ? 25 * 60 : 5 * 60;
  const percentage = Math.round(((totalTime - timeLeft) / totalTime) * 100);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

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

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  return (
    <>
      <Nav active="pomodoro" />

      <div className="dashboard-layout" style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
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
          {/* Header */}
          <div style={{ textAlign: 'center' }}>
            <p className="panel-label" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.8rem', color: '#6b7280' }}>Focus Tool</p>
            <h2 style={{ margin: '4px 0 0 0', fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>Focus Mode</h2>
          </div>

          {/* Mode Switcher Pills */}
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

          {/* Circle Timer Widget */}
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

          {/* Action Control Buttons */}
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
        </div>
      </div>
    </>
  );
}