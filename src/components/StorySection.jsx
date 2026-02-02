import { Leaf, Heart, Globe } from 'lucide-react'

const StorySection = ({ onNavigate }) => {
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
              <h2 className="text-h1 font-serif text-cocoa-dark mb-6">
                Our Journey
              </h2>
              <p className="text-xl text-text-muted leading-relaxed mb-8">
                Born from a vision to create chocolate that nourishes both body and soul, 
                AUREIM represents the perfect harmony between indulgence and wellness.
              </p>
              <p className="text-lg text-text-muted leading-relaxed mb-8">
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
                  <div className="text-caramel-gold mt-1">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-cocoa-dark mb-2">
                      {value.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed">
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
              <img
                src="/images/aureim-story.jpeg"
                alt="AUREIM luxury chocolate brand story and craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-caramel-gold/30 rounded-full" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-caramel-gold/20 to-transparent rounded-full" />
          </div>
        </div>

        {/* Share Your Story Section */}
        <div className="mt-20 pt-16 border-t border-cream-beige text-center">
          <h3 className="text-h2 font-serif text-cocoa-dark mb-6">
            Share Your Story
          </h3>
          <p className="text-lg text-text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            We'd love to hear about your AUREIM experience. Share your thoughts, 
            rate our chocolates, and become part of our growing community of 
            mindful chocolate lovers.
          </p>
          <button 
            onClick={() => onNavigate && onNavigate('reviews')}
            className="btn-primary px-8 py-4"
          >
            Write a Review
          </button>
        </div>
      </div>
    </section>
  )
}

export default StorySection