/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}' /* src folder, for example */],
  theme: {
    extend: {
      colors: {
        'brown': '#3D3230',
        'green': '#07FF78',
      },
      backgroundImage: {
        'main': "url('/src/images/background.png')",
        'mobile': "url('/src/images/background-mobile.png')",
      },
    },
  },
  plugins: [],
}