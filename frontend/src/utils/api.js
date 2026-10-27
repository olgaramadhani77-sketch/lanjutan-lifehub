const API_URL = 'http://127.0.0.1:8000/api';

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Sesi berakhir. Silakan login ulang.');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message =
      body.message ||
      Object.values(body.errors || {}).flat().join(' ') ||
      `Request gagal (${res.status})`;
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

export { API_URL };