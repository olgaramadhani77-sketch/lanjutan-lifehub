import React, { useState } from 'react';
import { useLifeHub, usePageStyles, navigate } from '../utils/hooks.js';
import {
  Nav,
  Icon,
  Link,
  NotificationModal,
  ProfileSplit,
  ConfirmResetModal,
  QuestModal,
} from '../components/index.js';
import { toggleTask, deleteTask, toggleHabit, getNotifications } from '../utils/core.js';
import { useAuth } from '../AuthContext.jsx';

function greeting(name) {
  const hour = new Date().getHours();
  const part = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
  return `${part}, ${name}`;
}

const WEEKLY_FLOW = [45, 68, 52, 80, 65, 72, 88];
const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Dashboard({ theme, toggleTheme }) {
  usePageStyles(['/css/dashboard.css', '/css/gamification.css']);

  const s = useLifeHub();
  const { isAuthenticated, user, logout } = useAuth();

  const [notif, setNotif] = useState(false);
  const [profilePanel, setProfilePanel] = useState(false);
  const [questModal, setQuestModal] = useState(false);
  const [reset, setReset] = useState(false);
  const [search, setSearch] = useState('');

  // State Kalender Bulanan
  const [currentDate, setCurrentDate] = useState(new Date());

  const notifications = getNotifications();

  const filteredTasks = s.tasks.filter((t) => !search || t.title.toLowerCase().includes(search.toLowerCase()));
  const highPriorityCount = s.tasks.filter((t) => t.priority === 'High').length;
  const overdueCount = s.tasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date(new Date().toDateString()) && !t.completed).length;
  const habitsLeft = s.habits.filter((h) => !h.completed).length;

  const displayName = isAuthenticated ? (user?.name || s.profile.name) : 'Tamu';

  // --- LOGIKA KALENDER BULANAN ---
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = [];
  for (let i = 0; i < startingDay; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(d);
  }

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const openNewQuestFromPanel = () => {
    setProfilePanel(false);
    setQuestModal(true);
  };

  const openResetFromPanel = () => {
    setProfilePanel(false);
    setReset(true);
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <Nav active="dashboard" />

      <div className="dashboard-layout dashboard-top-layout" style={{ paddingTop: '16px' }}>
        <main className="main">
          <header className="topbar" style={{ marginBottom: '24px' }}>
            <div>
              <p className="eyebrow">Overview</p>
              <h2>{greeting(displayName)}</h2>
            </div>

            <div className="topbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button className="circle-btn notification-btn" onClick={() => setNotif(true)}>
                <Icon name="bell" />
                <span className="notification-count">{notifications.length}</span>
              </button>

              {/* Tombol Lihat/Edit Profil */}
              <Link
                to="/profile"
                className="secondary-btn"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.875rem',
                  borderRadius: '9999px',
                  backgroundColor: '#F3F4F6',
                  color: '#1F2937',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Profile
              </Link>

              {/* Tombol Akses Login / Logout */}
              <button
                onClick={handleAuthClick}
                className="primary-btn"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.875rem',
                  borderRadius: '9999px',
                  backgroundColor: isAuthenticated ? '#EF4444' : '#14B8A6',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {isAuthenticated ? 'Logout' : 'Login / Register'}
              </button>
            </div> 
          </header>

          {/* Banner Hero & Shortcuts */}
          <section className="hero-card" style={{ transform: 'none', margin: '0 0 24px 0', position: 'relative', zIndex: 1 }}>
            <div className="hero-content">
              <span className="tag">Today's Pulse</span>
              <h1>
                Build your rhythm.
                <br />
                Grow your world.
              </h1>
              <p>Manage your quests, habits, and focus sessions in one calm and mindful workspace.</p>
              <div className="hero-actions">
                <Link to="/pomodoro" className="primary-btn">
                  Start Focus
                </Link>
              </div>
            </div>

            <section className="shortcut-grid" style={{ transform: 'none', marginTop: '20px', position: 'relative', zIndex: 2 }}>
              <Link to="/quest" className="shortcut-card">
                <Icon name="check-square" />
                <h3>Quest Manager</h3>
                <p>Manage your daily quests, priority, deadline, and progress.</p>
              </Link>

              <Link to="/habit" className="shortcut-card">
                <Icon name="repeat" />
                <h3>Habit Tracker</h3>
                <p>Track routines and build consistent daily habits.</p>
              </Link>

              <Link to="/eco" className="shortcut-card">
                <Icon name="leaf" />
                <h3>Eco Quest</h3>
                <p>Complete small green missions.</p>
              </Link>

              <Link to="/pomodoro" className="shortcut-card">
                <Icon name="timer" />
                <h3>Pomodoro</h3>
                <p>Start focused sessions and protect your deep work time.</p>
              </Link>
            </section>

            <div className="nature-scene">
              <div className="cloud cloud-one"></div>
              <div className="cloud cloud-two"></div>
              <div className="mountain mountain-one"></div>
              <div className="mountain mountain-two"></div>
              <div className="tree tree-one"></div>
              <div className="tree tree-two"></div>
              <div className="tree tree-three"></div>
              <div className="bush bush-one"></div>
              <div className="bush bush-two"></div>
            </div>
          </section>

          {/* SECTION BERDAMPINGAN: KALENDER & POMODORO */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '24px', alignItems: 'stretch' }}>
            
            {/* 1. KALENDER BULANAN */}
            <section className="panel monthly-calendar-panel" style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#ffffff', margin: 0 }}>
              <div className="calendar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, textTransform: 'capitalize', fontSize: '1rem', fontWeight: '600' }}>
                  {monthName} {year}
                </h3>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={prevMonth} className="secondary-btn" style={{ padding: '4px 10px', fontSize: '0.85rem' }}>&lt;</button>
                  <button onClick={nextMonth} className="secondary-btn" style={{ padding: '4px 10px', fontSize: '0.85rem' }}>&gt;</button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center', fontWeight: '600', marginBottom: '6px', color: '#6b7280', fontSize: '0.8rem' }}>
                {DAYS_OF_WEEK.map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                {calendarCells.map((dayNum, index) => {
                  const isToday = isCurrentMonth && dayNum === today.getDate();
                  return (
                    <div
                      key={index}
                      style={{
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        border: dayNum ? '1px solid #e5e7eb' : 'none',
                        backgroundColor: isToday ? '#6366f1' : dayNum ? '#f9fafb' : 'transparent',
                        color: isToday ? '#ffffff' : '#374151',
                        fontSize: '0.8rem',
                        fontWeight: isToday ? 'bold' : 'normal',
                      }}
                    >
                      {dayNum || ''}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 2. FOCUS POMODORO */}
            <div className="panel pomodoro-panel" style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div className="panel-header">
                <div>
                  <p className="panel-label">Focus</p>
                  <h3>Pomodoro</h3>
                </div>
                <Link to="/pomodoro" className="overview-link-btn">
                  Open
                </Link>
              </div>

              <div className="timer-display" style={{ textAlign: 'center', margin: 'auto 0' }}>
                <div>
                  <h2 style={{ fontSize: '2.5rem', margin: '8px 0' }}>25:00</h2>
                  <p style={{ color: '#6b7280' }}>Ready to focus</p>
                </div>
              </div>

              <div className="pomodoro-actions" style={{ display: 'flex', gap: '12px' }}>
                <Link to="/pomodoro" className="primary-btn" style={{ flex: 1, textAlign: 'center' }}>
                  Start
                </Link>
                <Link to="/pomodoro" className="secondary-btn" style={{ flex: 1, textAlign: 'center' }}>
                  Settings
                </Link>
              </div>
            </div>

          </div>

          <section className="content-grid" style={{ marginTop: '24px' }}>
            <div className="left-column">
              <div className="panel" id="questSection">
                <div className="panel-header">
                  <div>
                    <p className="panel-label">Today</p>
                    <h3>Tasks</h3>
                  </div>
                  <Link to="/quest" className="overview-link-btn">
                    Manage
                  </Link>
                </div>

                <p className="progress-text">
                  <span>{s.completedTasks}</span>/<span>{s.totalTasks}</span> done
                </p>

                <div className="quest-overview">
                  <div className="overview-card">
                    <p>Total</p>
                    <h4>{s.totalTasks}</h4>
                  </div>
                  <div className="overview-card success">
                    <p>Completed</p>
                    <h4>{s.completedTasks}</h4>
                  </div>
                  <div className="overview-card warning">
                    <p>High Priority</p>
                    <h4>{highPriorityCount}</h4>
                  </div>
                  <div className="overview-card danger">
                    <p>Overdue</p>
                    <h4>{overdueCount}</h4>
                  </div>
                </div>

                <div className="task-list">
                  {filteredTasks.length ? (
                    filteredTasks.slice(0, 5).map((t, i) => (
                      <div className={`task-item ${t.completed ? 'completed' : ''}`} key={i}>
                        <button className={`task-check ${t.completed ? 'done' : ''}`} onClick={() => toggleTask(i)}></button>
                        <div>
                          <h4>{t.title}</h4>
                          <p>
                            {t.category} • {t.priority}
                          </p>
                        </div>
                        <button className="task-delete" onClick={() => deleteTask(i)}>
                          ×
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state-mini">
                      <h4>No quests yet</h4>
                      <p>Create quests from the Quest page or quick panel.</p>
                    </div>
                  )}
                </div>

                <div className="progress-bar">
                  <div style={{ width: `${s.totalTasks ? (s.completedTasks / s.totalTasks) * 100 : 0}%` }}></div>
                </div>
              </div>

              <div className="panel" id="habitSection">
                <div className="panel-header">
                  <div>
                    <p className="panel-label">Consistency</p>
                    <h3>Habit Tracker</h3>
                  </div>
                  <Link to="/habit" className="overview-link-btn">
                    View All
                  </Link>
                </div>

                <div className="habit-list">
                  {s.habits.length ? (
                    s.habits.slice(0, 3).map((h, i) => (
                      <div className={`habit-item ${h.completed ? 'completed' : ''}`} key={i}>
                        <div className="habit-left">
                          <button className={`habit-toggle ${h.completed ? 'done' : ''}`} onClick={() => toggleHabit(i)}></button>
                          <div>
                            <h4>{h.title}</h4>
                            <p>{h.category || h.target}</p>
                          </div>
                        </div>
                        <span>{h.completed ? 'Done' : 'Active'}</span>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state-mini">
                      <h4>No habits yet</h4>
                      <p>Create habits from the Habit page.</p>
                    </div>
                  )}
                </div>
              </div>
            </div> 

            <div className="right-column">
              <div className="panel analytics-panel">
                <p className="panel-label">Weekly Flow</p>
                <h3>{habitsLeft > 0 ? 'Keep your streak alive today.' : 'All habits completed. Great rhythm.'}</h3>
                <p>{habitsLeft} habits left</p>
                <div className="mini-chart">
                  {WEEKLY_FLOW.map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <NotificationModal open={notif} onClose={() => setNotif(false)} />
      <ProfileSplit open={profilePanel} onClose={() => setProfilePanel(false)} onNewQuest={openNewQuestFromPanel} onReset={openResetFromPanel} />
      <QuestModal open={questModal} onClose={() => setQuestModal(false)} />
      <ConfirmResetModal open={reset} onClose={() => setReset(false)} />
    </>
  );
}