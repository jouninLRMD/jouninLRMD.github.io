/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,mjs,svelte,ts,tsx,vue}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary:   "#0ea5e9",  // Sky 500
        secondary: "#0284c7",  // Sky 600
        accent:    "#8b5cf6",  // Violet 500
        darkBg:    "#0f172a",  // Slate 900
        darkCard:  "#1e293b",  // Slate 800
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
