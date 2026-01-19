# AUREIM - Component Visual Guide

## 📊 Page Layout Diagram

```
┌─────────────────────────────────────────────┐
│ NAVIGATION (Fixed, Floating)                │  80px height
│ Logo | Menu Items | Cart Count              │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│                                             │
│              HERO SECTION                   │ 100vh height
│                                             │
│  [Vertical] [Main Content] [Product Image]  │
│    Text       H1 + Copy       Parallax      │
│                               Effect        │
│                                             │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│  VALUE PROPOSITION STRIP                    │  ~60px padding
│  80% COCOA · ZERO SUGAR · 100% ORGANIC     │
│  "Bold flavor. Minimal sweetness."          │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│                                             │
│         PRODUCT DETAILS SECTION             │  Full width
│                                             │
│  [Image Carousel]    [Product Info]         │
│  - Main Image         - Title               │
│  - Thumbnails 1-3     - Price               │
│                       - Ingredients         │
│  Crossfade Animation  - Qty Selector        │
│                       - [Add] [Buy]         │
│                       - Gift Wrap Option    │
│                                             │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│                                             │
│         PHILOSOPHY SECTION                  │  Full width
│                                             │
│  The AUREIM Philosophy                     │
│                                             │
│  [Card 1]      [Card 2]      [Card 3]      │
│  Sourced       Sweetened     Crafted       │
│  with Purpose  Mindfully     Not Made      │
│                                             │
│  Staggered animations on scroll             │
│                                             │
│  "AUREIM is not just chocolate.             │
│   It is a mindful pause."                  │
│                                             │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│                                             │
│      TESTIMONIALS SECTION                   │
│                                             │
│  Voices of Connoisseurs                    │
│                                             │
│  "Finally, a chocolate that respects..."   │
│  — Priya M., Mumbai                        │
│                                             │
│  [← •  •  • →]  Auto-rotate 8s             │
│                                             │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│                                             │
│         FOOTER                              │  Dark background
│                                             │
│  [AUREIM]    [Explore]    [Join Circle]    │
│  Tagline     Links         Newsletter       │
│  Socials                   Email Input      │
│                                             │
│  Made in India. Designed for the world.    │
│  © 2025 AUREIM                             │
│                                             │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│     CHECKOUT MODAL (Overlay)                │  Slides up
│                                             │
│  Complete Your AUREIM Moment                │
│                                             │
│  [Name Field]     [Email Field]             │
│  [Phone Field]    [Address Field]           │
│  [Pincode Field]                            │
│                                             │
│  [Razorpay] [Stripe] [PayPal]              │
│                                             │
│  Order Summary:                             │
│  Subtotal: ₹1,299                          │
│  Tax: ₹234                                  │
│  Total: ₹1,533                             │
│                                             │
│  [COMPLETE YOUR AUREIM MOMENT]              │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🎨 Component Hierarchy

```
App.jsx (Main)
├── Navigation
│   ├── Logo (Text)
│   ├── Menu Items (Array)
│   └── Cart Badge (Animated)
│
├── Hero
│   ├── Left Column (Vertical Text)
│   ├── Center Column
│   │   ├── Small Tag
│   │   ├── H1 Heading
│   │   ├── Description
│   │   └── CTA Button
│   └── Right Column (Product Image Mock)
│
├── ValueProposition
│   ├── Product Highlights (Text)
│   └── Tagline
│
├── ProductDetails
│   ├── Left Column
│   │   ├── Main Image Display
│   │   └── Thumbnail Carousel (3 items)
│   └── Right Column
│       ├── Title & Subtitle
│       ├── Price Display
│       ├── Ingredients List
│       ├── Quantity Selector
│       │   ├── Minus Button
│       │   ├── Count Display
│       │   └── Plus Button
│       ├── Add to Cart Button
│       ├── Buy Now Button
│       └── Gift Wrap Checkbox
│
├── Philosophy
│   ├── Section Title
│   ├── Card Grid (3 columns)
│   │   ├── Card 1
│   │   │   ├── Icon (Leaf)
│   │   │   ├── Title
│   │   │   └── Description
│   │   ├── Card 2
│   │   │   ├── Icon (Scale)
│   │   │   ├── Title
│   │   │   └── Description
│   │   └── Card 3
│   │       ├── Icon (Hand)
│   │       ├── Title
│   │       └── Description
│   └── Blockquote
│
├── Testimonials
│   ├── Section Title
│   ├── Carousel Container
│   │   ├── Quote Display
│   │   ├── Author/Location
│   │   ├── Navigation Buttons
│   │   │   ├── Left Arrow
│   │   │   ├── Dot Indicators (3)
│   │   │   └── Right Arrow
│   │   └── Auto-rotation Timer
│
├── Footer
│   ├── Column 1 (Brand)
│   │   ├── Logo
│   │   ├── Tagline
│   │   └── Social Icons (2)
│   ├── Column 2 (Links)
│   │   ├── "Our Story" Link
│   │   ├── "The Chocolate" Link
│   │   ├── "Philosophy" Link
│   │   └── "Contact" Link
│   ├── Column 3 (Newsletter)
│   │   ├── Heading
│   │   ├── Description
│   │   └── Signup Form
│   └── Bottom Bar
│       └── Copyright & Location Text
│
└── CheckoutModal
    ├── Close Button
    ├── Form State
    │   ├── Name Input
    │   ├── Email Input
    │   ├── Phone Input
    │   ├── Address Input
    │   ├── Pincode Input
    │   └── Payment Method Radio Buttons
    ├── Order Summary
    │   ├── Subtotal
    │   ├── Tax
    │   └── Total
    ├── Submit Button
    └── Success View
        ├── Animated Checkmark
        ├── Success Message
        ├── Order Confirmation Email
        └── Continue Button
