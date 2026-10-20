/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Diambil dari CSS variable di pages.css / gamification.css / dashboard.css
        // supaya warna tetap konsisten meskipun sudah pindah ke Tailwind.
        lh: {
          bg: '#F0FDFA',
          surface: '#FFFFFF',
          mint: '#CCFBF1',
          'mint-strong': '#99F6E4',
          teal: '#14B8A6',
          cyan: '#67E8F9',
          navy: '#0F172A',
          muted: '#475569',
          soft: '#ECFEFF',
          danger: '#EF4444',
          warning: '#FACC15',
          border: '#99F6E4',
        },
      },
      borderRadius: {
        pill: '999px',
      },
      boxShadow: {
        lh: '0 24px 70px rgba(15, 23, 42, 0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
