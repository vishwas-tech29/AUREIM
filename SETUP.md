# AUREIM Setup & Deployment Guide

## 🚀 Installation

### Prerequisites
- Node.js 16+ and npm

### Step 1: Install Dependencies
```bash
cd d:\AUREIM
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The application will automatically open at `http://localhost:3000`

## 🎨 Development Workflow

### Add Custom Fonts
Update `index.html` font imports:
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet" />
```

### Customize Colors
Edit `tailwind.config.js` color theme:
```javascript
colors: {
  cocoa: {
    primary: '#3E2723',  // Deep cocoa
    secondary: '#5D4037', // Roasted brown
  },
  gold: '#B8956A',
  cream: {
    primary: '#F5F1ED',   // Warm off-white
    blush: '#F9F5F1',     // Soft blush
  },
  text: {
    primary: '#2C1810',   // Dark chocolate
    secondary: '#6D5D52', // Warm gray
  },
}
```

### Add Payment Keys
Update `src/components/CheckoutModal.jsx`:

**For Razorpay (India)**:
```javascript
const RazorpayOptions = {
  key: "YOUR_RAZORPAY_KEY_ID",
  amount: 129900, // Amount in paise (₹1,299)
  currency: "INR",
  name: "AUREIM",
  description: "80% Dark Chocolate - 100% Organic",
  image: "/logo.png",
  theme: { color: "#3E2723" }
}
```

**For Stripe (International)**:
```javascript
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY");
```

## 📦 Production Build

### Build for Production
```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

### Preview Production Build
```bash
npm run preview
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir dist
```

### Option 3: Traditional Hosting
1. Run `npm run build`
2. Upload `dist/` folder to your web server
3. Configure server to serve `index.html` for all routes

## 📊 Performance Checklist

- [ ] Lighthouse Score: 90+ (Performance, Accessibility, SEO, Best Practices)
- [ ] Fonts are preloaded and optimized
- [ ] Images are WebP format with lazy loading
- [ ] Critical CSS is inlined
- [ ] Non-critical JS is deferred
- [ ] Animations use GPU acceleration (transform, opacity only)

### Check Lighthouse Score
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Click "Analyze page load"

## 🔐 Environment Variables

Create a `.env.local` file:
```
VITE_RAZORPAY_KEY=your_razorpay_key_id
VITE_STRIPE_KEY=your_stripe_publishable_key
VITE_SITE_URL=https://yoursite.com
```

Access in components:
```javascript
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY
```

## 🧪 Testing Checklist

### Desktop Testing
- [ ] Chrome (Windows)
- [ ] Firefox (Windows)
- [ ] Safari (Mac)
- [ ] Edge (Windows)

### Mobile Testing
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] iPad landscape/portrait
- [ ] Responsive design at 320px, 768px, 1024px, 1440px

### Feature Testing
- [ ] Navigation hamburger menu (mobile)
- [ ] Scroll animations trigger properly
- [ ] Parallax effect on hero image
- [ ] Product carousel image swaps
- [ ] Add to cart updates cart count
- [ ] Checkout modal opens/closes
- [ ] Form validation works
- [ ] Payment method selection
- [ ] Success animation displays
- [ ] Newsletter form submits

### Performance Testing
- [ ] Page loads in < 3 seconds
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] No console errors or warnings

## 🎯 SEO & Meta Tags

Update in `index.html`:
```html
<meta name="description" content="AUREIM - The Hermès of dark chocolate. 80% Cocoa, Zero Sugar, 100% Organic. Luxury chocolate redefined." />
<meta name="keywords" content="luxury chocolate, dark chocolate, artisanal, organic, monk fruit" />
<meta property="og:title" content="AUREIM - Chocolate Redefined" />
<meta property="og:description" content="Experience luxury indulgence with AUREIM." />
<meta property="og:image" content="/og-image.png" />
```

## 📧 Newsletter Integration

To connect to email service (Mailchimp, ConvertKit):
```javascript
// In Footer.jsx
const handleNewsletterSubmit = async (email) => {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email })
  })
}
```

## 💬 Analytics Setup

Add Google Analytics to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## 🆘 Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- --port 3001
```

### Tailwind classes not applying
- Clear cache: `rm -rf .next node_modules`
- Reinstall: `npm install`
- Rebuild: `npm run dev`

### Fonts not loading
- Check Google Fonts CDN status
- Verify `index.html` link tags
- Check network tab in DevTools

### Animations not smooth
- Check GPU acceleration in DevTools Performance tab
- Only use `transform` and `opacity` for animations
- Avoid animating `width`, `height`, `top`, `left`

---

## 📞 Support Resources

- **Vite Docs**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion
- **React**: https://react.dev
- **Razorpay**: https://razorpay.com/docs
- **Stripe**: https://stripe.com/docs

**Made in India. Designed for the world.**
