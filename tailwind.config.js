/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,html}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2D9C6C",
        secondary: {
          100: "#F5FAF8",
        },
      }
    },
  },
}
