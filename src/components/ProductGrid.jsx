import React, { useState } from 'react'
import ProductCard from './ProductCard'

const ProductGrid = ({ products, onAddToCart, onToggleFavorite, favorites }) => {
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'single-origin', name: 'Single Origin' },
    { id: 'artisan', name: 'Artisan' },
    { id: 'praline', name: 'Praline' },
    { id: 'truffle', name: 'Truffle' },
    { id: 'infusion', name: 'Infusion' },
    { id: 'collection', name: 'Collections' }
  ]

  const sortOptions = [
    { id: 'name', name: 'Name' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Rating' }
  ]

  const filteredProducts = products.filter(product => 
    filter === 'all' || product.category === filter
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
    <section id="collection" className="section-spacing section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-h1 font-serif text-text-primary mb-6">
            Our Collection
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Each piece tells a story of origin, craft, and mindful indulgence
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start w-full lg:w-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-caramel-gold text-chocolate-dark'
                    : 'bg-cream-beige text-text-primary hover:bg-caramel-light hover:text-chocolate-dark'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 justify-center lg:justify-end w-full lg:w-auto">
            <span className="text-text-secondary text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-cream-beige text-text-primary border border-cream-soft rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-caramel-gold"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-secondary text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductGrid