/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'google-blue': '#4285F4',
        'google-red': '#DB4437',
        'google-yellow': '#F4B400',
        'google-green': '#0F9D58',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        'body': { fontFamily: 'Roboto, Arial, sans-serif' },
      });
    },
  ],
};