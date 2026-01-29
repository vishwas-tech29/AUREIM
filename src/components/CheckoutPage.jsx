import React, { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Lock } from 'lucide-react'
import ShippingForm from './ShippingForm'
import PaymentForm from './PaymentForm'
import OrderReview from './OrderReview'
import { formatCurrency } from '../utils/excelExport'

const CheckoutPage = ({ 
  cartItems, 
  totals, 
  onBack, 
  onPlaceOrder 
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [shippingInfo, setShippingInfo] = useState({})
  const [paymentInfo, setPaymentInfo] = useState({})

  const steps = [
    { id: 1, name: 'Shipping', component: 'shipping' },
    { id: 2, name: 'Payment', component: 'payment' },
    { id: 3, name: 'Review', component: 'review' }
  ]

  const handleShippingSubmit = (data) => {
    setShippingInfo(data)
    setCurrentStep(2)
  }

  const handlePaymentSubmit = (data) => {
    setPaymentInfo(data)
    setCurrentStep(3)
  }

  const handleOrderSubmit = () => {
    const orderData = {
      customerInfo: shippingInfo,
      paymentInfo,
      cartItems,
      totals,
      timestamp: Date.now()
    }
    onPlaceOrder(orderData)
  }

  const goToStep = (step) => {
    if (step < currentStep || (step === 2 && Object.keys(shippingInfo).length > 0)) {
      setCurrentStep(step)
    }
  }

  return (
    <div className="min-h-screen bg-cream-soft pt-16 sm:pt-20 lg:pt-24">
      <div className="container-center section-spacing">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 sm:mb-12">
          <button 
            onClick={onBack}
            className="text-text-muted hover:text-cocoa-dark transition-colors duration-300 p-2"
          >
            <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-cocoa-dark">
            Checkout
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-center overflow-x-auto pb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <button
                  onClick={() => goToStep(step.id)}
                  className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep === step.id
                      ? 'bg-caramel-gold border-caramel-gold text-chocolate-dark'
                      : currentStep > step.id
                      ? 'bg-green-600 border-green-600 text-white'
                      : 'border-cream-beige text-text-muted hover:border-cream-soft'
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check size={16} className="sm:w-5 sm:h-5" />
                  ) : (
                    <span className="font-medium text-sm sm:text-base">{step.id}</span>
                  )}
                </button>
                
                <div className="ml-2 sm:ml-3 mr-4 sm:mr-8">
                  <div className={`text-xs sm:text-sm font-medium ${
                    currentStep >= step.id ? 'text-cocoa-dark' : 'text-text-muted'
                  }`}>
                    {step.name}
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-0.5 mr-4 sm:mr-8 ${
                    currentStep > step.id ? 'bg-green-600' : 'bg-cream-beige'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <ShippingForm 
                  initialData={shippingInfo}
                  onSubmit={handleShippingSubmit}
                />
              )}
              
              {currentStep === 2 && (
                <PaymentForm 
                  initialData={paymentInfo}
                  onSubmit={handlePaymentSubmit}
                  onBack={() => setCurrentStep(1)}
                />
              )}
              
              {currentStep === 3 && (
                <OrderReview 
                  shippingInfo={shippingInfo}
                  paymentInfo={paymentInfo}
                  cartItems={cartItems}
                  totals={totals}
                  onSubmit={handleOrderSubmit}
                  onBack={() => setCurrentStep(2)}
                  onEditShipping={() => setCurrentStep(1)}
                  onEditPayment={() => setCurrentStep(2)}
                />
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="card-luxury p-6 sticky top-32">
                <h3 className="text-lg font-serif text-cocoa-dark mb-6">
                  Order Summary
                </h3>

                {/* Cart Items Preview */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="text-sm text-cocoa-dark font-medium">
                          {item.name}
                        </div>
                        <div className="text-xs text-text-muted">
                          Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="text-sm text-caramel-gold">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-cream-beige pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-text-muted">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totals.subtotal)}</span>
                  </div>
                  {totals.tax > 0 && (
                    <div className="flex justify-between text-sm text-text-muted">
                      <span>Tax</span>
                      <span>{formatCurrency(totals.tax)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-text-muted">
                    <span>Delivery</span>
                    <span>
                      {totals.shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        formatCurrency(totals.shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-medium text-cocoa-dark pt-2 border-t border-cream-beige">
                    <span>Total</span>
                    <span className="text-caramel-gold">
                      {formatCurrency(totals.total)}
                    </span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 pt-4 border-t border-cream-beige">
                  <div className="flex items-center justify-center gap-2 text-xs text-text-muted">
                    <Lock size={14} />
                    <span>Secure SSL Encrypted Checkout</span>
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

export default CheckoutPage