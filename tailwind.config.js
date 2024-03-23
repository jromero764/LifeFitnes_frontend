/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "public/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans3: ['Sans3', 'sans-serif'],
        restaurant: ['restaurant','sans']
      },
    },
  },
  plugins: [],
}

