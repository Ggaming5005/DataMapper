/**** Tailwind Config ****/
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0b0b",
        foreground: "#ffffff",
        muted: "#1a1a1a",
        card: "#101010",
        border: "#262626",
        accent: "#8b5cf6",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 0 0 1px rgba(255,255,255,0.04)",
      },
      animation: {
        grid: "grid 20s linear infinite",
      },
      keyframes: {
        grid: {
          "0%": { backgroundPosition: "0 0, 0 0" },
          "100%": { backgroundPosition: "100% 0, 0 100%" },
        },
      },
    },
  },
  plugins: [],
};
