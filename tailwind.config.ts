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
        background: "var(--bg)",
        foreground: "var(--text)",

        // Semantic tokens — prefer these over raw palette values so a
        // component reads correctly in both themes without conditionals.
        surface: {
          DEFAULT: "rgb(var(--surface))",
          solid: "var(--surface-solid)",
          subtle: "var(--bg-subtle)",
        },
        ink: {
          DEFAULT: "var(--text)",
          muted: "var(--text-muted)",
          subtle: "var(--text-subtle)",
        },
        brand: {
          DEFAULT: "var(--brand)",
          strong: "var(--brand-strong)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          alt: "var(--accent-2)",
        },
        hairline: "rgb(var(--border))",

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
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
        purple: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
        },
      },

      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        display: ['var(--font-space)', 'Space Grotesk', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },

      // Fluid type scale — one clamp per role replaces the
      // `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` chains and keeps
      // the ratio consistent at every viewport.
      fontSize: {
        'display-xl': ['clamp(2.25rem, 1.2rem + 4.6vw, 4.75rem)', { lineHeight: '1.04', letterSpacing: '-0.035em' }],
        'display':    ['clamp(1.95rem, 1.2rem + 3.2vw, 3.5rem)',  { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'title':      ['clamp(1.5rem, 1.15rem + 1.6vw, 2.25rem)', { lineHeight: '1.16', letterSpacing: '-0.02em' }],
        'subtitle':   ['clamp(1.125rem, 1rem + 0.6vw, 1.375rem)', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        'lead':       ['clamp(1rem, 0.95rem + 0.42vw, 1.1875rem)', { lineHeight: '1.65' }],
      },

      spacing: {
        section: 'clamp(3.5rem, 7vw, 7rem)',
      },

      borderRadius: {
        card: '1.125rem',
        pill: '999px',
      },

      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        glow: 'var(--glow)',
      },

      maxWidth: {
        prose: '68ch',
      },

      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slow-spin': 'slow-spin 60s linear infinite',
        'marquee': 'marquee 38s linear infinite',
        'shimmer': 'shimmer 2.4s ease-in-out infinite',
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
        marquee: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },

      transitionTimingFunction: {
        // Spring-ish ease-out for entrances (HIG-style fluid feel)
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
