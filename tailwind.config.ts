import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080D18",
        surface: "#111B2E",
        "surface-elevated": "#192640",
        primary: "#65E6DF",
        secondary: "#FF8BB7",
        accent: "#FFD477",
        "text-primary": "#F0F5FF",
        "text-secondary": "#A7B8D4",
        border: "#263754",
      },
      fontFamily: {
        sans: ["Inter", "Manrope", "sans-serif"],
        bangla: ["Noto Sans Bengali", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
