import { useState, useEffect } from 'react'
import { Bell, Package, Refresh, ExternalLink } from 'lucide-react'
import { getOrdersFromStorage, formatCurrency } from '../utils/excelExport'

const AdminNotificationCenter = ({ onClose }) => {
  const [orders, setOrders] = useState([])
  const [lastCheck, setLastCheck] = useState(Date.now())
  const [newOrdersCount, setNewOrdersCount] = useState(0)

  useEffect(() => {
    loadOrders()
    
    // Auto-refresh every 15 seconds (more frequent for better monitoring)
    const interval = setInterval(() => {
      checkForNewOrders()
    }, 15000)
    
    // Also check immediately when component mounts
    setTimeout(() => {
      checkForNewOrders()
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const loadOrders = () => {
    const orderData = getOrdersFromStorage()
    setOrders(orderData.sort((a, b) => b.timestamp - a.timestamp)) // Sort by newest first
  }

  const checkForNewOrders = () => {
    const orderData = getOrdersFromStorage()
    const newOrders = orderData.filter(order => order.timestamp > lastCheck)
    
    if (newOrders.length > 0) {
      setNewOrdersCount(prev => prev + newOrders.length)
      setOrders(orderData.sort((a, b) => b.timestamp - a.timestamp))
      
      // Show browser notification for new orders
      if (Notification.permission === 'granted') {
        new Notification(`🍫 ${newOrders.length} New AUREIM Order(s)!`, {
          body: `Latest: ${newOrders[0].customerInfo.fullName} - ₹${newOrders[0].totals.total}`,
          icon: '/favicon.svg'
        })
      }
    }
    
    setLastCheck(Date.now())
  }

  const formatDate = (timestamp) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const openWhatsAppForOrder = (order) => {
    const message = `🍫 AUREIM Order ${order.orderId}

Customer: ${order.customerInfo.fullName}
Phone: ${order.customerInfo.phone}
Total: ₹${order.totals.total}
Items: ${order.cartItems.length}

Address: ${order.customerInfo.addressLine1}, ${order.customerInfo.city}

Ready to pack and deliver! 📦`

    const whatsappUrl = `https://wa.me/919000429689?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const openMapsForOrder = (order) => {
    const address = `${order.customerInfo.addressLine1}, ${order.customerInfo.city}, ${order.customerInfo.state} - ${order.customerInfo.pinCode}`
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    window.open(mapsUrl, '_blank')
  }

  return (
    <div className="fixed inset-0 bg-chocolate-dark/95 z-50 overflow-y-auto">
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Bell className="w-8 h-8 text-caramel-gold" />
              <div>
                <h1 className="text-h1 font-serif text-text-primary">Order Notifications</h1>
                <p className="text-text-secondary">Real-time order monitoring center</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={checkForNewOrders}
                className="btn-secondary flex items-center gap-2"
              >
                <Refresh size={20} />
                Refresh
              </button>
              <button
                onClick={onClose}
                className="btn-primary"
              >
                Close
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card-luxury p-6 text-center">
              <Package className="w-8 h-8 text-caramel-gold mx-auto mb-3" />
              <div className="text-2xl font-serif text-text-primary mb-1">{orders.length}</div>
              <div className="text-text-secondary text-sm">Total Orders</div>
            </div>
            
            <div className="card-luxury p-6 text-center">
              <Bell className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-serif text-text-primary mb-1">{newOrdersCount}</div>
              <div className="text-text-secondary text-sm">New Notifications</div>
            </div>
            
            <div className="card-luxury p-6 text-center">
              <div className="w-8 h-8 bg-caramel-gold rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-chocolate-dark text-sm font-bold">₹</span>
              </div>
              <div className="text-2xl font-serif text-text-primary mb-1">
                {formatCurrency(orders.reduce((sum, order) => sum + order.totals.total, 0))}
              </div>
              <div className="text-text-secondary text-sm">Total Revenue</div>
            </div>
          </div>

          {/* Orders List */}
          <div className="card-luxury p-6">
            <h2 className="text-h3 font-serif text-text-primary mb-6">Recent Orders</h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <Package size={48} className="text-text-secondary mx-auto mb-4" />
                <p className="text-text-secondary">No orders yet. This page will update automatically when new orders arrive.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 10).map((order) => (
                  <div key={order.orderId} className="bg-cream-beige rounded-lg p-4 hover:bg-cream-blush transition-colors duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-mono text-sm text-text-primary">{order.orderId}</div>
                        <div className="text-lg font-medium text-text-primary">{order.customerInfo.fullName}</div>
                        <div className="text-text-secondary text-sm">{order.customerInfo.phone}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-serif text-caramel-gold">{formatCurrency(order.totals.total)}</div>
                        <div className="text-text-secondary text-sm">{formatDate(order.timestamp)}</div>
                      </div>
                    </div>
                    
                    <div className="text-text-secondary text-sm mb-3">
                      📍 {order.customerInfo.city}, {order.customerInfo.state}
                    </div>
                    
                    <div className="text-text-secondary text-sm mb-4">
                      🛒 {order.cartItems.length} items: {order.cartItems.map(item => item.name).join(', ')}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => openWhatsAppForOrder(order)}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        WhatsApp
                      </button>
                      <button
                        onClick={() => openMapsForOrder(order)}
                        className="btn-secondary text-sm px-4 py-2 flex items-center gap-1"
                      >
                        <ExternalLink size={14} />
                        Maps
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Auto-refresh info */}
          <div className="mt-6 text-center">
            <p className="text-text-secondary text-sm">
              🔄 Auto-refreshing every 15 seconds • Last check: {new Date(lastCheck).toLocaleTimeString()}
            </p>
            <p className="text-text-secondary text-xs mt-2">
              💡 Keep this page open to monitor new orders in real-time
            </p>
            <p className="text-text-secondary text-xs mt-1">
              📱 Orders are also sent via WhatsApp (+91 90004 29689) and Email (aureim.chocolates@gmail.com)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminNotificationCenter