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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        'primary-50': '#292f52',
        'primary-100': '#080b1e',
        'primary-transparent-50': 'rgba(8,11,30, 0.5)',
        'secondary-100': '#df8b2b',
        'secondary-200': '#f76502'
      },
      fontFamily: {
        hindi: 'Samarkan',
        tourney: ['Tourney', 'cursive'],
        sans: ['Baloo', 'Arial'],
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}