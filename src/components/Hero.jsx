import React from 'react'
import { ChevronDown } from 'lucide-react'
import LazyImage from './LazyImage'

const Hero = () => {
  const scrollToCollection = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToStory = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <LazyImage
          src="https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=1920&h=1080&fit=crop&crop=center&q=80"
          alt="Luxury chocolate background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-950/95 via-stone-900/90 to-stone-950/95">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,53,15,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(254,243,199,0.08),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center section-padding max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-hero-mobile md:text-hero font-serif text-beige mb-8 leading-tight">
            Moments of
            <span className="block text-gradient">Pure Bliss</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-stone-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Mindful luxury crafted in India. Each piece is a ritual of 
            <span className="text-amber-200"> guilt-free indulgence</span>, 
            designed for those who seek wellness in every moment.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={scrollToCollection}
              className="btn-primary text-lg px-12 py-5"
            >
              Shop Now
            </button>
            <button 
              onClick={scrollToStory}
              className="btn-secondary text-lg px-12 py-5"
            >
              Our Philosophy
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={scrollToCollection}
          className="text-stone-400 hover:text-beige transition-colors duration-300"
        >
          <ChevronDown size={32} />
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-amber-800 rounded-full opacity-60 animate-pulse" />
      <div className="absolute top-1/3 right-16 w-1 h-1 bg-amber-200 rounded-full opacity-40 animate-pulse delay-1000" />
      <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-amber-100 rounded-full opacity-30 animate-pulse delay-500" />
    </section>
  )
}

export default Hero