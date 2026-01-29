// Enhanced Cross-Device Order Synchronization System
// Automatically syncs orders between mobile and desktop

// Configuration
const SYNC_STORAGE_KEY = 'aureim_orders'
const SYNC_URL_PARAM = 'orders'
const ADMIN_SYNC_PARAM = 'admin'

/**
 * Automatically sync orders when a new order is placed
 * This creates multiple sync methods for cross-device access
 */
export const autoSyncNewOrder = async (orderData) => {
  console.log('🔄 Starting auto-sync for new order:', orderData.orderId)
  
  try {
    // 1. Save to localStorage (current device)
    saveOrderLocally(orderData)
    
    // 2. Create shareable sync URL
    const syncUrl = createOrderSyncUrl([orderData])
    
    // 3. Create admin access URL
    const adminUrl = createAdminAccessUrl(orderData)
    
    // 4. Send sync URLs via multiple channels
    const syncResults = await sendSyncUrls(orderData, syncUrl, adminUrl)
    
    // 5. Create QR code for easy mobile-to-desktop sync
    const qrResult = await createSyncQR(syncUrl)
    
    return {
      success: true,
      message: 'Order synced across devices',
      syncUrl,
      adminUrl,
      qrResult,
      syncResults
    }
  } catch (error) {
    console.error('❌ Auto-sync failed:', error)
    return {
      success: false,
      message: 'Failed to sync order across devices',
      error: error.message
    }
  }
}

/**
 * Save order to localStorage
 */
const saveOrderLocally = (orderData) => {
  try {
    const existingOrders = JSON.parse(localStorage.getItem(SYNC_STORAGE_KEY) || '[]')
    const orderExists = existingOrders.some(order => order.orderId === orderData.orderId)
    
    if (!orderExists) {
      existingOrders.push(orderData)
      localStorage.setItem(SYNC_STORAGE_KEY, JSON.stringify(existingOrders))
      console.log('💾 Order saved locally:', orderData.orderId)
    }
  } catch (error) {
    console.error('❌ Failed to save order locally:', error)
  }
}

/**
 * Create shareable sync URL for orders
 */
const createOrderSyncUrl = (orders) => {
  try {
    const ordersData = btoa(JSON.stringify(orders))
    const baseUrl = window.location.origin
    return `${baseUrl}?${SYNC_URL_PARAM}=${ordersData}`
  } catch (error) {
    console.error('❌ Failed to create sync URL:', error)
    return null
  }
}

/**
 * Create admin access URL with order data
 */
const createAdminAccessUrl = (orderData) => {
  try {
    const adminData = {
      newOrder: orderData,
      timestamp: Date.now(),
      adminAccess: true,
      source: 'mobile'
    }
    
    const adminDataEncoded = btoa(JSON.stringify(adminData))
    const baseUrl = window.location.origin
    return `${baseUrl}?${ADMIN_SYNC_PARAM}=${adminDataEncoded}`
  } catch (error) {
    console.error('❌ Failed to create admin URL:', error)
    return null
  }
}

/**
 * Send sync URLs via multiple channels
 */
const sendSyncUrls = async (orderData, syncUrl, adminUrl) => {
  const results = []
  
  try {
    // Method 1: Copy to clipboard
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(adminUrl)
      results.push({
        method: 'Clipboard',
        success: true,
        message: 'Admin URL copied to clipboard'
      })
    }
    
    // Method 2: Email with sync links
    const emailResult = await sendSyncEmail(orderData, syncUrl, adminUrl)
    results.push(emailResult)
    
    // Method 3: WhatsApp with sync links
    const whatsappResult = await sendSyncWhatsApp(orderData, syncUrl, adminUrl)
    results.push(whatsappResult)
    
    // Method 4: Browser notification with sync info
    const notificationResult = await sendSyncNotification(orderData, adminUrl)
    results.push(notificationResult)
    
    return results
  } catch (error) {
    console.error('❌ Failed to send sync URLs:', error)
    return []
  }
}

/**
 * Send sync email
 */
const sendSyncEmail = async (orderData, syncUrl, adminUrl) => {
  try {
    const subject = `🍫 AUREIM Order ${orderData.orderId} - Admin Access Link`
    const body = `New order received from mobile device!

Order Details:
- Order ID: ${orderData.orderId}
- Customer: ${orderData.customerInfo.fullName}
- Total: ₹${orderData.totals.total}
- Time: ${new Date(orderData.timestamp).toLocaleString()}

🔗 ADMIN ACCESS LINKS:

1. Direct Admin Dashboard:
${adminUrl}

2. Order Sync URL:
${syncUrl}

📱 MOBILE TO DESKTOP SYNC:
- Copy the admin URL above
- Open it on your desktop/laptop
- Order will appear in admin dashboard automatically

---
AUREIM Premium Chocolates
Handcrafted with love in Hyderabad`

    const mailtoUrl = `mailto:aureim.chocolates@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Open email client
    window.open(mailtoUrl, '_blank')
    
    return {
      method: 'Email',
      success: true,
      message: 'Sync email prepared',
      url: mailtoUrl
    }
  } catch (error) {
    return {
      method: 'Email',
      success: false,
      message: 'Failed to prepare sync email'
    }
  }
}

/**
 * Send sync WhatsApp message
 */
const sendSyncWhatsApp = async (orderData, syncUrl, adminUrl) => {
  try {
    const message = `🍫 *AUREIM - Mobile Order Sync*

📱 *New order from mobile device!*

📋 *Order:* ${orderData.orderId}
👤 *Customer:* ${orderData.customerInfo.fullName}
💰 *Total:* ₹${orderData.totals.total}

🔗 *ADMIN ACCESS LINK:*
${adminUrl}

📱 *Instructions:*
1. Copy the link above
2. Open on desktop/laptop
3. Order appears in admin dashboard

⚡ *Quick Access:*
- Click link to open admin dashboard
- Order details loaded automatically
- No manual entry needed

---
*AUREIM Premium Chocolates*`

    const whatsappUrl = `https://wa.me/919000429689?text=${encodeURIComponent(message)}`
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank')
    
    return {
      method: 'WhatsApp',
      success: true,
      message: 'Sync WhatsApp opened',
      url: whatsappUrl
    }
  } catch (error) {
    return {
      method: 'WhatsApp',
      success: false,
      message: 'Failed to open sync WhatsApp'
    }
  }
}

