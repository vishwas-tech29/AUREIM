import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const Testimonials = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  })

  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const testimonials = [
    {
      quote: 'Finally, a chocolate that respects my palate. The monk fruit sweetness is a revelation.',
      author: 'Priya M.',
      location: 'Mumbai',
    },
    {
      quote: 'AUREIM has transformed how I think about luxury indulgence. Pure, unapologetic excellence.',
      author: 'Arjun K.',
      location: 'Bangalore',
    },
    {
      quote: 'The craft and intention behind every bar is evident. This is chocolate as it should be.',
      author: 'Sarah Chen',
      location: 'Singapore',
    },
    {
      quote: 'I recommend AUREIM to everyone who understands that quality matters more than quantity.',
      author: 'James H.',
      location: 'London',
    },
  ]

  useEffect(() => {
    if (!autoplay) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setAutoplay(false)
  }

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoplay(false)
  }

  return (
    <section
      ref={ref}
      className="relative w-full py-24 md:py-40 bg-gradient-to-b from-cream-blush to-cream-primary overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 -right-40 w-80 h-80 bg-gradient-to-bl from-gold/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 -left-32 w-96 h-96 bg-gradient-to-tr from-cocoa-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-light tracking-tight text-text-primary mb-6">
            Voices of Connoisseurs
          </h2>
          <p className="text-lg text-text-secondary font-light">
            What those who truly appreciate fine chocolate have to say
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Review Cards */}
          <div className="min-h-80 md:min-h-72">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-center space-y-8"
              >
                {/* Quotation Mark */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-gold/40 text-7xl leading-none font-display"
                >
                  "
                </motion.div>

                {/* Quote Text */}
                <p className="text-2xl md:text-4xl font-light text-text-primary leading-relaxed italic max-w-3xl mx-auto">
                  {testimonials[current].quote}
                </p>

                {/* Author */}
                <div className="space-y-2">
                  <p className="text-xl font-medium text-text-primary">
                    — {testimonials[current].author}
                  </p>
                  <p className="text-sm text-text-secondary font-light tracking-wide uppercase">
                    {testimonials[current].location}
                  </p>
                </div>

                {/* Closing Quotation Mark */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="text-gold/40 text-7xl leading-none font-display text-right"
                >
                  "
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-8 mt-12">
            {/* Previous Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              onMouseEnter={() => setAutoplay(false)}
              className="relative group p-3 rounded-full border border-text-primary/20 hover:border-gold/50 transition-colors"
            >
              <ChevronLeft size={24} className="text-text-primary" />
              <div className="absolute -inset-4 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-gold/50 to-amber-500/50 blur-md rounded-full transition-opacity duration-300" />
            </motion.button>

            {/* Dot Indicators */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setCurrent(index)
                    setAutoplay(false)
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    index === current
                      ? 'bg-gold w-8 h-3'
                      : 'bg-gold/30 w-3 h-3 hover:bg-gold/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              onMouseEnter={() => setAutoplay(false)}
              className="relative group p-3 rounded-full border border-text-primary/20 hover:border-gold/50 transition-colors"
            >
              <ChevronRight size={24} className="text-text-primary" />
              <div className="absolute -inset-4 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-gold/50 to-amber-500/50 blur-md rounded-full transition-opacity duration-300" />
            </motion.button>
          </div>

          {/* Autoplay Indicator */}
          <div className="mt-8 text-center">
            <p className="text-xs text-text-secondary font-light tracking-wide uppercase">
              Auto-rotating — pause to read
            </p>
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: autoplay ? 1 : 0 }}
            key={`progress-${current}`}
            transition={{ duration: 8, linear: true }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-gold to-amber-500 rounded-full origin-left"
            style={{ width: '100px' }}
          />
        </div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-24 text-center border-t border-white/20 pt-16"
        >
          <p className="text-lg text-text-secondary font-light mb-8">
            Trusted by chocolate connoisseurs across 15+ countries
          </p>
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-gold">★★★★★</span>
            <span className="text-text-secondary font-light">4.9/5 from verified customers</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