```

---

## 🎭 State Flow Diagram

```
App Component State:
├── cartItems: [{id, quantity}, ...]
├── isCheckoutOpen: boolean
├── showToast: boolean
└── toastMessage: string

Navigation Component:
├── isOpen: boolean (mobile menu)
├── isVisible: boolean (scroll detection)
├── lastScrollY: number
└── scrollBlur: number (0-1)

ProductDetails Component:
├── selectedImage: number (0-2)
├── quantity: number (1-10)
└── isAdding: boolean

Testimonials Component:
└── currentIndex: number (0-2)

CheckoutModal Component:
├── formData: {name, email, phone, address, pincode}
├── isProcessing: boolean
├── showSuccess: boolean
└── paymentMethod: 'razorpay' | 'stripe'
```

---

## 🎬 Animation Timeline

```
Page Load (Timeline):
0.0s ──────────┬──────── 1.5s
        Navigation
        Slide down
        Fade in
        (0.8s delay)

0.6s ──────────┬──────── 1.2s
        Hero H1
        Fade up
        Scale 1.02
        
0.9s ──────────┬──────── 1.5s
        Body text
        Fade up
        
1.2s ──────────┬──────── 1.8s
        CTA Button
        Fade up
        Glow pulse
        
Continuous (Scroll-based):
↓ Scroll = Parallax image down at 0.5x speed
↓ Scroll = Hero background circle move at 0.3x speed

On Scroll (Threshold-based):
0.8s opacity: 0→1
0.8s translateY: 40px→0
Stagger: 0.15s delay per child element

Hover/Click:
0.3s scale: 1→1.02
0.3s shadow increase

Modal Open:
0.5s slideUp + fadeIn (spring animation)

Checkout Success:
0.3s draw checkmark (SVG path animation)
0.8s slow fade content
```

---

## 📱 Responsive Component Changes

### Navigation
```
Desktop (1024px+)
├── Logo [left]
├── Menu [center] - Full list visible
└── Cart [right] - Icon + badge

Tablet (768-1024px)
├── Logo [left]
├── Menu [hidden]
└── Hamburger [right]

Mobile (< 768px)
├── Logo [left]
├── Menu [drawer, slide down on click]
└── Hamburger [right]
```

### Hero
```
Desktop: 3-column (20-50-30 split)
├── Left: Vertical text (visible)
├── Center: Content
└── Right: Product image

Tablet (768-1024px):
├── Single column stack
├── Text: "50% max-width centered"
└── Image: Full width below

Mobile (< 768px):
├── Vertical text: Hidden
├── Content: Full width
└── Image: Not displayed
```

### Product Details
```
Desktop: 2 columns (40-60)
├── Left: Image carousel
└── Right: Product info

Tablet: 2 columns, stacked on smaller
└── Both full width if space needed

Mobile: 1 column (full width)
├── Image carousel (full width)
└── Product info (full width)
```

### Philosophy Cards
```
Desktop: 3 columns (auto grid)
├── Card 1
├── Card 2
└── Card 3

Tablet: 2 columns
Tablet (small): 1 column

Mobile: 1 column (stacked)
└── Responsive gap
```

### Footer
```
Desktop: 3 columns (33-33-33)
├── Brand
├── Links
└── Newsletter

