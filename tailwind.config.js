/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cocoa: {
          50: '#FBF7F4',
          100: '#F5EAE4',
          200: '#EBD4C7',
          300: '#D7B49F',
          400: '#BE8C70',
          500: '#A46849',
          600: '#8A4E33',
          700: '#6C3923',
          800: '#4E2616',
          900: '#32160C',
          950: '#1F0C06',
        },
        gold: {
          300: '#F3E5AB',
          400: '#E6C875',
          500: '#D4AF37',
          600: '#B58E29',
          700: '#8A681B',
        },
        cream: {
          50: '#FFFEFA',
          100: '#FAF6ED',
          200: '#F3EAD6',
          300: '#E7D8B5',
        }
      },
      fontFamily: {
        heading: ['"Cinzel"', '"Playfair Display"', 'serif'],
        southing: ['"Alex Brush"', '"Pinyon Script"', 'cursive'],
        body: ['"Instrument Serif"', '"Plus Jakarta Sans"', 'serif'],
        barlow: ['Barlow', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'cocoa-depth': '0 20px 40px -15px rgba(31, 12, 6, 0.5)',
        'inner-gold': 'inset 0 1px 1px rgba(255, 223, 128, 0.4)',
      },
      backgroundImage: {
        'cocoa-radial': 'radial-gradient(circle at 50% 30%, #4E2616 0%, #291209 50%, #150703 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #B58E29 100%)',
        'cocoa-glass': 'linear-gradient(135deg, rgba(78, 38, 22, 0.4) 0%, rgba(31, 12, 6, 0.6) 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
