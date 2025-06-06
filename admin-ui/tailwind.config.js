/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      colors:{
        "blue-230":"#315370",
        "blue-120":"#eef5f6",
        "white-600": "#f8fafc",
        'gray-110':"#f0f0f0",
        "lightblue":"#023454",
        "darkblue":"#1e293b",
      },

      fontFamily: {
        sans: ['Roboto', 'sans-serif'], 
        plex: ['"IBM Plex Sans"', 'sans-serif'],
        chivo: ['"Chivo"', 'sans-serif'],
        serif4: ['"Source Serif 4"', 'serif'],
        'noto-sans': ['"Noto Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}