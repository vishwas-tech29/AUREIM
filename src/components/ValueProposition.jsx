import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ValueProposition = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.8 })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative py-12 md:py-16 px-6"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-blush via-cream-primary to-cream-primary -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs md:text-small font-light tracking-widest uppercase text-text-secondary mb-4"
        >
          80% Cocoa <span className="text-gold">·</span> Zero Added Sugar <span className="text-gold">·</span> 100% Organic
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg italic text-text-secondary font-light"
        >
          Bold flavor. Minimal sweetness.
        </motion.p>
      </div>
    </motion.section>
  )
}

export default ValueProposition
