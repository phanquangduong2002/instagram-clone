/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      width: {
        120: "120px",
      },
      height: {},
      colors: {
        primaryBg: "rgb(255,255,255)",
        highlightBg: "rgb(239,239,239)",
        secondaryBg: "rgb(250,250,250)",
        separator: "rgb(219,219,219)",
        focusSeparator: "rgb(148,148,148)",
        primaryText: "rgb(38,38,38)",
        secondaryText: "rgb(142,142,142)",
        primaryButton: "rgb(0,149,246)",
        primaryButtonHover: "rgb(24,119,242)",
        linkText: "rgb(0,55,107)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
