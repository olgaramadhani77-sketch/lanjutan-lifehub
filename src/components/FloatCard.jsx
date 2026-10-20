import React from 'react';

/**
 * Kartu melayang kecil di dalam ".visual-stage" (dipakai di Quest, Habit,
 * Eco, Pomodoro, Profile, Achievement). Isinya beda-beda tiap halaman,
 * jadi cukup dibungkus lewat "children" — yang seragam cuma wrapper-nya.
 *
 * Contoh pemakaian:
 *   <FloatCard variant="one">
 *     <h4>Daily Routine</h4>
 *     <p>Drink water • Read • Stretch</p>
 *   </FloatCard>
 */
export default function FloatCard({ variant = 'one', children }) {
  return <div className={`float-card ${variant}`}>{children}</div>;
}
