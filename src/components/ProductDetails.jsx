import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

const ProductDetails = ({ onAddToCart, onBuyNow }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [addedMessage, setAddedMessage] = useState(false)

  const images = [
    { id: 1, label: 'Front' },
    { id: 2, label: 'Side' },
    { id: 3, label: 'Detail' },
  ]

  const handleAddToCart = () => {
    setIsAdding(true)
    setTimeout(() => {
      onAddToCart(quantity)
      setIsAdding(false)
      setAddedMessage(true)
      setQuantity(1)
      setTimeout(() => setAddedMessage(false), 3000)
    }, 600)
  }

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(10, value))
    setQuantity(newQuantity)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section id="chocolate" className="section-padding max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20"
      >
        {/* Left: Image Carousel */}
        <motion.div variants={itemVariants} className="flex flex-col gap-6">
          {/* Main Image */}
          <motion.div
            className="relative w-full aspect-square bg-gradient-to-br from-cream-blush to-cream-primary rounded-2xl overflow-hidden shadow-luxury border border-white/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex flex-col items-center justify-center text-text-secondary"
            >
              {/* Chocolate Bar Visualization */}
              <div className="relative w-32 h-48 bg-gradient-to-br from-cocoa-primary via-cocoa-secondary to-cocoa-primary rounded-lg shadow-2xl" style={{
                transform: `rotateY(${selectedImage * 10}deg) rotateX(${selectedImage * 5}deg)`,
                transformStyle: 'preserve-3d',
              }}>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/30 to-white/10" />
                <div className="absolute inset-4 flex flex-col gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex-1 bg-cocoa-primary/50 rounded" />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-cream-primary text-center text-sm font-display">AUREIM</span>
                </div>
              </div>
              <p className="mt-6 text-text-secondary font-light tracking-wide">{images[selectedImage].label} View</p>
            </motion.div>
          </motion.div>

          {/* Thumbnail Selection */}
          <div className="flex gap-4">
            {images.map((image, index) => (
              <motion.button
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className={`flex-1 aspect-square rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                  selectedImage === index
                    ? 'border-gold shadow-luxury'
                    : 'border-white/20 hover:border-gold/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-cream-blush to-cream-primary flex items-center justify-center text-xs text-text-secondary font-light">
                  {image.label}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Right: Product Information */}
        <motion.div variants={containerVariants} className="space-y-8">
          {/* Title */}
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-display font-normal text-text-primary mb-2">
              AUREIM Dark Chocolate
            </h2>
            <p className="text-xl text-gold tracking-wide font-light">80% Single-Origin Cocoa</p>
          </motion.div>

          {/* Price */}
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-display font-normal text-cocoa-primary">
                ₹1,299
              </span>
              <span className="text-text-secondary text-sm font-light">Inclusive of all taxes</span>
            </div>
          </motion.div>

          {/* Ingredients */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary tracking-wide">Pure Ingredients</h3>
            <ul className="space-y-3">
              {[
                'Organic Cocoa Mass (80%)',
                'Organic Cocoa Butter',
                'Monk Fruit Extract',
                'Himalayan Pink Salt (trace)'
              ].map((ingredient, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-text-secondary font-light"
                >
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                  {ingredient}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Nutrition Highlight */}
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-gold/10 to-amber-500/10 rounded-xl p-6 border border-gold/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-display font-bold text-cocoa-primary">0g</div>
                <div className="text-xs text-text-secondary uppercase tracking-wide mt-1">Added Sugar</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-cocoa-primary">12g</div>
                <div className="text-xs text-text-secondary uppercase tracking-wide mt-1">Protein</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-cocoa-primary">65%</div>
                <div className="text-xs text-text-secondary uppercase tracking-wide mt-1">Cocoa Solids</div>
              </div>
            </div>
          </motion.div>

          {/* Quantity Selector */}
          <motion.div variants={itemVariants} className="space-y-3">
            <label className="text-sm font-medium text-text-primary tracking-wide">Quantity</label>
            <div className="flex items-center gap-4 bg-cream-blush rounded-full p-2 w-fit">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuantityChange(quantity - 1)}
                className="p-2 hover:bg-white/50 rounded-full transition-colors"
              >
                <Minus size={20} className="text-text-primary" />
              </motion.button>
              <span className="w-8 text-center font-medium text-text-primary">{quantity}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuantityChange(quantity + 1)}
                className="p-2 hover:bg-white/50 rounded-full transition-colors"
              >
                <Plus size={20} className="text-text-primary" />
              </motion.button>
            </div>
            <p className="text-xs text-text-secondary font-light">Maximum 10 bars per order</p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="space-y-4 pt-4">
            <motion.button
              onClick={handleAddToCart}
              disabled={isAdding}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-luxury-gold py-4 text-base relative overflow-hidden group"
            >
              <AnimatePresence mode="wait">
                {!isAdding && !addedMessage && (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="block font-medium tracking-widest"
                  >
                    ADD TO CART
                  </motion.span>
                )}
                {isAdding && (
                  <motion.span
                    key="adding"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="block font-medium tracking-widest"
                  >
                    ADDING...
                  </motion.span>
                )}
                {addedMessage && (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="block font-medium tracking-widest"
                  >
                    ADDED ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={onBuyNow}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-luxury py-4 text-base font-medium tracking-widest"
            >
              BUY NOW
            </motion.button>

            {/* Gift Option */}
            <motion.label
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 text-sm text-text-secondary font-light cursor-pointer hover:text-text-primary transition-colors"
            >
              <input type="checkbox" className="w-4 h-4 accent-gold" />
              <span>Add luxury gift wrapping (+₹150)</span>
            </motion.label>
          </motion.div>

          {/* Product Details */}
          <motion.div variants={itemVariants} className="space-y-4 pt-8 border-t border-white/20">
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-text-secondary font-light uppercase tracking-wide mb-1">Weight</p>
                <p className="font-medium text-text-primary">100g</p>
              </div>
              <div>
                <p className="text-text-secondary font-light uppercase tracking-wide mb-1">Origin</p>
                <p className="font-medium text-text-primary">Kerala, India</p>
              </div>
              <div>
                <p className="text-text-secondary font-light uppercase tracking-wide mb-1">Shelf Life</p>
                <p className="font-medium text-text-primary">18 months</p>
              </div>
              <div>
                <p className="text-text-secondary font-light uppercase tracking-wide mb-1">Storage</p>
                <p className="font-medium text-text-primary">Cool & Dry</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ProductDetails
