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
    <section className="relative hero-container pt-16 sm:pt-20">
      {/* Clean background - no image or gradients */}
      <div className="absolute inset-0 bg-white z-0"></div>

      {/* Content */}
      <div className="relative z-10 hero-content">
        <div className="animate-fade-in">
          <div className="mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-medium tracking-widest text-caramel-gold uppercase animate-bounce" style={{animationDuration: '2s'}}>
              ✨ Premium Luxury Chocolate
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-text-primary mb-6 sm:mb-8 leading-tight animate-slide-up">
            Moments of
            <span className="block text-gradient">Pure Bliss</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-slide-up" style={{animationDelay: '0.2s'}}>
            Mindful luxury crafted in India. Each piece is a ritual of 
            <span className="text-caramel-gold font-medium"> guilt-free indulgence</span>, 
            designed for those who seek wellness in every moment.
          </p>

          <div className="btn-group animate-slide-up" style={{animationDelay: '0.4s'}}>
            <button 
              onClick={scrollToCollection}
              className="btn-primary text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 hover:shadow-luxury transform hover:scale-105 transition-all duration-300"
            >
              Shop Now
            </button>
            <button 
              onClick={scrollToStory}
              className="btn-secondary text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 hover:scale-105 transition-all duration-300"
            >
              Our Philosophy
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with Animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <button 
          onClick={scrollToCollection}
          className="text-text-muted hover:text-cocoa-dark transition-colors duration-300 p-2"
        >
          <ChevronDown size={32} />
        </button>
      </div>

      {/* Animated Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-caramel-gold rounded-full opacity-60 animate-pulse z-10" />
      <div className="absolute top-1/3 right-16 w-1 h-1 bg-caramel-light rounded-full opacity-40 animate-pulse z-10" style={{animationDelay: '1s'}} />
      <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-caramel-gold rounded-full opacity-30 animate-pulse z-10" style={{animationDelay: '0.5s'}} />
      
      {/* Floating Cards Animation */}
      <div className="absolute top-20 right-10 w-32 h-40 bg-white/10 backdrop-blur-sm rounded-xl border border-caramel-gold/20 animate-float z-5" style={{animationDuration: '6s'}} />
      <div className="absolute bottom-32 left-20 w-24 h-32 bg-white/5 backdrop-blur-sm rounded-xl border border-caramel-gold/10 animate-float z-5" style={{animationDuration: '8s', animationDelay: '1s'}} />
    </section>
  )
}

export default Hero