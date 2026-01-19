import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'

const Navigation = ({ cartCount, onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollBlur, setScrollBlur] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Hide/show on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      // Increase blur on scroll
      setScrollBlur(Math.min(currentScrollY / 100, 1))
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const menuItems = ['Our Story', 'The Chocolate', 'Philosophy', 'Contact']

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -150, opacity: isVisible ? 1 : 0 }}
      transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-5xl"
    >
      <div
        className="h-20 rounded-full border border-white/30 bg-cream-primary/80 shadow-overlay flex items-center justify-between px-8 transition-all duration-300"
        style={{
          backdropFilter: `blur(${20 + scrollBlur * 10}px)`,
          background: `rgba(245, 241, 237, ${0.8 + scrollBlur * 0.2})`,
        }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-xl font-display font-medium tracking-wider text-cocoa-primary"
        >
          AUREIM
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-12">
          {menuItems.map((item) => (
            <motion.a
              key={item}
              href="#"
              className="text-sm font-medium text-text-primary tracking-wide relative group"
              whileHover={{ scale: 1.05 }}
            >
              {item}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gold origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>

        {/* Cart Icon */}
        <motion.button
          onClick={onCartClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative text-cocoa-primary hidden sm:block"
        >
          <ShoppingBag size={24} />
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-gold text-cocoa-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
            >
              {cartCount}
            </motion.span>
          )}
        </motion.button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-cocoa-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={`absolute top-24 left-1/2 -translate-x-1/2 w-full bg-cream-primary rounded-2xl shadow-luxury p-6 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-text-primary tracking-wide hover:text-gold transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  )
}

export default Navigation
