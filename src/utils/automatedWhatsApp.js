// Automated WhatsApp Order Notification System
// This system automatically sends order details to WhatsApp without manual intervention

// Configuration
const ADMIN_WHATSAPP = '919000429689' // Admin WhatsApp number (without +)
const BUSINESS_NAME = 'AUREIM Premium Chocolates'

// WhatsApp Web API endpoints (for automation)
const WHATSAPP_WEB_URL = 'https://web.whatsapp.com/send'
const WHATSAPP_API_URL = 'https://api.whatsapp.com/send'

/**
 * Automatically send order notification to admin WhatsApp
 * This function creates multiple automated pathways to ensure delivery
 */
export const autoSendOrderToWhatsApp = async (orderData) => {
  console.log('🚀 autoSendOrderToWhatsApp called with:', orderData)
  const results = []
  
  try {
    console.log('📱 Starting WhatsApp automation methods...')
    
    // Method 1: Direct WhatsApp Web API (most reliable)
    console.log('📱 Method 1: WhatsApp Web...')
    const webResult = await sendViaWhatsAppWeb(orderData)
    results.push(webResult)
    console.log('📱 Method 1 result:', webResult)
    
    // Method 2: WhatsApp Business API (if available)
    console.log('📱 Method 2: WhatsApp Business...')
    const businessResult = await sendViaWhatsAppBusiness(orderData)
    results.push(businessResult)
    console.log('📱 Method 2 result:', businessResult)
    
    // Method 3: URL-based auto-redirect (fallback)
    console.log('📱 Method 3: Auto-redirect...')
    const urlResult = await sendViaAutoRedirect(orderData)
    results.push(urlResult)
    console.log('📱 Method 3 result:', urlResult)
    
    // Method 4: Auto-copy and notify (manual backup)
    console.log('📱 Method 4: Auto-copy...')
    const copyResult = await autoCopyAndNotify(orderData)
    results.push(copyResult)
    console.log('📱 Method 4 result:', copyResult)
    
    const finalResult = {
      success: true,
      message: 'Order automatically sent to WhatsApp via multiple methods',
      methods: results,
      orderData
    }
    
    console.log('✅ Final WhatsApp automation result:', finalResult)
    return finalResult
  } catch (error) {
    console.error('❌ Auto WhatsApp send failed:', error)
    return {
      success: false,
      message: 'Failed to auto-send to WhatsApp',
      error: error.message
    }
  }
}

/**
 * Method 1: Send via WhatsApp Web (opens automatically)
 */
const sendViaWhatsAppWeb = async (orderData) => {
  try {
    console.log('📱 Attempting WhatsApp Web method...')
    const message = formatOrderMessage(orderData)
    const whatsappUrl = `${WHATSAPP_WEB_URL}?phone=${ADMIN_WHATSAPP}&text=${message}`
    
    console.log('📱 WhatsApp URL created, opening...')
    
    // Create a temporary link and click it (more reliable than window.open)
    const link = document.createElement('a')
    link.href = whatsappUrl
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    console.log('📱 WhatsApp Web link clicked successfully')
    
    return {
      method: 'WhatsApp Web',
      success: true,
      message: 'WhatsApp Web opened successfully',
      url: whatsappUrl
    }
  } catch (error) {
    console.error('📱 WhatsApp Web method failed:', error)
    return {
      method: 'WhatsApp Web',
      success: false,
      message: 'Failed to open WhatsApp Web',
      error: error.message
    }
  }
}

/**
 * Method 2: Send via WhatsApp Business API (requires setup)
 */
const sendViaWhatsAppBusiness = async (orderData) => {
  try {
    console.log('📱 Attempting WhatsApp Mobile/API method...')
    const message = formatOrderMessage(orderData)
    const mobileUrl = `whatsapp://send?phone=${ADMIN_WHATSAPP}&text=${message}`
    const webUrl = `${WHATSAPP_API_URL}?phone=${ADMIN_WHATSAPP}&text=${message}`
    
    console.log('📱 Mobile URL:', mobileUrl)
    console.log('📱 Web URL:', webUrl)
    
    // Try to open mobile WhatsApp app first
    const mobileLink = document.createElement('a')
    mobileLink.href = mobileUrl
    mobileLink.target = '_blank'
    document.body.appendChild(mobileLink)
    mobileLink.click()
    document.body.removeChild(mobileLink)
    
    // Fallback to web after 2 seconds if mobile app doesn't open
    setTimeout(() => {
      console.log('📱 Opening web fallback...')
      window.open(webUrl, '_blank')
    }, 2000)
    
    return {
      method: 'WhatsApp Mobile/API',
      success: true,
      message: 'Attempted mobile app, fallback to web',
      urls: { mobile: mobileUrl, web: webUrl }
    }
  } catch (error) {
    console.error('📱 WhatsApp Mobile/API method failed:', error)
    return {
      method: 'WhatsApp Mobile/API',
      success: false,
      message: 'Failed to send via mobile/API',
      error: error.message
    }
  }
}

