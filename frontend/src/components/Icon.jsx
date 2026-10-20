import React from 'react';

const ICONS = {
  'layout-dashboard': '▦',
  'check-square': '✓',
  repeat: '↻',
  timer: '⏱',
  leaf: '🌿',
  award: '🏆',
  search: '⌕',
  bell: '🔔',
  x: '×',
  sparkles: '✨',
  zap: '⚡',
  flame: '🔥',
  coins: '🪙',
};

export default function Icon({ name }) {
  return (
    <i className="lh-icon" aria-hidden="true">
      {ICONS[name] || name || '•'}
    </i>
  );
}
