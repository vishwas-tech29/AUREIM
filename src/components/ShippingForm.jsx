import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { validateShippingForm, indianStates } from '../utils/validation'

const ShippingForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    addressLine1: initialData.addressLine1 || '',
    addressLine2: initialData.addressLine2 || '',
    city: initialData.city || 'Hyderabad',
    state: initialData.state || 'Telangana',
    pinCode: initialData.pinCode || '',
    landmark: initialData.landmark || ''
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const validation = validateShippingForm(formData)
    
    if (validation.isValid) {
      onSubmit(formData)
    } else {
      setErrors(validation.errors)
      setTouched(Object.keys(formData).reduce((acc, key) => ({
        ...acc,
        [key]: true
      }), {}))
    }
  }

  const getFieldError = (fieldName) => {
    return touched[fieldName] && errors[fieldName]
  }

  return (
    <div className="card-luxury p-8">
      <h2 className="text-h2 font-serif text-beige mb-8">
        Shipping Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 bg-stone-800 border rounded-lg text-beige placeholder-stone-500 focus:outline-none transition-colors duration-300 ${
                getFieldError('fullName')
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-stone-700 focus:border-amber-800'
              }`}
              placeholder="Enter your full name"
            />
            {getFieldError('fullName') && (
              <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 bg-stone-800 border rounded-lg text-beige placeholder-stone-500 focus:outline-none transition-colors duration-300 ${
                getFieldError('email')
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-stone-700 focus:border-amber-800'
              }`}
              placeholder="Enter your email"
            />
            {getFieldError('email') && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-stone-800 border rounded-lg text-beige placeholder-stone-500 focus:outline-none transition-colors duration-300 ${
              getFieldError('phone')
                ? 'border-red-500 focus:border-red-400'
                : 'border-stone-700 focus:border-amber-800'
            }`}
            placeholder="Enter 10-digit phone number"
            maxLength="10"
          />
          {getFieldError('phone') && (
            <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
          )}
        </div>

        {/* Address Information */}
        <div className="pt-6 border-t border-stone-700">
          <h3 className="text-lg font-serif text-beige mb-6">
            Delivery Address
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
                Address Line 1 *
              </label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 bg-stone-800 border rounded-lg text-beige placeholder-stone-500 focus:outline-none transition-colors duration-300 ${
                  getFieldError('addressLine1')
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-stone-700 focus:border-amber-800'
                }`}
                placeholder="House/Flat number, Building name, Street"
              />
              {getFieldError('addressLine1') && (
                <p className="mt-1 text-sm text-red-400">{errors.addressLine1}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
                Address Line 2
              </label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-beige placeholder-stone-500 focus:outline-none focus:border-amber-800 transition-colors duration-300"
                placeholder="Area, Colony, Sector (Optional)"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-stone-800 border rounded-lg text-beige placeholder-stone-500 focus:outline-none transition-colors duration-300 ${
                    getFieldError('city')
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-stone-700 focus:border-amber-800'
                  }`}
                  placeholder="Hyderabad"
                  readOnly
                />
                {getFieldError('city') && (
                  <p className="mt-1 text-sm text-red-400">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
                  State *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-stone-800 border rounded-lg text-beige focus:outline-none transition-colors duration-300 ${
                    getFieldError('state')
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-stone-700 focus:border-amber-800'
                  }`}
                  disabled
                >
                  <option value="Telangana">Telangana</option>
                </select>
                {getFieldError('state') && (
                  <p className="mt-1 text-sm text-red-400">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
                  PIN Code *
                </label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-stone-800 border rounded-lg text-beige placeholder-stone-500 focus:outline-none transition-colors duration-300 ${
                    getFieldError('pinCode')
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-stone-700 focus:border-amber-800'
                  }`}
                  placeholder="Hyderabad area PIN codes"
                  maxLength="6"
                />
                {getFieldError('pinCode') && (
                  <p className="mt-1 text-sm text-red-400">{errors.pinCode}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
                Landmark
              </label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-beige placeholder-stone-500 focus:outline-none focus:border-amber-800 transition-colors duration-300"
                placeholder="Nearby landmark (Optional)"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-8">
          <button
            type="submit"
            className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2"
          >
            Continue to Payment
            <ArrowRight size={20} />
          </button>
        </div>
      </form>
    </div>
  )
}

export default ShippingForm