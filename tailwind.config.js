/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        silver: '#C0C0C0',
        matrix: {
          DEFAULT: '#C0A080',
          dark: '#1a4731'
        },
        emerald: {
          light: '#34d399',
          DEFAULT: '#10b981',
          dark: '#059669'
        },
        cyber: {
          black: '#101010',
          gray: '#1C1C1C',
          green: '#10b981',
          gold: '#C0A080',
          purple: '#9D00FF'
        },
        hatter: {
          purple: '#2D1E4F',
          blue: '#1B1E4E',
          teal: '#28B78D',
          pink: '#FFB6C1',
          gold: '#FFD700'
        },
        bat: {
          black: '#0A0A0A',
          red: '#DC2626',
          gray: '#1F1F1F'
        }
      },
      fontFamily: {
        detective: ['"Special Elite"', 'monospace'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        code: ['Consolas', 'Monaco', 'monospace'],
        crimson: ['"Crimson Text"', 'serif'],
        alice: ['Alice', 'serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 15px rgba(220,38,38,0.2)',
            borderColor: 'rgba(220,38,38,0.3)'
          },
          '50%': { 
            boxShadow: '0 0 25px rgba(220,38,38,0.4)',
            borderColor: 'rgba(220,38,38,0.5)'
          }
        }
      }
    }
  },
  plugins: []
};