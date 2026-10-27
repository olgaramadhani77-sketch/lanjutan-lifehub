import React from 'react';
import Landing from './pages/Landing.jsx';
import LoginView from './pages/LoginView.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Quest from './pages/Quest.jsx';
import Habit from './pages/Habit.jsx';
import Pomodoro from './pages/Pomodoro.jsx';
import Eco from './pages/Eco.jsx';
import Profile from './pages/Profile.jsx';
import Legal from './pages/Legal.jsx';
import { usePersistentStyles, useRoute, useTheme } from './utils/hooks.js';
import { RewardToast } from './components/index.js';
import { AuthProvider } from "./AuthContext.jsx";

function normalize(route) {
  return route.replace(/\/pages\//, '/').replace(/\.html$/, '').replace(/\/index$/, '/') || '/';
}

export default function App() {
  usePersistentStyles();

  const route = normalize(useRoute());
  const themeTools = useTheme(route);

  // Cek apakah sedang berada di halaman login/auth
  const isAuthPage = 
    route === '/' ||
    route === '/index.html' ||
    route === '/onboarding' ||
    route === '/login' ||
    route === '/register';

  let Page;

  if (route === '/') {
  Page = <Landing />;
} else if (isAuthPage) {
  Page = <LoginView />;
} else if (route === '/dashboard') {
  Page = (
      <Dashboard
        theme={themeTools.theme}
        toggleTheme={themeTools.toggleTheme}
      />
    );
  } else if (route === '/quest') {
    Page = <Quest />;
  } else if (route === '/habit') {
    Page = <Habit />;
  } else if (route === '/pomodoro') {
    Page = <Pomodoro />;
  } else if (route === '/eco') {
    Page = <Eco />;
  } else if (route === '/profile') {
    Page = <Profile />;
  } else if (route === '/privacy') {
    Page = <Legal type="privacy" />;
  } else if (route === '/terms') {
    Page = <Legal type="terms" />;
  } else if (route === '/about') {
    Page = <Legal type="about" />;
  } else {
    Page = <LoginView />;
  }

  return (
    <AuthProvider>
      {Page}
      {/* RewardToast hanya akan muncul jika bukan di halaman login */}
      {!isAuthPage && <RewardToast />}
    </AuthProvider>
  );
}