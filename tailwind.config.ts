/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "arrow-down": {
          "0%": {transform: 'translate(0%, -5px)'},
          "25%": {transform: 'translate(0%, 7px)'},
          "100%": {transform: 'translate(0%, -5px)'}
        },
        "arrow-up": {
          "0%": {transform: 'translate(0%, 5px)'},
          "25%": {transform: 'translate(0%, -7px)'},
          "100%": {transform: 'translate(0%, 5px)'}
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "arrow-down": "arrow-down 1.5s linear infinite",
        "arrow-up": "arrow-up 1.5s linear infinite",
      },
      colors: {
        'bg-gradient-50': 'rgba(48, 21, 75, 0.75)',
        'bg-gradient-100': 'rgba(48, 21, 75, 1)',
        'primary-50': 'rgba(41,47,82, 0.5)',
        'primary-100': '#080b1e',
        'primary-transparent-50': 'rgba(8,11,30, 0.15)',
        'secondary-100': '#df8b2b',
        'secondary-transparent-0.5': 'rgba(247, 101, 2, 0.5)',
        'secondary-200': '#f76502'
      },
      fontFamily: {
        hindi: 'var(--font-hindi)',
        tourney: ['var(--font-tourney)', 'cursive'],
        sans: ['var(--font-baloo)', 'Arial','ui-sans-serif','system-ui','-apple-system','BlinkMacSystemFont','Segoe UI','Roboto','Helvetica Neue','Arial','Noto Sans','sans-serif','Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'],
      },
      screens: {
        'short': { 'raw': '(max-height: 500px)' }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}