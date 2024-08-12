/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'bordo': '#800000',
        'background':'#E7E7E7'
      },
    },
  },
  plugins: [],
}