import React from 'react'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import LazyImage from './LazyImage'
import { formatCurrency, calculateTax, calculateShipping, calculateDeliveryDate, formatDeliveryDate } from '../utils/excelExport'
import { validateCoupon } from '../utils/coupons'

const CartPage = ({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onProceedToCheckout, 
  onContinueShopping 
}) => {
  const [couponCode, setCouponCode] = React.useState('')
  const [appliedCoupon, setAppliedCoupon] = React.useState(null)
  const [couponError, setCouponError] = React.useState('')
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discount = appliedCoupon ? appliedCoupon.discount : 0
  const subtotalAfterDiscount = subtotal - discount
  const tax = calculateTax(subtotalAfterDiscount)
  const shipping = calculateShipping(subtotalAfterDiscount)
  const total = subtotalAfterDiscount + tax + shipping
  const deliveryDate = calculateDeliveryDate()

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code')
      return
    }
    
    const result = validateCoupon(couponCode, subtotal)
    
    if (result.valid) {
      setAppliedCoupon(result)
      setCouponError('')
    } else {
      setCouponError(result.message)
      setAppliedCoupon(null)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    setCouponError('')
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream-soft pt-24">
        <div className="section-padding section-spacing">
          <div className="max-w-2xl mx-auto text-center">
            {/* Empty Cart State */}
            <div className="card-luxury p-12">
              <div className="w-24 h-24 mx-auto mb-8 bg-cream-beige rounded-full flex items-center justify-center">
                <ShoppingBag size={32} className="text-text-muted" />
              </div>
              
              <h2 className="text-h2 font-serif text-cocoa-dark mb-4">
                Your cart is empty
              </h2>
              
              <p className="text-text-muted mb-8 leading-relaxed">
                Discover our collection of mindful luxury chocolates and start your journey of pure bliss.
              </p>
              
              <button 
                onClick={onContinueShopping}
                className="btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-soft pt-24">
      <div className="section-padding section-spacing">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <button 
              onClick={onContinueShopping}
              className="text-text-muted hover:text-cocoa-dark transition-colors duration-300"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-h1 font-serif text-cocoa-dark">
              Your Cart
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="card-luxury p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <LazyImage
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-serif text-cocoa-dark mb-2">
                            {item.name}
                          </h3>
                          <p className="text-text-muted text-sm mb-2">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.notes?.slice(0, 2).map((note, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-cream-beige text-text-charcoal text-xs rounded-full"
                              >
                                {note}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-text-muted hover:text-red-500 transition-colors duration-300 p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 rounded-full bg-cream-beige text-text-charcoal hover:bg-caramel-light transition-colors duration-300 flex items-center justify-center"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-text-charcoal w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-cream-beige text-text-charcoal hover:bg-caramel-light transition-colors duration-300 flex items-center justify-center"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-text-muted mb-1">
                            {formatCurrency(item.price)} each
                          </div>
                          <div className="text-xl font-serif text-caramel-gold">
                            {formatCurrency(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="card-luxury p-8 sticky top-32">
                <h3 className="text-h3 font-serif text-cocoa-dark mb-6">
                  Order Summary
                </h3>

                {/* Coupon Section */}
                <div className="mb-6 pb-6 border-b border-cream-beige">
                  <label className="block text-sm font-medium text-text-charcoal mb-2">
                    Promo Code
                  </label>
                  {!appliedCoupon ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase())
                          setCouponError('')
                        }}
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 bg-cream-beige border border-cream-soft rounded-lg text-text-charcoal placeholder-text-muted focus:outline-none focus:border-caramel-gold text-sm"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-caramel-gold text-chocolate-dark rounded-lg font-medium text-sm hover:bg-caramel-light transition-colors duration-300"
                      >
                        Apply
                      </button>
                    </div>
                  ) : (
                    <div className="bg-caramel-gold/10 border border-caramel-gold/30 rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium text-cocoa-dark">{appliedCoupon.coupon.code}</div>
                        <div className="text-xs text-text-muted">{appliedCoupon.coupon.description}</div>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-text-muted hover:text-cocoa-dark text-sm font-medium"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  {couponError && (
                    <p className="text-xs text-red-500 mt-2">{couponError}</p>
                  )}
                </div>

                {/* Pricing Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-text-muted">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-caramel-gold font-medium">
                      <span>Discount ({appliedCoupon.coupon.discountValue}%)</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-text-muted">
                    <span>Tax (GST 18%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  
                  <div className="flex justify-between text-text-muted">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        formatCurrency(shipping)
                      )}
                    </span>
                  </div>
                  
                  {subtotalAfterDiscount < 500 && (
                    <div className="text-xs text-text-muted italic bg-cream-beige p-2 rounded">
                      Free shipping on orders over ₹500
                    </div>
                  )}
                </div>

                {/* Delivery Date */}
                <div className="mb-6 pb-6 border-t border-b border-cream-beige">
                  <div className="text-sm text-text-muted mb-2">Estimated Delivery</div>
                  <div className="text-sm font-medium text-cocoa-dark">
                    {formatDeliveryDate(deliveryDate)}
                  </div>
                  <div className="text-xs text-text-muted mt-1">3 working days</div>
                </div>

                <div className="border-t border-cream-beige pt-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-cocoa-dark">Total</span>
                    <span className="text-2xl font-serif text-caramel-gold">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => onProceedToCheckout({ subtotal: subtotalAfterDiscount, tax, shipping, total, discount, coupon: appliedCoupon?.coupon })}
                  className="w-full btn-primary text-lg py-4 mb-4"
                >
                  Proceed to Checkout
                </button>

                <button 
                  onClick={onContinueShopping}
                  className="w-full btn-secondary text-sm py-3"
                >
                  Continue Shopping
                </button>

                {/* Trust Badges */}
                <div className="mt-8 pt-6 border-t border-cream-beige">
                  <div className="text-center space-y-2">
                    <div className="text-xs text-text-muted uppercase tracking-wide">
                      Secure Checkout
                    </div>
                    <div className="flex justify-center gap-4 text-xs text-text-muted">
                      <span>🔒 SSL Encrypted</span>
                      <span>💳 Secure Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage