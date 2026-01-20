import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const ValueProposition = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section
      ref={ref}
      className="relative w-full py-24 md:py-32 bg-gradient-to-b from-cream-blush to-cream-primary overflow-hidden"
    >
      {/* Decorative gradient circles */}
      <div className="absolute top-20 -left-32 w-64 h-64 bg-gradient-to-br from-gold/10 to-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 right-0 w-96 h-96 bg-gradient-to-bl from-cocoa-primary/5 to-cocoa-secondary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center space-y-8"
        >
          {/* Top Bar */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4">
            <motion.div className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
            <span className="text-sm font-light tracking-widest text-text-secondary uppercase">
              Pure Indulgence
            </span>
            <motion.div className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
          </motion.div>

          {/* Main Text */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-light tracking-tight text-text-primary"
          >
            80% Cocoa · Zero Added Sugar · 100% Organic
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-text-secondary font-light italic max-w-3xl mx-auto"
          >
            Bold flavor. Minimal sweetness.
          </motion.p>

          {/* Separator */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 pt-4"
          >
            <div className="w-8 h-0.5 bg-gold" />
            <div className="w-2 h-2 bg-gold rounded-full" />
            <div className="w-8 h-0.5 bg-gold" />
          </motion.div>

          {/* Three Pillars */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12"
          >
            {[
              {
                title: "Single-Origin",
                description: "Sourced from Kerala's finest organic estates"
              },
              {
                title: "Monk Fruit Sweetened",
                description: "Natural sweetness without compromise"
              },
              {
                title: "Small-Batch Crafted",
                description: "Artisanal quality in every bar"
              }
            ].map((pillar, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="space-y-3"
              >
                <h3 className="text-lg font-medium text-text-primary tracking-wide">
                  {pillar.title}
                </h3>
                <p className="text-text-secondary font-light">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ValueProposition
