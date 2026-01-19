# AUREIM - Quick Start Guide

## 🚀 Installation (2 minutes)

```bash
cd d:\AUREIM
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 📁 What's Included

✅ **Complete React application** with 8 sections  
✅ **Tailwind CSS** for pixel-perfect styling  
✅ **Framer Motion** for luxury animations  
✅ **Lucide React** icons  
✅ **Razorpay & Stripe** payment integration (test mode)  
✅ **Mobile-responsive** design  
✅ **Production-ready** code  

---

## 🎯 What You Get

### Pages & Sections
1. **Navigation** - Floating header with scroll effects
2. **Hero** - Full-screen intro with parallax
3. **Value Proposition** - Product highlights
4. **Product Details** - Image carousel + shopping
5. **Philosophy** - Brand story with animated cards
6. **Testimonials** - Customer review carousel
7. **Checkout** - Modal with form & payment
8. **Footer** - Three-column layout with newsletter

### Features
- Scroll-aware navigation
- Parallax product images
- Image carousel with thumbnails
- Quantity selector (1-10 units)
- Add to cart with toast notification
- Animated checkout modal
- Payment method selection
- Success animation
- Auto-rotating testimonials
- Newsletter signup
- Fully responsive (mobile, tablet, desktop)

---

## 🎨 Customization

### Change Product Price
In `src/components/CheckoutModal.jsx`:
```javascript
const price = 1299 * cartTotal // Change 1299 to your price
```

### Update Brand Colors
In `tailwind.config.js`:
```javascript
colors: {
  cocoa: {
    primary: '#3E2723',    // Main color
    secondary: '#5D4037',  // Secondary color
  },
  gold: '#B8956A',         // Accent color
  // ... more colors
}
```

### Add Payment Keys
In `src/components/CheckoutModal.jsx`:
```javascript
const razorpayKey = 'YOUR_RAZORPAY_KEY_ID'
const stripeKey = 'YOUR_STRIPE_PUBLISHABLE_KEY'
```

### Add Real Images
Replace placeholder images in:
- `src/components/Hero.jsx` (product image)
- `src/components/ProductDetails.jsx` (carousel images)

### Update Content
All text is in component files:
- `Navigation.jsx` - Menu items
- `Hero.jsx` - Hero copy
- `Philosophy.jsx` - Card content
- `Testimonials.jsx` - Customer quotes
- `Footer.jsx` - Footer links

---

## 📊 Key Files Explained

| File | Purpose |
|------|---------|
| `tailwind.config.js` | Brand colors, fonts, spacing |
| `src/index.css` | Global styles & animations |
| `src/App.jsx` | Main app structure |
| `src/components/` | Individual page sections |

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Outputs optimized code to `dist/` folder.

### Deploy to Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir dist
```

### Deploy to Traditional Hosting
1. Run `npm run build`
2. Upload `dist/` folder to your web server
3. Server should serve `index.html` for all routes

---

## ✅ Quality Checklist

Before launch:
- [ ] Product images are real (not placeholders)
- [ ] Payment keys are configured
- [ ] Contact email is updated
- [ ] Links in footer work
- [ ] Mobile responsive on all devices
- [ ] Tested on Chrome, Firefox, Safari, Edge

---

## 📚 Documentation

- **README.md** - Project overview
- **SETUP.md** - Detailed setup instructions
- **DESIGN_SYSTEM.md** - Brand guidelines
- **IMPLEMENTATION.md** - Technical deep dives

---

## 💡 Quick Tips

### Disable Cart Feature
Comment out in `src/App.jsx`:
```javascript
// <CheckoutModal isOpen={isCheckoutOpen} ... />
```

### Add More Products
Create new component `ProductCard.jsx` and import in `App.jsx`

### Change Colors Temporarily
Edit in browser DevTools (won't save):
```javascript
document.documentElement.style.setProperty('--primary-cocoa', '#fff')
```

### View Responsive Design
Press F12 → Toggle device toolbar → Select device

---

## 🆘 Troubleshooting

**Port 3000 in use?**
```bash
npm run dev -- --port 3001
```

**Styles not showing?**
```bash
# Clear cache and restart
rm -rf node_modules/.cache
npm run dev
```

**Need to restart server?**
```bash
Ctrl + C (stop dev server)
npm run dev (restart)
```

---

## 🎬 Animation Tips

All animations use `transform` and `opacity` for 60fps performance.

Edit animation speed in component files:
```javascript
transition={{ duration: 0.8 }} // Change 0.8 to desired seconds
```

---

## 📱 Mobile Testing

Test on actual devices:
- iPhone (Safari)
- Android (Chrome)
- iPad (landscape + portrait)

Or use Chrome DevTools:
F12 → Ctrl+Shift+M (toggle responsive mode)

---

## 💳 Payment Testing

### Razorpay Test Mode
- Any 16-digit number for card
- Use test credentials

### Stripe Test Mode
- Card number: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

---

## 📞 Need Help?

1. Check **IMPLEMENTATION.md** for technical details
2. Check **DESIGN_SYSTEM.md** for brand guidelines
3. Check **SETUP.md** for deployment help
4. Check component files for specific code

---

## 🎁 What's Next?

1. **Customize** colors, fonts, prices
2. **Add** real product images
3. **Configure** payment gateway keys
4. **Test** on mobile devices
5. **Deploy** to production
6. **Monitor** with analytics

---

**Ready to launch your luxury chocolate empire?**

*Indulge Smart. Indulge Pure.*

---

Made with ❤️ by AUREIM  
Made in India. Designed for the world.
