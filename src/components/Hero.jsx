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
    <section className="relative hero-container pt-16 sm:pt-20 overflow-hidden">
      {/* Enhanced Animated Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream-primary via-cream-soft to-cream-blush"></div>
        
        {/* Large Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-caramel-gold/5 to-caramel-light/5 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-caramel-light/8 to-caramel-gold/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s', animationDuration: '10s'}}></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-caramel-gold/30 rounded-full animate-float`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-3" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, #D4A574 1px, transparent 1px),
                           radial-gradient(circle at 80% 80%, #E2B885 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 40px 40px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 hero-content">
        <div className="animate-fade-in">
          <div className="mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-medium tracking-widest text-caramel-gold uppercase animate-bounce inline-block" style={{animationDuration: '2s'}}>
              ✨ Premium Luxury Chocolate
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-text-primary mb-6 sm:mb-8 leading-tight">
            <span className="inline-block animate-slide-up">Moments of</span>
            <span className="block text-gradient animate-slide-up" style={{animationDelay: '0.2s'}}>Pure Bliss</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-slide-up" style={{animationDelay: '0.4s'}}>
            Mindful luxury crafted in India. Each piece is a ritual of 
            <span className="text-caramel-gold font-medium animate-pulse"> guilt-free indulgence</span>, 
            designed for those who seek wellness in every moment.
          </p>

          <div className="btn-group animate-slide-up" style={{animationDelay: '0.6s'}}>
            <button 
              onClick={scrollToCollection}
              className="btn-primary text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 hover:shadow-luxury transform hover:scale-105 transition-all duration-300 animate-glow"
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

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10" style={{animationDelay: '1s'}}>
        <button 
          onClick={scrollToCollection}
          className="text-text-muted hover:text-caramel-gold transition-colors duration-300 p-2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase">Discover</span>
          <ChevronDown size={24} className="animate-pulse" />
        </button>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 right-10 w-32 h-40 bg-white/10 backdrop-blur-sm rounded-xl border border-caramel-gold/20 animate-float z-5" style={{animationDuration: '6s'}} />
      <div className="absolute bottom-32 left-20 w-24 h-32 bg-white/5 backdrop-blur-sm rounded-xl border border-caramel-gold/10 animate-float z-5" style={{animationDuration: '8s', animationDelay: '1s'}} />
      <div className="absolute top-1/2 right-1/4 w-16 h-20 bg-caramel-gold/5 backdrop-blur-sm rounded-lg border border-caramel-light/20 animate-float z-5" style={{animationDuration: '7s', animationDelay: '2s'}} />
    </section>
  )
}

export default Hero