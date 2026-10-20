import React, { useEffect, useState } from 'react';
import { getNotifications, clearNotifications } from '../utils/core.js';

export default function NotificationModal({ open, onClose }) {
  const [items, setItems] = useState(() => getNotifications());

  useEffect(() => {
    const sync = () => setItems(getNotifications());
    window.addEventListener('lifehub:data', sync);
    return () => window.removeEventListener('lifehub:data', sync);
  }, []);

  if (!open) return null;

  const handleClear = () => {
    clearNotifications();
    setItems([]);
  };

  return (
    <div className="notification-modal show">
      <div className="notification-box">
        <div className="notification-header">
          <div>
            <p className="panel-label">Activity</p>
            <h3>Notification Center</h3>
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="notification-list">
          {items.length ? (
            items.map((n, i) => (
              <div className="notification-item" key={i}>
                <h4>{n.message}</h4>
                <p>{n.time || n.createdAt}</p>
              </div>
            ))
          ) : (
            <div className="empty-notification">
              <h4>No notifications yet</h4>
              <p>Your LIFEHUB activity will appear here.</p>
            </div>
          )}
        </div>

        <button className="secondary-btn full-btn" onClick={handleClear}>
          Clear Notifications
        </button>
      </div>
    </div>
  );
}
