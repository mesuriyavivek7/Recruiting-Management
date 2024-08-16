/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{"blue-230":"#315370","blue-120":"#eef5f6"},
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}