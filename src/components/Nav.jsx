import React, { useState } from 'react';
import Icon from './Icon.jsx';
import Link from './Link.jsx';

const NAV_ITEMS = [
  ['dashboard', 'layout-dashboard', 'Dashboard', '/dashboard'],
  ['quest', 'check-square', 'Quest', '/quest'],
  ['habit', 'repeat', 'Habit', '/habit'],
  ['pomodoro', 'timer', 'Pomodoro', '/pomodoro'],
  // Menu Eco sudah dihapus
];

export default function Nav({ active }) {
  const [open, setOpen] = useState(false);

  const linkClass = (key) =>
    `flex items-center gap-2 rounded-pill px-[18px] py-3 text-sm font-extrabold transition-all duration-200 ${
      active === key
        ? 'bg-lh-navy text-white'
        : 'text-lh-muted hover:-translate-y-0.5 hover:bg-lh-mint hover:text-lh-navy'
    }`;

  const mobileLinkClass = (key) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-extrabold ${
      active === key
        ? 'bg-lh-navy text-white'
        : 'text-lh-muted hover:bg-lh-mint hover:text-lh-navy'
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-lh-border/40 bg-lh-bg/70 px-4 py-3 backdrop-blur-lg sm:px-8 sm:py-[18px]">
      <div className="mx-auto flex max-w-6xl items-center justify-center">

        {/* Desktop navbar */}
        <div className="hidden items-center gap-2 rounded-pill border border-lh-border bg-white/75 p-2 shadow-lh md:flex">
          {NAV_ITEMS.map(([key, icon, label, to]) => (
            <Link
              key={key}
              to={to}
              className={linkClass(key)}
            >
              <Icon name={icon} />
              <span>{label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile navbar */}
        <div className="flex w-full items-center justify-between md:hidden">
          <span className="text-lg font-extrabold text-lh-navy">
            LIFEHUB
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-lh-border bg-white/80 text-lh-navy shadow-lh"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="mx-auto mt-3 flex max-w-6xl flex-col gap-1 rounded-3xl border border-lh-border bg-white/95 p-3 shadow-lh md:hidden">
          {NAV_ITEMS.map(([key, icon, label, to]) => (
            <Link
              key={key}
              to={to}
              onClickCapture={() => setOpen(false)}
              className={mobileLinkClass(key)}
            >
              <Icon name={icon} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}