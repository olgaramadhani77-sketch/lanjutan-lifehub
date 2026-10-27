import { apiFetch } from './api.js';

export async function fetchPomodoroSessions() {
  const res = await apiFetch('/pomodoro-sessions?per_page=20');
  return (res.data || []);
}

export async function startPomodoroSession(mode, duration) {
  return apiFetch('/pomodoro-sessions', {
    method: 'POST',
    body: JSON.stringify({ mode, duration }),
  });
}

export async function updatePomodoroSession(id, status) {
  return apiFetch(`/pomodoro-sessions/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

export async function deletePomodoroSession(id) {
  return apiFetch(`/pomodoro-sessions/${id}`, { method: 'DELETE' });
}