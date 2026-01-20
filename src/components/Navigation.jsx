import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

const Navigation = ({ cartCount = 0, onCartClick = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollBlur, setScrollBlur] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY
      
      if (currentScrollY > 10) {
        setHasScrolled(true)
      }
      
      if (scrollDelta > 5 && currentScrollY > 100) {
        setIsVisible(false)
      } else if (scrollDelta < -5) {
        setIsVisible(true)
      }
      
      setScrollBlur(Math.min(currentScrollY / 200, 0.8))
      setLastScrollY(currentScrollY)
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('keydown', handleEscape)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [lastScrollY, isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const menuItems = [
    { label: 'Our Story', href: '#story' },
    { label: 'The Chocolate', href: '#chocolate' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Contact', href: '#contact' }
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -150, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ 
          delay: 0.8, 
          duration: 0.6, 
          type: 'spring',
          stiffness: 100,
          damping: 15
        }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-5xl"
      >
        <div
          className="h-20 rounded-full border border-white/30 flex items-center justify-between px-6 md:px-8 transition-all duration-300"
          style={{
            backdropFilter: `blur(${8 + scrollBlur * 12}px) saturate(180%)`,
            background: `linear-gradient(to bottom, 
              rgba(245, 241, 237, ${0.95 - (scrollBlur * 0.1)}), 
              rgba(240, 236, 232, ${0.92 - (scrollBlur * 0.1)}))`,
            boxShadow: hasScrolled 
              ? `0 20px 40px rgba(0, 0, 0, ${0.08 + scrollBlur * 0.07}),
                 inset 0 1px 0 rgba(255, 255, 255, 0.3)` 
              : '0 8px 32px rgba(0, 0, 0, 0.08)',
            borderColor: `rgba(255, 255, 255, ${0.5 - scrollBlur * 0.2})`,
          }}
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl font-display font-medium tracking-widest text-cocoa-primary cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            AUREIM
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-10">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-text-primary tracking-wide relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + (index * 0.1) }}
              >
                {item.label}
                <motion.div
                  className="absolute bottom-0 left-1/2 h-0.5 bg-gold w-0 -translate-x-1/2"
                  initial={{ width: 0 }}
                  whileHover={{ width: "80%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Cart Icon */}
            <motion.button
              onClick={onCartClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 rounded-full bg-gradient-to-br from-cream-primary to-white shadow-md"
            >
              <ShoppingCart 
                size={24} 
                className="text-cocoa-primary"
                strokeWidth={2}
              />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="cart-count"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    className="absolute -top-1 -right-1 bg-gradient-to-br from-gold to-amber-500 text-cocoa-primary text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-cocoa-primary relative w-6 h-6"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-full h-0.5 bg-cocoa-primary rounded-full"
              />
              <motion.div
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute top-1/2 left-0 w-full h-0.5 bg-cocoa-primary rounded-full -translate-y-1/2"
              />
              <motion.div
                animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 w-full h-0.5 bg-cocoa-primary rounded-full"
              />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4 }}
              className="fixed top-28 left-1/2 -translate-x-1/2 w-11/12 max-w-md bg-gradient-to-b from-cream-primary to-white rounded-3xl shadow-2xl p-8 z-50 md:hidden border border-white/20"
            >
              <nav className="flex flex-col gap-4">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-lg font-medium text-text-primary py-4 px-6 rounded-xl hover:bg-white/50 transition-all"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
              
              <motion.button
                onClick={() => {
                  setIsOpen(false)
                  setTimeout(() => onCartClick(), 300)
                }}
                className="w-full mt-8 flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-cocoa-primary to-cocoa-secondary text-cream-primary rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <ShoppingCart size={22} />
                <span>View Cart</span>
                {cartCount > 0 && (
                  <motion.span className="bg-gold text-cocoa-primary text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
