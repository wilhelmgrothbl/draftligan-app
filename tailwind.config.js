/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // eller 'media' eller 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#1a202c',
        'secondary': '#718096',
      },
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif']
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
