/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/templates/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        misaTeal: '#2097A2',
        misaAlternateTeal: '#31ADAF',
        navbarBlack: '#282828',
      },
    },
    fontFamily: {
      abc: ['Montserrat', 'sans-serif'],
    },
  },
  plugins: [],
}
