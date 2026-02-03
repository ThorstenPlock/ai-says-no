/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // Light Mode
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F5F5F5',
        'bg-tertiary': 'rgba(0, 0, 0, 0.03)',
        'text-primary': '#000000',
        'text-secondary': '#666666',
        'text-tertiary': '#999999',
        'border-primary': '#E5E5E5',
        'border-secondary': '#CCCCCC',
        'accent': '#111111',
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
        'mono': ['SF Mono', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': '0.6875rem',    /* 11px */
        'sm': '0.8125rem',    /* 13px */
        'base': '0.9375rem',  /* 15px */
        'lg': '1rem',         /* 16px */
        'xl': '2rem',         /* 32px */
        '2xl': '6rem',        /* 96px */
      },
      spacing: {
        '1': '0.25rem',   /* 4px */
        '2': '0.5rem',    /* 8px */
        '3': '0.75rem',   /* 12px */
        '4': '1rem',      /* 16px */
        '5': '1.25rem',   /* 20px */
        '6': '1.5rem',    /* 24px */
        '8': '2rem',      /* 32px */
        '10': '2.5rem',   /* 40px */
        '12': '3rem',     /* 48px */
        '16': '4rem',     /* 64px */
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '300ms',
        'progress': '800ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}