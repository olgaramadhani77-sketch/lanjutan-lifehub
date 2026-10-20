import React from 'react';
import { usePageStyles } from '../utils/hooks.js';
import { LandingNavbar, Link, PhoneFeature } from '../components/index.js';

export default function Landing() {
  usePageStyles(['/css/global.css', '/css/navbar.css', '/css/landing.css', '/css/animation.css', '/css/landing-visual.css']);

  return (
    <div className="font-sans">
      <LandingNavbar />

      <section id="home" className="visual-section feature-split bg-[#FFFFFF] text-center">
        <div className="feature-text">
          <h1 className="big-text text-black">
            Every day begins
            <br />
            with a plan.
          </h1>
          <p className="small-text text-gray-500">But not every plan becomes progress.</p>
        </div>
        <PhoneFeature
          title="Today Plan"
          badge="Morning"
          cards={[
            ['Design homepage', 'Priority task for today'],
            ['Daily Overview', '3 quests • 2 focus sessions • 1 eco mission'],
          ]}
          row={['Quest', 'Habit']}
        />
      </section>

      <section className="visual-section feature-split reverse bg-[#E0F2FE] text-gray text-center">
        <div className="feature-text">
          <h1 className="big-text">Tasks pile up.</h1>
          <p className="small-text">Deadlines, distractions, and unfinished goals.</p>
        </div>
        <PhoneFeature
          title="Quest Manager"
          badge="4 Active"
          cards={[
            ['Finalize UI Design', 'Frontend • High Priority'],
            ['Create Project Report', 'Documentation • Due tomorrow'],
            ['Push to GitHub', 'Version Control • Medium'],
          ]}
        />
      </section>

      <section className="visual-section feature-split bg-[#CFFAFE] text-center">
        <div className="feature-text">
          <h1 className="big-text text-black-900">Habits fade.</h1>
          <p className="small-text text-gray-600">Good intentions often disappear without consistency.</p>
        </div>
        <PhoneFeature
          title="Habit Tracker"
          badge="12 Streak"
          cards={[
            ['Drink 2L water', 'Completed today'],
            ['Read 20 pages', '7 day streak running'],
          ]}
          row={['Focus', 'Routine']}
        />
      </section>

      <section className="visual-section feature-split reverse bg-[#CCFBF1] text-center">
        <div className="feature-text">
          <h1 className="big-text text-black-900">Focus disappears.</h1>
          <p className="small-text text-gray-700">Time slips away when your attention keeps breaking apart.</p>
        </div>
        <PhoneFeature
          title="Pomodoro"
          badge="25:00"
          cards={[
            ['Deep Work Session', 'UI Revision • Session 1'],
            ['Focus Stats', '2 sessions completed today'],
          ]}
          row={['XP +40', 'Break 5m']}
        />
      </section>

      <section className="bg-[#FAFAF9] text-center">
        <div>
          <div className="text-8xl fade-earth mb-8">🌎</div>
          <h1 className="big-text text-gray-900">
            And somewhere
            <br />
            along the way...
          </h1>
          <p className="small-text text-gray-600">We forget the world around us.</p>
        </div>
      </section>

      <section className="bg-[#0F172A] text-center text-white">
        <div>
          <h1 className="big-text">
            What if managing
            <br />
            your life could also
            <br />
            help heal the Earth?
          </h1>
        </div>
      </section>

      <section className="bg-gradient-to-b from-emerald-500 to-blue-600 text-center text-white">
        <div>
          <h1 className="text-7xl font-bold mb-8">LIFEHUB</h1>
          <p className="text-2xl mb-4">Track Your Life.</p>
          <p className="text-2xl mb-12">Heal Your Earth.</p>
          <div className="text-8xl mb-12 fade-earth">🌱</div>
          <Link to="/onboarding" className="bg-white text-black px-10 py-5 rounded-full text-lg font-semibold glow-btn">
            Enter LIFEHUB
          </Link>
        </div>
      </section>
    </div>
  );
}
