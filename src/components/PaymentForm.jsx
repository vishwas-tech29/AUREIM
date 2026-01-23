import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, CreditCard, Smartphone, Building, Wallet, QrCode } from 'lucide-react'
import { 
  validateCardForm, 
  validateUPIForm, 
  formatCardNumber, 
  detectCardType 
} from '../utils/validation'

const PaymentForm = ({ initialData = {}, onSubmit, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState(initialData.method || 'card')
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
    { id: 'card', name: 'Card Payment', icon: <CreditCard size={20} />, description: 'Credit/Debit Card' },
    { id: 'upi', name: 'UPI Payment', icon: <Smartphone size={20} />, description: 'Pay with UPI ID' },
    { id: 'netbanking', name: 'Net Banking', icon: <Building size={20} />, description: 'Online Banking' },
    { id: 'wallet', name: 'Digital Wallet', icon: <Wallet size={20} />, description: 'Paytm, PhonePe, etc.' },
    { id: 'cod', name: 'Cash on Delivery', icon: <QrCode size={20} />, description: 'Pay when delivered' }
  ]

  const banks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank',
    'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank of India', 'IDBI Bank'
  ]

  const wallets = [
    { id: 'paytm', name: 'Paytm', icon: '💳' },
    { id: 'phonepe', name: 'PhonePe', icon: '📱' },
    { id: 'gpay', name: 'Google Pay', icon: '🔵' },
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
      <h2 className="text-h2 font-serif text-beige mb-8">
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
                  ? 'border-amber-800 bg-amber-800/10'
                  : 'border-stone-700 hover:border-stone-600'
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
                  className="w-4 h-4 text-amber-800 bg-stone-800 border-stone-600 focus:ring-amber-800"
                />
                <div className="text-amber-800">
                  {method.icon}
                </div>
                <div>
                  <div className="text-beige font-medium">{method.name}</div>
                  <div className="text-stone-400 text-sm">{method.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Method Forms */}
        {selectedMethod === 'card' && (
          <div className="space-y-6 p-6 bg-stone-900/50 rounded-xl">
            <h3 className="text-lg font-serif text-beige mb-4">Card Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
                Card Number *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={cardData.cardNumber}
                  onChange={handleCardChange}
                  className={`w-full px-4 py-3 bg-stone-800 border rounded-lg text-beige placeholder-stone-500 focus:outline-none transition-colors duration-300 ${
                    errors.cardNumber
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-stone-700 focus:border-amber-800'
                  }`}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
                {cardType !== 'unknown' && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-xs text-stone-400 uppercase">{cardType}</span>
                  </div>
                )}
              </div>
              {errors.cardNumber && (
                <p className="mt-1 text-sm text-red-400">{errors.cardNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
                Cardholder Name *
              </label>
              <input
                type="text"
                name="cardholderName"
                value={cardData.cardholderName}
                onChange={handleCardChange}
                className={`w-full px-4 py-3 bg-stone-800 border rounded-lg text-beige placeholder-stone-500 focus:outline-none transition-colors duration-300 ${
                  errors.cardholderName
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-stone-700 focus:border-amber-800'
                }`}
                placeholder="Name as on card"
              />
              {errors.cardholderName && (
                <p className="mt-1 text-sm text-red-400">{errors.cardholderName}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
                  Expiry Date *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    name="expiryMonth"
                    value={cardData.expiryMonth}
                    onChange={handleCardChange}
                    className="px-3 py-3 bg-stone-800 border border-stone-700 rounded-lg text-beige focus:outline-none focus:border-amber-800"
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  <select
                    name="expiryYear"
                    value={cardData.expiryYear}
                    onChange={handleCardChange}
                    className="px-3 py-3 bg-stone-800 border border-stone-700 rounded-lg text-beige focus:outline-none focus:border-amber-800"
                  >
                    <option value="">YY</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() + i
                      return (
                        <option key={year} value={String(year).slice(-2)}>
                          {String(year).slice(-2)}
                        </option>
                      )
                    })}
                  </select>
                </div>
                {errors.expiry && (
                  <p className="mt-1 text-sm text-red-400">{errors.expiry}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
                  CVV *
                </label>
                <input
                  type="password"
                  name="cvv"
                  value={cardData.cvv}
                  onChange={handleCardChange}
                  className={`w-full px-4 py-3 bg-stone-800 border rounded-lg text-beige placeholder-stone-500 focus:outline-none transition-colors duration-300 ${
                    errors.cvv
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-stone-700 focus:border-amber-800'
                  }`}
                  placeholder="123"
                  maxLength="4"
                />
                {errors.cvv && (
                  <p className="mt-1 text-sm text-red-400">{errors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedMethod === 'upi' && (
          <div className="space-y-6 p-6 bg-stone-900/50 rounded-xl">
            <h3 className="text-lg font-serif text-beige mb-4">UPI Payment</h3>
            
            <div>
              <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
                UPI ID *
              </label>
              <input
                type="text"
                name="upiId"
                value={upiData.upiId}
                onChange={handleUpiChange}
                className={`w-full px-4 py-3 bg-stone-800 border rounded-lg text-beige placeholder-stone-500 focus:outline-none transition-colors duration-300 ${
                  errors.upiId
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-stone-700 focus:border-amber-800'
                }`}
                placeholder="username@upi"
              />
              {errors.upiId && (
                <p className="mt-1 text-sm text-red-400">{errors.upiId}</p>
              )}
            </div>

            <div className="flex gap-4 justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-white font-bold">G</span>
                </div>
                <span className="text-xs text-stone-400">GPay</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="text-xs text-stone-400">PhonePe</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="text-xs text-stone-400">Paytm</span>
              </div>
            </div>
          </div>
        )}

        {selectedMethod === 'netbanking' && (
          <div className="space-y-6 p-6 bg-stone-900/50 rounded-xl">
            <h3 className="text-lg font-serif text-beige mb-4">Net Banking</h3>
            
            <div>
              <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
                Select Bank *
              </label>
              <select
                value={netBankingData.bank}
                onChange={(e) => setNetBankingData({ bank: e.target.value })}
                className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-beige focus:outline-none focus:border-amber-800"
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
          <div className="space-y-6 p-6 bg-stone-900/50 rounded-xl">
            <h3 className="text-lg font-serif text-beige mb-4">Digital Wallet</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {wallets.map((wallet) => (
                <button
                  key={wallet.id}
                  type="button"
                  onClick={() => setSelectedWallet(wallet.id)}
                  className={`p-4 border-2 rounded-lg transition-all duration-300 ${
                    selectedWallet === wallet.id
                      ? 'border-amber-800 bg-amber-800/10'
                      : 'border-stone-700 hover:border-stone-600'
                  }`}
                >
                  <div className="text-2xl mb-2">{wallet.icon}</div>
                  <div className="text-beige text-sm">{wallet.name}</div>
                </button>
              ))}
            </div>
            {errors.wallet && (
              <p className="mt-1 text-sm text-red-400">{errors.wallet}</p>
            )}
          </div>
        )}

        {selectedMethod === 'cod' && (
          <div className="space-y-6 p-6 bg-stone-900/50 rounded-xl">
            <h3 className="text-lg font-serif text-beige mb-4">Cash on Delivery</h3>
            
            <div className="bg-amber-800/10 border border-amber-800/30 rounded-lg p-4">
              <p className="text-amber-200 text-sm mb-2">
                Additional COD charge: ₹50
              </p>
              <p className="text-stone-400 text-sm">
                Available for orders under ₹5,000. Pay when your order is delivered.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="codAccepted"
                checked={codAccepted}
                onChange={(e) => setCodAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 text-amber-800 bg-stone-800 border-stone-600 rounded focus:ring-amber-800"
              />
              <label htmlFor="codAccepted" className="text-stone-300 text-sm">
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