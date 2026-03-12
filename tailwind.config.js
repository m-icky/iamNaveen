/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        accent: '#E8FF00',
        'accent-alt': '#FF3CAC',
        dark: '#0A0A0A',
        light: '#F5F0E8',
      },
    },
  },
  plugins: [],
}
