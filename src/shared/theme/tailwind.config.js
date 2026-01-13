/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        "surface-light": "var(--surface-light)",
        "surface-dark": "var(--surface-dark)",
      },
      backgroundImage: {
        space: "url('/space-bg.jpg')",
      },
    },
  },
  plugins: [],
};
