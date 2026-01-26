import React, { useState, useEffect } from 'react'
import { ShoppingCart, Plus } from 'lucide-react'

const FloatingCartButton = ({ cartCount = 0, onCartClick, onViewCart }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 200px
      setIsVisible(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex flex-col items-end gap-3">
        {/* Expanded Options */}
        {isExpanded && (
          <div className="flex flex-col gap-2 animate-slide-up">
            <button
              onClick={() => {
                onViewCart()
                setIsExpanded(false)
              }}
              className="bg-cream-primary hover:bg-cream-soft text-text-primary px-4 py-2 rounded-full shadow-luxury border border-cream-beige transition-all duration-300 hover:scale-105 text-sm font-medium"
            >
              View Full Cart
            </button>
            <button
              onClick={() => {
                onCartClick()
                setIsExpanded(false)
              }}
              className="bg-cream-primary hover:bg-cream-soft text-text-primary px-4 py-2 rounded-full shadow-luxury border border-cream-beige transition-all duration-300 hover:scale-105 text-sm font-medium"
            >
              Quick View
            </button>
          </div>
        )}

        {/* Main Cart Button */}
        <div className="relative">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-16 h-16 bg-caramel-gold hover:bg-caramel-light text-chocolate-dark rounded-full shadow-luxury transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          >
            <ShoppingCart size={24} className="transition-transform duration-300 group-hover:scale-110" />
            
            {/* Cart Count Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-chocolate-dark text-cream-primary text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium animate-pulse">
                {cartCount}
              </span>
            )}

            {/* Expand Indicator */}
            <div className={`absolute -top-1 -right-1 w-4 h-4 bg-text-primary rounded-full flex items-center justify-center transition-transform duration-300 ${
              isExpanded ? 'rotate-45' : 'rotate-0'
            }`}>
              <Plus size={10} className="text-cream-primary" />
            </div>
          </button>

          {/* Pulse Animation for New Items */}
          {cartCount > 0 && (
            <div className="absolute inset-0 rounded-full bg-caramel-gold animate-ping opacity-20"></div>
          )}
        </div>
      </div>

      {/* Background Overlay for Expanded State */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-transparent z-[-1]"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  )
}

export default FloatingCartButton