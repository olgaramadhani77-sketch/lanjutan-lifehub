import React from 'react';

export default function OnboardingCharacter() {
  return (
    <div className="character-scene">
      <span className="floating-symbol one">✨</span>
      <span className="floating-symbol two">🌱</span>
      <span className="floating-symbol three">✓</span>

      <div className="character">
        <div className="char-hair"></div>
        <div className="char-head"></div>
        <div className="char-body"></div>
        <div className="char-arm left"></div>
        <div className="char-arm right"></div>
        <div className="char-leg left"></div>
        <div className="char-leg right"></div>
      </div>
    </div>
  );
}
