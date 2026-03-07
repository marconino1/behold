import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#C8932A",
        "gold-light": "#F0C96A",
        "gold-pale": "#FDF3DC",
        sky: "#0EA5E9",
        "sky-mid": "#0369A1",
        "sky-deep": "#0C4A6E",
        "sky-pale": "#E0F2FE",
        "behold-text": "#2C2016",
        "behold-muted": "#8C7A62",
        "behold-bg": "#FAF7F2",
        "behold-stone": "#F2EDE4",
        "behold-surface": "#FDF9F3",
        "behold-green": "#5FAD6B",
        "behold-green-pale": "#DCFCE7",
        "behold-border": "#E8DDD0",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Nunito", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
        card: "16px",
      },
      boxShadow: {
        warm: "0 2px 12px rgba(60,40,10,0.08), 0 1px 4px rgba(60,40,10,0.04)",
        "warm-lg":
          "0 8px 32px rgba(60,40,10,0.12), 0 2px 8px rgba(60,40,10,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
