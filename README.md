# AUREIM - Luxury Chocolate E-Commerce

A premium luxury chocolate e-commerce website built with React, Vite, and Tailwind CSS. AUREIM represents mindful indulgence, wellness-focused luxury, and guilt-free pleasure.

## 🍫 Brand Overview

AUREIM is a high-end, artisan chocolate brand made in India with global appeal. The brand represents:
- Mindful indulgence
- Wellness-focused luxury  
- Guilt-free pleasure
- Ethical sourcing and craftsmanship

## ✨ Features

### 🛒 Complete E-Commerce Functionality
- **Product Catalog**: 6 luxury chocolate products with detailed information
- **Shopping Cart**: Add, remove, update quantities with real-time counter
- **Favorites System**: Heart toggle for wishlist functionality
- **Product Filtering**: Filter by category (Single Origin, Artisan, Praline, etc.)
- **Product Sorting**: Sort by name, price, rating
- **Cart Sidebar**: Quick cart access with checkout options
- **Full Cart Page**: Detailed cart management with order summary

### 💳 Complete Payment System
- **Multi-Step Checkout**: Shipping → Payment → Review → Confirmation
- **Payment Methods**: 
  - Credit/Debit Cards (with validation)
  - UPI Payment (GPay, PhonePe, Paytm)
  - Net Banking (10+ major Indian banks)
  - Digital Wallets (Paytm, PhonePe, Google Pay, Amazon Pay)
  - Cash on Delivery (with COD charges)
- **Form Validation**: Real-time validation for all payment forms
- **Payment Processing**: Simulated payment gateway with success/failure handling
- **Order Confirmation**: Complete order details with tracking information
- **Invoice Generation**: Downloadable Excel invoices with order details

### 🎨 Design & User Experience
- **Luxury Design System**: Premium color palette and typography
- **Responsive Design**: Mobile-first approach, works on all devices
- **Smooth Animations**: 300-500ms luxury timing with cubic-bezier easing
- **Image Optimization**: Lazy loading, error handling, preloading
- **Toast Notifications**: Real-time feedback for all user actions
- **Loading States**: Elegant loading animations and placeholders

### 📊 Admin Dashboard (Secret Access)
- **Order Management**: View all orders with detailed information
- **Sales Analytics**: Revenue, order count, customer metrics
- **Excel Export**: Export all orders to comprehensive Excel reports
- **Customer Database**: Automatic customer data aggregation
- **Product Sales**: Track product performance and inventory

### 🔒 Security & Validation
- **Form Validation**: Comprehensive validation for all user inputs
- **Payment Security**: SSL encryption indicators and security badges
- **Data Storage**: Local storage for demo (easily replaceable with backend)
- **Error Handling**: Graceful error handling throughout the application

### Design System
- **Minimal, sophisticated design** with international luxury aesthetic
- **Premium color palette**: Deep charcoal, matte brown, warm cocoa, soft beige, subtle gold
- **Typography**: Playfair Display (serif) for headings, Inter (sans-serif) for body text
- **Spacious layouts** with generous white space and asymmetric grids
- **Smooth animations** with luxury feel (300-500ms duration)

### E-Commerce Functionality
- **Product catalog** with 6 luxury chocolate varieties
- **Shopping cart** with real-time counter
- **Favorites system** with heart toggle
- **Product filtering** by category
- **Product sorting** by name, price, rating
- **Responsive design** for all devices
- **Toast notifications** for user feedback

### Components
- **Navigation**: Sticky header with backdrop blur
- **Hero Section**: Full viewport with gradient background
- **Product Grid**: Responsive cards with hover effects
- **Story Section**: Brand narrative with values
- **Testimonials**: Customer reviews with ratings
- **Newsletter**: Email signup with benefits
- **Footer**: Comprehensive links and contact info

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd aureim
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 🎯 How to Use

