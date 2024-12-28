export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        customPurple: '#9a52ff',
        customPink : '#ff7477',
        dimWhite:" rgba(239, 239, 239, 0.75)",
        lightWhite: "rgba(255,255,255,0.17)"
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}