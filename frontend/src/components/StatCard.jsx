import React from 'react';
import Icon from './Icon.jsx';

/**
 * Kartu statistik kecil dipakai di banyak halaman (Dashboard, Quest,
 * Habit, Eco, Pomodoro, Achievement, Profile). Kalau nanti mau ganti
 * tampilan semua stat-card di seluruh app, cukup edit di sini.
 *
 * Props:
 *  - label: teks kecil di atas (contoh: "Level", "Total Quest")
 *  - value: angka/teks besar di bawah label
 *  - icon:  opsional, nama icon dari Icon.jsx (dipakai di Dashboard)
 */
export default function StatCard({ label, value, icon }) {
  if (icon) {
    return (
      <div className="stat-card">
        <div>
          <p>{label}</p>
          <h3>{value}</h3>
        </div>
        <Icon name={icon} />
      </div>
    );
  }

  return (
    <div className="stat-card">
      <p>{label}</p>
      <h3>{value}</h3>
    </div>
  );
}
