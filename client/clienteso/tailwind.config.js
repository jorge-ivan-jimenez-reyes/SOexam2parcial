/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          DEFAULT: '#001f3f',
          light: '#003366',
          dark: '#00131a',
        },
      },
    },
  },
  plugins: [],
}
