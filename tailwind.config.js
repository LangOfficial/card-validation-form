/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "hsl(0, 100%, 66%)",
          500: "hsl(249, 99%, 64%)",
          700: "hsl(278, 94%, 30%)",
        },
        neutralC: {
          50: "hsl(0, 0%, 100%)",
          200: "hsl(270, 3%, 87%)",
          500: "hsl(279, 6%, 55%)",
          800: " hsl(278, 68%, 11%)",
        },
      },
      screens: {
        halfxl: "1440px",
      },
      fontFamily: {
        primary: "Space Grotesk",
      },
      gridTemplateColumns: {
        last: "1fr 1.1fr"
      },
    },
  },
  plugins: [],
};