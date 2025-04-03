/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        homeImg: "url('/assets/images/Hello_Photo.svg')",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

