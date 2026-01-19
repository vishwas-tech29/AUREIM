import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'

const CheckoutModal = ({ isOpen, onClose, cartTotal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('razorpay')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setShowSuccess(true)
    }, 1500)
  }

  const handleContinue = () => {
    setShowSuccess(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      pincode: '',
    })
    onClose()
  }

  const price = 1299 * cartTotal
  const tax = Math.round(price * 0.18)
  const total = price + tax

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          >
            <motion.div
              className="bg-cocoa-primary text-cream-primary w-full md:max-w-2xl md:rounded-2xl rounded-t-3xl relative max-h-screen md:max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="absolute top-6 right-6 z-10"
              >
                <X size={24} />
              </motion.button>

              {!showSuccess ? (
                <div className="p-8 md:p-12">
                  <h2 className="font-display text-3xl font-light mb-8">Complete Your AUREIM Moment</h2>

                  <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                    {/* Name */}
                    <div>
                      <label className="text-xs font-light tracking-widest uppercase block mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-cream-primary/10 border border-cream-primary/30 rounded-lg px-4 py-3 text-cream-primary placeholder-cream-primary/50 focus:outline-none focus:border-gold transition-colors"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs font-light tracking-widest uppercase block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-cream-primary/10 border border-cream-primary/30 rounded-lg px-4 py-3 text-cream-primary placeholder-cream-primary/50 focus:outline-none focus:border-gold transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-xs font-light tracking-widest uppercase block mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-cream-primary/10 border border-cream-primary/30 rounded-lg px-4 py-3 text-cream-primary placeholder-cream-primary/50 focus:outline-none focus:border-gold transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="text-xs font-light tracking-widest uppercase block mb-2">
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="w-full bg-cream-primary/10 border border-cream-primary/30 rounded-lg px-4 py-3 text-cream-primary placeholder-cream-primary/50 focus:outline-none focus:border-gold transition-colors"
                        placeholder="Street address, city"
                      />
                    </div>

                    {/* Pincode */}
                    <div>
                      <label className="text-xs font-light tracking-widest uppercase block mb-2">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        className="w-full bg-cream-primary/10 border border-cream-primary/30 rounded-lg px-4 py-3 text-cream-primary placeholder-cream-primary/50 focus:outline-none focus:border-gold transition-colors"
                        placeholder="110001"
                      />
                    </div>

                    {/* Payment Method */}
                    <div className="border-t border-cream-primary/20 pt-6">
                      <p className="text-xs font-light tracking-widest uppercase block mb-4">Payment Method</p>
                      <div className="flex gap-4">
                        {[
                          { id: 'razorpay', label: 'Razorpay' },
                          { id: 'stripe', label: 'Stripe' },
                        ].map((method) => (
                          <label key={method.id} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="payment"
                              value={method.id}
                              checked={paymentMethod === method.id}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="w-4 h-4 cursor-pointer"
                            />
                            <span className="text-sm">{method.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </form>

                  {/* Order Summary */}
                  <div className="bg-cream-primary/10 rounded-lg p-6 mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-light">Subtotal</span>
                      <span>₹{price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-cream-primary/20">
                      <span className="text-sm font-light">Tax (18%)</span>
                      <span>₹{tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-light tracking-widest uppercase text-sm">Total</span>
                      <span className="text-2xl font-light">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isProcessing}
                    className="w-full bg-gold text-cocoa-primary py-4 font-medium tracking-wide rounded-lg hover:shadow-luxury transition-all disabled:opacity-50"
                    onClick={handleSubmit}
                  >
                    {isProcessing ? 'PROCESSING...' : 'COMPLETE YOUR AUREIM MOMENT'}
                  </motion.button>
                </div>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 md:p-12 text-center min-h-screen md:min-h-auto flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="mb-6"
                  >
                    <div className="relative w-20 h-20 mx-auto">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <motion.path
                          d="M 20 50 L 40 70 L 80 30"
                          stroke="#B8956A"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.3, duration: 0.8 }}
                        />
                      </svg>
                    </div>
                  </motion.div>

                  <h3 className="font-display text-2xl md:text-3xl font-light mb-2">
                    Your AUREIM Moment is on its way
                  </h3>
                  <p className="text-cream-primary/80 text-sm font-light mb-8">
                    Order confirmation sent to {formData.email}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleContinue}
                    className="px-8 py-3 bg-gold text-cocoa-primary font-medium tracking-wide rounded-lg hover:shadow-luxury transition-all"
                  >
                    CONTINUE EXPLORING
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CheckoutModal
