import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Leaf, Scale, Hand } from 'lucide-react'

const Philosophy = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const cards = [
    {
      icon: Leaf,
      title: 'Sourced with Purpose',
      description: 'Single-origin cocoa from Kerala\'s organic estates. Traceability from tree to bar.',
    },
    {
      icon: Scale,
      title: 'Sweetened Mindfully',
      description: 'Monk fruit—nature\'s sweetness without compromise. Zero sugar, full flavor.',
    },
    {
      icon: Hand,
      title: 'Crafted, Not Made',
      description: 'Small-batch production. Each bar is a ritual, not an assembly line.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section
      ref={ref}
      className="relative section-padding bg-gradient-to-b from-cream-primary to-cream-blush"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="600" cy="400" r="400" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="font-display text-h2 text-text-primary text-center mb-20"
        >
          The AUREIM Philosophy
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-20"
        >
          {cards.map((card, idx) => {
            const Icon = card.icon
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="luxury-card"
              >
                <div className="flex items-start gap-4 mb-4">
                  <Icon className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
                </div>
                <h3 className="font-display text-h3 text-text-primary mb-3">{card.title}</h3>
                <p className="text-sm text-text-secondary font-light leading-relaxed">{card.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Blockquote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-center border-t border-text-secondary/10 pt-16"
        >
          <blockquote className="font-display text-2xl md:text-3xl italic text-text-primary font-light leading-relaxed">
            "AUREIM is not just chocolate.
            <br />
            It is a mindful pause."
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}

export default Philosophy
