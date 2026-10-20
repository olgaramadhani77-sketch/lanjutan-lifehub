import React, { useState } from 'react';
import Link from './Link.jsx';

const LINKS = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/privacy', 'Privacy'],
  ['/terms', 'Terms'],
];

// Dulu namanya "LandingNavbar" di common.jsx -- nama export dipertahankan.
// Sekarang full Tailwind + hamburger buat mobile.
export default function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-white/70 px-6 py-5 backdrop-blur-md sm:px-20">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-lh-navy">LIFEHUB</span>

        <div className="hidden items-center gap-10 md:flex">
          {LINKS.map(([to, label]) => (
            <Link key={to} to={to} className="font-medium text-black transition-opacity hover:opacity-60">
              {label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-lh-border text-lh-navy md:hidden"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="mt-4 flex flex-col gap-1 rounded-2xl border border-lh-border bg-white/95 p-3 shadow-lh md:hidden">
          {LINKS.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              onClickCapture={() => setOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-black hover:bg-lh-mint"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
