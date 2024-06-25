/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'red-57': '#FF5757'
      },
      fontFamily:{
        custom:['SuperCorn', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

