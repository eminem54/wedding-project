import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Muted olive green used for headings, highlights and buttons.
        sage: {
          50: "#f1f3ee",
          100: "#e2e7dc",
          200: "#c5cfbb",
          300: "#a2b193",
          400: "#7e906f",
          500: "#647758",
          600: "#53654a",
          700: "#45543d",
          800: "#384432",
          900: "#2b3427",
        },
        // Wax-seal burgundy on the cover.
        wine: {
          400: "#a8404a",
          500: "#8e2a34",
          600: "#76202a",
          700: "#5c1820",
        },
        paper: {
          DEFAULT: "#f5f3ef",
          dark: "#e8e5df",
        },
        ink: "#333230",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans)", "sans-serif"],
        serif: ["var(--font-noto-serif)", "serif"],
        script: ["var(--font-script)", "cursive"],
        garamond: ["var(--font-garamond)", "serif"],
        bodoni: ["var(--font-bodoni)", "serif"],
        gowun: ["var(--font-gowun)", "serif"],
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "cover-zoom": {
          from: { transform: "scale(1.08)" },
          to: { transform: "scale(1)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "edge-glow": {
          "0%": { opacity: "0" },
          "30%": { opacity: "1" },
          "65%": { opacity: "0.45" },
          "100%": { opacity: "1" },
        },
        // Sweeps the cover title's mask across its 400-unit viewBox plus the soft pen edge.
        "pen-reveal": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(460px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 1s ease-out both",
        "fade-in": "fade-in 0.8s ease-out both",
        "edge-glow": "edge-glow 3.4s ease-in-out both",
        "cover-zoom": "cover-zoom 4s ease-out both",
        "pen-reveal": "pen-reveal 1.9s cubic-bezier(0.45, 0.1, 0.55, 0.95) 0.3s both",
      },
    },
  },
  plugins: [],
};

export default config;