Mobile: 1 column (stacked)
├── Brand (full width)
├── Links (full width)
└── Newsletter (full width)
```

---

## 🎨 Color Application

### Navigation
```
Background: cream (#F5F1ED) at 80% opacity
Border: white at 30% opacity
Text: primary (#2C1810)
Hover underline: gold (#B8956A)
Cart badge: gold background
```

### Hero
```
Background gradient: cream to blush
Text (h1): primary (#2C1810)
Text (body): secondary (#6D5D52)
Button: gold background, primary text
Circle: blush (#F9F5F1)
```

### Product Details
```
Background: cream
Section border: secondary at 10% opacity
Price text: primary
Ingredient text: secondary
Buttons: gold (primary) and outlined (secondary)
```

### Philosophy
```
Background: gradient blush to cream
Card background: blush (#F9F5F1)
Card hover: gold border
Icon color: gold
Text: primary/secondary
```

### Testimonials
```
Background: blush
Quote: primary
Author: secondary
Dots: gold (active), secondary (inactive)
```

### Footer
```
Background: primary cocoa (#3E2723)
Text: cream (#F5F1ED)
Links: hover gold
Border: gold at 20% opacity
```

### Checkout Modal
```
Background: primary cocoa (#3E2723)
Text: cream
Input background: cream at 10% opacity
Input border: cream at 30% opacity
Button: gold background
Overlay: black at 85% opacity
```

---

## 📏 Spacing Applied

### Sections
```
Hero: 100vh height
Value Prop: 24px vertical padding, 16px horizontal
Product Details: 160px top/bottom, 96px sides (desktop)
Philosophy: 160px top/bottom padding
Testimonials: 160px vertical padding
Footer: 160px top/bottom padding
```

### Components
```
Navigation: 80px height, 40px gap between items
Button: 12px vertical, 32px horizontal padding
Card: 32px padding, 8px rounded
Input: 12px vertical, 16px horizontal padding
```

### Gaps
```
Card to Card: 24px (desktop), 16px (mobile)
Section to Section: 140px default
```

---

## 🎯 Interaction Map

```
User Interaction Flows:

1. NAVIGATION
   Click Menu Item → Scroll to section (link)
   Click Cart → CheckoutModal opens
   Scroll down → Navigation hides
   Scroll up → Navigation shows

2. HERO
   View page → Animations trigger (0.6s-1.5s stagger)
   Scroll → Product image parallax (0.5x speed)
   Hover product → Image lifts, shadow increases

3. PRODUCT DETAILS
   Load → Image carousel ready
   Click thumbnail → Main image crossfades (0.4s)
   Hover main image → Scale 1.05
   Click qty +/- → Update quantity
   Click Add → Button state flows
             → Cart count updates
             → Toast appears
   Click Buy Now → CheckoutModal opens

4. PHILOSOPHY
   Scroll into view → Cards cascade appear (0.15s stagger)

5. TESTIMONIALS
   Auto-rotate → Change testimonial (8s interval)
   Click arrow → Manual navigation
   Click dot → Jump to testimonial

6. CHECKOUT
   Open modal → Slide up from bottom
   Type in form → Validation on input
   Select payment → Radio button toggles
   Click submit → Processing state
             → API call simulated
             → Success view animates in
   Click continue → Modal closes
                 → Page scrolls to top

7. FOOTER
   Click newsletter → Form focus
   Type email → Input styled
   Click join → Form submits (mock)
   Click social → Open in new tab
```

---

## 🔄 Data Flow

```
User Action
    ↓
Component Handler (onClick, onChange, etc.)
    ↓
State Update (setState)
    ↓
Component Re-render
    ↓
DOM Update
    ↓
Animation Trigger (CSS/Framer Motion)
    ↓
Visual Result
```

### Example: Add to Cart Flow
```
Click "ADD TO CART" button
    ↓
ProductDetails.handleAddToCart() → setIsAdding(true)
    ↓
Button renders "ADDING..." + disabled
    ↓
Wait 600ms (simulated API call)
    ↓
App.handleAddToCart() → setCartItems([...])
    ↓
Navigation re-renders with cartCount
    ↓
Badge animates scale(0→1)
    ↓
Toast appears with success message
    ↓
setIsAdding(false) → Button restores
```

---

## 📊 Component Props & State Summary

| Component | Props | State | Effects |
|-----------|-------|-------|---------|
| Navigation | cartCount, onCartClick | isOpen, isVisible, scrollBlur | scroll listener |
| Hero | — | scrollY | scroll listener |
| ValueProposition | — | — | useInView |
| ProductDetails | onAddToCart, onBuyNow | selectedImage, quantity, isAdding | none |
| Philosophy | — | — | useInView |
| Testimonials | — | currentIndex | setInterval, cleanup |
| CheckoutModal | isOpen, onClose, cartTotal | formData, isProcessing, showSuccess, paymentMethod | none |
| Footer | — | — | useInView |

---

## 🎬 Stagger Animation Pattern

Used in Philosophy cards and other multi-element sections:

```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // 150ms delay per child
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
}

// Result:
// Card 1: 0.0s - 0.8s
// Card 2: 0.15s - 0.95s
// Card 3: 0.30s - 1.10s
```

---

**Last Updated**: January 20, 2026  
**Component Count**: 8  
**Total Animations**: 10+  
**Accessibility Level**: WCAG AA

*Indulge Smart. Indulge Pure.*
