/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#ffbc04",
          secondary: "#010D48",
        },

        primary: "#D4AF37",
        dark: "#111111",
      },

      fontFamily: {
        fa: ["IRaban", "sans-serif"],
        en: ["Inter", "ui-sans-serif", "system-ui"],
      },

      borderRadius: {
        card: "20px",
        section: "32px",
      },

      boxShadow: {
        premium: "0 15px 40px rgba(0,0,0,.12)",
      },
    },
  },

  plugins: [],
};