### Customer Experience
1. **Browse Products**: Scroll through the luxury chocolate collection
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click the cart icon in navigation to open cart sidebar
4. **Checkout**: Click "Checkout" to start the payment process
5. **Complete Order**: Fill shipping info → Choose payment method → Review → Place order
6. **Order Confirmation**: Receive order confirmation with tracking details

### Admin Access (Secret Feature)
1. **Access Admin**: Click the AUREIM logo 5 times quickly
2. **View Dashboard**: See all orders, analytics, and customer data
3. **Export Data**: Download comprehensive Excel reports
4. **Manage Orders**: View detailed order information

### Payment Testing
- **Card Numbers**: Use test card numbers (4111 1111 1111 1111 for Visa)
- **UPI**: Use any valid UPI format (test@upi)
- **Success Rate**: 90% success rate for demo purposes
- **COD**: Available for orders under ₹5,000 with ₹50 charge

## 🛠 Tech Stack

- **React 18** - UI library with hooks and functional components
- **Vite** - Build tool and dev server for fast development
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Lucide React** - Beautiful icon library
- **XLSX** - Excel file generation for order exports
- **Framer Motion** - Animation library (available for enhancements)
- **React Intersection Observer** - Scroll animations (available)

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px  
- Desktop: 1024px+

## 🎨 Design System

### Colors
- **Primary**: `#0c0a09` (stone-950)
- **Secondary**: `#1c1917` (stone-900)
- **Accent**: `#78350f` (amber-900/800)
- **Beige**: `#d6d3d1` (stone-300)
- **Gold**: `#fef3c7` (amber-100/200)

### Typography
- **Hero**: 96px/60px (desktop/mobile)
- **H1**: 72px
- **H2**: 48px
- **H3**: 32px
- **Body**: 16px-18px

### Spacing
- **Section padding**: 120px-160px (desktop), 24px (mobile)
- **Section spacing**: 8rem-12rem vertical

## 🖼️ Images & Assets

### Image Sources
All product and hero images are sourced from Unsplash with optimized parameters:
- **Product images**: 400x400px, cropped and centered
- **Hero backgrounds**: 1920x1080px for full-screen display
- **Story section**: 600x750px for portrait orientation
- **Testimonial avatars**: 100x100px, face-cropped

### Image Optimization
- **LazyImage component** with loading states and error handling
- **Image preloading** for critical above-the-fold content
- **Responsive sizing** with appropriate breakpoints
- **Fallback images** for error handling

### Image Categories
1. **Product Images**: High-quality chocolate photography
2. **Hero Backgrounds**: Luxury chocolate lifestyle imagery  
3. **Process Images**: Cocoa beans, craftsmanship, artisan work
4. **Testimonial Avatars**: Professional headshots

## 🛍 Product Catalog

The website features 6 luxury chocolate products:

1. **Dark Velvet** - Single Origin 72% Madagascar (₹2,800)
2. **Midnight Essence** - Artisan 85% Ecuador (₹3,200)
3. **Golden Praline** - Caramelized Hazelnut 65% (₹3,500)
4. **Mystic Truffle** - Handcrafted Dark Ganache (₹4,200)
5. **Rose Infusion** - Persian Rose & Dark 70% (₹3,800)
6. **Amber Collection** - Limited Edition Gift Box (₹8,500)

## 🌟 Key Features

### Shopping Experience
- Add to cart functionality
- Quantity selection
- Favorites/wishlist
- Product filtering and sorting
- Responsive product cards
- Smooth hover animations

### Brand Storytelling
- Hero section with brand messaging
- Featured message about philosophy
- Story section with values and stats
- Customer testimonials
- Newsletter signup

### User Interface
- Luxury design aesthetic
- Smooth scroll behavior
- Toast notifications
- Mobile-friendly navigation
- Backdrop blur effects
- Gradient backgrounds

## 📄 License

This project is created for demonstration purposes.

## 🤝 Contributing

This is a showcase project. For any questions or suggestions, please reach out.

---

**AUREIM** - *Moments of Pure Bliss*  
Crafted with love in India 🇮🇳