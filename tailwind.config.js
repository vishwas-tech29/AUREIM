module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cocoa: {
          primary: '#3E2723',
          secondary: '#5D4037',
        },
        gold: '#B8956A',
        cream: {
          primary: '#F5F1ED',
          blush: '#F9F5F1',
        },
        text: {
          primary: '#2C1810',
          secondary: '#6D5D52',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      fontSize: {
        'hero': ['72px', { lineHeight: '1.1', fontWeight: '400' }],
        'h2': ['48px', { lineHeight: '1.2', fontWeight: '300' }],
        'h3': ['32px', { lineHeight: '1.3', fontWeight: '400' }],
        'body': ['18px', { lineHeight: '1.8', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '300', letterSpacing: '0.1em' }],
        'button': ['16px', { fontWeight: '500', letterSpacing: '0.05em' }],
      },
      spacing: {
        'section-gap': '140px',
      },
      letterSpacing: {
        'tight': '-0.02em',
        'wide': '0.1em',
        'wider': '0.15em',
        'widest': '0.3em',
      },
      boxShadow: {
        'luxury': '0 20px 40px rgba(62, 39, 35, 0.15)',
        'overlay': '0 8px 32px rgba(62, 39, 35, 0.08)',
      },
      backdropBlur: {
        'nav': '20px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(184, 149, 106, 0.7)',
          },
          '50%': {
            boxShadow: '0 0 0 10px rgba(184, 149, 106, 0)',
          },
        },
      },
    },
  },
  plugins: [],
}
