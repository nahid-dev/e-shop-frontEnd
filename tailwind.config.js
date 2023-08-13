/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        white: "#ffffff", // Set the default background color to white
      },
    },
  },
  plugins: [require("daisyui")],
};
