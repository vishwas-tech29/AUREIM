import React, { useState } from 'react'
import { ArrowLeft, Edit, Check, Lock } from 'lucide-react'
import { formatCurrency } from '../utils/excelExport'
import LazyImage from './LazyImage'

const OrderReview = ({ 
  shippingInfo, 
  paymentInfo, 
  cartItems, 
  totals, 
  onSubmit, 
  onBack, 
  onEditShipping, 
  onEditPayment 
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!termsAccepted) {
      newErrors.terms = 'Please accept the Terms & Conditions'
    }
    if (!privacyAccepted) {
      newErrors.privacy = 'Please accept the Privacy Policy'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit()
  }

  const getPaymentMethodDisplay = () => {
    switch (paymentInfo.method) {
      case 'card':
        return `Card ending in ${paymentInfo.cardNumber?.slice(-4) || '****'}`
      case 'upi':
        return `UPI: ${paymentInfo.upiId}`
      case 'netbanking':
        return `Net Banking: ${paymentInfo.bank}`
      case 'wallet':
        return `Digital Wallet: ${paymentInfo.wallet}`
      case 'razorpay':
        return 'Razorpay Payment Gateway'
      default:
        return 'Payment Method'
    }
  }

  return (
    <div className="card-luxury p-8">
      <h2 className="text-h2 font-serif text-text-primary mb-8">
        Review Your Order
      </h2>

      <div className="space-y-8">
        {/* Shipping Information */}
        <div className="border border-cream-beige rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-serif text-text-primary">Shipping Address</h3>
            <button
              onClick={onEditShipping}
              className="text-caramel-gold hover:text-caramel-light transition-colors duration-300 flex items-center gap-2"
            >
              <Edit size={16} />
              Edit
            </button>
          </div>
          
          <div className="text-text-secondary space-y-1">
            <div className="font-medium text-text-primary">{shippingInfo.fullName}</div>
            <div>{shippingInfo.email}</div>
            <div>{shippingInfo.phone}</div>
            <div className="pt-2">
              <div>{shippingInfo.addressLine1}</div>
              {shippingInfo.addressLine2 && <div>{shippingInfo.addressLine2}</div>}
              {shippingInfo.landmark && <div>Near {shippingInfo.landmark}</div>}
              <div>{shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pinCode}</div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="border border-cream-beige rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-serif text-text-primary">Payment Method</h3>
            <button
              onClick={onEditPayment}
              className="text-caramel-gold hover:text-caramel-light transition-colors duration-300 flex items-center gap-2"
            >
              <Edit size={16} />
              Edit
            </button>
          </div>
          
          <div className="text-text-secondary font-medium">
            {getPaymentMethodDisplay()}
          </div>
        </div>

        {/* Order Items */}
        <div className="border border-cream-beige rounded-xl p-6">
          <h3 className="text-lg font-serif text-text-primary mb-6">Order Items</h3>
          
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 py-4 border-b border-cream-beige last:border-b-0">
                <LazyImage
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-text-primary font-medium">{item.name}</h4>
                      <p className="text-text-secondary text-sm">{item.description}</p>
                      <div className="flex gap-2 mt-2">
                        {item.notes?.slice(0, 2).map((note, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-cream-beige text-text-secondary text-xs rounded-full"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-text-secondary text-sm">Qty: {item.quantity}</div>
                      <div className="text-caramel-gold font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Total */}
        <div className="border border-cream-beige rounded-xl p-6">
          <h3 className="text-lg font-serif text-text-primary mb-6">Order Total</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between text-text-secondary">
              <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <span>{formatCurrency(totals.subtotal)}</span>
            </div>
            
            {totals.tax > 0 && (
              <div className="flex justify-between text-text-secondary">
                <span>Tax</span>
                <span>{formatCurrency(totals.tax)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-text-secondary">
              <span>Delivery</span>
              <span>
                {totals.shipping === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  formatCurrency(totals.shipping)
                )}
              </span>
            </div>
            
            <div className="border-t border-cream-beige pt-3">
              <div className="flex justify-between items-center">
                <span className="text-xl font-medium text-text-primary">Total</span>
                <span className="text-2xl font-serif text-caramel-gold">
                  {formatCurrency(totals.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked)
                if (errors.terms) {
                  setErrors(prev => ({ ...prev, terms: '' }))
                }
              }}
              className="mt-1 w-4 h-4 text-caramel-gold bg-cream-beige border-cream-soft rounded focus:ring-caramel-gold"
            />
            <label htmlFor="terms" className="text-text-secondary text-sm">
              I agree to the{' '}
              <a href="#terms" className="text-caramel-gold hover:text-caramel-light underline">
                Terms & Conditions
              </a>{' '}
              and understand the return policy.
            </label>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-500 ml-7">{errors.terms}</p>
          )}

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="privacy"
              checked={privacyAccepted}
              onChange={(e) => {
                setPrivacyAccepted(e.target.checked)
                if (errors.privacy) {
                  setErrors(prev => ({ ...prev, privacy: '' }))
                }
              }}
              className="mt-1 w-4 h-4 text-caramel-gold bg-cream-beige border-cream-soft rounded focus:ring-caramel-gold"
            />
            <label htmlFor="privacy" className="text-text-secondary text-sm">
              I agree to the{' '}
              <a href="#privacy" className="text-caramel-gold hover:text-caramel-light underline">
                Privacy Policy
              </a>{' '}
              and consent to data processing.
            </label>
          </div>
          {errors.privacy && (
            <p className="text-sm text-red-500 ml-7">{errors.privacy}</p>
          )}
        </div>

        {/* Action Buttons */}
        <form onSubmit={handleSubmit} className="flex gap-4 pt-8">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 btn-secondary py-4 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Payment
          </button>
          
          <button
            type="submit"
            className="flex-1 btn-primary py-4 text-lg flex items-center justify-center gap-2"
          >
            <Lock size={20} />
            Place Order
          </button>
        </form>

        {/* Trust Badges */}
        <div className="flex justify-center gap-8 pt-6 border-t border-cream-beige">
          <div className="text-center">
            <div className="text-green-600 text-sm font-medium">🔒 Secure Checkout</div>
            <div className="text-text-secondary text-xs">SSL Encrypted</div>
          </div>
          <div className="text-center">
            <div className="text-green-600 text-sm font-medium">💰 Money-back Guarantee</div>
            <div className="text-text-secondary text-xs">30-day return</div>
          </div>
          <div className="text-center">
            <div className="text-green-600 text-sm font-medium">🚚 Fast Delivery</div>
            <div className="text-text-secondary text-xs">2-5 business days</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderReview