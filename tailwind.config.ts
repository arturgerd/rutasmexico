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
        jade: {
          500: "#0d9668",
          600: "#087f57",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
