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
        // Deep wine / boudoir reds
        night: {
          950: '#140208',
          900: '#1f0612',
          800: '#2d0a1f',
          700: '#4a0f33',
          600: '#6b1a4a',
        },
        // Accent gold
        gold: {
          400: '#f5d87a',
          500: '#e6c35a',
          600: '#caa23f',
          700: '#a6822a',
        },
        // Blush starlight / mist
        mist: {
          100: '#fff0f5',
          200: '#ffd9e3',
          300: '#f0b8cc',
          400: '#c98aa0',
          500: '#8c4e67',
        },
        // Hot rose / ember for love accents
        ember: {
          400: '#ffb0c3',
          500: '#ff5c82',
          600: '#e02858',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(245, 216, 122, 0.55)',
        mystic: '0 25px 80px -20px rgba(224, 40, 88, 0.5)',
      },
      backgroundImage: {
        'gradient-mystic':
          'radial-gradient(ellipse at top, #6b1a4a 0%, #2d0a1f 40%, #140208 100%)',
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
