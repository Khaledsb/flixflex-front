/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  media: false,
  theme: {
    extend: {},
  },
  plugins: [],
}

