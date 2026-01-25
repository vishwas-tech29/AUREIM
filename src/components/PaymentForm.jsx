import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, CreditCard, Smartphone, Building, Wallet, QrCode } from 'lucide-react'
import { 
  validateCardForm, 
  validateUPIForm, 
  formatCardNumber, 
  detectCardType 
} from '../utils/validation'

const PaymentForm = ({ initialData = {}, onSubmit, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState(initialData.method || 'cod')
  const [cardData, setCardData] = useState({
    cardNumber: initialData.cardNumber || '',
    cardholderName: initialData.cardholderName || '',
    expiryMonth: initialData.expiryMonth || '',
    expiryYear: initialData.expiryYear || '',
    cvv: initialData.cvv || ''
  })
  const [upiData, setUpiData] = useState({
    upiId: initialData.upiId || ''
  })
  const [netBankingData, setNetBankingData] = useState({
    bank: initialData.bank || ''
  })
  const [codAccepted, setCodAccepted] = useState(initialData.codAccepted || false)
  const [selectedWallet, setSelectedWallet] = useState(initialData.wallet || '')

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const paymentMethods = [
    { id: 'cod', name: 'Cash on Delivery', icon: <QrCode size={20} />, description: 'Pay when delivered' }
  ]

  const banks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank',
    'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank of India', 'IDBI Bank'
  ]

  const wallets = [
    { id: 'paytm', name: 'Paytm', icon: '💳' },
    { id: 'amazonpay', name: 'Amazon Pay', icon: '🛒' }
  ]

  const handleCardChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value)
    }

    setCardData(prev => ({
      ...prev,
      [name]: formattedValue
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleUpiChange = (e) => {
    const { name, value } = e.target
    setUpiData(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    let validation = { isValid: true, errors: {} }
    let paymentData = { method: selectedMethod }

    switch (selectedMethod) {
      case 'cod':
        if (!codAccepted) {
          validation = { isValid: false, errors: { cod: 'Please confirm Cash on Delivery' } }
        }
        paymentData = { ...paymentData, codAccepted }
        break
    }

    if (validation.isValid) {
      onSubmit(paymentData)
    } else {
      setErrors(validation.errors)
    }
  }

  const cardType = detectCardType(cardData.cardNumber)

  return (
    <div className="card-luxury p-8">
      <h2 className="text-h2 font-serif text-cocoa-dark mb-8">
        Payment Method
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Payment Method Selection */}
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                selectedMethod === method.id
                  ? 'border-caramel-gold bg-caramel-gold/10'
                  : 'border-cream-beige hover:border-cream-soft'
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => setSelectedMethod(method.id)}
                  className="w-4 h-4 text-caramel-gold bg-cream-beige border-cream-soft focus:ring-caramel-gold"
                />
                <div className="text-caramel-gold">
                  {method.icon}
                </div>
                <div>
                  <div className="text-cocoa-dark font-medium">{method.name}</div>
                  <div className="text-text-muted text-sm">{method.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Method Forms */}
        {selectedMethod === 'cod' && (
          <div className="space-y-6 p-6 bg-cream-beige/50 rounded-xl">
            <h3 className="text-lg font-serif text-cocoa-dark mb-4">Cash on Delivery</h3>
            
            <div className="bg-caramel-gold/10 border border-caramel-gold/30 rounded-lg p-4">
              <p className="text-caramel-gold text-sm mb-2">
                Additional COD charge: ₹50
              </p>
              <p className="text-text-muted text-sm">
                Available for orders under ₹5,000. Pay when your order is delivered to your doorstep in Greater Hyderabad area.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="codAccepted"
                checked={codAccepted}
                onChange={(e) => setCodAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 text-caramel-gold bg-cream-beige border-cream-soft rounded focus:ring-caramel-gold"
              />
              <label htmlFor="codAccepted" className="text-text-muted text-sm">
                I confirm that I want to pay cash on delivery and understand that an additional charge of ₹50 will be added to my order total.
              </label>
            </div>
            {errors.cod && (
              <p className="mt-1 text-sm text-red-400">{errors.cod}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-8">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 btn-secondary py-4 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Shipping
          </button>
          
          <button
            type="submit"
            className="flex-1 btn-primary py-4 flex items-center justify-center gap-2"
          >
            Review Order
            <ArrowRight size={20} />
          </button>
        </div>
      </form>
    </div>
  )
}

export default PaymentForm