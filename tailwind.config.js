module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      mono: ['Roboto Mono', 'monospace']
    },
    extend: {
      colors: {
        error: '#f44336',
        primary: '#3f51b5',
      },
    },
  },
  plugins: [],
}
