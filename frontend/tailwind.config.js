/** @type {import('tailwindcss').Config}  */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1000px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    },
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900',
    },
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },
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
    'keppel': {
      '50': '#f1fcf9',
      '100': '#d1f6ed',
      '200': '#a3ecdc',
      '300': '#6ddbc6',
      '400': '#3fc2ad',
      '500': '#29b3a0',
      '600': '#1c8579',
      '700': '#1a6b62',
      '800': '#195650',
      '900': '#194843',
      '950': '#092a28',
  },
      
      },

      fontFamily: {
        'sans': ['Poppins',' sans-serif'],
        'Rubik': ['Rubik', 'sans-serif'],
        'Montserrat' : ['Montserrat' , 'sans-serif'],
        'Noto Color Emoji':['Noto Color Emoji', 'sans-serif'],
        'Danc': ['Dancing Script', 'cursive'],
        'Nan':['Nunito', 'cursive'],
        'NunitoSans':['Nunito Sans' , 'sans-serif'],

      },
      
    },
  }, 
  plugins: [],
}