import React from 'react';
import { getCharacter } from '../utils/core.js';

export default function Avatar({ size = 'large', character }) {
  const c = character || getCharacter();

  return (
    <div
      className={`lifehub-avatar lifehub-avatar-${size}`}
      data-skin={c.skin}
      data-hair={c.hair}
      data-outfit={c.outfit}
      data-equipment={c.equipment}
      data-accessory={c.accessory}
    >
      <span className="avatar-glow"></span>
      <span className="avatar-symbol avatar-symbol-left">✨</span>
      <span className="avatar-symbol avatar-symbol-right">🌱</span>

      <div className="avatar-person">
        <div className="avatar-hair"></div>
        <div className="avatar-head">
          <span></span>
        </div>
        <div className="avatar-neck"></div>
        <div className="avatar-body"></div>
        <div className="avatar-arm left"></div>
        <div className="avatar-arm right"></div>
        <div className="avatar-leg left"></div>
        <div className="avatar-leg right"></div>
        <div className="avatar-equipment"></div>
        <div className="avatar-accessory"></div>
      </div>
    </div>
  );
}
