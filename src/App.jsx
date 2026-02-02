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
import { sendBrowserNotification, initializeNotifications } from './utils/browserNotification'
import { autoSendOrderToWhatsApp, autoSendCustomerConfirmation, setupOrderTracking } from './utils/automatedWhatsApp'
import { loadOrdersFromUrl } from './utils/orderSync'
import { notifyAdminOfOrder } from './utils/centralOrderSystem'
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

  // Initialize notifications on app load
  useEffect(() => {
    initializeNotifications()
    
    // 🔄 Check for cross-device synced orders first
    const syncResult = loadSyncedOrders()
    if (syncResult && syncResult.success && syncResult.newCount > 0) {
      showToast(`📱➡️💻 ${syncResult.message}`, 'success')
      
      // If it's an admin sync, open admin dashboard automatically
      if (syncResult.openAdmin) {
        setTimeout(() => {
          setCurrentView('admin')
          showToast(`🔧 Admin dashboard opened with mobile order`, 'success')
        }, 1000)
      }
    }
    
    // Check for legacy order sync in URL
    const legacySyncResult = loadOrdersFromUrl()
    if (legacySyncResult && legacySyncResult.success && legacySyncResult.newCount > 0) {
      showToast(`✅ Synced ${legacySyncResult.newCount} orders from another device`, 'success')
    }
    
    // Check for new order in URL (legacy support)
    const urlParams = new URLSearchParams(window.location.search)
    const newOrderData = urlParams.get('neworder')
    if (newOrderData) {
      try {
        const orderArray = JSON.parse(atob(newOrderData))
        if (orderArray.length > 0) {
          const order = orderArray[0]
          // Save the new order to localStorage
          const existingOrders = JSON.parse(localStorage.getItem('aureim_orders') || '[]')
          const orderExists = existingOrders.some(existing => existing.orderId === order.orderId)
          
          if (!orderExists) {
            existingOrders.push(order)
            localStorage.setItem('aureim_orders', JSON.stringify(existingOrders))
            showToast(`🍫 New order received: ${order.orderId}`, 'success')
            
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname)
          }
        }
      } catch (error) {
        console.error('Failed to process new order from URL:', error)
      }
    }
  }, [])

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
    console.log('🔥 PAYMENT SUCCESS TRIGGERED:', orderData)
    saveOrderToStorage(orderData)
    
    try {
      // � CROSS-DEVICE SYNC - Sync order to all devices automatically
      console.log('� Starting cross-device sync...')
      autoSyncNewOrder(orderData).then(syncResult => {
        console.log('📱➡️💻 Cross-device sync result:', syncResult)
        if (syncResult.success) {
          showToast(`📱➡️💻 Order synced across devices! Check desktop admin.`, 'success')
          
          // Show sync instructions on mobile
          if (window.innerWidth <= 768) { // Mobile device
            setTimeout(() => {
              showSyncInstructions(orderData, {
                adminUrl: syncResult.adminUrl,
                syncUrl: syncResult.syncUrl,
                whatsappUrl: `https://wa.me/919000429689?text=${encodeURIComponent('� Admin link copied! Open on desktop to see order.')}`
              })
            }, 2000)
          }
        } else {
          console.error('❌ Cross-device sync failed:', syncResult)
        }
      }).catch(error => {
        console.error('❌ Cross-device sync error:', error)
      })
      
      // 🚀 AUTOMATED WHATSAPP SYSTEM - Sends order details automatically
      console.log('🚀 Starting automated WhatsApp system...')
      autoSendOrderToWhatsApp(orderData).then(result => {
        console.log('📱 Automated WhatsApp result:', result)
        if (result.success) {
          console.log('✅ Automated WhatsApp result:', result)
          showToast(`🚀 Order sent to WhatsApp automatically! Check admin phone.`, 'success')
          
          // Also send customer confirmation automatically
          autoSendCustomerConfirmation(orderData).then(customerResult => {
            console.log('� Customer confirmation result:', customerResult)
            if (customerResult.success) {
              console.log('✅ Customer confirmation sent automatically')
              showToast(`📱 Customer confirmation sent automatically`, 'success')
            }
          }).catch(error => {
            console.error('❌ Customer confirmation error:', error)
          })
          
          // Setup order tracking
          const trackingData = setupOrderTracking(orderData)
          console.log('📋 Order tracking setup:', trackingData)
          
        } else {
          console.error('❌ Automated WhatsApp failed:', result)
          showToast('⚠️ Auto-WhatsApp failed, check console for details', 'warning')
        }
      }).catch(error => {
        console.error('❌ Automated WhatsApp error:', error)
        showToast('⚠️ Auto-WhatsApp error, check console', 'warning')
      })
      
      // Send comprehensive admin notifications (backup system)
      console.log('� Starting backup notification system...')
      notifyAdminOfOrder(orderData).then(result => {
        console.log('� Backup notification result:', result)
        if (result.success) {
          console.log('✅ Backup admin notification result:', result)
          
          // Log comprehensive order details for admin reference
          console.log('🍫 COMPREHENSIVE ORDER DETAILS FOR ADMIN:')
          console.log('Order ID:', orderData.orderId)
          console.log('Customer:', orderData.customerInfo.fullName)
          console.log('Phone:', orderData.customerInfo.phone)
          console.log('Email:', orderData.customerInfo.email)
          console.log('Address:', `${orderData.customerInfo.addressLine1}, ${orderData.customerInfo.city}`)
          console.log('Total:', `₹${orderData.totals.total}`)
          console.log('Items:', orderData.cartItems.map(item => `${item.name} (${item.quantity})`).join(', '))
          console.log('Google Maps:', `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${orderData.customerInfo.addressLine1}, ${orderData.customerInfo.city}, ${orderData.customerInfo.state}`)}`)
        } else {
          console.error('❌ Backup admin notification failed:', result)
        }
      }).catch(error => {
        console.error('❌ Backup admin notification error:', error)
      })
      
      // Send browser notification
      console.log('🔔 Sending browser notification...')
      const browserNotification = sendBrowserNotification(orderData)
      console.log('🔔 Browser notification result:', browserNotification)
      
      // Prepare WhatsApp modal as final manual backup
      const message = formatOrderForWhatsApp(orderData)
      const whatsappUrl = `https://wa.me/919000429689?text=${message}`
      
      // Show WhatsApp modal as final backup (will auto-close if automation works)
      setTimeout(() => {
        console.log('📱 Showing WhatsApp modal as backup...')
        setWhatsappModal({
          isOpen: true,
          orderData,
          whatsappUrl,
          message
        })
      }, 3000) // Show after 3 seconds as backup
      
    } catch (error) {
      console.error('Failed to send automated notifications:', error)
      showToast('⚠️ Order confirmed! Check console for details.', 'warning')
      
      // Emergency fallback - log order details
      console.error('EMERGENCY ORDER DETAILS:', orderData)
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

  const handleTestWhatsApp = async () => {
    console.log('🧪 Testing WhatsApp automation...')
    showToast('🧪 Testing WhatsApp automation...', 'info')
    
    try {
      const result = await testWhatsAppAutomation(autoSendOrderToWhatsApp)
      if (result.success) {
        showToast('✅ WhatsApp test successful! Check your WhatsApp.', 'success')
        console.log('✅ WhatsApp test successful:', result)
      } else {
        showToast('❌ WhatsApp test failed. Check console.', 'error')
        console.error('❌ WhatsApp test failed:', result)
      }
    } catch (error) {
      showToast('❌ WhatsApp test error. Check console.', 'error')
      console.error('❌ WhatsApp test error:', error)
    }
  }

  const handleCreateTestOrder = () => {
    console.log('🧪 Creating test order...')
    
    // Create a test order
    const testOrder = createTestOrder()
    console.log('📋 Test order created:', testOrder)
    
    // Save it to localStorage
    const saveResult = saveOrderToStorage(testOrder)
    console.log('💾 Save result:', saveResult)
    
    // Verify it was saved
    const savedOrders = JSON.parse(localStorage.getItem('aureim_orders') || '[]')
    console.log('🔍 Orders in localStorage:', savedOrders.length)
    
    if (saveResult) {
      showToast(`✅ Test order ${testOrder.orderId} created successfully!`, 'success')
      
      // Trigger the payment success flow
      handlePaymentSuccess(testOrder)
    } else {
      showToast('❌ Failed to create test order', 'error')
    }
  }

  const handleDebugOrders = () => {
    console.log('🔍 Starting order system debug...')
    debugOrderSystem()
    
    const stats = getOrderStats()
    if (stats) {
      showToast(`📊 Debug: ${stats.totalOrders} orders, ₹${stats.totalRevenue} revenue`, 'info')
    } else {
      showToast('❌ Debug: No order data found', 'error')
    }
  }

  const handleAddTestOrders = () => {
    console.log('📦 Adding multiple test orders...')
    const orders = addMultipleTestOrders(5)
    showToast(`✅ Added ${orders.length} test orders to dashboard`, 'success')
  }

  const handleClearOrders = () => {
    if (window.confirm('⚠️ This will delete ALL orders. Are you sure?')) {
      clearDebugOrders()
      showToast('🗑️ All orders cleared', 'success')
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
          <Testimonials onNavigate={handleNavigate} />
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
      
      {/* Development Test Buttons - Only show in development */}
      {(window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) && (
        <div className="fixed bottom-4 left-4 flex flex-col gap-2 z-50">
          <button
            onClick={handleTestWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-full shadow-lg text-xs font-medium transition-all duration-300 hover:scale-105"
            title="Test WhatsApp Automation"
          >
            🧪 Test WhatsApp
          </button>
          <button
            onClick={handleCreateTestOrder}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-full shadow-lg text-xs font-medium transition-all duration-300 hover:scale-105"
            title="Create Test Order"
          >
            📋 Create Order
          </button>
          <button
            onClick={handleDebugOrders}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-full shadow-lg text-xs font-medium transition-all duration-300 hover:scale-105"
            title="Debug Order System"
          >
            🔍 Debug Orders
          </button>
          <button
            onClick={handleAddTestOrders}
            className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-full shadow-lg text-xs font-medium transition-all duration-300 hover:scale-105"
            title="Add 5 Test Orders"
          >
            📦 Add 5 Orders
          </button>
          <button
            onClick={handleClearOrders}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-full shadow-lg text-xs font-medium transition-all duration-300 hover:scale-105"
            title="Clear All Orders"
          >
            🗑️ Clear All
          </button>
        </div>
      )}
    </div>
  )
}

export default App