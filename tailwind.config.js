const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      'primary': '#0D1217',
      'light': '#EEEEEE',
      'dull': '#A3A3A3'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
