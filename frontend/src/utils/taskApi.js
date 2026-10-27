import { apiFetch } from './api.js';

function normalizeTask(t) {
  return {
    ...t,
    dueDate: t.due_date || t.dueDate || '',
    completed: Boolean(t.completed),
  };
}

export async function fetchTasks() {
  const res = await apiFetch('/quests?per_page=50');
  return (res.data || []).map(normalizeTask);
}

export async function createTaskApi(form) {
  return apiFetch('/quests', {
    method: 'POST',
    body: JSON.stringify({
      title: form.title,
      description: form.description || '',
      category: form.category || 'Personal',
      priority: form.priority || 'Medium',
      due_date: form.dueDate || null,
    }),
  });
}

export async function deleteTaskApi(id) {
  return apiFetch(`/quests/${id}`, { method: 'DELETE' });
}

export async function toggleTaskApi(id, currentCompleted) {
  return apiFetch(`/quests/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ completed: !currentCompleted }),
  });
}