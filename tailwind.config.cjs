/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        link: '#7E22CE',
        actionbutton: '#22c55e'
      }
    },
  },
  plugins: [],
}
