/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        rose: {
          50: '#fff5f8',
          100: '#ffe4ec',
          200: '#ffc9d9',
          300: '#ffa3bf',
          400: '#ff7aa0',
          500: '#f85c87',
          600: '#e63d6e',
          700: '#c42a57',
          800: '#9e2045',
          900: '#7d1a38',
        },
        lavande: {
          50: '#f6f3ff',
          100: '#ece6ff',
          200: '#d9ccff',
          300: '#bda3ff',
          400: '#9d72ff',
          500: '#8252f5',
          600: '#6f3de0',
          700: '#5b2db8',
          800: '#482390',
          900: '#381c70',
        },
        ciel: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        or: {
          100: '#fff8e0',
          200: '#ffeab8',
          300: '#ffd97a',
          400: '#f5c344',
          500: '#e0a82e',
          600: '#b8861f',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 18s ease infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'breathe': 'breathe 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-18px) translateX(8px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        shimmer: {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
