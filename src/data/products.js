export const products = [
  {
    id: 1,
    name: "Aurium Dark Chocolate",
    description: "Premium 70% Single Origin",
    price: 195,
    image: "/images/products/aureim-product-1.jpeg",
    rating: 4.9,
    reviews: 127,
    category: "single-origin",
    notes: ["Rich cocoa", "Vanilla undertones", "Smooth finish"],
    origin: "Madagascar",
    percentage: 70
  },
  {
    id: 2,
    name: "Aurium Dark Chocolate Combo",
    description: "Buy 2 Premium Bars - Save ₹50",
    price: 340,
    originalPrice: 390,
    image: "/images/products/aureim-product-2.jpeg",
    rating: 4.8,
    reviews: 89,
    category: "collection",
    notes: ["Best Value", "2 Premium Bars", "Perfect Gift"],
    isCombo: true,
    comboItems: [
      { name: "Aurium Dark Chocolate 70%", quantity: 1, price: 195 },
      { name: "Aurium Dark Chocolate 85%", quantity: 1, price: 195 }
    ],
    savings: 50
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "AUREIM has redefined my understanding of chocolate. Each piece is a moment of pure mindfulness.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face&q=80"
  },
  {
    id: 2,
    name: "James Mitchell",
    location: "London",
    rating: 5,
    text: "The craftsmanship is extraordinary. You can taste the passion and attention to detail in every bite.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&q=80"
  },
  {
    id: 3,
    name: "Sofia Chen",
    location: "Singapore",
    rating: 5,
    text: "Finally, luxury chocolate that aligns with my wellness journey. Guilt-free indulgence at its finest.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&q=80"
  }
];

// Additional image assets for the website
export const galleryImages = [
  {
    id: 1,
    src: "/images/products/aureim-product-1.jpeg",
    alt: "AUREIM luxury chocolate packaging",
    category: "products"
  },
  {
    id: 2,
    src: "/images/products/aureim-product-2.jpeg",
    alt: "AUREIM artisan chocolate collection",
    category: "products"
  },
  {
    id: 3,
    src: "/images/products/aureim-product-3.jpeg",
    alt: "AUREIM premium chocolate bars",
    category: "products"
  },
  {
    id: 4,
    src: "/images/aureim-story.jpeg",
    alt: "AUREIM brand story and craftsmanship",
    category: "craftsmanship"
  }
];

// Hero background images for rotation
export const heroBackgrounds = [
  "/images/products/aureim-product-1.jpeg",
  "/images/products/aureim-product-2.jpeg",
  "/images/products/aureim-product-3.jpeg"
];