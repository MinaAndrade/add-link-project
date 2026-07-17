/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          canvas: '#E4E6EC',
          card: '#F9F9FB',
          hover: '#D8DBE4',
          danger: '#F8EDEF',
        },
        border: {
          subtle: '#E4E6EC',
          input: '#CDCFD5',
        },
        content: {
          strong: '#1F2025',
          body: '#4D505C',
          muted: '#74798B',
        },
        brand: {
          DEFAULT: '#2C46B1',
          dark: '#2C4091',
          hover: '#2C4091',
        },
        danger: {
          DEFAULT: '#B12C4D',
          hover: '#92243F',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        brand: ['Quicksand', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      spacing: {
        card: '2rem',
        control: '3rem',
        'list-max': '17.5rem',
        'desktop-x': '14.1%',
      },
    },
  },
  plugins: [],
};
