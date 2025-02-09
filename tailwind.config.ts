import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      blue: colors.blue,
      red: colors.red,
      dg: "#231f20",
    },
    extend: {
      fontFamily: {
        "dg-main": "var(--font-jost)",
      },
      gridTemplateRows: {
        "10": "repeat(10, minmax(0, 1fr))",
      },
      gridTemplateColumns: {
        "14": "repeat(14, minmax(0, 1fr))",
        "15": "repeat(15, minmax(0, 1fr))",
      },
      screens: {
        'sm': '660px',
        'lg': '1000px',
      },
    },
  },
  plugins: [],
};
export default config;
