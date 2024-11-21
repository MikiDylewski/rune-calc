/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2A343C",
        secondary: "#455561",
        contrast: "#05B2DC",
        textColor: "#FCFAF9",
        extra: "#830A48",
      },
      height: {
        calcContent: "calc(100% - 3.5rem)",
      },
    },
  },
  plugins: [],
};
