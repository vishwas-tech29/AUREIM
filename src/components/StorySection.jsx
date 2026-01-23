import React from 'react'
import { Leaf, Heart, Globe } from 'lucide-react'
import LazyImage from './LazyImage'

const StorySection = () => {
  const values = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainable Sourcing",
      description: "Direct trade partnerships with cocoa farmers, ensuring fair wages and sustainable practices."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Mindful Craftsmanship",
      description: "Each piece is handcrafted with intention, creating moments of pure mindfulness."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Heritage",
      description: "Celebrating the finest cocoa origins while honoring traditional Indian wellness philosophy."
    }
  ]

  return (
    <section id="story" className="section-spacing section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-h1 font-serif text-beige mb-6">
                Our Journey
              </h2>
              <p className="text-xl text-stone-300 leading-relaxed mb-8">
                Born from a vision to create chocolate that nourishes both body and soul, 
                AUREIM represents the perfect harmony between indulgence and wellness.
              </p>
              <p className="text-lg text-stone-400 leading-relaxed mb-8">
                Our story began in the heart of India, where ancient wisdom meets modern 
                craftsmanship. We source the finest single-origin cocoa from ethical farms 
                across the globe, transforming them into moments of pure bliss through 
                traditional techniques and mindful practices.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="text-amber-800 mt-1">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-beige mb-2">
                      {value.title}
                    </h3>
                    <p className="text-stone-400 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-secondary">
              Read Our Full Story
            </button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <LazyImage
                src="/images/aureim-story.jpeg"
                alt="AUREIM luxury chocolate brand story and craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-amber-800/30 rounded-full" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-800/20 to-transparent rounded-full" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-stone-800">
          <div className="text-center">
            <div className="text-3xl font-serif text-amber-200 mb-2">15+</div>
            <div className="text-stone-400 text-sm tracking-wide">Origin Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-serif text-amber-200 mb-2">100%</div>
            <div className="text-stone-400 text-sm tracking-wide">Ethical Sourcing</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-serif text-amber-200 mb-2">50K+</div>
            <div className="text-stone-400 text-sm tracking-wide">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-serif text-amber-200 mb-2">5★</div>
            <div className="text-stone-400 text-sm tracking-wide">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StorySection