import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <footer className="bg-cocoa-primary text-cream-primary border-t border-gold/20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        className="section-padding max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Column 1: Brand */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="font-display text-2xl font-light tracking-wider">AUREIM</h3>
            <p className="text-cream-primary/80 text-sm font-light leading-relaxed">
              Indulge Smart. Indulge Pure.
            </p>
            <div className="flex gap-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="w-10 h-10 rounded-full border border-cream-primary/30 flex items-center justify-center hover:border-gold transition-colors"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="w-10 h-10 rounded-full border border-cream-primary/30 flex items-center justify-center hover:border-gold transition-colors"
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2: Explore */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h4 className="text-xs font-light tracking-widest uppercase">Explore</h4>
            <nav className="flex flex-col gap-3">
              {['Our Story', 'The Chocolate', 'Philosophy', 'Contact'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm font-light text-cream-primary/80 hover:text-gold transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Column 3: Newsletter */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h4 className="text-xs font-light tracking-widest uppercase">Join the Circle</h4>
            <p className="text-sm font-light text-cream-primary/80">
              Receive mindful updates. No noise.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-cream-primary/10 border border-cream-primary/30 rounded-l-lg px-4 py-2 text-cream-primary placeholder-cream-primary/50 focus:outline-none text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-gold text-cocoa-primary px-4 py-2 rounded-r-lg font-medium text-sm hover:shadow-luxury transition-all"
              >
                Join
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="border-t border-cream-primary/20 pt-8 text-center"
        >
          <p className="text-sm font-light text-cream-primary/70 mb-2">
            Made in India. Designed for the world.
          </p>
          <p className="text-xs font-light text-cream-primary/60">
            © {currentYear} AUREIM. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer
