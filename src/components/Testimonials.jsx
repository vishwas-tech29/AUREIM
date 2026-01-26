import React from 'react'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '../data/products'

const Testimonials = ({ onNavigate }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < rating
            ? 'text-caramel-gold fill-current'
            : 'text-text-muted'
        }`}
      />
    ))
  }

  return (
    <section className="section-spacing section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-h1 font-serif text-cocoa-dark mb-6">
            Moments Shared
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Stories from our community of mindful chocolate lovers
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="card-luxury p-8 text-center relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 text-caramel-gold/30">
                <Quote size={32} />
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-text-muted text-lg leading-relaxed mb-8 italic">
                "{testimonial.text}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-cream-beige pt-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-center">
                    <div className="text-text-charcoal font-medium mb-1">
                      {testimonial.name}
                    </div>
                    <div className="text-text-muted text-sm">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-text-muted mb-6">
            Join thousands of others in their journey of mindful indulgence
          </p>
          <button 
            onClick={() => onNavigate && onNavigate('reviews')}
            className="btn-primary"
          >
            Share Your Story
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials