module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          950: '#0c0a09',
          900: '#1c1917',
          300: '#d6d3d1',
        },
        amber: {
          900: '#78350f',
          800: '#92400e',
          200: '#fde68a',
          100: '#fef3c7',
        },
        charcoal: '#0c0a09',
        'matte-brown': '#1c1917',
        cocoa: '#78350f',
        beige: '#d6d3d1',
        gold: '#fef3c7',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant', 'serif'],
        sans: ['Inter', 'Helvetica', 'SF Pro Display', 'sans-serif'],
      },
      fontSize: {
        'hero': ['96px', { lineHeight: '1.1', fontWeight: '400', letterSpacing: '0.02em' }],
        'hero-mobile': ['60px', { lineHeight: '1.1', fontWeight: '400', letterSpacing: '0.02em' }],
        'h1': ['72px', { lineHeight: '1.2', fontWeight: '400', letterSpacing: '0.02em' }],
        'h2': ['48px', { lineHeight: '1.3', fontWeight: '400', letterSpacing: '0.02em' }],
        'h3': ['32px', { lineHeight: '1.4', fontWeight: '400', letterSpacing: '0.02em' }],
        'body-lg': ['18px', { lineHeight: '1.7', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '0.05em' }],
      },
      spacing: {
        '120': '30rem',
        '160': '40rem',
        'section': '8rem',
        'section-lg': '12rem',
      },
      letterSpacing: {
        'luxury': '0.15em',
        'wide': '0.1em',
        'wider': '0.2em',
      },
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(12, 10, 9, 0.25)',
        'card': '0 10px 25px -5px rgba(12, 10, 9, 0.1)',
        'card-hover': '0 20px 40px -10px rgba(12, 10, 9, 0.15)',
      },
      backdropBlur: {
        'nav': '20px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
