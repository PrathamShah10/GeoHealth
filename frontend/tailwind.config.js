/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sea-green': {
          '50': '#f0f9f5',
          '100': '#dbf0e4',
          '200': '#bae0cc',
          '300': '#8cc9ae',
          '400': '#5cab8a',
          '500': '#3a8f6e',
          '600': '#2c795d',
          '700': '#215b47',
          '800': '#1c493a',
          '900': '#183c30',
          '950': '#0d211b',
      },
      'olive': {
        '50': '#fbffe4',
        '100': '#f5ffc4',
        '200': '#ebff90',
        '300': '#d9ff50',
        '400': '#c5fe1d',
        '500': '#a6e500',
        '600': '#80b800',
        '700': '#598000',
        '800': '#4d6d07',
        '900': '#415c0b',
        '950': '#213400',
    },
    
      
      },

      fontFamily: {
        custom: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}