/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        naruto: ["NinjaNaruto", "cursive", "sans-serif"],
        manga: ["MangaTemple", "Bangers", "cursive", "sans-serif"],
        deathnote: ["DeathNote", "cursive", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "Orbitron", "sans-serif"],
        rajdhani: ["var(--font-rajdhani)", "Rajdhani", "sans-serif"],
        russo: ["var(--font-russo)", "Russo One", "sans-serif"],
      },
    },
  },
  plugins: [],
};