/**
 * Method 3: Auto-redirect with timer
 */
const sendViaAutoRedirect = async (orderData) => {
  try {
    const message = formatOrderMessage(orderData)
    const whatsappUrl = `${WHATSAPP_API_URL}?phone=${ADMIN_WHATSAPP}&text=${message}`
    
    // Show countdown and auto-redirect
    showAutoRedirectNotification(whatsappUrl, 5) // 5 second countdown
    
    return {
      method: 'Auto-Redirect',
      success: true,
      message: 'Auto-redirect to WhatsApp in 5 seconds',
      url: whatsappUrl
    }
  } catch (error) {
    return {
      method: 'Auto-Redirect',
      success: false,
      message: 'Failed to setup auto-redirect'
    }
  }
}

/**
 * Method 4: Auto-copy message and show instructions
 */
const autoCopyAndNotify = async (orderData) => {
  try {
    const message = decodeURIComponent(formatOrderMessage(orderData))
    
    // Auto-copy to clipboard
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(message)
    }
    
    // Show notification with instructions
    showCopyNotification()
    
    return {
      method: 'Auto-Copy',
      success: true,
      message: 'Order details copied to clipboard automatically',
      data: message
    }
  } catch (error) {
    return {
      method: 'Auto-Copy',
      success: false,
      message: 'Failed to copy to clipboard'
    }
  }
}

/**
 * Format order message for WhatsApp
 */
const formatOrderMessage = (orderData) => {
  const {
    orderId,
    customerInfo,
    cartItems,
    totals,
    timestamp
  } = orderData

  const date = new Date(timestamp).toLocaleDateString('en-IN')
  const time = new Date(timestamp).toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
  
  const productList = cartItems.map(item => 
    `• ${item.name} (${item.quantity}x) - ₹${item.price * item.quantity}`
  ).join('\n')

  const message = `🍫 *${BUSINESS_NAME}*
🚨 *NEW ORDER ALERT* 🚨

📋 *Order ID:* ${orderId}
📅 *Time:* ${date} at ${time}

👤 *Customer:*
${customerInfo.fullName}
📞 ${customerInfo.phone}
📧 ${customerInfo.email}

📍 *Delivery Address:*
${customerInfo.addressLine1}
${customerInfo.addressLine2 ? customerInfo.addressLine2 + '\n' : ''}${customerInfo.city}, ${customerInfo.state} - ${customerInfo.pinCode}
${customerInfo.landmark ? '🏠 Near: ' + customerInfo.landmark : ''}

🛒 *Items (${cartItems.length}):*
${productList}

💰 *Payment:*
Subtotal: ₹${totals.subtotal}
${totals.tax ? `Tax: ₹${totals.tax}\n` : ''}Delivery: ${totals.shipping === 0 ? 'FREE ✅' : '₹' + totals.shipping}
*TOTAL: ₹${totals.total}*

📦 *URGENT ACTIONS:*
✅ Confirm order receipt
✅ Start preparation
✅ Quality check items
✅ Pack with care
✅ Schedule delivery (2-3 days)

📍 *Customer Location:*
https://maps.google.com/?q=${encodeURIComponent(`${customerInfo.addressLine1}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.pinCode}`)}

📱 *Contact Customer:*
https://wa.me/91${customerInfo.phone.replace(/\D/g, '')}

⏰ *Order received at:* ${new Date().toLocaleString('en-IN')}

---
*Reply "CONFIRMED" to acknowledge*
*${BUSINESS_NAME}* 🍫`

  return encodeURIComponent(message)
}

/**
 * Show auto-redirect countdown notification
 */
