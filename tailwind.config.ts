import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        blossom: {
          50: "#fdf6f4",
          100: "#fbe9e5",
          200: "#f6cfc6",
          300: "#eeab9b",
          400: "#e2816b",
          500: "#d1604a",
          600: "#b0492f",
          700: "#8f3b27",
          800: "#763326",
          900: "#642e24",
        },
        ink: "#3a332f",
      },
      fontFamily: {
        serif: ["var(--font-noto-serif)", "serif"],
        sans: ["var(--font-noto-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
