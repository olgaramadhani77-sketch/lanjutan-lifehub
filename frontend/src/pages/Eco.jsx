
import React, { useEffect, useState } from 'react';
import { usePageStyles } from '../utils/hooks.js';
import { Nav, StatCard } from '../components/index.js';

const API_URL = 'http://127.0.0.1:8000/api/eco-quests';

const blankForm = {
  title: '',
  description: '',
};

function normalizeQuest(q) {
  return {
    ...q,
    completed: Boolean(q.completed ?? q.claimed),
  };
}

export default function Eco() {
  usePageStyles(['/css/pages.css', '/css/eco.css', '/css/gamification.css']);

  const [ecoQuests, setEcoQuests] = useState([]);
  const [form, setForm] = useState(blankForm);
  const [edit, setEdit] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Semua request memakai token akun yang sedang login, sama seperti Quest.jsx
  async function request(url, options = {}) {
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      throw new Error('Sesi berakhir. Silakan login ulang.');
    }

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const message =
        body.message ||
        Object.values(body.errors || {}).flat().join(' ') ||
        `Request gagal (${response.status})`;

      throw new Error(message);
    }

    if (response.status === 204) return null;
    return response.json();
  }

  // Mengambil Eco Quest milik akun yang sedang login
  async function loadEcoQuests(url = `${API_URL}?per_page=2`, append = false) {
    try {
      setError('');
      setLoading(true);

      const result = await request(url);
      const items = Array.isArray(result) ? result : result.data || [];

      setEcoQuests((previous) =>
        append
          ? [...previous, ...items.map(normalizeQuest)]
          : items.map(normalizeQuest)
      );
      setNextPageUrl(Array.isArray(result) ? null : result.next_page_url || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEcoQuests();
  }, []);

  // Ambil halaman selanjutnya tanpa menghapus data halaman sebelumnya
  async function handleLoadMore() {
    if (!nextPageUrl || loading) return;
    await loadEcoQuests(nextPageUrl, true);
  }

  // Create dan Edit Eco Quest
  async function submit(e) {
    e.preventDefault();

    if (!form.title.trim() || saving) return;

    try {
      setSaving(true);
      setError('');

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
      };

      if (edit === null) {
        // user_id diisi backend dari token Sanctum; tidak perlu dikirim dari React
        await request(API_URL, {
          method: 'POST',
          body: JSON.stringify({
            ...payload,
            completed: false,
          }),
        });
      } else {
        await request(`${API_URL}/${edit.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      }

      setForm(blankForm);
      setEdit(null);
      await loadEcoQuests();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function startEdit(quest) {
    setEdit(quest);
    setForm({
      title: quest.title || '',
      description: quest.description || '',
    });
  }

  function cancelEdit() {
    setEdit(null);
    setForm(blankForm);
  }

  // Tandai Eco Quest selesai menggunakan kolom completed di backend
  async function completeEcoQuest(quest) {
    if (quest.completed) return;

    try {
      setError('');

      await request(`${API_URL}/${quest.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          completed: true,
        }),
      });

      await loadEcoQuests();
    } catch (err) {
      setError(err.message);
    }
  }

  // Delete Eco Quest
  async function removeEcoQuest(quest) {
    if (!window.confirm(`Hapus Eco Quest "${quest.title}"?`)) return;

    try {
      setError('');

      await request(`${API_URL}/${quest.id}`, {
        method: 'DELETE',
      });

      setEcoQuests((previous) =>
        previous.filter((item) => item.id !== quest.id)
      );

      if (edit?.id === quest.id) cancelEdit();
    } catch (err) {
      setError(err.message);
    }
  }

  const completed = ecoQuests.filter((q) => q.completed).length;
  const available = ecoQuests.length - completed;
  const progress = ecoQuests.length
    ? Math.round((completed / ecoQuests.length) * 100)
    : 0;

  return (
    <>
      <Nav active="eco" />

      <main className="page-shell">
        <section className="feature-hero">
          <div>
            <p className="eyebrow">Eco Side Quest</p>
            <h1>Complete green missions that actually matter.</h1>
            <p>
              Add small sustainable actions into your daily routine, claim eco
              points, and turn better lifestyle choices into visible progress.
            </p>

            <div className="hero-actions">
              <a href="#ecoWorkspace" className="primary-btn">
                Create Eco Quest
              </a>
              <a href="#ecoListSection" className="secondary-btn">
                View Eco List
              </a>
            </div>
          </div>
        </section>

        <section className="stats-grid">
          <StatCard label="Total Eco Quest" value={ecoQuests.length} />
          <StatCard label="Completed" value={completed} />
          <StatCard label="Available" value={available} />
          <StatCard label="Progress" value={`${progress}%`} />
        </section>

        <section className="feature-workspace" id="ecoWorkspace">
          <form
            className="feature-panel feature-form sticky"
            onSubmit={submit}
          >
            <p className="panel-label">{edit === null ? 'Create' : 'Edit'}</p>
            <h2>{edit === null ? 'New Eco Quest' : 'Edit Eco Quest'}</h2>

            <input
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              placeholder="Example: Bring a tumbler"
              required
            />

            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Write a short description"
            />

            <div className="form-actions">
              <button
                className="primary-btn"
                type="submit"
                disabled={saving}
              >
                {saving
                  ? 'Saving...'
                  : edit === null
                    ? 'Add Eco Quest'
                    : 'Save Changes'}
              </button>

              {edit !== null && (
                <button
                  className="secondary-btn"
                  type="button"
                  onClick={cancelEdit}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <section className="feature-panel" id="ecoListSection">
            <div className="panel-header">
              <div>
                <p className="panel-label">Today</p>
                <h2>Eco Side Quests</h2>
              </div>
            </div>

            {error && (
              <p role="alert" style={{ color: 'crimson', overflowWrap: 'anywhere' }}>
                {error}
              </p>
            )}

            <div className="feature-list">
              {loading ? (
                <p>Loading Eco Quests...</p>
              ) : ecoQuests.length > 0 ? (
                <>
                  {ecoQuests.map((q) => (
                    <div
                      key={q.id}
                      className={`eco-card ${q.completed ? 'completed' : ''}`}
                    >
                      <div className="eco-card-content">
                        <div>
                          <h3>{q.title}</h3>
                          <p>{q.description || 'No description added.'}</p>
                        </div>

                        <div className="eco-status">
                          {q.completed ? 'Completed' : 'Available'}
                        </div>
                      </div>

                      <div className="eco-actions">
                        <button
                          type="button"
                          className="secondary-btn"
                          onClick={() => startEdit(q)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="primary-btn"
                          disabled={q.completed}
                          onClick={() => completeEcoQuest(q)}
                        >
                          {q.completed ? 'Completed' : 'Complete'}
                        </button>

                        <button
                          type="button"
                          className="danger-btn"
                          onClick={() => removeEcoQuest(q)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}

                  {nextPageUrl && (
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                      <button
                        type="button"
                        className="secondary-btn"
                        onClick={handleLoadMore}
                      >
                        Load More
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="empty-feature">
                  <h3>No eco quest yet</h3>
                  <p>
                    Create your first green side mission and start collecting
                    eco points.
                  </p>
                </div>
              )}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
