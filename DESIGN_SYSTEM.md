# AUREIM Design System & Brand Guidelines

## 🏛️ Brand Architecture

### Archetype
**The Sage meets The Connoisseur**
- Wisdom, refinement, expertise
- Discerning taste, appreciation for craft
- Quiet confidence over loudness

### Positioning
**"The Hermès of dark chocolate"**
- Premium positioning
- Emphasis on craftsmanship
- Accessibility to select clientele

### Core Values
- **Essence** - Pure, distilled experience
- **Crafted** - Artisanal, intentional creation
- **Mindful** - Conscious consumption
- **Ritual** - Moment of pause
- **Pure** - Zero compromise on ingredients
- **Refined** - Polished, elegant execution
- **Sourced** - Transparent, traceable origin
- **Moment** - Experience, not transaction

### Vocabulary Bank

✅ **DO USE**:
- Essence, crafted, mindful, ritual, pure, refined, sourced, moment
- Single-origin, monk fruit, organic cocoa
- Artisanal, small-batch, connoisseur

❌ **DON'T USE**:
- Healthy (implies medicinal)
- Guilt-free (implies shame)
- Superfood (too trendy)
- Boost, energize (too commercial)
- Organic* (use sparingly, max once)
- Natural* (use sparingly, max once)
- Benefits, features (list-based selling)

---

## 🎨 Visual System

### Color Palette

| Role | Name | Hex | RGB | Usage |
|------|------|-----|-----|-------|
| Primary | Cocoa | #3E2723 | 62, 39, 35 | Hero text, buttons, overlays |
| Secondary | Warm Brown | #5D4037 | 93, 64, 55 | Secondary headings, borders |
| Accent | Muted Gold | #B8956A | 184, 149, 106 | CTAs, highlights, hover states |
| Background | Cream | #F5F1ED | 245, 241, 237 | Primary background |
| Background | Blush Beige | #F9F5F1 | 249, 245, 241 | Soft background sections |
| Text | Dark Chocolate | #2C1810 | 44, 24, 16 | Body text, main copy |
| Text | Warm Gray | #6D5D52 | 109, 93, 82 | Secondary text, captions |

### Color Psychology
- **Cocoa Brown**: Sophistication, earth, craftsmanship
- **Gold**: Luxury, refinement, premium
- **Cream/Blush**: Warmth, elegance, accessibility
- **Dark Text**: Readability, premium contrast

### Accessibility
- All text meets WCAG AA contrast ratios
- Color combinations tested for colorblind accessibility
- No information conveyed by color alone

---

## 📝 Typography System

### Font Stack

```css
/* Display / Headlines */
font-family: 'Cormorant Garamond', 'Playfair Display', serif;

/* Body / Interface */
font-family: 'Inter', 'Outfit', sans-serif;
```

### Typography Hierarchy

| Level | Font | Size | Weight | Line Height | Letter Spacing | Use Case |
|-------|------|------|--------|-------------|-----------------|----------|
| H1 | Cormorant Garamond | 72px | 400 | 1.1 | -0.02em | Hero title |
| H2 | Cormorant Garamond | 48px | 300 | 1.2 | -0.02em | Section heading |
| H3 | Cormorant Garamond | 32px | 400 | 1.3 | 0 | Card title |
| H4 | Inter | 20px | 500 | 1.4 | 0.05em | Subsection |
| Body | Inter | 18px | 400 | 1.8 | 0 | Main paragraph |
| Small | Inter | 14px | 300 | 1.5 | 0.1em | Secondary text |
| Tiny | Inter | 12px | 300 | 1.4 | 0.15em | Labels, buttons |
| Button | Inter | 16px | 500 | 1.5 | 0.05em | CTA text |

### Font Sizing Ratios
- 1:1.25 Minor Third (used for spacing)
- 1:1.5 Perfect Fourth (used for typography)

### Font Best Practices
1. **Display fonts** (Cormorant): Headlines only, light weights
2. **Body fonts** (Inter): All body copy, always 18px+ for readability
3. **Hierarchy** achieved through size, weight, spacing—not color alone
4. **Line length**: 60-80 characters for optimal readability
5. **Font loading**: Critical fonts preloaded in `<head>`

---

## 📐 Spacing System

### Base Unit: 8px

All spacing uses 8px multiples:
```
8, 16, 24, 32, 48, 64, 96, 128, 160, 192
```

### Section Spacing

| Use Case | Desktop | Tablet | Mobile |
|----------|---------|--------|--------|
| Small gap | 16px | 16px | 12px |
| Medium gap | 32px | 24px | 20px |
| Section gap | 120-160px | 80-120px | 60-80px |
| Hero height | 100vh | 100vh | 90vh |

### Golden Ratio Layout
- Main content: 62% of width
- Sidebar/accent: 38% of width
- Ratio: 1.618:1

### Breathing Room
- Don't center everything (asymmetric balance)
- Use invisible 8px grid for alignment
- Whitespace is design—not wasted space

---

## 🎬 Animation Principles

### Core Rules
1. **GPU-accelerated only**: Use `transform` and `opacity`
2. **Duration**: 0.3s-0.8s for micro-interactions, 0.8s-1.2s for page animations
3. **Easing**: `ease-out` for entries, `cubic-bezier(0.4, 0, 0.6, 1)` for custom
4. **Performance**: Target 60fps, no jank on scroll

### Animation Library

#### Fade Up (Entry)
```javascript
opacity: 0 → 1
transform: translateY(40px) → translateY(0)
duration: 0.8s
easing: ease-out
```

#### Stagger (Multiple elements)
```javascript
delay: i * 0.15s
// Creates cascading effect
```

