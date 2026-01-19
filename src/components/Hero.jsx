import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative w-full h-screen md:h-[100vh] overflow-hidden bg-gradient-to-b from-cream-primary via-cream-blush to-cream-primary flex items-center">
      {/* Background Circle */}
      <motion.div
        className="absolute right-10 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cream-blush blur-3xl -z-10"
        style={{
          y: scrollY * 0.3,
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Vertical Text */}
            <motion.div
              className="hidden md:flex absolute left-12 top-1/2 -translate-y-1/2 opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div
                className="text-xs font-light tracking-widest text-text-secondary whitespace-nowrap"
                style={{
                  transform: 'rotate(-90deg)',
                  transformOrigin: 'center',
                }}
              >
                R E F I N E D · D A R K · P U R E
              </div>
            </motion.div>

            {/* Center: Hero Content */}
            <motion.div
              className="col-span-1 md:col-span-7 md:col-start-3 text-center md:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.small
                variants={itemVariants}
                className="text-small font-light tracking-widest text-text-secondary uppercase block mb-6"
              >
                Refined Dark
              </motion.small>

              <motion.h1
                variants={itemVariants}
                className="font-display text-5xl md:text-hero font-normal leading-tight mb-6 text-text-primary"
              >
                Chocolate
                <br />
                Redefined
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-body text-text-secondary leading-relaxed mb-10 max-w-2xl"
              >
                Experience the pure essence of chocolate with AUREIM 80% Cocoa Dark Chocolate.
                Crafted with single-origin cocoa and sweetened naturally with monk fruit.
              </motion.p>

              <motion.button
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 20px rgba(184, 149, 106, 0.5)',
                }}
                whileTap={{ scale: 0.98 }}
                className="btn-luxury-gold"
              >
                DISCOVER AUREIM
              </motion.button>
            </motion.div>

            {/* Right: Product Image Placeholder */}
            <motion.div
              className="col-span-1 md:col-span-3 hidden md:flex items-center justify-center relative"
              style={{
                y: scrollY * 0.5,
              }}
            >
              <motion.div
                className="relative w-64 h-80 bg-gradient-to-b from-cocoa-secondary to-cocoa-primary rounded-xl shadow-luxury"
                whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(62, 39, 35, 0.25)' }}
                transition={{ duration: 0.3 }}
                style={{
                  transform: 'perspective(1000px) rotateY(15deg) rotateZ(-15deg)',
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-cream-primary text-sm font-light tracking-widest">
                  Premium Chocolate Bar
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
