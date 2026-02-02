import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, CreditCard, Smartphone, Building, Wallet, QrCode } from 'lucide-react'
import { 
  validateCardForm, 
  validateUPIForm, 
  formatCardNumber, 
  detectCardType 
} from '../utils/validation'

const PaymentForm = ({ initialData = {}, onSubmit, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState(initialData.method || 'razorpay')
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
  const [selectedWallet, setSelectedWallet] = useState(initialData.wallet || '')

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const paymentMethods = [
    { id: 'razorpay', name: 'Razorpay (UPI/Cards/NetBanking)', icon: <CreditCard size={20} />, description: 'Secure payment gateway' },
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard size={20} />, description: 'Visa, Mastercard, RuPay' },
    { id: 'upi', name: 'UPI Payment', icon: <Smartphone size={20} />, description: 'PhonePe, GPay, Paytm' },
    { id: 'netbanking', name: 'Net Banking', icon: <Building size={20} />, description: 'All major banks' },
    { id: 'wallet', name: 'Digital Wallet', icon: <Wallet size={20} />, description: 'Paytm, Amazon Pay' }
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
      case 'card':
        validation = validateCardForm(cardData)
        paymentData = { ...paymentData, ...cardData }
        break
      case 'upi':
        validation = validateUPIForm(upiData)
        paymentData = { ...paymentData, ...upiData }
        break
      case 'netbanking':
        if (!netBankingData.bank) {
          validation = { isValid: false, errors: { bank: 'Please select a bank' } }
        }
        paymentData = { ...paymentData, ...netBankingData }
        break
      case 'wallet':
        if (!selectedWallet) {
          validation = { isValid: false, errors: { wallet: 'Please select a wallet' } }
        }
        paymentData = { ...paymentData, wallet: selectedWallet }
        break
      case 'razorpay':
        // Razorpay handles validation on their end
        paymentData = { ...paymentData }
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
        {selectedMethod === 'card' && (
          <div className="space-y-6 p-6 bg-cream-beige/50 rounded-xl">
            <h3 className="text-lg font-serif text-cocoa-dark mb-4">Card Details</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-cocoa-dark mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardData.cardNumber}
                  onChange={handleCardChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border border-cream-soft rounded-lg focus:outline-none focus:border-caramel-gold"
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-400">{errors.cardNumber}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-cocoa-dark mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardholderName"
                  value={cardData.cardholderName}
                  onChange={handleCardChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-cream-soft rounded-lg focus:outline-none focus:border-caramel-gold"
                />
                {errors.cardholderName && (
                  <p className="mt-1 text-sm text-red-400">{errors.cardholderName}</p>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-cocoa-dark mb-2">
                    Month
                  </label>
                  <select
                    name="expiryMonth"
                    value={cardData.expiryMonth}
                    onChange={handleCardChange}
                    className="w-full px-4 py-3 border border-cream-soft rounded-lg focus:outline-none focus:border-caramel-gold"
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-cocoa-dark mb-2">
                    Year
                  </label>
                  <select
                    name="expiryYear"
                    value={cardData.expiryYear}
                    onChange={handleCardChange}
                    className="w-full px-4 py-3 border border-cream-soft rounded-lg focus:outline-none focus:border-caramel-gold"
                  >
                    <option value="">YY</option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={String(new Date().getFullYear() + i).slice(-2)}>
                        {String(new Date().getFullYear() + i).slice(-2)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-cocoa-dark mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardData.cvv}
                    onChange={handleCardChange}
                    placeholder="123"
                    maxLength="4"
                    className="w-full px-4 py-3 border border-cream-soft rounded-lg focus:outline-none focus:border-caramel-gold"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedMethod === 'upi' && (
          <div className="space-y-6 p-6 bg-cream-beige/50 rounded-xl">
            <h3 className="text-lg font-serif text-cocoa-dark mb-4">UPI Payment</h3>
            
            <div>
              <label className="block text-sm font-medium text-cocoa-dark mb-2">
                UPI ID
              </label>
              <input
                type="text"
                name="upiId"
                value={upiData.upiId}
                onChange={handleUpiChange}
                placeholder="yourname@paytm"
                className="w-full px-4 py-3 border border-cream-soft rounded-lg focus:outline-none focus:border-caramel-gold"
              />
              {errors.upiId && (
                <p className="mt-1 text-sm text-red-400">{errors.upiId}</p>
              )}
            </div>
          </div>
        )}

        {selectedMethod === 'netbanking' && (
          <div className="space-y-6 p-6 bg-cream-beige/50 rounded-xl">
            <h3 className="text-lg font-serif text-cocoa-dark mb-4">Net Banking</h3>
            
            <div>
              <label className="block text-sm font-medium text-cocoa-dark mb-2">
                Select Bank
              </label>
              <select
                value={netBankingData.bank}
                onChange={(e) => setNetBankingData({ bank: e.target.value })}
                className="w-full px-4 py-3 border border-cream-soft rounded-lg focus:outline-none focus:border-caramel-gold"
              >
                <option value="">Choose your bank</option>
                {banks.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
              {errors.bank && (
                <p className="mt-1 text-sm text-red-400">{errors.bank}</p>
              )}
            </div>
          </div>
        )}

        {selectedMethod === 'wallet' && (
          <div className="space-y-6 p-6 bg-cream-beige/50 rounded-xl">
            <h3 className="text-lg font-serif text-cocoa-dark mb-4">Digital Wallet</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    selectedWallet === wallet.id
                      ? 'border-caramel-gold bg-caramel-gold/10'
                      : 'border-cream-beige hover:border-cream-soft'
                  }`}
                  onClick={() => setSelectedWallet(wallet.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{wallet.icon}</span>
                    <span className="font-medium text-cocoa-dark">{wallet.name}</span>
                  </div>
                </div>
              ))}
            </div>
            {errors.wallet && (
              <p className="mt-1 text-sm text-red-400">{errors.wallet}</p>
            )}
          </div>
        )}

        {selectedMethod === 'razorpay' && (
          <div className="space-y-6 p-6 bg-cream-beige/50 rounded-xl">
            <h3 className="text-lg font-serif text-cocoa-dark mb-4">Razorpay Payment</h3>
            
            <div className="bg-caramel-gold/10 border border-caramel-gold/30 rounded-lg p-4">
              <p className="text-caramel-gold text-sm mb-2">
                Secure Payment Gateway
              </p>
              <p className="text-text-muted text-sm">
                Pay securely using UPI, Cards, Net Banking, or Wallets through Razorpay's secure payment gateway.
              </p>
            </div>
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