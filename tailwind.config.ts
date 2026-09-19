import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        inika: ["var(--font-inika)", "serif"],
      },
      colors: {
        mainGreen: "#8DA55B",
        bgGreen: "#2c3531",
        beige: "#F5E6D3",
      },
      transitionTimingFunction: {
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
