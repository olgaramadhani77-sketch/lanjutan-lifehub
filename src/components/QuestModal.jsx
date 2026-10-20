import React, { useState } from 'react';
import { addTask } from '../utils/core.js';

const blankForm = { title: '', category: 'Personal', priority: 'Medium', dueDate: '' };

const CATEGORIES = ['Personal', 'Study', 'Frontend Development', 'Documentation', 'Design Research', 'Version Control', 'Eco Quest'];

export default function QuestModal({ open, onClose }) {
  const [form, setForm] = useState(blankForm);

  if (!open) return null;

  const submit = () => {
    if (!form.title.trim()) return;
    addTask(form);
    setForm(blankForm);
    onClose();
  };

  return (
    <div className="modal show">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h3>Create New Quest</h3>
        <p>Add a new task to your daily LIFEHUB journey.</p>

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

        <button className="primary-btn full-btn" onClick={submit}>
          Add Quest
        </button>
      </div>
    </div>
  );
}
