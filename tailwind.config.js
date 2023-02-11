/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'system-ui'],
    },
    extend: {},
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
};
