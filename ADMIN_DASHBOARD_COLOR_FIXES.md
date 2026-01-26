# Admin Dashboard Color Visibility Fixes

## Overview
Completed the color visibility corrections for both AdminDashboard and OrdersDashboard components, replacing the old stone/beige color scheme with high-contrast colors for better readability.

## Changes Made

### AdminDashboard.jsx
- **Order Detail Modal**: Updated all text colors from old scheme to new high-contrast colors
  - Headers: `text-beige` → `text-text-primary`
  - Labels: `text-stone-400` → `text-text-secondary`
  - Values: `text-beige` → `text-text-primary`
  - Background: `bg-stone-900/50` → `bg-cream-beige`
  - Pricing: `text-amber-200` → `text-caramel-gold`
  - Borders: `border-stone-700` → `border-cream-blush`
  - Modal overlay: `bg-stone-950/90` → `bg-chocolate-dark/95`

### OrdersDashboard.jsx
- **Main Dashboard**: Updated all color classes throughout the component
  - Headers: `text-beige` → `text-text-primary`
  - Secondary text: `text-stone-400`, `text-stone-300` → `text-text-secondary`
  - Stats cards: Updated icon colors and text colors
  - Table headers and data: Consistent high-contrast colors
  - Background: `bg-stone-950/95` → `bg-chocolate-dark/95`

- **All Modals**: Updated delete confirmation and order detail modals
  - Consistent color scheme across all modal components
  - Better contrast for readability
  - Updated backgrounds and borders

## Color Mapping Applied
- `text-beige` → `text-text-primary` (#0F0A07)
- `text-stone-400`, `text-stone-300` → `text-text-secondary` (#3D2B20)
- `text-amber-200`, `text-amber-800` → `text-caramel-gold` (#D4A574)
- `bg-stone-900/50` → `bg-cream-beige`
- `border-stone-700` → `border-cream-beige` or `border-cream-blush`
- `bg-stone-950/90` → `bg-chocolate-dark/95`

## Features Maintained
- All admin dashboard functionality preserved
- Order management and export capabilities intact
- Customer data deletion features working
- Professional luxury appearance maintained
- Responsive design preserved

## Result
Both admin dashboard components now have excellent text visibility with high-contrast colors while maintaining the professional luxury aesthetic of the Aureim brand.