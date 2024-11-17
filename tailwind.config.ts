import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      colors: {
        "orange-50": "#fff7ed",
        "orange-100": "#ffedd5",
        "orange-200": "#fed7aa",
        "orange-300": "#fdba74",
        "orange-400": "#fb923c",
        "orange-500": "#f97316", // Popular vibrant orange
        "orange-600": "#ea580c",
        "orange-700": "#c2410c",
        "orange-800": "#9a3412",
        "text-1": "#333333",
        "text-2": "#555555",
        "text-3": "#777777",
        "orange-900": "#7c2d12",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        clash: ["ClashDisplay-Regular", "sans-serif"],
        clashmd: ["ClashDisplay-Medium", "sans-serif"],
        clashsm: ["ClashDisplay-Semibold", "sans-serif"],
        clashreg: ["ClashDisplay-Regular", "sans-serif"],
        clashbold: ["ClashDisplay-Bold", "sans-serif"],
      },
      backgroundImage: {
        "custom-image": "url('/bg.jpg')", // Replace with your image path
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "slide-up": {
          "0%": {
            transform: "translateY(20%)",
            opacity: "0",
            borderTopLeftRadius: "100%",
          },
          "100%": {
            transform: "translateY(10px)",
            opacity: "1",
            borderTopLeftRadius: "8px",
          },
        },
        "modal-slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        "modal-slide-down": {
          "0%": { transform: "translateY(0px)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        rotateIn: {
          "100%": { transform: "rotate(360deg)", opacity: "1" },
        },
        slideIn: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "slide-up": "slide-up 0.15s ease-out forwards",
        "modal-slide-up": "modal-slide-up 0.5s forwards",
        "modal-slide-down": "modal-slide-down 0.3s ease-out forwards",
        rotateIn: "rotateIn 0.2s ease-in-out forwards",
        "slide-in": "slideIn 0.2s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