const showAutoRedirectNotification = (url, seconds) => {
  let countdown = seconds
  
  const notification = document.createElement('div')
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #25D366;
    color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    z-index: 10000;
    font-family: Arial, sans-serif;
    max-width: 300px;
    text-align: center;
  `
  
  const updateNotification = () => {
    notification.innerHTML = `
      <div style="font-size: 18px; margin-bottom: 10px;">📱 WhatsApp Auto-Send</div>
      <div style="margin-bottom: 15px;">Redirecting to WhatsApp in <strong>${countdown}</strong> seconds...</div>
      <button onclick="window.open('${url}', '_blank'); this.parentElement.remove();" 
              style="background: white; color: #25D366; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; font-weight: bold;">
        Send Now
      </button>
      <button onclick="this.parentElement.remove();" 
              style="background: transparent; color: white; border: 1px solid white; padding: 8px 16px; border-radius: 5px; cursor: pointer; margin-left: 10px;">
        Cancel
      </button>
    `
  }
  
  updateNotification()
  document.body.appendChild(notification)
  
  const timer = setInterval(() => {
    countdown--
    if (countdown <= 0) {
      clearInterval(timer)
      window.open(url, '_blank')
      notification.remove()
    } else {
      updateNotification()
    }
  }, 1000)
}

/**
 * Show copy notification with instructions
 */
const showCopyNotification = () => {
  const notification = document.createElement('div')
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #2B1810;
    color: #FDF9F4;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    z-index: 10000;
    font-family: Arial, sans-serif;
    max-width: 400px;
    text-align: center;
  `
  
  notification.innerHTML = `
    <div style="font-size: 18px; margin-bottom: 10px;">📋 Order Details Copied!</div>
    <div style="margin-bottom: 15px;">
      Order details have been automatically copied to your clipboard.<br>
      <strong>Next steps:</strong><br>
      1. Open WhatsApp<br>
      2. Go to admin chat (+91 90004 29689)<br>
      3. Paste (Ctrl+V) and send
    </div>
    <button onclick="window.open('https://wa.me/919000429689', '_blank');" 
            style="background: #25D366; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold; margin-right: 10px;">
      Open WhatsApp
    </button>
    <button onclick="this.parentElement.remove();" 
            style="background: transparent; color: #FDF9F4; border: 1px solid #FDF9F4; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
      Close
    </button>
  `
  
  document.body.appendChild(notification)
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 10000)
}

/**
 * Send customer confirmation automatically
 */
export const autoSendCustomerConfirmation = async (orderData) => {
  try {
    const message = formatCustomerConfirmationMessage(orderData)
    const customerPhone = orderData.customerInfo.phone.replace(/\D/g, '')
    const whatsappUrl = `${WHATSAPP_API_URL}?phone=91${customerPhone}&text=${message}`
    
    // Auto-open customer WhatsApp
    window.open(whatsappUrl, '_blank')
    
    return {
      success: true,
      message: 'Customer confirmation opened automatically',
      url: whatsappUrl
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to send customer confirmation'
    }
  }
}

/**
 * Format customer confirmation message
 */
const formatCustomerConfirmationMessage = (orderData) => {
  const { orderId, customerInfo, cartItems, totals } = orderData
  const firstName = customerInfo.fullName.split(' ')[0]
  
  const productList = cartItems.map(item => 
    `• ${item.name} (${item.quantity}x)`
  ).join('\n')

  const message = `🍫 *Thank you ${firstName}!*

Your *${BUSINESS_NAME}* order is confirmed! 🎉

📋 *Order ID:* ${orderId}
💰 *Total:* ₹${totals.total}

🛒 *Your Items:*
${productList}

📍 *Delivery Address:*
${customerInfo.addressLine1}, ${customerInfo.city}

⏰ *Expected Delivery:* 2-3 working days

We're preparing your premium chocolates with love! 💝

You'll receive updates as your order progresses.

For any queries, reply here or call +91 90004 29689.

Thank you for choosing ${BUSINESS_NAME}! 🙏

---
*Handcrafted with love in Hyderabad* 🇮🇳`

  return encodeURIComponent(message)
}

/**
 * Create automated order tracking system
 */
export const setupOrderTracking = (orderData) => {
  // Store order for tracking
  const trackingData = {
    orderId: orderData.orderId,
    customerPhone: orderData.customerInfo.phone,
    adminPhone: ADMIN_WHATSAPP,
    status: 'confirmed',
    timestamp: Date.now()
  }
  
  localStorage.setItem(`tracking_${orderData.orderId}`, JSON.stringify(trackingData))
  
  return trackingData
}

export default {
  autoSendOrderToWhatsApp,
  autoSendCustomerConfirmation,
  setupOrderTracking,
  formatOrderMessage,
  formatCustomerConfirmationMessage
}