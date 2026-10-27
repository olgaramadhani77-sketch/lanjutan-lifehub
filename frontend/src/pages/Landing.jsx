import React from 'react';
import { usePageStyles } from '../utils/hooks.js';
import { LandingNavbar, Link, PhoneFeature } from '../components/index.js';

export default function Landing() {
  usePageStyles(['/css/global.css', '/css/navbar.css', '/css/landing.css', '/css/animation.css', '/css/landing-visual.css']);

  return (
    <div className="font-sans min-h-screen">
      <LandingNavbar />

      {/* Section 1 */}
      <section id="home" className="visual-section feature-split bg-[#FFFFFF] text-center py-16 px-4">
        <div className="feature-text max-w-2xl mx-auto mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4 leading-tight">
            Every day begins
            <br />
            with a plan.
          </h1>
          <p className="text-lg md:text-xl text-gray-500">But not every plan becomes progress.</p>
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

      {/* Section 2 */}
      <section className="visual-section feature-split reverse bg-[#E0F2FE] text-gray-800 text-center py-16 px-4">
        <div className="feature-text max-w-2xl mx-auto mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Tasks pile up.</h1>
          <p className="text-lg md:text-xl text-gray-600">Deadlines, distractions, and unfinished goals.</p>
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

      {/* Section 3 */}
      <section className="visual-section feature-split bg-[#CFFAFE] text-center py-16 px-4">
        <div className="feature-text max-w-2xl mx-auto mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">Habits fade.</h1>
          <p className="text-lg md:text-xl text-gray-600">Good intentions often disappear without consistency.</p>
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

      {/* Section 4 */}
      <section className="visual-section feature-split reverse bg-[#CCFBF1] text-center py-16 px-4">
        <div className="feature-text max-w-2xl mx-auto mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">Focus disappears.</h1>
          <p className="text-lg md:text-xl text-gray-700">Time slips away when your attention keeps breaking apart.</p>
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

      {/* Section 5 - Earth */}
      <section className="bg-[#FAFAF9] text-center py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-7xl md:text-8xl fade-earth mb-6">🌎</div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-snug">
            And somewhere
            <br />
            along the way...
          </h1>
          <p className="text-lg md:text-xl text-gray-600">We forget the world around us.</p>
        </div>
      </section>

      {/* Section 6 - Question */}
      <section className="bg-[#0F172A] text-center text-white py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold leading-relaxed md:leading-snug">
            What if managing
            <br />
            your life could also
            <br />
            help heal the Earth?
          </h1>
        </div>
      </section>

      {/* Section 7 - Hero Footer */}
      <section className="bg-gradient-to-b from-emerald-500 to-blue-600 text-center text-white py-28 px-4">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-wide">LIFEHUB</h1>
          <p className="text-xl md:text-3xl font-medium mb-2">Track Your Life.</p>
          <p className="text-xl md:text-3xl font-medium mb-10">Heal Your Earth.</p>
          <div className="text-7xl md:text-8xl mb-10 fade-earth">🌱</div>
          <Link 
            to="/login" 
            className="inline-block bg-white text-emerald-800 px-8 py-4 rounded-full text-lg md:text-xl font-bold shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Enter LIFEHUB
          </Link>
        </div>
      </section>
    </div>
  );
}