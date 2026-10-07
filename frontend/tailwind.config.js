/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        court: {
          black: '#0D0D0D',
          dark: '#121212',
          line: '#232323',
        },
        primary: {
          DEFAULT: '#E53E3E',
          hover: '#C53030',
        },
        gold: {
          DEFAULT: '#ECC94B',
          hover: '#D4B53F',
        },
      },
      fontFamily: {
        // Inter: tipografía de lectura (nav, párrafos, botones).
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // Anton: tipografía "de camiseta deportiva" para titulares y números.
        display: ['Anton', 'Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