#### Parallax (Scroll-based)
```javascript
hero.style.transform = `translateY(${window.scrollY * 0.5}px)`
// Slower than scroll speed
```

#### Hover Scale
```javascript
scale: 1 → 1.02
duration: 0.3s
easing: ease-out
```

#### Glow Pulse
```javascript
boxShadow: [
  '0 0 0 0 rgba(184, 149, 106, 0.7)',
  '0 0 0 10px rgba(184, 149, 106, 0)'
]
duration: 2s
repeat: infinite
```

### Animation Checklist
- [ ] Animations run at 60fps
- [ ] No layout shifts during animation
- [ ] Entrance animations have clear delay
- [ ] Hover states provide immediate feedback
- [ ] Loading states show progress
- [ ] Success animations celebrate action

---

## 🔘 Component Styles

### Buttons

#### Primary (Gold)
```css
Background: #B8956A
Text: #2C1810
Border: None
Padding: 12px 32px
Border-radius: 8px
Font-weight: 500
Letter-spacing: 0.05em

Hover:
  - Scale: 1.02
  - Shadow: 0 20px 40px rgba(62, 39, 35, 0.15)
  - No color change

Active:
  - Scale: 0.98
  - Shadow decrease
```

#### Secondary (Outlined)
```css
Background: Transparent
Text: #2C1810
Border: 1px solid #2C1810
Padding: 12px 32px
Border-radius: 8px

Hover:
  - Background: #2C1810
  - Text: #F5F1ED
  - Scale: 1.02
```

### Cards
```css
Background: #F9F5F1
Border: 1px solid transparent
Padding: 32px
Border-radius: 8px
Box-shadow: 0 8px 32px rgba(62, 39, 35, 0.08)

Hover:
  - Transform: translateY(-8px)
  - Border: 1px solid #B8956A
  - Shadow: 0 20px 40px rgba(62, 39, 35, 0.15)
  - Duration: 0.5s
```

### Input Fields
```css
Background: rgba(62, 39, 35, 0.05)
Border: 1px solid rgba(62, 39, 35, 0.2)
Padding: 12px 16px
Border-radius: 8px
Font-size: 16px (prevents zoom on mobile)
Color: #2C1810

Focus:
  - Border: 1px solid #B8956A
  - Box-shadow: 0 0 0 3px rgba(184, 149, 106, 0.1)

Placeholder:
  - Color: rgba(62, 39, 35, 0.4)
  - Font-weight: 300
```

---

## 📱 Responsive Design

### Breakpoints
```css
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: 1024px - 1440px
Wide: > 1440px
```

### Mobile-First Approach
1. Design mobile first (simplest layout)
2. Add complexity for larger screens
3. Use `@media (min-width: 768px)` to enhance

### Key Mobile Adjustments
- Remove vertical rotation text (hero)
- Stack 2 columns → 1 column
- H1: 72px → 48px on mobile
- H2: 48px → 36px on mobile
- Section gap: 160px → 80px on mobile
- Padding: px-12 → px-6 on mobile
- Navigation: Desktop menu → Hamburger drawer

---

## ✨ Micro-interactions

### Button Click
- Ripple effect or scale down (0.98)
- Brief shadow decrease
- Visual feedback within 100ms

### Card Hover (Desktop)
- Lift: translateY(-8px)
- Shadow increase: 0 20px 40px rgba(62, 39, 35, 0.15)
- Border: 1px solid #B8956A
- Duration: 0.5s smooth

### Image Hover (Desktop)
- Scale: 1.05
- Transition: 0.6s ease-out
- No overflow allowed on container

### Form Focus
- Border color → Gold (#B8956A)
- Subtle glow: inset box-shadow
- Cursor: text

---

## 🌙 Dark Mode (Optional Future)

### Dark Palette
```
Primary: #1C1108 (darker cocoa)
Secondary: #8B7355 (lighter brown)
Accent: #D4AF6B (brighter gold)
Background: #0F0A06 (near black)
Text: #F5F1ED (cream text)
```

---

## 📐 Grid & Layout

### Container Width
```css
max-width: 1280px (1280px)
margin: 0 auto
padding: 0 24px (desktop), 0 16px (mobile)
```

### Section Padding
```css
Desktop: padding: 160px 96px
Tablet: padding: 120px 48px
Mobile: padding: 80px 24px
```

### Column Layouts
- **2 Column**: 50-50 split (with gap)
- **3 Column**: 33-33-33 split (with gap)
- **Product**: 40-60 split (image-text)
- **Hero**: 20-50-30 split (text-content-image)

---

## 🎯 Quality Checklist

### Luxury Test
- [ ] Would sit next to Aesop, Byredo, Le Labo?
- [ ] Does it feel quiet or trying too hard?
- [ ] Is it screenshot-worthy for design inspo?
- [ ] Does white space breathe confidence?
- [ ] Is every word essential?

### Functional Checklist
- [ ] All animations GPU-accelerated
- [ ] 60fps on scroll
- [ ] No console errors
- [ ] Lighthouse 90+
- [ ] Mobile responsive at all breakpoints
- [ ] Accessible (WCAG AA)
- [ ] Forms validate properly
- [ ] Payment flow works

---

## 📚 Further Reading

- **Google Material Design**: https://material.io
- **Apple Human Interface Guidelines**: https://developer.apple.com/design
- **Web Content Accessibility Guidelines**: https://www.w3.org/WAI/WCAG21
- **Typography.com**: Essential reading on typography
- **Framer Motion Docs**: https://www.framer.com/motion

---

**AUREIM Brand Statement**:  
*Indulge Smart. Indulge Pure.*

**Made in India. Designed for the world.**
