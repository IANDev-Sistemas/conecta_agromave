/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'principal': '#023A5D',
        'container':'#1B3265',
        'background':'#E7E7E7'
      },
    },
  },
  plugins: [],
}