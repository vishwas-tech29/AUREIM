import React, { useEffect, useState } from 'react'
import { Loader2, CheckCircle, XCircle, CreditCard } from 'lucide-react'

const PaymentProcessing = ({ 
  orderData, 
  onSuccess, 
  onFailure, 
  onRetry 
}) => {
  const [status, setStatus] = useState('processing') // processing, success, failed
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('Processing your payment...')

  useEffect(() => {
    simulatePaymentProcess()
  }, [])

  const simulatePaymentProcess = async () => {
    // Simulate payment processing steps
    const steps = [
      { progress: 20, message: 'Validating payment details...' },
      { progress: 40, message: 'Connecting to payment gateway...' },
      { progress: 60, message: 'Processing transaction...' },
      { progress: 80, message: 'Verifying payment...' },
      { progress: 100, message: 'Payment completed!' }
    ]

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setProgress(step.progress)
      setMessage(step.message)
    }

    // Simulate payment result (90% success rate for demo)
    const isSuccess = Math.random() > 0.1

    await new Promise(resolve => setTimeout(resolve, 1000))

    if (isSuccess) {
      setStatus('success')
      setMessage('Payment successful!')
      
      // Generate transaction ID
      const transactionId = `TXN${Date.now()}`
      
      setTimeout(() => {
        onSuccess({
          ...orderData,
          paymentInfo: {
            ...orderData.paymentInfo,
            status: 'Successful',
            transactionId
          }
        })
      }, 2000)
    } else {
      setStatus('failed')
      setMessage('Payment failed. Please try again.')
    }
  }

  const getFailureReason = () => {
    const reasons = [
      'Card declined by bank',
      'Insufficient funds',
      'Transaction timeout',
      'Invalid card details',
      'Network error'
    ]
    return reasons[Math.floor(Math.random() * reasons.length)]
  }

  if (status === 'processing') {
    return (
      <div className="fixed inset-0 bg-stone-950/95 z-50 flex items-center justify-center">
        <div className="card-luxury p-12 max-w-md w-full mx-4 text-center">
          {/* Processing Animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-amber-800/20 rounded-full flex items-center justify-center">
              <Loader2 size={32} className="text-amber-800 animate-spin" />
            </div>
            
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-24 h-24 mx-auto transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-stone-700"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                className="text-amber-800 transition-all duration-500"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h2 className="text-h3 font-serif text-beige mb-4">
            Secure Payment Processing
          </h2>
          
          <p className="text-stone-300 mb-6">
            {message}
          </p>

          <div className="w-full bg-stone-800 rounded-full h-2 mb-4">
            <div 
              className="bg-amber-800 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-stone-400 text-sm">
            {progress}% Complete
          </div>

          <div className="mt-8 pt-6 border-t border-stone-800">
            <div className="flex items-center justify-center gap-2 text-xs text-stone-500">
              <CreditCard size={14} />
              <span>Secured by SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="fixed inset-0 bg-stone-950/95 z-50 flex items-center justify-center">
        <div className="card-luxury p-12 max-w-md w-full mx-4 text-center">
          {/* Success Animation */}
          <div className="w-24 h-24 mx-auto bg-green-600 rounded-full flex items-center justify-center mb-8 animate-scale-in">
            <CheckCircle size={32} className="text-white" />
          </div>

          <h2 className="text-h3 font-serif text-beige mb-4">
            Payment Successful!
          </h2>
          
          <p className="text-stone-300 mb-6">
            Your payment has been processed successfully. Redirecting to order confirmation...
          </p>

          <div className="flex items-center justify-center">
            <Loader2 size={20} className="text-amber-800 animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="fixed inset-0 bg-stone-950/95 z-50 flex items-center justify-center">
        <div className="card-luxury p-12 max-w-md w-full mx-4 text-center">
          {/* Failure Animation */}
          <div className="w-24 h-24 mx-auto bg-red-600 rounded-full flex items-center justify-center mb-8">
            <XCircle size={32} className="text-white" />
          </div>

          <h2 className="text-h3 font-serif text-beige mb-4">
            Payment Failed
          </h2>
          
          <p className="text-stone-300 mb-2">
            We couldn't process your payment.
          </p>
          
          <p className="text-red-400 text-sm mb-8">
            Reason: {getFailureReason()}
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={onRetry}
              className="btn-primary"
            >
              Try Again
            </button>
            
            <button
              onClick={onFailure}
              className="btn-secondary"
            >
              Choose Different Payment Method
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-800">
            <p className="text-stone-500 text-xs">
              Need help? Contact us at aureim.chocolates@gmail.com
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default PaymentProcessing