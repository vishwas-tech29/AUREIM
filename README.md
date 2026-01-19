# AUREIM - Luxury Chocolate E-Commerce Experience

A production-ready, luxury-grade digital experience portal for AUREIM — positioned at the intersection of haute confectionery, mindful indulgence, and wellness sophistication.

## 🏛️ Brand Architecture

**Archetype**: The Sage meets The Connoisseur  
**Positioning**: "The Hermès of dark chocolate"  
**Brand Statement**: Indulge Smart. Indulge Pure.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the experience portal.

## 📐 Project Structure

```
src/
├── components/
│   ├── Navigation.jsx       # Floating header with scroll animations
│   ├── Hero.jsx            # Hero section with parallax effects
│   ├── ValueProposition.jsx # Product highlights strip
│   ├── ProductDetails.jsx   # Image carousel & product info
│   ├── Philosophy.jsx       # Brand story section
│   ├── Testimonials.jsx     # Customer review carousel
│   ├── CheckoutModal.jsx    # Checkout form & payment
│   └── Footer.jsx          # Three-column footer
├── App.jsx                  # Main application
├── main.jsx                 # React entry point
└── index.css               # Global styles & animations
```

## 🎨 Design System

### Color Palette
- **Primary Cocoa**: #3E2723
- **Secondary Warm**: #5D4037
- **Accent Gold**: #B8956A
- **Cream**: #F5F1ED
- **Blush**: #F9F5F1

### Typography
- **Display**: Cormorant Garamond / Playfair Display
- **Body**: Inter / Outfit
- **Hierarchy**: H1 (72px) → H2 (48px) → H3 (32px) → Body (18px)

### Spacing
- **8px base unit** for micro-spacing
- **120-160px** vertical section gaps
- **Golden ratio** (1.618) for layout proportions

## ✨ Key Features

✅ **Floating Navigation** - Scroll-aware header with blur effect  
✅ **Hero Section** - Parallax product image with staggered animations  
✅ **Product Carousel** - Image zoom and swap animations  
✅ **Philosophy Cards** - Scroll-triggered stagger animations  
✅ **Review Carousel** - Auto-rotating testimonials (8s interval)  
✅ **Checkout Modal** - Form validation and success state  
✅ **Responsive Design** - Mobile-first approach with 4 breakpoints  
✅ **Micro-interactions** - Hover states, scale effects, glow pulses  

## 💳 Payment Integration

### Test Mode Configuration

**Razorpay** (India):
```javascript
// Configured for INR (₹1,299)
// Key: Replace with your test key
// Currency: INR
```

**Stripe** (International):
```javascript
// Configured for multi-currency
// Test mode enabled
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Wide**: > 1440px

## ⚡ Performance Optimizations

- GPU-accelerated animations (transform, opacity only)
- Lazy loading for images
- Critical CSS inlined
- Tailwind CSS purging for production
- Lighthouse target: 90+ score

## 🎬 Animation Library

### Scroll Animations
- **Fade Up**: opacity 0→1 + translateY(40px)→0 (0.8s ease-out)
- **Parallax**: Hero image @ 0.5x scroll speed
- **Stagger**: Children with 0.15s delay

### Micro-interactions
- **Button Hover**: Scale 1.02 + shadow increase + glow pulse
- **Card Hover**: Lift (translateY -8px) + shadow + gold border
- **Image Zoom**: Scale 1.05 on hover (0.6s ease-out)

## 🔧 Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Razorpay & Stripe** - Payment gateways

## 📦 Build & Deploy

```bash
npm run build      # Production build
npm run preview    # Preview production build
```

Output: `dist/` directory ready for deployment

## ✅ Quality Gates

This experience passes "The Luxury Test":
- ✓ Would sit next to Aesop, Byredo, Le Labo
- ✓ Feels quiet, not trying too hard
- ✓ Screenshot-worthy design inspiration
- ✓ White space breathes confidence
- ✓ Every word is essential

---

**Made in India. Designed for the world.**  
© 2025 AUREIM. All rights reserved.
