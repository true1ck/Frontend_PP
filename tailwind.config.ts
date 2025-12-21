import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        purple: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slow-spin': 'slow-spin 60s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' },
          'to': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
        },
        'slow-spin': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
