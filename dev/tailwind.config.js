module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../src/**/*.{js,ts,jsx,tsx}',
    '../extensions/**/*.{js,ts,jsx,tsx}',
    '../extensions/shared/**/*.{js,ts,jsx,tsx}',
    '../node_modules/@peerme/web-ui/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: 'class',

  safelist: [{ pattern: /^bg-/ }, { pattern: /^text-/ }],

  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E6FFFA',
          200: '#B2F5EA',
          300: '#81E6D9',
          400: '#4FD1C5',
          500: '#38B2AC',
          600: '#319795',
          700: '#2C7A7B',
          800: '#285E61',
          900: '#234E52',
        },
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
      },
    },
    container: {
      center: true,
    },
  },

  variants: {
    extend: {},
  },

  plugins: [],
}
