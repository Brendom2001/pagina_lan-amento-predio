/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0E0E0E',
        surface1: '#141414',
        surface2: '#1C1C1C',
        concrete: '#D4CFC8',
        steel: '#8A8A8A',
        accent: '#E85D04',
        'accent-hover': '#F48C06',
        warm: '#F2EFE9',
        secondary: '#6B6B6B',
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'cursive'],
        inter: ['Inter', 'sans-serif'],
        dm: ['"DM Sans"', 'sans-serif'],
      },
      letterSpacing: {
        'ultra': '0.4em',
        'wide-xl': '0.25em',
      },
    },
  },
  plugins: [],
}
