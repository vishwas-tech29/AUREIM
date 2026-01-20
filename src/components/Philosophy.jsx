import React from 'react'
import { motion } from 'framer-motion'
import { Leaf, Scale, Heart } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const Philosophy = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  })

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    hover: {
      y: -12,
      transition: { duration: 0.3 },
    },
  }

  const philosophyCards = [
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
      icon: Heart,
      title: 'Crafted, Not Made',
      description: 'Small-batch production. Each bar is a ritual, not an assembly line.',
    },
  ]

  return (
    <section
      ref={ref}
      id="philosophy"
      className="relative w-full py-24 md:py-40 overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-primary via-cream-blush to-cream-primary" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-cocoa-primary/5 to-transparent pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-bl from-gold/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cocoa-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-light tracking-tight text-text-primary mb-6">
            The AUREIM Philosophy
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
            <p className="text-text-secondary font-light italic text-lg">Mindful Indulgence Redefined</p>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
          </div>
        </motion.div>

        {/* Philosophy Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-24"
        >
          {philosophyCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="group"
              >
                <div className="h-full p-8 md:p-10 bg-gradient-to-br from-white/60 to-cream-blush/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-overlay hover:shadow-luxury transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(249, 245, 241, 0.6) 100%)',
                  backdropFilter: 'blur(10px) saturate(180%)',
                }}>
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-amber-500/20 flex items-center justify-center mb-6"
                  >
                    <Icon size={32} className="text-cocoa-primary" strokeWidth={1.5} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-display font-normal text-text-primary mb-4">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary font-light leading-relaxed">
                    {card.description}
                  </p>

                  {/* Hover indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4 }}
                    className="h-0.5 bg-gradient-to-r from-gold to-amber-500 mt-6"
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Blockquote Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="relative">
            {/* Quotation mark decoration */}
            <motion.div
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-gold/30 text-9xl leading-none font-display mb-4"
            >
              "
            </motion.div>

            {/* Quote text */}
            <blockquote className="text-4xl md:text-5xl font-display font-light text-text-primary leading-tight mb-6">
              AUREIM is not just chocolate.
              <br />
              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-gold"
              >
                It is a mindful pause.
              </motion.span>
            </blockquote>

            {/* Closing quotation mark */}
            <motion.div
              animate={{ rotate: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="text-gold/30 text-9xl leading-none font-display text-right"
            >
              "
            </motion.div>
          </div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mt-12 origin-center"
          />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-24 text-center"
        >
          <p className="text-lg text-text-secondary font-light mb-8 max-w-2xl mx-auto">
            Each bite is an opportunity to pause, savor, and reconnect with the essential moment of pleasure.
            This is not indulgence without consequence—it is indulgence with intention.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-luxury px-12 py-4 text-base font-medium tracking-widest"
          >
            EXPLORE FURTHER
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Philosophy
