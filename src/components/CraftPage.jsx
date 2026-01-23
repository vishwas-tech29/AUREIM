import React from 'react'
import { Leaf, Heart, Award, Clock, Users, Globe } from 'lucide-react'
import LazyImage from './LazyImage'

const CraftPage = ({ onBack }) => {
  const craftSteps = [
    {
      id: 1,
      title: "Bean Selection",
      description: "We source the finest single-origin cocoa beans from ethical farms across Madagascar, Ecuador, and Venezuela.",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop&crop=center&q=80",
      details: "Our master chocolatiers travel to origin farms, building relationships with farmers and selecting only the top 5% of beans based on flavor profile, aroma, and ethical farming practices."
    },
    {
      id: 2,
      title: "Roasting Mastery",
      description: "Each batch is carefully roasted using traditional techniques passed down through generations of Indian artisans.",
      image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&h=400&fit=crop&crop=center&q=80",
      details: "Temperature and timing are precisely controlled to develop the unique flavor notes of each origin. Our roasting process takes 18-24 hours, allowing the beans to develop their full complexity."
    },
    {
      id: 3,
      title: "Grinding & Conching",
      description: "Stone grinding and conching for 72 hours creates the silky smooth texture that defines AUREIM chocolate.",
      image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&h=400&fit=crop&crop=center&q=80",
      details: "Our granite stone mills, imported from Switzerland, grind the cocoa to particle sizes smaller than 20 microns, creating an incredibly smooth mouthfeel."
    },
    {
      id: 4,
      title: "Tempering & Molding",
      description: "Precise temperature control during tempering ensures the perfect snap and glossy finish of our chocolates.",
      image: "https://images.unsplash.com/photo-1571197119282-7c4e2b2d7b4a?w=600&h=400&fit=crop&crop=center&q=80",
      details: "Using the traditional tempering method, we carefully control crystallization to achieve the perfect texture and appearance that luxury chocolate demands."
    },
    {
      id: 5,
      title: "Aging & Quality",
      description: "Each batch is aged for minimum 30 days, allowing flavors to mature and develop their full complexity.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center&q=80",
      details: "Our climate-controlled aging rooms maintain perfect humidity and temperature, allowing the chocolate to develop its signature depth and character."
    },
    {
      id: 6,
      title: "Mindful Packaging",
      description: "Hand-wrapped in sustainable packaging that preserves freshness while honoring our commitment to the environment.",
      image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&h=400&fit=crop&crop=center&q=80",
      details: "Each piece is individually wrapped by hand using biodegradable materials, ensuring both product integrity and environmental responsibility."
    }
  ]

  const values = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainable Sourcing",
      description: "Direct trade partnerships ensuring fair wages and environmental protection",
      stats: "100% Ethical"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Mindful Creation",
      description: "Every step infused with intention and respect for the craft",
      stats: "72 Hours Process"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Artisan Quality",
      description: "Handcrafted by master chocolatiers with decades of experience",
      stats: "30+ Years Experience"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Time-Honored Methods",
      description: "Traditional techniques combined with modern precision",
      stats: "Ancient Wisdom"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Impact",
      description: "Supporting farming communities and preserving traditional methods",
      stats: "500+ Farmers"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Heritage",
      description: "Celebrating cocoa origins while honoring Indian wellness philosophy",
      stats: "15+ Origins"
    }
  ]

  return (
    <div className="min-h-screen bg-stone-950 pt-24">
      <div className="section-padding section-spacing">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-2 text-stone-400 hover:text-beige transition-colors duration-300 mb-8"
            >
              ← Back to Home
            </button>
            
            <h1 className="text-hero-mobile md:text-hero font-serif text-beige mb-8 leading-tight">
              The Craft of
              <span className="block text-gradient">Pure Bliss</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-stone-300 max-w-4xl mx-auto leading-relaxed">
              Discover the ancient art and modern precision behind every piece of AUREIM chocolate. 
              From bean to bar, each step is a meditation in mindful craftsmanship.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative mb-20">
            <div className="aspect-[21/9] rounded-2xl overflow-hidden">
              <LazyImage
                src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1400&h=600&fit=crop&crop=center&q=80"
                alt="Artisan chocolate making process"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent rounded-2xl" />
            <div className="absolute bottom-8 left-8 right-8 text-center">
              <h2 className="text-h2 font-serif text-beige mb-4">
                Where Ancient Wisdom Meets Modern Precision
              </h2>
              <p className="text-stone-200 max-w-2xl mx-auto">
                Every AUREIM chocolate is born from a 6-step process that honors both tradition and innovation
              </p>
            </div>
          </div>

          {/* Craft Process */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-h1 font-serif text-beige mb-6">
                Our Six-Step Journey
              </h2>
              <p className="text-xl text-stone-300 max-w-3xl mx-auto">
                From the moment we select our beans to the final hand-wrapped piece, 
                every step is guided by mindfulness and mastery.
              </p>
            </div>

            <div className="space-y-20">
              {craftSteps.map((step, index) => (
                <div key={step.id} className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  {/* Content */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-amber-800 rounded-full flex items-center justify-center">
                        <span className="text-stone-950 font-bold text-lg">{step.id}</span>
                      </div>
                      <h3 className="text-h2 font-serif text-beige">
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-xl text-stone-300 leading-relaxed mb-6">
                      {step.description}
                    </p>
                    
                    <p className="text-stone-400 leading-relaxed">
                      {step.details}
                    </p>
                  </div>

                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                      <LazyImage
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-amber-800/30 rounded-full" />
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-amber-800/20 to-transparent rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values Grid */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-h1 font-serif text-beige mb-6">
                Our Values in Action
              </h2>
              <p className="text-xl text-stone-300 max-w-3xl mx-auto">
                Every aspect of our craft is guided by principles that honor both people and planet
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="card-luxury p-8 text-center group">
                  <div className="w-16 h-16 bg-amber-800/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-800/30 transition-colors duration-300">
                    <div className="text-amber-800">
                      {value.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-serif text-beige mb-4">
                    {value.title}
                  </h3>
                  
                  <p className="text-stone-400 leading-relaxed mb-4">
                    {value.description}
                  </p>
                  
                  <div className="text-amber-200 font-medium text-sm">
                    {value.stats}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-h1 font-serif text-beige mb-6">
                From Bean to Bliss
              </h2>
              <p className="text-xl text-stone-300 max-w-3xl mx-auto">
                The complete journey takes 45-60 days from bean selection to your first taste
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-800 to-amber-200" />
              
              <div className="space-y-12">
                {[
                  { day: "Day 1-7", title: "Bean Selection & Sourcing", description: "Careful selection and ethical sourcing from origin farms" },
                  { day: "Day 8-14", title: "Roasting & Development", description: "18-24 hour roasting process to develop flavor complexity" },
                  { day: "Day 15-21", title: "Grinding & Conching", description: "72-hour stone grinding and conching for perfect texture" },
                  { day: "Day 22-28", title: "Tempering & Molding", description: "Precise temperature control for perfect crystallization" },
                  { day: "Day 29-45", title: "Aging & Maturation", description: "Climate-controlled aging for flavor development" },
                  { day: "Day 46-60", title: "Quality & Packaging", description: "Final quality checks and mindful hand packaging" }
                ].map((phase, index) => (
                  <div key={index} className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="card-luxury p-6 inline-block max-w-md">
                        <div className="text-amber-200 font-medium text-sm mb-2">{phase.day}</div>
                        <h4 className="text-lg font-serif text-beige mb-3">{phase.title}</h4>
                        <p className="text-stone-400 text-sm">{phase.description}</p>
                      </div>
                    </div>
                    
                    <div className="w-4 h-4 bg-amber-800 rounded-full border-4 border-stone-950 relative z-10" />
                    
                    <div className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="card-luxury p-12 max-w-4xl mx-auto">
              <h2 className="text-h2 font-serif text-beige mb-6">
                Experience the Craft
              </h2>
              <p className="text-xl text-stone-300 mb-8 leading-relaxed">
                Every piece of AUREIM chocolate carries within it the dedication, 
                skill, and mindfulness of our artisan process. Taste the difference 
                that true craftsmanship makes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={onBack}
                  className="btn-primary text-lg px-12 py-5"
                >
                  Shop Our Collection
                </button>
                <button className="btn-secondary text-lg px-12 py-5">
                  Visit Our Atelier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CraftPage