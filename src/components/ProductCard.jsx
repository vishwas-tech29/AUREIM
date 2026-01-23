import React, { useState } from 'react'
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
            ? 'text-amber-400 fill-current'
            : 'text-stone-600'
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
              ? 'bg-amber-800 text-stone-950'
              : 'bg-stone-950/70 text-beige hover:bg-amber-800 hover:text-stone-950'
          }`}
        >
          <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
        </button>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-stone-950/40 transition-opacity duration-300 ${
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
          <span className="text-stone-400 text-sm">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Name and Description */}
        <div>
          <h3 className="text-xl font-serif text-beige mb-1 group-hover:text-amber-200 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-stone-300 text-sm">
            {product.description}
          </p>
        </div>

        {/* Flavor Notes */}
        <div className="flex flex-wrap gap-2">
          {product.notes.slice(0, 2).map((note, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-stone-800 text-stone-300 text-xs rounded-full"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-800">
          <div className="text-2xl font-serif text-amber-200">
            {formatPrice(product.price)}
          </div>
          
          <div className="flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setQuantity(Math.max(1, quantity - 1))
                }}
                className="w-8 h-8 rounded-full bg-stone-800 text-beige hover:bg-stone-700 transition-colors duration-300 flex items-center justify-center"
              >
                -
              </button>
              <span className="text-beige w-8 text-center">{quantity}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setQuantity(quantity + 1)
                }}
                className="w-8 h-8 rounded-full bg-stone-800 text-beige hover:bg-stone-700 transition-colors duration-300 flex items-center justify-center"
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