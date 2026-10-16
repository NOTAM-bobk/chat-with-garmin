/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#fafafa',
          dark: '#0a0a0a',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#111111',
          hover: '#f5f5f5',
          'dark-hover': '#1a1a1a',
        },
        border: {
          DEFAULT: '#e5e5e5',
          dark: '#222222',
        },
        accent: {
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
        success: {
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          500: '#ef4444',
          600: '#dc2626',
        },
        muted: {
          DEFAULT: '#737373',
          dark: '#a3a3a3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        lg: '12px',
        xl: '16px',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
};
