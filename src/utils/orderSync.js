// Order synchronization utility for cross-device access

export const generateOrderSyncUrl = () => {
  try {
    const orders = JSON.parse(localStorage.getItem('aureim_orders') || '[]')
    if (orders.length === 0) {
      return null
    }
    
    // Encode orders data for URL sharing
    const ordersData = btoa(JSON.stringify(orders))
    const baseUrl = window.location.origin
    return `${baseUrl}?orders=${ordersData}`
  } catch (error) {
    console.error('Failed to generate sync URL:', error)
    return null
  }
}

export const loadOrdersFromUrl = () => {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const ordersData = urlParams.get('orders')
    
    if (ordersData) {
      const orders = JSON.parse(atob(ordersData))
      
      // Merge with existing orders (avoid duplicates)
      const existingOrders = JSON.parse(localStorage.getItem('aureim_orders') || '[]')
      const existingOrderIds = new Set(existingOrders.map(order => order.orderId))
      
      const newOrders = orders.filter(order => !existingOrderIds.has(order.orderId))
      const mergedOrders = [...existingOrders, ...newOrders]
      
      if (newOrders.length > 0) {
        localStorage.setItem('aureim_orders', JSON.stringify(mergedOrders))
        return {
          success: true,
          message: `Synced ${newOrders.length} new orders`,
          newCount: newOrders.length,
          totalCount: mergedOrders.length
        }
      } else {
        return {
          success: true,
          message: 'No new orders to sync',
          newCount: 0,
          totalCount: existingOrders.length
        }
      }
    }
    
    return null
  } catch (error) {
    console.error('Failed to load orders from URL:', error)
    return {
      success: false,
      message: 'Failed to sync orders from URL'
    }
  }
}

export const createOrderSyncQR = async (orders) => {
  try {
    // Simple QR code data - just the sync URL
    const syncUrl = generateOrderSyncUrl()
    if (!syncUrl) return null
    
    // Use a QR code service (you can replace with your preferred service)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(syncUrl)}`
    
    return {
      qrUrl,
      syncUrl,
      orderCount: orders.length
    }
  } catch (error) {
    console.error('Failed to create QR code:', error)
    return null
  }
}

export const exportOrdersAsJson = () => {
  try {
    const orders = JSON.parse(localStorage.getItem('aureim_orders') || '[]')
    const dataStr = JSON.stringify(orders, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `aureim_orders_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    return {
      success: true,
      message: 'Orders exported as JSON file'
    }
  } catch (error) {
    console.error('Failed to export orders:', error)
    return {
      success: false,
      message: 'Failed to export orders'
    }
  }
}

export const importOrdersFromJson = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const orders = JSON.parse(e.target.result)
        
        // Validate orders structure
        if (!Array.isArray(orders)) {
          resolve({
            success: false,
            message: 'Invalid orders file format'
          })
          return
        }
        
        // Merge with existing orders
        const existingOrders = JSON.parse(localStorage.getItem('aureim_orders') || '[]')
        const existingOrderIds = new Set(existingOrders.map(order => order.orderId))
        
        const newOrders = orders.filter(order => 
          order.orderId && !existingOrderIds.has(order.orderId)
        )
        const mergedOrders = [...existingOrders, ...newOrders]
        
        localStorage.setItem('aureim_orders', JSON.stringify(mergedOrders))
        
        resolve({
          success: true,
          message: `Imported ${newOrders.length} new orders`,
          newCount: newOrders.length,
          totalCount: mergedOrders.length
        })
      } catch (error) {
        resolve({
          success: false,
          message: 'Failed to parse orders file'
        })
      }
    }
    reader.readAsText(file)
  })
}

export default {
  generateOrderSyncUrl,
  loadOrdersFromUrl,
  createOrderSyncQR,
  exportOrdersAsJson,
  importOrdersFromJson
}