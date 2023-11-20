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
        "rotation": {
          '0%': {transform: 'rotate(0deg)'},
          '33%': {transform: 'rotate(10deg)'},
          '66%': {transform: 'rotate(20deg)'},
          '100%': {transform: 'rotate(30deg)'}
        },
        "top": {
          "0%": {transform: 'skewY(-45deg) translateY(100%)'},
          "12.5%": {transform: 'skewY(-45deg) translateY(0%)'},
          "25%": {transform: 'skewY(-45deg) translateY(0%)'},
          "37.5%": {transform: 'skewY(-45deg) translateY(0%)'},
          "50%": {transform: 'skewY(-45deg) translateY(0%)'},
          "62.5%": {transform: 'skewY(-45deg) translateY(-100%)'},
          "75%": {transform: 'skewY(-45deg) translateY(-100%)'},
          "87.5%": {transform: 'skewY(-45deg) translateY(-100%)'},
          "100%": {transform: 'skewY(-45deg) translateY(-100%)'},
        },
        "bottom": {
          "0%": {transform: 'skewY(-45deg) translateY(-100%)'},
          "12.5%": {transform: 'skewY(-45deg) translateY(-100%)'},
          "25%": {transform: 'skewY(-45deg) translateY(-100%)'},
          "37.5%": {transform: 'skewY(-45deg) translateY(0%)'},
          "50%": {transform: 'skewY(-45deg) translateY(0%)'},
          "62.5%": {transform: 'skewY(-45deg) translateY(0%)'},
          "75%": {transform: 'skewY(-45deg) translateY(0%)'},
          "87.5%": {transform: 'skewY(-45deg) translateY(+100%)'},
          "100%": {transform: 'skewY(-45deg) translateY(+100%)'},
        },
        "left": {
          "0%": {transform: 'skewX(-45deg) translateX(100%)'},
          "12.5%": {transform: 'skewX(-45deg) translateX(100%)'},
          "25%": {transform: 'skewX(-45deg) translateX(100%)'},
          "37.5%": {transform: 'skewX(-45deg) translateX(100%)'},
          "50%": {transform: 'skewX(-45deg) translateX(0%)'},
          "62.5%": {transform: 'skewX(-45deg) translateX(0%)'},
          "75%": {transform: 'skewX(-45deg) translateX(0%)'},
          "87.5%": {transform: 'skewX(-45deg) translateX(0%)'},
          "100%": {transform: 'skewX(-45deg) translateX(-100%)'},
        },
        "right": {
          "0%": {transform: 'skewX(-45deg) translateX(-100%)'},
          "12.5%": {transform: 'skewX(-45deg) translateX(-100%)'},
          "25%": {transform: 'skewX(-45deg) translateX(0%)'},
          "37.5%": {transform: 'skewX(-45deg) translateX(0%)'},
          "50%": {transform: 'skewX(-45deg) translateX(0%)'},
          "62.5%": {transform: 'skewX(-45deg) translateX(0%)'},
          "75%": {transform: 'skewX(-45deg) translateX(100%)'},
          "87.5%": {transform: 'skewX(-45deg) translateX(100%)'},
          "100%": {transform: 'skewX(-45deg) translateX(100%)'},
        },
        "breathe": {
          "0%": {transform: 'scale(1)', filter: 'drop-shadow(0px 0px 5px #f76502)', opacity: '0.35'},
          "50%": {transform: 'scale(1.3)', filter: 'drop-shadow(0px 0px 20px #f76502)', opacity: '1'},
          "100%": {transform: 'scale(1)', filter: 'drop-shadow(0px 0px 5px #f76502)', opacity: '0.35'},
        }
      },
      transitionTimingFunction: {
        rotationTick: "cubic-bezier(0.80, 0, 0.2, 1)"
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "arrow-down": "arrow-down 1.5s linear infinite",
        "arrow-up": "arrow-up 1.5s linear infinite",
        "rotation": "rotation 3s infinite",
        "top": "top 4s infinite ease-in-out",
        "bottom": "bottom 4s infinite ease-in-out",
        "left": "left 4s infinite ease-in-out",
        "right": "right 4s infinite ease-in-out",
        "breathe": "breathe 3s infinite linear",
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
        sans: ['var(--font-oskari)', 'Arial','ui-sans-serif','system-ui','-apple-system','BlinkMacSystemFont','Segoe UI','Roboto','Helvetica Neue','Arial','Noto Sans','sans-serif','Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'],
        boris: 'var(--font-boris)',
        rhomdon: 'var(--font-rhomdon)',
        // porpora: 'var(--font-porpora)',
        // oskari: 'var(--font-oskari)',
      },
      screens: {
        'short': { 'raw': '(max-height: 500px)' }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}