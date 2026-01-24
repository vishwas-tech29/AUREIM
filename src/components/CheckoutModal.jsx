import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'

const CheckoutModal = ({ isOpen, onClose, cartTotal }) => {
  const [step, setStep] = useState('form') // form, payment, success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  })
  const [selectedPayment, setSelectedPayment] = useState('razorpay')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.pincode) {
      alert('Please fill in all fields')
      return
    }
    setStep('payment')
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setStep('success')
      setTimeout(() => {
        onClose()
        setStep('form')
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          pincode: '',
        })
      }, 3000)
    }, 2000)
  }

  const displayPrice = (cartTotal * 1299).toLocaleString('en-IN')
  const shippingFree = cartTotal * 1299 >= 2500
  const shipping = shippingFree ? 0 : 100
  const total = cartTotal * 1299 + shipping

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0"
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-cream-primary to-cream-blush shadow-2xl border border-white/30"
              style={{
                background: 'linear-gradient(135deg, #f5f1ed 0%, #f9f5f1 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-white/30 rounded-full transition-colors z-10"
              >
                <X size={24} className="text-cocoa-primary" />
              </motion.button>

              {/* Content */}
              <AnimatePresence mode="wait">
                {step === 'form' && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-8 md:p-12"
                  >
                    <h2 className="text-4xl font-display font-light text-cocoa-primary mb-2">
                      Shipping Details
                    </h2>
                    <p className="text-text-secondary font-light mb-8">
                      Complete your AUREIM moment
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name */}
                      <div>
                        <label className="text-sm font-medium text-text-primary uppercase tracking-wide block mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/60 border border-white/40 rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                          placeholder="Your name"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-sm font-medium text-text-primary uppercase tracking-wide block mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/60 border border-white/40 rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                          placeholder="aureim.chocolates@gmail.com"
                          required
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="text-sm font-medium text-text-primary uppercase tracking-wide block mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/60 border border-white/40 rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                          placeholder="+91 90004 29689"
                          required
                        />
                      </div>

                      {/* Address */}
                      <div>
                        <label className="text-sm font-medium text-text-primary uppercase tracking-wide block mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/60 border border-white/40 rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                          placeholder="Street address"
                          required
                        />
                      </div>

                      {/* City & Pincode */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium text-text-primary uppercase tracking-wide block mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/60 border border-white/40 rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-primary uppercase tracking-wide block mb-2">
                            Pincode
                          </label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/60 border border-white/40 rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                            placeholder="Pincode"
                            required
                          />
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="bg-gradient-to-br from-gold/10 to-amber-500/10 rounded-xl p-6 border border-gold/20 space-y-3">
                        <div className="flex justify-between text-text-primary font-light">
                          <span>Subtotal</span>
                          <span>₹{displayPrice}</span>
                        </div>
                        <div className="flex justify-between text-text-primary font-light">
                          <span>Shipping</span>
                          <span className={shippingFree ? 'text-green-600 font-medium' : ''}>
                            {shippingFree ? 'FREE' : '₹100'}
                          </span>
                        </div>
                        <div className="border-t border-gold/20 pt-3 flex justify-between text-lg font-medium text-cocoa-primary">
                          <span>Total</span>
                          <span>₹{total.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full btn-luxury-gold py-4 text-base font-medium tracking-widest"
                      >
                        Continue to Payment
                      </motion.button>
                    </form>
                  </motion.div>
                )}

                {step === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-8 md:p-12"
                  >
                    <h2 className="text-4xl font-display font-light text-cocoa-primary mb-2">
                      Payment Method
                    </h2>
                    <p className="text-text-secondary font-light mb-8">
                      Choose your preferred payment method
                    </p>

                    <div className="space-y-4 mb-10">
                      {[
                        { id: 'razorpay', label: 'Razorpay (Cards, UPI, Wallets)', description: 'Secure payments for India' },
                        { id: 'stripe', label: 'Stripe (International)', description: 'Global payment processing' },
                        { id: 'paypal', label: 'PayPal', description: 'Fast and secure' },
                      ].map((method) => (
                        <motion.button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                            selectedPayment === method.id
                              ? 'border-gold bg-gold/10'
                              : 'border-white/20 hover:border-gold/50'
                          }`}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selectedPayment === method.id
                                  ? 'border-gold bg-gold'
                                  : 'border-text-secondary'
                              }`}
                            >
                              {selectedPayment === method.id && (
                                <div className="w-2 h-2 bg-cocoa-primary rounded-full" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-text-primary">{method.label}</p>
                              <p className="text-xs text-text-secondary">{method.description}</p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {/* Order Total */}
                    <div className="bg-gradient-to-br from-gold/10 to-amber-500/10 rounded-xl p-6 border border-gold/20 mb-8">
                      <div className="flex justify-between items-center text-lg font-medium text-cocoa-primary">
                        <span>Order Total</span>
                        <span>₹{total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Payment Buttons */}
                    <div className="space-y-3">
                      <motion.button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full btn-luxury-gold py-4 text-base font-medium tracking-widest disabled:opacity-50"
                      >
                        {isProcessing ? 'Processing...' : 'Complete Purchase'}
                      </motion.button>
                      <motion.button
                        onClick={() => setStep('form')}
                        className="w-full btn-luxury py-4 text-base font-medium tracking-widest"
                      >
                        Back to Shipping
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="p-8 md:p-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                      className="mb-8"
                    >
                      <CheckCircle size={80} className="mx-auto text-gold" />
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-4xl font-display font-light text-cocoa-primary mb-4"
                    >
                      Order Confirmed!
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-xl text-text-secondary font-light mb-8 max-w-lg mx-auto"
                    >
                      Your AUREIM moment is on its way.
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="text-text-secondary font-light mb-8"
                    >
                      Order confirmation sent to <span className="font-medium">{formData.email}</span>
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-sm text-text-secondary font-light"
                    >
                      <p>Closing in 3 seconds...</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CheckoutModal
