import React from 'react'
import { X, MessageCircle, Copy, Mail } from 'lucide-react'
import { sendEmailNotification } from '../utils/emailNotification'

const WhatsAppModal = ({ isOpen, onClose, orderData, whatsappUrl, message }) => {
  if (!isOpen) return null

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(decodeURIComponent(message))
      alert('Order details copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const openWhatsApp = () => {
    window.open(whatsappUrl, '_blank')
    onClose()
  }

  const openEmail = () => {
    const result = sendEmailNotification(orderData)
    if (result.success) {
      alert('Email notification opened! Check your email client.')
    } else {
      alert('Failed to open email. Please copy order details manually.')
    }
  }

  return (
    <div className="fixed inset-0 bg-chocolate-dark/95 z-50 flex items-center justify-center p-4">
      <div className="card-luxury p-8 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif text-text-primary">Send Order via WhatsApp</h3>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors duration-300"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-text-secondary mb-4">
            Your order details are ready to be sent to our team via WhatsApp for immediate processing.
          </p>
          
          <div className="bg-cream-beige p-4 rounded-lg mb-4">
            <div className="text-sm text-text-primary">
              <strong>Order ID:</strong> {orderData.orderId}
            </div>
            <div className="text-sm text-text-secondary">
              <strong>Total:</strong> ₹{orderData.totals.total}
            </div>
            <div className="text-sm text-text-secondary">
              <strong>Customer:</strong> {orderData.customerInfo.fullName}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={openWhatsApp}
            className="w-full btn-luxury-gold py-3 flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            Open WhatsApp
          </button>
          
          <button
            onClick={openEmail}
            className="w-full btn-secondary py-3 flex items-center justify-center gap-2"
          >
            <Mail size={20} />
            Send Email Alert
          </button>
          
          <button
            onClick={copyToClipboard}
            className="w-full btn-secondary py-3 flex items-center justify-center gap-2"
          >
            <Copy size={20} />
            Copy Order Details
          </button>
          
          <div className="text-center">
            <p className="text-xs text-text-secondary">
              WhatsApp Business: +91 90004 29689
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-cream-beige">
          <p className="text-xs text-text-secondary text-center">
            If WhatsApp doesn't open automatically, you can copy the order details and send them manually to our business number.
          </p>
        </div>
      </div>
    </div>
  )
}

export default WhatsAppModal