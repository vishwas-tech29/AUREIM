import React from 'react'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '../data/products'
import LazyImage from './LazyImage'

const Testimonials = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < rating
            ? 'text-amber-400 fill-current'
            : 'text-stone-600'
        }`}
      />
    ))
  }

  return (
    <section className="section-spacing section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-h1 font-serif text-beige mb-6">
            Moments Shared
          </h2>
          <p className="text-xl text-stone-300 max-w-2xl mx-auto">
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
              <div className="absolute top-6 left-6 text-amber-800/30">
                <Quote size={32} />
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-stone-300 text-lg leading-relaxed mb-8 italic">
                "{testimonial.text}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-stone-800 pt-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <LazyImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-center">
                    <div className="text-beige font-medium mb-1">
                      {testimonial.name}
                    </div>
                    <div className="text-stone-400 text-sm">
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
          <p className="text-stone-300 mb-6">
            Join thousands of others in their journey of mindful indulgence
          </p>
          <button className="btn-primary">
            Share Your Story
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials