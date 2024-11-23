// tailwind.config.ts
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
        white: "#fff",
        black: "#313131",
        yellow: "#fdd201",
        lightPurple: "#CBC3E3",
        // violet: "#CF9FFF",
        indigo: "#480082",
        rebecca: "#663399",
        stone1: "#1C1917",
        stone2: "#959595",
      },
      backgroundImage: {
        pageBg: "url('/images/bg.png')",
      },
    },
  },
  plugins: [],
};

export default config;
