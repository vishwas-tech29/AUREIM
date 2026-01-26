import { useState } from 'react'
import { Heart, Star, ShoppingCart, Plus } from 'lucide-react'
import LazyImage from './LazyImage'

const ProductCard = ({ product, onAddToCart, onToggleFavorite, isFavorite }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`${
          i < Math.floor(rating)
            ? 'text-caramel-gold fill-current'
            : 'text-text-secondary'
        }`}
      />
    ))
  }

  return (
    <div
      className="card-luxury p-6 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative mb-6 overflow-hidden rounded-xl">
        <LazyImage
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(product.id)
          }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
            isFavorite
              ? 'bg-caramel-gold text-chocolate-dark'
              : 'bg-chocolate-dark/70 text-cream-primary hover:bg-caramel-gold hover:text-chocolate-dark'
          }`}
        >
          <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
        </button>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-chocolate-dark/40 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAddToCart(product, quantity)
              }}
              className="w-full btn-primary py-3 text-sm"
            >
              <ShoppingCart size={16} className="inline mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-text-secondary text-sm">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Name and Description */}
        <div>
          <h3 className="text-xl font-serif text-text-primary mb-1 group-hover:text-caramel-gold transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-text-secondary text-sm">
            {product.description}
          </p>
        </div>

        {/* Flavor Notes */}
        <div className="flex flex-wrap gap-2">
          {product.notes.slice(0, 2).map((note, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-cream-beige text-text-primary text-xs rounded-full"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-cream-beige">
          <div className="flex flex-col">
            {product.originalPrice && (
              <div className="text-sm text-text-secondary line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
            <div className="text-2xl font-serif text-caramel-gold">
              {formatPrice(product.price)}
            </div>
            {product.savings && (
              <div className="text-xs text-green-600 font-medium">
                Save ₹{product.savings}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setQuantity(Math.max(1, quantity - 1))
                }}
                className="w-8 h-8 rounded-full bg-cream-beige text-text-primary hover:bg-caramel-gold hover:text-chocolate-dark transition-colors duration-300 flex items-center justify-center"
              >
                -
              </button>
              <span className="text-text-primary w-8 text-center">{quantity}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setQuantity(quantity + 1)
                }}
                className="w-8 h-8 rounded-full bg-cream-beige text-text-primary hover:bg-caramel-gold hover:text-chocolate-dark transition-colors duration-300 flex items-center justify-center"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard