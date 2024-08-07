/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "blue-400":"#1b6ada",
        "blue-800":"#023454",
        "blue-900":"#020B3B",
        "black-700":"#111827",
        "gray-400":"#6b7280",
        "white-600":"#f8fafc",
        "orange-800":"#D95B01",
        "orange-900":"#0c0500"

      }
    },
  },
  plugins: [],
}