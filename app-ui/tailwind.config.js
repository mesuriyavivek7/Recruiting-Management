/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors:{
        "blue-400":"#1b6ada",
        "blue-800":"#023454",
        "blue-600":"#1e293b",
        "blue-900":"#020B3B",
        "black-700":"#111827",
        "gray-400":"#6b7280",
        "gray-500":"#575757",
        "white-600":"#f8fafc",
        "orange-800":"#D95B01",
        "black-900":"#0c0500",
        "white-200":"#e2e8f0",
        "white-400":"#f1f5f9",
        "gray-800":"#475569",
        "purple-200":"#575757",
        "black-200":'#334155'
      }
    },
  },
  plugins: [],
}