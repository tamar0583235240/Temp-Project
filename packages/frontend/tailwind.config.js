const { colors } = require("./src/styles/colors.ts");
const { fontFamily, fontSize } = require("./src/styles/typography.ts");
const { spacing } = require("./src/styles/spacing.ts");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors,
      fontFamily,
      fontSize,
      boxShadow: {
        card: "0 4px 14px rgba(0, 0, 0, 0.1)",
        input: "0 1px 3px rgba(0, 0, 0, 0.08)",
  
      },
      transitionDuration: {
        DEFAULT: "250ms",
      },
      ...spacing,
    },
  },
  plugins: [],
};