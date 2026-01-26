import React, { useEffect, useState } from 'react'
import { CheckCircle, Download, Package, ArrowRight } from 'lucide-react'
import { formatCurrency } from '../utils/excelExport'
import LazyImage from './LazyImage'

const OrderConfirmation = ({ 
  orderData, 
  onContinueShopping, 
  onTrackOrder, 
  onDownloadInvoice 
}) => {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setShowAnimation(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const formatOrderDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getEstimatedDelivery = () => {
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + 5) // 5 days from now
    return deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-cream-primary pt-24">
      <div className="section-padding section-spacing">
        <div className="max-w-4xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-24 h-24 bg-green-600 rounded-full mb-6 transition-all duration-1000 ${
              showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            }`}>
              <CheckCircle size={48} className="text-white" />
            </div>
            
            <h1 className={`text-h1 font-serif text-text-primary mb-4 transition-all duration-1000 delay-300 ${
              showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              Thank you for your order!
            </h1>
            
            <p className={`text-xl text-text-secondary mb-8 transition-all duration-1000 delay-500 ${
              showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              Your order has been confirmed and will be processed shortly.
            </p>

            <div className={`inline-flex items-center gap-4 bg-caramel-gold/20 border border-caramel-gold/30 rounded-full px-8 py-4 transition-all duration-1000 delay-700 ${
              showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <Package className="text-caramel-gold" size={20} />
              <div>
                <div className="text-text-primary font-medium">Order #{orderData.orderId}</div>
                <div className="text-text-secondary text-sm">Placed on {formatOrderDate(orderData.timestamp)}</div>
              </div>
            </div>

            {/* WhatsApp Notification Notice */}
            <div className={`mt-6 p-4 bg-green-600/20 border border-green-600/30 rounded-lg transition-all duration-1000 delay-900 ${
              showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="flex items-center gap-3 text-green-700">
                <CheckCircle size={20} />
                <div>
                  <div className="font-medium text-text-primary">Order Notification Sent</div>
                  <div className="text-sm text-text-secondary">
                    Your order details have been automatically sent to our team via WhatsApp for immediate processing.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Order Summary */}
            <div className="card-luxury p-8">
              <h2 className="text-h3 font-serif text-text-primary mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {orderData.cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <LazyImage
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-text-primary font-medium">{item.name}</h4>
                          <p className="text-text-secondary text-sm">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-caramel-gold">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-cream-beige pt-4 space-y-2">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span>{formatCurrency(orderData.totals.subtotal)}</span>
                </div>
                {orderData.totals.tax > 0 && (
                  <div className="flex justify-between text-text-secondary">
                    <span>Tax</span>
                    <span>{formatCurrency(orderData.totals.tax)}</span>
                  </div>
                )}
                <div className="flex justify-between text-text-secondary">
                  <span>Delivery</span>
                  <span>
                    {orderData.totals.shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatCurrency(orderData.totals.shipping)
                    )}
                  </span>
                </div>
                {orderData.paymentInfo.method === 'cod' && (
                  <div className="flex justify-between text-text-secondary">
                    <span>COD Charges</span>
                    <span>{formatCurrency(50)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-medium text-text-primary pt-2 border-t border-cream-beige">
                  <span>Total</span>
                  <span className="text-caramel-gold">
                    {formatCurrency(orderData.totals.total + (orderData.paymentInfo.method === 'cod' ? 50 : 0))}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery & Payment Info */}
            <div className="space-y-6">
              {/* Delivery Information */}
              <div className="card-luxury p-6">
                <h3 className="text-lg font-serif text-text-primary mb-4">Delivery Information</h3>
                <div className="space-y-3 text-text-secondary">
                  <div>
                    <div className="text-sm text-text-secondary uppercase tracking-wide">Estimated Delivery</div>
                    <div className="font-medium text-green-600">{getEstimatedDelivery()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary uppercase tracking-wide">Shipping Address</div>
                    <div className="text-sm text-text-primary">
                      <div>{orderData.customerInfo.fullName}</div>
                      <div>{orderData.customerInfo.addressLine1}</div>
                      {orderData.customerInfo.addressLine2 && <div>{orderData.customerInfo.addressLine2}</div>}
                      <div>{orderData.customerInfo.city}, {orderData.customerInfo.state} - {orderData.customerInfo.pinCode}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="card-luxury p-6">
                <h3 className="text-lg font-serif text-text-primary mb-4">Payment Information</h3>
                <div className="space-y-3 text-text-secondary">
                  <div>
                    <div className="text-sm text-text-secondary uppercase tracking-wide">Payment Method</div>
                    <div className="font-medium text-text-primary">
                      {orderData.paymentInfo.method === 'card' && `Card ending in ${orderData.paymentInfo.cardNumber?.slice(-4) || '****'}`}
                      {orderData.paymentInfo.method === 'upi' && `UPI: ${orderData.paymentInfo.upiId}`}
                      {orderData.paymentInfo.method === 'netbanking' && `Net Banking: ${orderData.paymentInfo.bank}`}
                      {orderData.paymentInfo.method === 'wallet' && `Digital Wallet: ${orderData.paymentInfo.wallet}`}
                      {orderData.paymentInfo.method === 'cod' && 'Cash on Delivery'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary uppercase tracking-wide">Payment Status</div>
                    <div className="font-medium text-green-600">
                      {orderData.paymentInfo.method === 'cod' ? 'Pending (COD)' : 'Paid'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => onTrackOrder(orderData.orderId)}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Package size={20} />
              Track Your Order
            </button>
            
            <button
              onClick={() => onDownloadInvoice(orderData)}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Download Invoice
            </button>
            
            <button
              onClick={onContinueShopping}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              Continue Shopping
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Additional Information */}
          <div className="card-luxury p-8 text-center">
            <h3 className="text-lg font-serif text-text-primary mb-4">What happens next?</h3>
            
            <div className="grid md:grid-cols-3 gap-6 text-text-secondary">
              <div>
                <div className="w-12 h-12 bg-caramel-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-caramel-gold font-bold">1</span>
                </div>
                <h4 className="font-medium text-text-primary mb-2">Order Processing</h4>
                <p className="text-sm">We'll prepare your luxury chocolates with care and attention to detail.</p>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-caramel-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-caramel-gold font-bold">2</span>
                </div>
                <h4 className="font-medium text-text-primary mb-2">Quality Check</h4>
                <p className="text-sm">Each product is carefully inspected to ensure premium quality.</p>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-caramel-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-caramel-gold font-bold">3</span>
                </div>
                <h4 className="font-medium text-text-primary mb-2">Secure Packaging</h4>
                <p className="text-sm">Your order will be packaged securely and shipped to your address.</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-cream-beige">
              <p className="text-text-secondary text-sm">
                A confirmation email has been sent to <span className="text-text-primary">{orderData.customerInfo.email}</span>
              </p>
              <p className="text-text-secondary text-xs mt-2">
                Need help? Contact us at aureim.chocolates@gmail.com or +91 90004 29689
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation