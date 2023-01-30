/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      width: {
        120: "120px",
        navMediumWidth: "244px",
      },
      height: {},
      colors: {
        primaryBg: "rgb(255,255,255)",
        secondaryBg: "rgb(250,250,250)",
        separator: "rgb(219,219,219)",
        primaryText: "rgb(38,38,38)",
      },
    },
  },
  plugins: [],
};
