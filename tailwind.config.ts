import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        studio: {
          ink: "#071019",
          panel: "#101926",
          card: "#141f2e",
          line: "#27364b",
          cyan: "#46e7ff",
          violet: "#8b5cf6",
          pink: "#ff5fa2",
          gold: "#ffd166"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(70, 231, 255, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
