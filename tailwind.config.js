/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        // "gradient-conic":
        //   "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        button: "inset 0px 0px 0px 1px #cbd5e1",
      },
    },
    colors: {
      terra: {
        100: "#f3ded7",
        200: "#e8beaf",
        300: "#dd9e87",
        400: "#d27e5f",
        500: "#c75e37",
        600: "#9f4b2c",
        700: "#773821",
        800: "#4f2516",
        900: "#27120b",
      },
      slate: {
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
      // slate: {
      //   100: "#e7efee",
      //   200: "#cfdfdd",
      //   300: "#b7cfcd",
      //   400: "#a0c0bd",
      //   500: "#89b0ad",
      //   600: "#71a19d",
      //   700: "#5e8481",
      //   800: "#4b6866",
      //   900: "#394e4c",
      // },
    },
  },
  plugins: [],
};
