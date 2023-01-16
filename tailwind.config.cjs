/** @type {import('tailwindcss').Config} */


const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#781f19',
        'secondary': '#224f4a',
        'secondary-hover': '#255c56',
        'off-white': '#f6f6f6'
      },
      fontFamily: {
        'sans': ['Roboto', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}
