/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bodyBg : "#EEF0F2",
        primarytxt : "#141414",
        secondarytxt : "#011638",
        highlight : "#EEC643",
        accent : "#0D21A1",
      },
      fontFamily:{
        primaryfont : ["'Montserrat'", "serif"],
        secondaryfont : ["'Roboto'", "serif"]
      }
    },
  },
  plugins: [],
}

