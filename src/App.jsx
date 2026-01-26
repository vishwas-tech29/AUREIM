import React, { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import FeaturedMessage from './components/FeaturedMessage'
import ProductGrid from './components/ProductGrid'
import StorySection from './components/StorySection'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import Toast from './components/Toast'
import CartPage from './components/CartPage'
import CartSidebar from './components/CartSidebar'
import CheckoutPage from './components/CheckoutPage'
import PaymentProcessing from './components/PaymentProcessing'
import OrderConfirmation from './components/OrderConfirmation'
import AdminDashboard from './components/AdminDashboard'
import CraftPage from './components/CraftPage'
import ContactPage from './components/ContactPage'
import ReviewPage from './components/ReviewPage'
import WhatsAppModal from './components/WhatsAppModal'
import FloatingCartButton from './components/FloatingCartButton'
import HomeCartSection from './components/HomeCartSection'
import LazyImage from './components/LazyImage'
import { products } from './data/products'
import { preloadImages, criticalImages } from './utils/imagePreloader'
import { 
  generateOrderId, 
  saveOrderToStorage, 
  calculateTax,
  calculateShipping
} from './utils/excelExport'
import { sendBusinessNotification, sendCustomerConfirmation, formatOrderForWhatsApp } from './utils/whatsappNotification'
import './index.css'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState(new Set())
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
  const [currentView, setCurrentView] = useState('home')
  const [orderSummary, setOrderSummary] = useState(null)
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(null)
  const [whatsappModal, setWhatsappModal] = useState({ isOpen: false, orderData: null, whatsappUrl: '', message: '' })

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000)
  }

  const handleAddToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity }])
    }
    
    showToast(`${product.name} added to your collection`)
  }

  const handleToggleFavorite = (productId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId)
      showToast('Removed from favorites')
    } else {
      newFavorites.add(productId)
      showToast('Added to favorites')
    }
    setFavorites(newFavorites)
  }

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveItem(itemId)
      return
    }
    
    setCartItems(cartItems.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity }
        : item
    ))
  }

  const handleRemoveItem = (itemId) => {
    const item = cartItems.find(item => item.id === itemId)
    setCartItems(cartItems.filter(item => item.id !== itemId))
    showToast(`${item?.name} removed from cart`)
  }

  const handleProceedToCheckout = (summary) => {
    setOrderSummary(summary)
    setCurrentView('checkout')
  }

  const handleContinueShopping = () => {
    setCurrentView('home')
  }

  const handleCartClick = () => {
    setIsCartSidebarOpen(true)
  }

  const handleViewFullCart = () => {
    setIsCartSidebarOpen(false)
    setCurrentView('cart')
  }

  const handleCartSidebarCheckout = () => {
    setIsCartSidebarOpen(false)
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const tax = calculateTax(subtotal)
    const shipping = calculateShipping(subtotal)
    const total = subtotal + tax + shipping
    
    setOrderSummary({ subtotal, tax, shipping, total })
    setCurrentView('checkout')
  }

  const handleFavoritesClick = () => {
    showToast('Favorites feature coming soon!')
  }

  const handlePlaceOrder = (orderData) => {
    const orderId = generateOrderId()
    const completeOrderData = {
      ...orderData,
      orderId,
      timestamp: Date.now()
    }
    
    setCurrentOrder(completeOrderData)
    setCurrentView('processing')
  }

  const handlePaymentSuccess = (orderData) => {
    saveOrderToStorage(orderData)
    
    try {
      // Prepare WhatsApp notification for business
      const message = formatOrderForWhatsApp(orderData)
      const whatsappUrl = `https://wa.me/919000429689?text=${message}`
      
      // Automatically send customer confirmation
      const customerResult = sendCustomerConfirmation(orderData)
      
      if (customerResult.success) {
        showToast('✅ Order confirmed! Customer WhatsApp opened automatically', 'success')
        
        // Small delay then show business notification
        setTimeout(() => {
          setWhatsappModal({
            isOpen: true,
            orderData,
            whatsappUrl,
            message
          })
        }, 2000)
      } else {
        // Fallback to manual process
        setWhatsappModal({
          isOpen: true,
          orderData,
          whatsappUrl,
          message
        })
        showToast('✅ Order confirmed! Please send WhatsApp notifications', 'success')
      }
      
    } catch (error) {
      console.error('Failed to prepare WhatsApp notification:', error)
      showToast('⚠️ Order confirmed! Please contact customer manually.', 'warning')
    }
    
    setCurrentOrder(orderData)
    setCurrentView('confirmation')
  }

  const handlePaymentFailure = () => {
    setCurrentView('checkout')
    showToast('Payment failed. Please try again.', 'error')
  }

  const handlePaymentRetry = () => {
    if (currentOrder) {
      setCurrentView('processing')
    }
  }

  const handleOrderComplete = () => {
    setCartItems([])
    setCurrentOrder(null)
    setOrderSummary(null)
    setCurrentView('home')
    showToast('Thank you for your order! 🎉')
  }

  const handleTrackOrder = (orderId) => {
    showToast(`Tracking order ${orderId}. Feature coming soon!`)
  }

  const handleDownloadInvoice = (orderData) => {
    try {
      // Show WhatsApp modal for order details
      const message = formatOrderForWhatsApp(orderData)
      const whatsappUrl = `https://wa.me/919000429689?text=${message}`
      
      setWhatsappModal({
        isOpen: true,
        orderData,
        whatsappUrl,
        message
      })
      
    } catch (error) {
      showToast('Failed to prepare order details. Please try again.', 'error')
    }
  }

  const handleAdminAccess = () => {
    setCurrentView('admin')
    showToast('Admin dashboard accessed')
  }

  const handleNavigate = (page, section = null) => {
    setCurrentView(page)
    
    if (page === 'home' && section) {
      setTimeout(() => {
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-cream-soft">
      <Navigation 
        cartCount={cartTotal} 
        onCartClick={handleCartClick}
        onFavoritesClick={handleFavoritesClick}
        onAdminClick={handleAdminAccess}
        onNavigate={handleNavigate}
      />
      
      {currentView === 'home' && (
        <main>
          <Hero />
          <FeaturedMessage />
          <ProductGrid 
            products={products}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
          />
          
          {/* Home Cart Section - Shows when items are in cart */}
          <HomeCartSection
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onViewCart={handleViewFullCart}
            onCheckout={handleCartSidebarCheckout}
          />
          
          <StorySection onNavigate={handleNavigate} />
          <Testimonials />
          <Newsletter />
          
          {/* Floating Cart Button - Only on Home Page */}
          <FloatingCartButton
            cartCount={cartTotal}
            onCartClick={handleCartClick}
            onViewCart={handleViewFullCart}
          />
        </main>
      )}

      {currentView === 'cart' && (
        <CartPage
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onProceedToCheckout={handleProceedToCheckout}
          onContinueShopping={handleContinueShopping}
        />
      )}

      {currentView === 'checkout' && (
        <CheckoutPage
          cartItems={cartItems}
          totals={orderSummary}
          onBack={() => setCurrentView('cart')}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {currentView === 'processing' && (
        <PaymentProcessing
          orderData={currentOrder}
          onSuccess={handlePaymentSuccess}
          onFailure={handlePaymentFailure}
          onRetry={handlePaymentRetry}
        />
      )}

      {currentView === 'confirmation' && (
        <OrderConfirmation
          orderData={currentOrder}
          onContinueShopping={handleOrderComplete}
          onTrackOrder={handleTrackOrder}
          onDownloadInvoice={handleDownloadInvoice}
        />
      )}

      {currentView === 'admin' && (
        <AdminDashboard
          onClose={() => setCurrentView('home')}
        />
      )}

      {currentView === 'craft' && (
        <CraftPage
          onBack={() => setCurrentView('home')}
        />
      )}

      {currentView === 'contact' && (
        <ContactPage
          onBack={() => setCurrentView('home')}
        />
      )}

      {currentView === 'reviews' && (
        <ReviewPage
          onBack={() => setCurrentView('home')}
          products={products}
        />
      )}
      
      {(currentView === 'home' || currentView === 'confirmation') && <Footer onNavigate={handleNavigate} />}
      
      <CartSidebar
        isOpen={isCartSidebarOpen}
        onClose={() => setIsCartSidebarOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onViewCart={handleViewFullCart}
        onCheckout={handleCartSidebarCheckout}
      />
      
      <WhatsAppModal
        isOpen={whatsappModal.isOpen}
        onClose={() => setWhatsappModal({ isOpen: false, orderData: null, whatsappUrl: '', message: '' })}
        orderData={whatsappModal.orderData}
        whatsappUrl={whatsappModal.whatsappUrl}
        message={whatsappModal.message}
      />
      
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}
    </div>
  )
}

export default App