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
      case 'cod':
        return 'Cash on Delivery'
      default:
        return 'Payment Method'
    }
  }

  return (
    <div className="card-luxury p-8">
      <h2 className="text-h2 font-serif text-beige mb-8">
        Review Your Order
      </h2>

      <div className="space-y-8">
        {/* Shipping Information */}
        <div className="border border-stone-700 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-serif text-beige">Shipping Address</h3>
            <button
              onClick={onEditShipping}
              className="text-amber-800 hover:text-amber-700 transition-colors duration-300 flex items-center gap-2"
            >
              <Edit size={16} />
              Edit
            </button>
          </div>
          
          <div className="text-stone-300 space-y-1">
            <div className="font-medium">{shippingInfo.fullName}</div>
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
        <div className="border border-stone-700 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-serif text-beige">Payment Method</h3>
            <button
              onClick={onEditPayment}
              className="text-amber-800 hover:text-amber-700 transition-colors duration-300 flex items-center gap-2"
            >
              <Edit size={16} />
              Edit
            </button>
          </div>
          
          <div className="text-stone-300">
            {getPaymentMethodDisplay()}
          </div>
        </div>

        {/* Order Items */}
        <div className="border border-stone-700 rounded-xl p-6">
          <h3 className="text-lg font-serif text-beige mb-6">Order Items</h3>
          
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 py-4 border-b border-stone-800 last:border-b-0">
                <LazyImage
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-beige font-medium">{item.name}</h4>
                      <p className="text-stone-400 text-sm">{item.description}</p>
                      <div className="flex gap-2 mt-2">
                        {item.notes?.slice(0, 2).map((note, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-stone-800 text-stone-300 text-xs rounded-full"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-stone-400 text-sm">Qty: {item.quantity}</div>
                      <div className="text-amber-200 font-medium">
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
        <div className="border border-stone-700 rounded-xl p-6">
          <h3 className="text-lg font-serif text-beige mb-6">Order Total</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between text-stone-300">
              <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <span>{formatCurrency(totals.subtotal)}</span>
            </div>
            
            <div className="flex justify-between text-stone-300">
              <span>Tax (GST 18%)</span>
              <span>{formatCurrency(totals.tax)}</span>
            </div>
            
            <div className="flex justify-between text-stone-300">
              <span>Shipping</span>
              <span>
                {totals.shipping === 0 ? (
                  <span className="text-green-400">Free</span>
                ) : (
                  formatCurrency(totals.shipping)
                )}
              </span>
            </div>
            
            {paymentInfo.method === 'cod' && (
              <div className="flex justify-between text-stone-300">
                <span>COD Charges</span>
                <span>{formatCurrency(50)}</span>
              </div>
            )}
            
            <div className="border-t border-stone-700 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-xl font-medium text-beige">Total</span>
                <span className="text-2xl font-serif text-amber-200">
                  {formatCurrency(totals.total + (paymentInfo.method === 'cod' ? 50 : 0))}
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
              className="mt-1 w-4 h-4 text-amber-800 bg-stone-800 border-stone-600 rounded focus:ring-amber-800"
            />
            <label htmlFor="terms" className="text-stone-300 text-sm">
              I agree to the{' '}
              <a href="#terms" className="text-amber-800 hover:text-amber-700 underline">
                Terms & Conditions
              </a>{' '}
              and understand the return policy.
            </label>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-400 ml-7">{errors.terms}</p>
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
              className="mt-1 w-4 h-4 text-amber-800 bg-stone-800 border-stone-600 rounded focus:ring-amber-800"
            />
            <label htmlFor="privacy" className="text-stone-300 text-sm">
              I agree to the{' '}
              <a href="#privacy" className="text-amber-800 hover:text-amber-700 underline">
                Privacy Policy
              </a>{' '}
              and consent to data processing.
            </label>
          </div>
          {errors.privacy && (
            <p className="text-sm text-red-400 ml-7">{errors.privacy}</p>
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
        <div className="flex justify-center gap-8 pt-6 border-t border-stone-800">
          <div className="text-center">
            <div className="text-green-400 text-sm font-medium">🔒 Secure Checkout</div>
            <div className="text-stone-500 text-xs">SSL Encrypted</div>
          </div>
          <div className="text-center">
            <div className="text-green-400 text-sm font-medium">💰 Money-back Guarantee</div>
            <div className="text-stone-500 text-xs">30-day return</div>
          </div>
          <div className="text-center">
            <div className="text-green-400 text-sm font-medium">🚚 Fast Delivery</div>
            <div className="text-stone-500 text-xs">2-5 business days</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderReview