import React, { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ValueProposition from './components/ValueProposition'
import ProductDetails from './components/ProductDetails'
import Philosophy from './components/Philosophy'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import CheckoutModal from './components/CheckoutModal'
import './index.css'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const handleAddToCart = (quantity = 1) => {
    setCartItems([...cartItems, { id: Date.now(), quantity }])
    setToastMessage('Added to your AUREIM collection')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleBuyNow = () => {
    setIsCheckoutOpen(true)
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-cream-primary">
      <Navigation 
        cartCount={cartTotal} 
        onCartClick={() => setIsCheckoutOpen(true)}
      />

      <Hero />
      <ValueProposition />
      <ProductDetails 
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
      <Philosophy />
      <Testimonials />
      <Footer />

      {isCheckoutOpen && (
        <CheckoutModal 
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cartTotal={cartTotal}
        />
      )}

      {showToast && (
        <div className="fixed bottom-8 left-8 bg-cocoa-primary text-cream-primary px-6 py-4 rounded-lg shadow-luxury z-50 animate-bounce">
          <p className="text-sm font-medium tracking-wide">{toastMessage}</p>
        </div>
      )}
    </div>
  )
}

export default App
