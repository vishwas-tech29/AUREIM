import React from 'react'

const FeaturedMessage = () => {
  return (
    <section className="section-spacing section-padding">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-slide-up">
          <p className="text-2xl md:text-3xl font-serif text-beige leading-relaxed mb-8">
            We believe chocolate is more than indulgence—it's a moment of mindfulness, 
            a ritual of self-care, and a celebration of ethical craftsmanship.
          </p>
          
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-800 to-transparent mx-auto" />
          
          <p className="text-lg text-stone-300 mt-8 font-light tracking-wide">
            Handcrafted with intention. Made in India, loved worldwide.
          </p>
        </div>
      </div>
    </section>
  )
}

export default FeaturedMessage