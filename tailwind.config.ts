import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        flood: {
          dark: "#061a23",
          blue: "#0f6bff",
          danger: "#ef4444",
          warning: "#f59e0b",
          safe: "#16a34a"
        }
      },
      boxShadow: {
        soft: "0 20px 60px rgba(2, 12, 27, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
