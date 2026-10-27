import React, { useState } from 'react';
import { createTaskApi } from '../utils/taskApi.js';

const blankForm = { title: '', category: 'Personal', priority: 'Medium', dueDate: '' };

const CATEGORIES = ['Personal', 'Study', 'Frontend Development', 'Documentation', 'Design Research','Version Control', 'Eco Quest'];

export default function QuestModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState(blankForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const submit = async () => {
    if (!form.title.trim() || saving) return;

    setSaving(true);
    setError('');

    try {
      await createTaskApi(form);
      setForm(blankForm);
      if (onCreated) onCreated();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal show">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h3>Create New Quest</h3>
        <p>Add a new task to your daily LIFEHUB journey.</p>

        {error && (
          <div style={{ padding: '8px 12px', background: '#FEE2E2', color: '#DC2626', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '12px' }}>
            {error}
          </div>
        )}

        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Quest title"
        />

        <div className="quest-form-grid">
          <div className="quest-form-field">
            <label>Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>

          <div className="quest-form-field">
            <label>Priority</label>
            <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="quest-form-field">
            <label>Due Date</label>
            <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          </div>
        </div>

        <button className="primary-btn full-btn" onClick={submit} disabled={saving}>
          {saving ? 'Saving...' : 'Add Quest'}
        </button>
      </div>
    </div>
  );
}