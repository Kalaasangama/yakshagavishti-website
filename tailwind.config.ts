import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-100': '#0c1331',
        'primary-transparent-25': 'rgb(12, 28, 49, 0.5)',
        'secondary-100': '#f58b00'
      }
    },
  },
  plugins: [],
} satisfies Config;
