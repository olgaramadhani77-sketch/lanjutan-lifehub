import React from 'react';
import { LIFEHUB_KEYS, resetLifehubData } from '../utils/core.js';

export default function ConfirmResetModal({ open, onClose }) {
  if (!open) return null;

  const confirmReset = () => {
    resetLifehubData();
    localStorage.removeItem(LIFEHUB_KEYS.promptSeen);
    onClose();
  };

  return (
    <div className="reset-modal show">
      <div className="reset-modal-box">
        <div className="reset-icon">⚠️</div>
        <h3>Reset LIFEHUB Progress?</h3>
        <p>This will remove all saved quests, XP, streaks, eco points, and achievements from this browser.</p>

        <div className="reset-actions">
          <button className="secondary-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="danger-btn" onClick={confirmReset}>
            Yes, Reset
          </button>
        </div>
      </div>
    </div>
  );
}
