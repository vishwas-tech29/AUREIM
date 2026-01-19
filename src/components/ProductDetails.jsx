import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

const ProductDetails = ({ onAddToCart, onBuyNow }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const images = [
    { id: 1, label: 'Main' },
    { id: 2, label: 'Side' },
    { id: 3, label: 'Detail' },
  ]

  const handleAddToCart = async () => {
    setIsAdding(true)
    setTimeout(() => {
      onAddToCart(quantity)
      setIsAdding(false)
    }, 600)
  }

  return (
    <section className="section-padding max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Left: Image Carousel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col gap-6"
        >
          {/* Main Image */}
          <motion.div
            className="relative w-full aspect-square bg-cream-blush rounded-xl overflow-hidden shadow-overlay"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex items-center justify-center text-text-secondary font-light"
            >
              {images[selectedImage].label} View
            </motion.div>
          </motion.div>

          {/* Thumbnails */}
          <div className="flex gap-4">
            {images.map((img, idx) => (
              <motion.button
                key={img.id}
                onClick={() => setSelectedImage(idx)}
                whileHover={{ scale: 1.05 }}
                className={`w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                  selectedImage === idx
                    ? 'ring-2 ring-gold'
                    : 'border border-text-secondary/20'
                }`}
              >
                <div className="w-full h-full bg-cream-blush flex items-center justify-center text-xs text-text-secondary">
                  {img.label}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Right: Product Information */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col gap-8"
        >
          <div>
            <h2 className="font-display text-h3 text-text-primary mb-2">AUREIM Dark Chocolate</h2>
            <p className="text-sm font-light tracking-wide text-text-secondary">80% Single-Origin Cocoa</p>
          </div>

          {/* Price */}
          <div className="border-t border-text-secondary/10 pt-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-light text-text-primary">₹1,299</span>
            </div>
            <p className="text-xs font-light text-text-secondary tracking-wide">Inclusive of all taxes</p>
          </div>

          {/* Ingredients */}
          <div className="border-t border-text-secondary/10 pt-6">
            <h4 className="font-display text-base font-light tracking-widest uppercase mb-4">Pure Ingredients</h4>
            <ul className="space-y-2 text-sm text-text-secondary font-light">
              <li>• Organic Cocoa Mass (80%)</li>
              <li>• Organic Cocoa Butter</li>
              <li>• Monk Fruit Extract</li>
              <li>• Himalayan Pink Salt</li>
            </ul>
          </div>

          {/* Quantity Selector */}
          <div className="border-t border-text-secondary/10 pt-6">
            <p className="text-xs font-light tracking-widest uppercase text-text-secondary mb-4">Quantity</p>
            <div className="flex items-center gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity === 1}
                className="w-10 h-10 border border-text-secondary/30 rounded-md flex items-center justify-center hover:bg-text-primary/10 transition-colors disabled:opacity-50"
              >
                <Minus size={16} />
              </motion.button>
              <span className="text-lg font-light w-8 text-center">{quantity}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                disabled={quantity === 10}
                className="w-10 h-10 border border-text-secondary/30 rounded-md flex items-center justify-center hover:bg-text-primary/10 transition-colors disabled:opacity-50"
              >
                <Plus size={16} />
              </motion.button>
              <span className="text-xs text-text-secondary/60 ml-4">(Max 10 for exclusivity)</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 border-t border-text-secondary/10 pt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={isAdding}
              className="btn-luxury-gold w-full"
            >
              {isAdding ? 'ADDING...' : 'ADD TO CART'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBuyNow}
              className="btn-luxury w-full"
            >
              BUY NOW
            </motion.button>
          </div>

          {/* Gift Option */}
          <div className="flex items-center gap-3 p-4 bg-cream-blush rounded-lg">
            <input
              type="checkbox"
              id="gift"
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="gift" className="text-sm font-light text-text-secondary cursor-pointer flex-1">
              Gift wrapping <span className="text-gold">+ ₹150</span>
            </label>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductDetails
