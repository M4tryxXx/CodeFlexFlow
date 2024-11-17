const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/home/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "animate-shimmer",
    "animate-spin",
    "animate-pulse",
    "animate-bounce",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        13: "repeat(13, minmax(0, 1fr))",
      },
      backgroundImage: {
        "hero-background": "url('/herobg.png')",
      },

      colors: {
        blue: {
          400: "#2589FE",
          500: "#0070F3",
          600: "#2F6FEB",
        },
      },
      animation: {
        "spin-slow": "spin 1.5s linear infinite",
        spin: "spin 1s linear infinite",
        "spin-slow-reverse": "spin 1.5s linear infinite reverse",
        shimmer: "shimmer 1s infinite",
        nul_spinner: "spin 0.01s linear infinite",
        "pulse-slow": "pulse 2s infinite",
        "bounce-slow": "bounce 2s infinite",
        "bounce-slow-reverse": "bounce 2s infinite reverse",
        "bounce-slow-alternate": "bounce 2s infinite alternate",
        "bounce-slow-alternate-reverse": "bounce 2s infinite alternate-reverse",
      },
    },
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
    },
  },
  variants: {
    extend: {
      animation: ["group-hover"],
    },
  },
  plugins: [],
};

export default config;
