import React, { useState } from 'react'
import { MessageCircle, Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { validateName, validateEmail, validatePhone, validateRequired } from '../utils/validation'

const ContactPage = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const inquiryTypes = [
    { id: 'general', name: 'General Inquiry' },
    { id: 'orders', name: 'Order Support' },
    { id: 'wholesale', name: 'Wholesale Partnership' },
    { id: 'corporate', name: 'Corporate Gifts' },
    { id: 'media', name: 'Media & Press' },
    { id: 'feedback', name: 'Feedback & Suggestions' }
  ]

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: "+91 98765 43210",
      description: "Mon-Sat, 9 AM - 7 PM IST"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: "aureim.chocolates@gmail.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      details: "AUREIM Chocolate Atelier",
      description: "Bandra West, Mumbai 400050"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: "Monday - Saturday",
      description: "9:00 AM - 7:00 PM IST"
    }
  ]

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

  const validateForm = () => {
    const newErrors = {}
    
    if (!validateRequired(formData.name)) {
      newErrors.name = 'Name is required'
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Please enter a valid name'
    }
    
    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!validateRequired(formData.phone)) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }
    
    if (!validateRequired(formData.subject)) {
      newErrors.subject = 'Subject is required'
    }
    
    if (!validateRequired(formData.message)) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }
    
    return newErrors
  }

  const generateWhatsAppMessage = () => {
    const inquiryTypeName = inquiryTypes.find(type => type.id === formData.inquiryType)?.name || 'General Inquiry'
    
    return `Hello AUREIM Team!

*Contact Form Submission*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Inquiry Type:* ${inquiryTypeName}
*Subject:* ${formData.subject}

*Message:*
${formData.message}

---
Sent via AUREIM Contact Form
Looking forward to your response!`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate form processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate WhatsApp message
    const message = generateWhatsAppMessage()
    const encodedMessage = encodeURIComponent(message)
    const whatsappNumber = "919876543210" // Replace with actual WhatsApp business number
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank')
    
    setIsSubmitting(false)
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    })
    
    // Show success message (you could add a toast here)
    alert('Thank you! Your message has been prepared for WhatsApp. Please send it to complete your inquiry.')
  }

  return (
    <div className="min-h-screen bg-stone-950 pt-24">
      <div className="section-padding section-spacing">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-2 text-stone-400 hover:text-beige transition-colors duration-300 mb-8"
            >
              ← Back to Home
            </button>
            
            <h1 className="text-hero-mobile md:text-hero font-serif text-beige mb-8 leading-tight">
              Let's Create
              <span className="block text-gradient">Something Beautiful</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-stone-300 max-w-4xl mx-auto leading-relaxed">
              Whether you have questions about our chocolates, need support with an order, 
              or want to explore partnership opportunities, we're here to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="card-luxury p-8">
              <div className="flex items-center gap-3 mb-8">
                <MessageCircle className="w-8 h-8 text-amber-800" />
                <h2 className="text-h2 font-serif text-beige">
                  Send us a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-stone-800 border rounded-lg text-beige placeholder-stone-500 focus:outline-none transition-colors duration-300 ${
                        errors.name
                          ? 'border-red-500 focus:border-red-400'
                          : 'border-stone-700 focus:border-amber-800'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                    )}
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
                      className={`w-full px-4 py-3 bg-stone-800 border rounded-lg text-beige placeholder-stone-500 focus:outline-none transition-colors duration-300 ${
                        errors.phone
                          ? 'border-red-500 focus:border-red-400'
                          : 'border-stone-700 focus:border-amber-800'
                      }`}
                      placeholder="Enter 10-digit phone number"
                      maxLength="10"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                    )}
                  </div>
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
                    className={`w-full px-4 py-3 bg-stone-800 border rounded-lg text-beige placeholder-stone-500 focus:outline-none transition-colors duration-300 ${
                      errors.email
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-stone-700 focus:border-amber-800'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Inquiry Type */}
                <div>
                  <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
                    Inquiry Type
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-beige focus:outline-none focus:border-amber-800 transition-colors duration-300"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-stone-800 border rounded-lg text-beige placeholder-stone-500 focus:outline-none transition-colors duration-300 ${
                      errors.subject
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-stone-700 focus:border-amber-800'
                    }`}
                    placeholder="Brief subject of your inquiry"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-wide">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className={`w-full px-4 py-3 bg-stone-800 border rounded-lg text-beige placeholder-stone-500 focus:outline-none transition-colors duration-300 resize-none ${
                      errors.message
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-stone-700 focus:border-amber-800'
                    }`}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                  )}
                  <p className="mt-2 text-xs text-stone-500">
                    Minimum 10 characters. Current: {formData.message.length}
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                      Preparing Message...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send via WhatsApp
                    </>
                  )}
                </button>

                <p className="text-xs text-stone-500 text-center">
                  Your message will be prepared and opened in WhatsApp for direct communication with our team.
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="card-luxury p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-800/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="text-amber-800">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-serif text-beige mb-2">
                        {info.title}
                      </h3>
                      <p className="text-stone-300 font-medium mb-1">
                        {info.details}
                      </p>
                      <p className="text-stone-400 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="card-luxury p-8">
                <h3 className="text-lg font-serif text-beige mb-6">
                  Quick Actions
                </h3>
                <div className="space-y-4">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-3 p-4 bg-stone-800 rounded-lg hover:bg-stone-700 transition-colors duration-300"
                  >
                    <Phone className="w-5 h-5 text-amber-800" />
                    <span className="text-beige">Call Us Now</span>
                  </a>
                  
                  <a
                    href="mailto:aureim.chocolates@gmail.com"
                    className="flex items-center gap-3 p-4 bg-stone-800 rounded-lg hover:bg-stone-700 transition-colors duration-300"
                  >
                    <Mail className="w-5 h-5 text-amber-800" />
                    <span className="text-beige">Send Email</span>
                  </a>
                  
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-green-800 rounded-lg hover:bg-green-700 transition-colors duration-300"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                    <span className="text-white">WhatsApp Direct</span>
                  </a>
                </div>
              </div>

              {/* FAQ */}
              <div className="card-luxury p-8">
                <h3 className="text-lg font-serif text-beige mb-6">
                  Frequently Asked
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-stone-300 font-medium mb-1">Response Time?</p>
                    <p className="text-stone-400">We respond to all inquiries within 24 hours during business days.</p>
                  </div>
                  <div>
                    <p className="text-stone-300 font-medium mb-1">Order Support?</p>
                    <p className="text-stone-400">For order-related queries, please have your order ID ready.</p>
                  </div>
                  <div>
                    <p className="text-stone-300 font-medium mb-1">Wholesale Inquiries?</p>
                    <p className="text-stone-400">Minimum order quantities and special pricing available for bulk orders.</p>
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

export default ContactPage