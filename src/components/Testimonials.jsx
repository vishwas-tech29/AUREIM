import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      quote: 'Finally, a chocolate that respects my palate. The monk fruit sweetness is a revelation.',
      author: 'Priya M.',
      location: 'Mumbai',
    },
    {
      id: 2,
      quote: 'The craftsmanship is evident in every bite. This is not just chocolate, it\'s an experience.',
      author: 'James L.',
      location: 'London',
    },
    {
      id: 3,
      quote: 'Worth every rupee. The purity of ingredients shines through. A true luxury indulgence.',
      author: 'Yuki K.',
      location: 'Tokyo',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="section-padding bg-gradient-to-b from-cream-blush to-cream-primary">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.5 }}
          className="font-display text-h2 text-text-primary text-center mb-16"
        >
          Voices of Connoisseurs
        </motion.h2>

        {/* Carousel */}
        <div className="relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="font-serif text-2xl md:text-3xl italic text-text-primary font-light leading-relaxed mb-8">
              "{testimonials[currentIndex].quote}"
            </p>
            <p className="text-sm font-light tracking-widest uppercase text-text-secondary">
              — {testimonials[currentIndex].author}, {testimonials[currentIndex].location}
            </p>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-text-secondary/30 flex items-center justify-center hover:border-gold transition-colors"
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  animate={{
                    backgroundColor: idx === currentIndex ? '#B8956A' : 'rgba(109, 93, 82, 0.2)',
                    width: idx === currentIndex ? 32 : 8,
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-text-secondary/30 flex items-center justify-center hover:border-gold transition-colors"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
