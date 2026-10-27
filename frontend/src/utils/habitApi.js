import { apiFetch } from './api.js';

function normalizeHabit(h) {
  return {
    ...h,
    target: h.daily_type || h.target || 'Daily',
    completed: Boolean(h.completed),
  };
}

export async function fetchHabits() {
  const res = await apiFetch('/habits?per_page=50');
  return (res.data || []).map(normalizeHabit);
}

export async function createHabit(form) {
  return apiFetch('/habits', {
    method: 'POST',
    body: JSON.stringify({
      title: form.title,
      description: form.description,
      category: form.category,
      daily_type: form.target || 'Daily',
    }),
  });
}

export async function updateHabitApi(id, form) {
  return apiFetch(`/habits/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: form.title,
      description: form.description,
      category: form.category,
      daily_type: form.target || 'Daily',
    }),
  });
}

export async function deleteHabitApi(id) {
  return apiFetch(`/habits/${id}`, { method: 'DELETE' });
}

export async function toggleHabitApi(id, currentCompleted) {
  return apiFetch(`/habits/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ completed: !currentCompleted }),
  });
}