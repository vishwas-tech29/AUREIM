import React, { useState } from 'react'
import { Star, ArrowLeft, Send, Heart, ThumbsUp } from 'lucide-react'
import LazyImage from './LazyImage'

const ReviewPage = ({ onBack, products }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productId: 1,
      customerName: 'Priya Sharma',
      rating: 5,
      title: 'Absolutely Divine!',
      comment: 'The 85% dark chocolate is pure perfection. Rich, smooth, and guilt-free. The monk fruit sweetening is barely noticeable - just pure chocolate bliss.',
      date: '2024-01-20',
      verified: true,
      helpful: 12,
      images: []
    },
    {
      id: 2,
      productId: 1,
      customerName: 'Rajesh Kumar',
      rating: 4,
      title: 'Great Quality',
      comment: 'Excellent chocolate with authentic taste. The packaging is premium and the delivery was quick. Will definitely order again.',
      date: '2024-01-18',
      verified: true,
      helpful: 8,
      images: []
    },
    {
      id: 3,
      productId: 2,
      customerName: 'Anita Desai',
      rating: 5,
      title: 'Perfect Gift Choice',
      comment: 'Bought this as a gift for my sister. She absolutely loved it! The presentation is beautiful and the taste is exceptional.',
      date: '2024-01-15',
      verified: true,
      helpful: 15,
      images: []
    }
  ])

  const [newReview, setNewReview] = useState({
    productId: 1,
    rating: 5,
    title: '',
    comment: '',
    customerName: ''
  })

  const [showReviewForm, setShowReviewForm] = useState(false)

  const handleSubmitReview = (e) => {
    e.preventDefault()
    
    const review = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toISOString().split('T')[0],
      verified: false,
      helpful: 0,
      images: []
    }

    setReviews([review, ...reviews])
    setNewReview({
      productId: 1,
      rating: 5,
      title: '',
      comment: '',
      customerName: ''
    })
    setShowReviewForm(false)
  }

  const handleHelpful = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ))
  }

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onRatingChange(star) : undefined}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform duration-200`}
          >
            <Star
              size={20}
              className={`${
                star <= rating
                  ? 'text-caramel-gold fill-caramel-gold'
                  : 'text-cream-beige'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  const getAverageRating = () => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach(review => {
      distribution[review.rating]++
    })
    return distribution
  }

  const ratingDistribution = getRatingDistribution()

  return (
    <div className="min-h-screen bg-cream-primary pt-24">
      <div className="section-padding section-spacing">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <button 
              onClick={onBack}
              className="text-text-secondary hover:text-text-primary transition-colors duration-300"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-h1 font-serif text-text-primary">
              Customer Reviews
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Reviews Summary */}
            <div className="lg:col-span-1">
              <div className="card-luxury p-8 sticky top-32">
                <div className="text-center mb-8">
                  <div className="text-5xl font-serif text-caramel-gold mb-2">
                    {getAverageRating()}
                  </div>
                  <div className="flex justify-center mb-2">
                    {renderStars(Math.round(getAverageRating()))}
                  </div>
                  <p className="text-text-secondary">
                    Based on {reviews.length} reviews
                  </p>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-3 mb-8">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm text-text-secondary w-6">
                        {rating}★
                      </span>
                      <div className="flex-1 bg-cream-beige rounded-full h-2">
                        <div
                          className="bg-caramel-gold h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${reviews.length > 0 ? (ratingDistribution[rating] / reviews.length) * 100 : 0}%`
                          }}
                        />
                      </div>
                      <span className="text-sm text-text-secondary w-8">
                        {ratingDistribution[rating]}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowReviewForm(true)}
                  className="w-full btn-primary py-3 mb-4"
                >
                  Write a Review
                </button>

                <p className="text-xs text-text-secondary text-center">
                  Share your experience with AUREIM chocolates
                </p>
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-2">
              {/* Review Form */}
              {showReviewForm && (
                <div className="card-luxury p-8 mb-8">
                  <h3 className="text-xl font-serif text-text-primary mb-6">
                    Write Your Review
                  </h3>

                  <form onSubmit={handleSubmitReview} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={newReview.customerName}
                        onChange={(e) => setNewReview({...newReview, customerName: e.target.value})}
                        className="w-full px-4 py-3 bg-cream-beige border border-cream-soft rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-caramel-gold transition-colors duration-300"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Product
                      </label>
                      <select
                        value={newReview.productId}
                        onChange={(e) => setNewReview({...newReview, productId: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 bg-cream-beige border border-cream-soft rounded-lg text-text-primary focus:outline-none focus:border-caramel-gold transition-colors duration-300"
                      >
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Rating
                      </label>
                      {renderStars(newReview.rating, true, (rating) => 
                        setNewReview({...newReview, rating})
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Review Title
                      </label>
                      <input
                        type="text"
                        value={newReview.title}
                        onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                        className="w-full px-4 py-3 bg-cream-beige border border-cream-soft rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-caramel-gold transition-colors duration-300"
                        placeholder="Summarize your experience"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Your Review
                      </label>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 bg-cream-beige border border-cream-soft rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-caramel-gold transition-colors duration-300 resize-none"
                        placeholder="Tell us about your experience with this product..."
                        required
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
                      >
                        <Send size={18} />
                        Submit Review
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="flex-1 btn-secondary py-3"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Reviews */}
              <div className="space-y-6">
                {reviews.map((review) => {
                  const product = products.find(p => p.id === review.productId)
                  return (
                    <div key={review.id} className="card-luxury p-8">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-caramel-light to-caramel-gold rounded-full flex items-center justify-center text-chocolate-dark font-serif text-xl">
                          {review.customerName.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium text-text-primary">
                              {review.customerName}
                            </h4>
                            {review.verified && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            {renderStars(review.rating)}
                            <span className="text-sm text-text-secondary">
                              {new Date(review.date).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                          {product && (
                            <p className="text-sm text-text-secondary">
                              Reviewed: {product.name}
                            </p>
                          )}
                        </div>
                      </div>

                      <h5 className="font-medium text-text-primary mb-3">
                        {review.title}
                      </h5>

                      <p className="text-text-secondary leading-relaxed mb-4">
                        {review.comment}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-cream-beige">
                        <button
                          onClick={() => handleHelpful(review.id)}
                          className="flex items-center gap-2 text-text-secondary hover:text-caramel-gold transition-colors duration-300"
                        >
                          <ThumbsUp size={16} />
                          <span className="text-sm">
                            Helpful ({review.helpful})
                          </span>
                        </button>

                        <div className="flex items-center gap-4">
                          <button className="text-text-secondary hover:text-red-400 transition-colors duration-300">
                            <Heart size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {reviews.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">⭐</div>
                  <h3 className="text-xl font-serif text-text-primary mb-2">
                    No Reviews Yet
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Be the first to share your experience with AUREIM chocolates
                  </p>
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="btn-primary px-8 py-3"
                  >
                    Write First Review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewPage