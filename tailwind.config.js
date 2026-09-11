/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', '"Bebas Neue"', 'sans-serif'],
        syne: ['"Syne"', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        accent: '#E8FF00',
        'accent-alt': '#FF3CAC',
        'accent-cyan': '#00E5FF',
        dark: '#0A0A0A',
        'dark-card': 'rgba(18, 18, 18, 0.75)',
        light: '#F5F0E8',
      },
      boxShadow: {
        'glow-accent': '0 0 40px rgba(232, 255, 0, 0.25)',
        'glow-alt': '0 0 40px rgba(255, 60, 172, 0.25)',
        'glow-cyan': '0 0 40px rgba(0, 229, 255, 0.25)',
      },
    },
  },
  plugins: [],
}
