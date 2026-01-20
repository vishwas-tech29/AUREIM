import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Mail, Heart } from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { label: 'Our Story', href: '#story' },
        { label: 'The Chocolate', href: '#chocolate' },
        { label: 'Philosophy', href: '#philosophy' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQ', href: '#' },
        { label: 'Shipping & Returns', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms & Conditions', href: '#' },
      ],
    },
  ]

  return (
    <footer className="relative w-full bg-cocoa-primary text-cream-primary overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cocoa-primary via-cocoa-secondary to-cocoa-primary opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-gold/5 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16"
          >
            {/* Column 1: Brand */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="text-2xl font-display font-medium tracking-widest mb-2">
                  AUREIM
                </h3>
                <p className="text-sm text-cream-primary/80 font-light italic">
                  Indulge Smart. Indulge Pure.
                </p>
              </div>
              <p className="text-cream-primary/70 font-light text-sm leading-relaxed">
                Crafting moments of refined indulgence through single-origin organic chocolate.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-4 pt-4">
                <motion.a
                  href="https://instagram.com/aureim"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 rounded-full bg-cream-primary/10 hover:bg-cream-primary/20 transition-colors"
                >
                  <Instagram size={20} />
                </motion.a>
                <motion.a
                  href="mailto:hello@aureim.com"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 rounded-full bg-cream-primary/10 hover:bg-cream-primary/20 transition-colors"
                >
                  <Mail size={20} />
                </motion.a>
              </div>
            </motion.div>

            {/* Columns 2-3: Links */}
            {footerLinks.map((column, idx) => (
              <motion.div key={idx} variants={itemVariants} className="space-y-6">
                <h4 className="text-sm font-medium tracking-widest uppercase text-cream-primary/90">
                  {column.title}
                </h4>
                <nav className="space-y-3">
                  {column.links.map((link, linkIdx) => (
                    <motion.a
                      key={linkIdx}
                      href={link.href}
                      whileHover={{ x: 4 }}
                      className="text-cream-primary/70 hover:text-cream-primary font-light text-sm transition-colors block"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </nav>
              </motion.div>
            ))}

            {/* Column 4: Newsletter */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-sm font-medium tracking-widest uppercase text-cream-primary/90">
                Join the Circle
              </h4>
              <p className="text-cream-primary/70 font-light text-sm">
                Receive mindful updates. No noise.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-cream-primary/10 border border-cream-primary/20 rounded-lg text-cream-primary placeholder:text-cream-primary/50 font-light text-sm focus:outline-none focus:border-cream-primary/50 transition-colors"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={subscribed}
                  className="w-full px-4 py-3 bg-gold text-cocoa-primary font-medium text-sm rounded-lg hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {subscribed ? (
                    <>
                      <Heart size={16} className="fill-current" />
                      <span>Thank you!</span>
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: false }}
            className="h-px bg-gradient-to-r from-transparent via-cream-primary/20 to-transparent my-12 origin-left"
          />

          {/* Bottom Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="space-y-4 text-center md:text-left"
          >
            <motion.p variants={itemVariants} className="text-cream-primary/70 font-light text-sm">
              Made in India. Designed for the world.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row items-center md:items-baseline justify-center md:justify-between gap-4 text-cream-primary/60 text-xs font-light"
            >
              <span>© 2025 AUREIM. All rights reserved.</span>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-cream-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-cream-primary transition-colors">Terms</a>
                <a href="#" className="hover:text-cream-primary transition-colors">Cookies</a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Subtle Animation Background */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </footer>
  )
}

export default Footer
