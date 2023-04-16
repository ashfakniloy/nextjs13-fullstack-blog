/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        padding: 12,
        screens: {
          lg: "1200px",
          xl: "1200px",
          "2xl": "1200px",
        },
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        montserrat: ["var(--font-montserrat)"],
      },
      colors: {
        "custom-gray": "#1B1A1A",
        "custom-gray2": "#262525",
        "custom-gray3": "#3C3B3B",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("tailwind-scrollbar")],
};
