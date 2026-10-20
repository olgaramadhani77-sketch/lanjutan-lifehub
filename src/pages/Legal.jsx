import React from 'react';
import { usePageStyles } from '../utils/hooks.js';
import { LandingNavbar, Link } from '../components/index.js';

const content = {
  about: [
    'About LIFEHUB',
    'LIFEHUB is a web client development project designed to combine personal productivity, life management, gamification, and eco-friendly daily actions.',
    'The platform helps users manage quests, build habits, stay focused with Pomodoro sessions, earn rewards, and complete small sustainability side missions.',
  ],
  privacy: [
    'Privacy Policy',
    'LIFEHUB uses browser localStorage to save your quests, habits, character, coins, XP, eco points, and profile preferences.',
    'This demo does not send your data to an external server. Reset Demo will clear stored LIFEHUB data from your browser.',
  ],
  terms: [
    'Terms of Use',
    'LIFEHUB is an academic web client development project. It is designed for learning, presentation, and prototype demonstration.',
    'By using the demo, you understand that progress data is stored locally in the browser and can be reset anytime.',
  ],
};

export default function Legal({ type = 'about' }) {
  usePageStyles(['/css/global.css', '/css/navbar.css', '/css/legal.css']);

  const c = content[type] || content.about;

  return (
    <>
      <LandingNavbar />
      <main className="legal-page">
        <section className="legal-container">
          <p className="eyebrow">LIFEHUB</p>
          <h1>{c[0]}</h1>
          {c.slice(1).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="hero-actions">
            <Link to="/" className="primary-btn">
              Back Home
            </Link>
            <Link to="/onboarding" className="secondary-btn">
              Enter LIFEHUB
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
