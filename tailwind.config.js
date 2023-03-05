/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2a466b",
          light: "#6a7e97",
          dark: "#1d314b",
        },
        secondary: {
          DEFAULT: "#abacae",
          light: "#f4f6f8",
          dark: "#78787a",
        },
        signal: {
          min: "#597936",
          mid: "#007c82",
          max: "#385887",
        },
        success: { DEFAULT: "#5eb234" },
        warning: { DEFAULT: "#e8a530" },
        danger: { DEFAULT: "#c91d1d" },
      },
    },
  },
  plugins: [],
};
