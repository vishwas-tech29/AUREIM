module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Dark Chocolate Palette
        'cocoa-dark': '#3B1F16',
        'cocoa-medium': '#4A2A1A',
        'chocolate-dark': '#1F0F0A',
        'chocolate-medium': '#2A1410',
        'caramel-gold': '#C8A15A',
        'caramel-light': '#D4AF6A',
        'cream-soft': '#F5EFE8',
        'cream-beige': '#EFE6DB',
        'text-charcoal': '#1A0F0B',
        'text-muted': '#4A3429',
        
        // Legacy colors for compatibility
        stone: {
          950: '#1F0F0A',
          900: '#2A1410',
          300: '#EFE6DB',
        },
        amber: {
          900: '#C8A15A',
          800: '#D4AF6A',
          200: '#F5EFE8',
          100: '#EFE6DB',
        },
        charcoal: '#2B1A15',
        'matte-brown': '#2A1410',
        cocoa: '#3B1F16',
        beige: '#F5EFE8',
        gold: '#D4AF6A',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
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
        'luxury': '0 25px 50px -12px rgba(31, 15, 10, 0.25)',
        'card': '0 10px 25px -5px rgba(31, 15, 10, 0.1)',
        'card-hover': '0 20px 40px -10px rgba(31, 15, 10, 0.15)',
      },
      backdropBlur: {
        'nav': '20px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
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
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
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
