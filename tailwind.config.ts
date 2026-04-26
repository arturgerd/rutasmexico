import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: "#fef6f0",
          100: "#fde9d8",
          200: "#fad0b0",
          300: "#f5ad7d",
          400: "#ef8248",
          500: "#e96424",
          600: "#da4b1a",
          700: "#b53717",
          800: "#902e1a",
          900: "#742918",
        },
        azul: {
          50: "#eff5ff",
          100: "#dbe8fe",
          200: "#bfd4fe",
          300: "#93b5fd",
          400: "#6090fa",
          500: "#3b6cf5",
          600: "#254bea",
          700: "#1d3ad7",
          800: "#1e30ae",
          900: "#1e2d89",
        },
        oro: {
          50: "#fffce8",
          100: "#fff9c2",
          200: "#ffef88",
          300: "#ffe044",
          400: "#ffcc11",
          500: "#f0b404",
          600: "#cc8a01",
          700: "#a36204",
          800: "#864d0c",
          900: "#723f10",
        },
        arena: {
          50: "#faf8f5",
          100: "#f3efe8",
          200: "#e6ddd0",
          300: "#d5c6b0",
          400: "#c2a98e",
          500: "#b39475",
          600: "#a68068",
          700: "#8b6857",
          800: "#72564a",
          900: "#5e4840",
        },
        // Full jade scale — earlier sprints used jade-50..900 across the codebase
        // (Mundial pill, jade tinted cards, focus rings) but only 500/600 were defined,
        // so any class outside that range silently produced no CSS and rendered as
        // transparent (e.g. the "Mundial 2026" header pill turning invisible-on-white).
        jade: {
          50: "#e6f7f0",
          100: "#c2ebd9",
          200: "#9bdec0",
          300: "#6cd0a3",
          400: "#39bf85",
          500: "#0d9668",
          600: "#087f57",
          700: "#066948",
          800: "#04553a",
          900: "#03442e",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Outfit", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