/**
 * Send browser notification with sync info
 */
const sendSyncNotification = async (orderData, adminUrl) => {
  try {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification('🔄 Order Sync Available', {
        body: `Order ${orderData.orderId} ready for desktop sync. Click to copy admin link.`,
        icon: '/favicon.svg',
        requireInteraction: true
      })
      
      notification.onclick = () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(adminUrl)
        }
        notification.close()
      }
    }
    
    return {
      method: 'Browser Notification',
      success: true,
      message: 'Sync notification sent'
    }
  } catch (error) {
    return {
      method: 'Browser Notification',
      success: false,
      message: 'Failed to send sync notification'
    }
  }
}

/**
 * Create QR code for sync URL
 */
const createSyncQR = async (syncUrl) => {
  try {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(syncUrl)}`
    
    return {
      success: true,
      qrUrl,
      syncUrl,
      message: 'QR code created for easy sync'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create QR code'
    }
  }
}

/**
 * Load orders from URL parameters (for receiving synced orders)
 */
export const loadSyncedOrders = () => {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    
    // Check for regular order sync
    const ordersData = urlParams.get(SYNC_URL_PARAM)
    if (ordersData) {
      return loadOrdersFromData(ordersData)
    }
    
    // Check for admin sync
    const adminData = urlParams.get(ADMIN_SYNC_PARAM)
    if (adminData) {
      return loadAdminData(adminData)
    }
    
    return null
  } catch (error) {
    console.error('❌ Failed to load synced orders:', error)
    return null
  }
}

/**
 * Load orders from encoded data
 */
const loadOrdersFromData = (ordersData) => {
  try {
    const orders = JSON.parse(atob(ordersData))
    const existingOrders = JSON.parse(localStorage.getItem(SYNC_STORAGE_KEY) || '[]')
    const existingOrderIds = new Set(existingOrders.map(order => order.orderId))
    
    const newOrders = orders.filter(order => !existingOrderIds.has(order.orderId))
    
    if (newOrders.length > 0) {
      const mergedOrders = [...existingOrders, ...newOrders]
      localStorage.setItem(SYNC_STORAGE_KEY, JSON.stringify(mergedOrders))
      
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname)
      
      return {
        success: true,
        message: `✅ Synced ${newOrders.length} orders from mobile device`,
        newCount: newOrders.length,
        orders: newOrders
      }
    }
    
    return {
      success: true,
      message: 'No new orders to sync',
      newCount: 0
    }
  } catch (error) {
    console.error('❌ Failed to load orders from data:', error)
    return null
  }
}

/**
 * Load admin data with order
 */
const loadAdminData = (adminData) => {
  try {
    const data = JSON.parse(atob(adminData))
    
    if (data.newOrder && data.adminAccess) {
      // Save the order
      saveOrderLocally(data.newOrder)
      
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname)
      
      return {
        success: true,
        message: `✅ Mobile order ${data.newOrder.orderId} synced to desktop`,
        newCount: 1,
        orders: [data.newOrder],
        openAdmin: true // Signal to open admin dashboard
      }
    }
    
    return null
  } catch (error) {
    console.error('❌ Failed to load admin data:', error)
    return null
  }
}

/**
 * Show sync instructions to user
 */
export const showSyncInstructions = (orderData, syncUrls) => {
  const instructions = document.createElement('div')
  instructions.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 10000;
    max-width: 400px;
    text-align: center;
    font-family: Arial, sans-serif;
  `
  
  instructions.innerHTML = `
    <h3 style="color: #2B1810; margin-bottom: 20px;">📱➡️💻 Order Sync Ready!</h3>
    <p style="margin-bottom: 20px;">Your order <strong>${orderData.orderId}</strong> is ready to sync to desktop.</p>
    
    <div style="background: #f5f5f5; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
      <p><strong>🔗 Admin Link Copied!</strong></p>
      <p style="font-size: 14px;">Open this link on your desktop to see the order in admin dashboard.</p>
    </div>
    
    <div style="display: flex; gap: 10px; justify-content: center;">
      <button onclick="window.open('${syncUrls.whatsappUrl}', '_blank')" 
              style="background: #25D366; color: white; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer;">
        📱 Send via WhatsApp
      </button>
      <button onclick="window.open('${syncUrls.emailUrl}', '_blank')" 
              style="background: #0066CC; color: white; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer;">
        📧 Send via Email
      </button>
      <button onclick="this.parentElement.parentElement.remove()" 
              style="background: #666; color: white; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer;">
        Close
      </button>
    </div>
  `
  
  document.body.appendChild(instructions)
  
  // Auto-remove after 30 seconds
  setTimeout(() => {
    if (instructions.parentElement) {
      instructions.remove()
    }
  }, 30000)
}

export default {
  autoSyncNewOrder,
  loadSyncedOrders,
  showSyncInstructions
}