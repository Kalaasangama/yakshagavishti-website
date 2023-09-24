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
        'bg-gradient-50': 'rgba(48, 21, 75, 0.5)',
        'primary-50': 'rgba(41,47,82, 0.5)',
        'primary-100': '#080b1e',
        'primary-transparent-50': 'rgba(8,11,30, 0.75)',
        'secondary-100': '#df8b2b',
        'secondary-200': '#f76502'
      },
      fontFamily: {
        hindi: 'var(--font-hindi)',
        tourney: ['var(--font-tourney)', 'cursive'],
        sans: ['var(--font-baloo)', 'Arial'],
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}