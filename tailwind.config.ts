import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        "premium-gray": "#777D85",
        "premium-border": "##707070",
        "premium-soft-white": "#F9F9F9",
        "premium-white": "#F2F2F2",
        "premium-black": "#192537",
        "premium-gold": "#A18A66",
      },
      fontFamily: {
        "josefin-sans": "var(--font-josefin-sans)",
      },
    },
  },
  plugins: [],
};
export default config;
