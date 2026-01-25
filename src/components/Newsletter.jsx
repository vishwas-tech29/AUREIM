import React, { useState } from 'react'
import { Mail, ArrowRight } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail('')
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <section className="section-spacing section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="card-luxury p-12 text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-20 h-20 border border-caramel-gold rounded-full" />
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-caramel-gold rounded-full" />
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-caramel-light rounded-full" />
          </div>

          <div className="relative z-10">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-caramel-gold/20 rounded-full mb-8">
              <Mail className="w-8 h-8 text-caramel-gold" />
            </div>

            {/* Heading */}
            <h2 className="text-h2 font-serif text-cocoa-dark mb-6">
              Join Our Circle
            </h2>
            
            <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto leading-relaxed">
              Be the first to discover new releases, exclusive collections, and 
              insights into mindful living. Moments of bliss, delivered.
            </p>

            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 bg-cream-beige border border-cream-soft rounded-full text-text-charcoal placeholder-text-muted focus:outline-none focus:border-caramel-gold transition-colors duration-300"
                    required
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-caramel-gold hover:bg-caramel-light text-chocolate-dark rounded-full font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    Subscribe
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="max-w-md mx-auto">
                <div className="bg-caramel-gold/20 border border-caramel-gold/30 rounded-full px-8 py-4 text-caramel-gold">
                  ✓ Welcome to the AUREIM circle! Check your email for a special welcome gift.
                </div>
              </div>
            )}

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-cream-beige">
              <div className="text-center">
                <div className="text-caramel-gold font-medium mb-2">New Releases</div>
                <div className="text-text-muted text-sm">Be first to taste our latest creations</div>
              </div>
              <div className="text-center">
                <div className="text-caramel-gold font-medium mb-2">Exclusive Access</div>
                <div className="text-text-muted text-sm">Limited editions and member-only collections</div>
              </div>
              <div className="text-center">
                <div className="text-caramel-gold font-medium mb-2">Mindful Living</div>
                <div className="text-text-muted text-sm">Tips for wellness and conscious indulgence</div>
              </div>
            </div>

            <p className="text-text-muted text-sm mt-8">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter