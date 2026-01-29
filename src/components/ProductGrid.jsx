import React, { useState } from 'react'
import ProductCard from './ProductCard'

const ProductGrid = ({ products, onAddToCart, onToggleFavorite, favorites }) => {
  const [sortBy, setSortBy] = useState('name')

  const sortOptions = [
    { id: 'name', name: 'Name' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Rating' }
  ]

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return (
    <section id="collection" className="section-spacing">
      <div className="container-center">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary mb-4 sm:mb-6">
            Our Collection
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Each piece tells a story of origin, craft, and mindful indulgence
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex justify-center lg:justify-end items-center mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="text-text-secondary text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-cream-beige text-text-primary border border-cream-soft rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-caramel-gold transition-colors duration-300"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="card-grid-3">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.has(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGrid