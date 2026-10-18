/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: { 950: '#0b1f17', 900: '#123026', 800: '#1a4033', 700: '#22553f', 600: '#2e6b50' },
        navy: { 950: '#0a1324', 900: '#101d36', 800: '#18284a', 700: '#22365f' },
        ivory: { 50: '#fdfaf1', 100: '#f8f2e1', 200: '#efe5c8', 300: '#e2d3a8' },
        brass: { 300: '#e6cf8f', 400: '#d4b467', 500: '#b8954a', 600: '#957637', 700: '#6f5626' },
        stamp: { 500: '#c0392b', 600: '#a52a1f', 700: '#7f1d15' },
      },
      boxShadow: {
        paper: '0 1px 0 rgba(255,255,255,0.6) inset, 0 18px 40px -12px rgba(0,0,0,0.6), 0 4px 10px rgba(0,0,0,0.25)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        plaque: ['"Oswald"', '"Arial Narrow"', 'sans-serif'],
        type: ['"Courier Prime"', '"Courier New"', 'monospace'],
        body: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
