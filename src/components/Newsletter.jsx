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
            <div className="absolute top-10 left-10 w-20 h-20 border border-amber-800 rounded-full" />
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-amber-800 rounded-full" />
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-amber-200 rounded-full" />
          </div>

          <div className="relative z-10">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-800/20 rounded-full mb-8">
              <Mail className="w-8 h-8 text-amber-800" />
            </div>

            {/* Heading */}
            <h2 className="text-h2 font-serif text-beige mb-6">
              Join Our Circle
            </h2>
            
            <p className="text-xl text-stone-300 mb-8 max-w-2xl mx-auto leading-relaxed">
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
                    className="flex-1 px-6 py-4 bg-stone-800 border border-stone-700 rounded-full text-beige placeholder-stone-400 focus:outline-none focus:border-amber-800 transition-colors duration-300"
                    required
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-amber-800 hover:bg-amber-900 text-stone-950 rounded-full font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    Subscribe
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="max-w-md mx-auto">
                <div className="bg-amber-800/20 border border-amber-800/30 rounded-full px-8 py-4 text-amber-200">
                  ✓ Welcome to the AUREIM circle! Check your email for a special welcome gift.
                </div>
              </div>
            )}

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-stone-800">
              <div className="text-center">
                <div className="text-amber-200 font-medium mb-2">New Releases</div>
                <div className="text-stone-400 text-sm">Be first to taste our latest creations</div>
              </div>
              <div className="text-center">
                <div className="text-amber-200 font-medium mb-2">Exclusive Access</div>
                <div className="text-stone-400 text-sm">Limited editions and member-only collections</div>
              </div>
              <div className="text-center">
                <div className="text-amber-200 font-medium mb-2">Mindful Living</div>
                <div className="text-stone-400 text-sm">Tips for wellness and conscious indulgence</div>
              </div>
            </div>

            <p className="text-stone-500 text-sm mt-8">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter