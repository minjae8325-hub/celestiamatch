import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep mystical purples
        night: {
          950: '#08051a',
          900: '#0f0823',
          800: '#170d35',
          700: '#201248',
          600: '#2d1a66',
        },
        // Accent gold
        gold: {
          400: '#f5d87a',
          500: '#e6c35a',
          600: '#caa23f',
          700: '#a6822a',
        },
        // Soft starlight / mist
        mist: {
          100: '#f4efff',
          200: '#e4dbff',
          300: '#c8b9ee',
          400: '#9b87c9',
          500: '#6c5a9c',
        },
        // Rose / ember for love accents
        ember: {
          400: '#ffa5b8',
          500: '#ff6f8d',
          600: '#d94a6b',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(245, 216, 122, 0.55)',
        mystic: '0 25px 80px -20px rgba(109, 80, 200, 0.55)',
      },
      backgroundImage: {
        'gradient-mystic':
          'radial-gradient(ellipse at top, #2d1a66 0%, #170d35 40%, #08051a 100%)',
        'gradient-gold':
          'linear-gradient(135deg, #f5d87a 0%, #caa23f 50%, #a6822a 100%)',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        twinkle: 'twinkle 3s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
