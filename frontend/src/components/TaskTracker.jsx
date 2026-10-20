import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export const TaskTracker = () => {
  const { isGuest, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const GUEST_TASK_LIMIT = 3;

  const handleAddTask = (newTask) => {
    // Jika Mode Tamu & mencoba Tambah Task / Simpan Progress
    if (isGuest) {
      if (tasks.length >= GUEST_TASK_LIMIT) {
        alert("Batas Limit Tasks untuk Mode Tamu telah tercapai. Silakan Login / Register untuk menyimpan progress!");
        navigate('/login'); // Redirect ke Halaman Login / Register
        return;
      }
    }

    // Jika belum Auth & belum Guest (Akses Langsung)
    if (!isAuthenticated && !isGuest) {
      navigate('/login');
      return;
    }

    // Tambah task jika valid
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div>
      <h3>Preview Fitur / Tracker</h3>
      {isGuest && <p className="text-warning">Mode Tamu (Maksimal {GUEST_TASK_LIMIT} Task)</p>}
      
      <button onClick={() => handleAddTask({ id: Date.now(), title: 'Task Baru' })}>
        + Tambah Task / Simpan Progress
      </button>
    </div>
  );
};