/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        coal: '#0b0b0d',
        graphite: '#151518',
        bone: '#ece9e2',
        mist: '#9a9aa3',
        violet: { DEFAULT: '#7a3ff0', soft: '#a78bfa' },
        volt: '#2b8cff',
        ice: '#22d3ee',
        gold: '#c8902e',
        naija: '#0b7a41',
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'Haettenschweiler', 'sans-serif'],
        sans: ['Archivo', 'system-ui', 'sans-serif'],
        gothic: ['UnifrakturCook', 'serif'],
      },
      transitionTimingFunction: { expo: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  },
  plugins: [],
}
