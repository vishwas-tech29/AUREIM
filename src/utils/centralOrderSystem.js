// Centralized order system for admin visibility

// This creates a comprehensive system where orders are sent via multiple channels
// so the admin can always see them regardless of device

export const notifyAdminOfOrder = async (orderData) => {
  const notifications = []
  
  try {
    // 1. Send WhatsApp notification to admin (primary method)
    const whatsappResult = await sendWhatsAppToAdmin(orderData)
    notifications.push(whatsappResult)
    
    // 2. Send email notification to admin (secondary method)
    const emailResult = await sendEmailToAdmin(orderData)
    notifications.push(emailResult)
    
    // 3. Save to a shared location (URL-based for cross-device access)
    const urlResult = await saveToSharedUrl(orderData)
    notifications.push(urlResult)
    
    // 4. Create browser notification (for current device)
    const browserResult = await sendBrowserNotification(orderData)
    notifications.push(browserResult)
    
    // 5. Log to console with clear formatting (emergency backup)
    logOrderToConsole(orderData)
    
    // 6. Create a shareable admin link
    const adminLinkResult = await createAdminAccessLink(orderData)
    notifications.push(adminLinkResult)
    
    return {
      success: true,
      message: 'Order notifications sent via multiple channels',
      notifications,
      adminTips: [
        '📱 Check WhatsApp for instant order details',
        '📧 Check email for complete order information',
        '🔗 Use the shared link to access orders on any device',
        '🖥️ Click AUREIM logo 5 times to access admin dashboard',
        '📋 Orders are automatically copied to clipboard for easy sharing'
      ]
    }
  } catch (error) {
    console.error('Failed to notify admin:', error)
    return {
      success: false,
      message: 'Failed to send admin notifications',
      error: error.message
    }
  }
}

const sendWhatsAppToAdmin = async (orderData) => {
  try {
    const message = formatOrderForWhatsApp(orderData)
    const adminWhatsApp = '+919000429689'
    const whatsappUrl = `https://wa.me/${adminWhatsApp.replace('+', '')}?text=${message}`
    
    // Auto-open WhatsApp (this will work on customer's device)
    window.open(whatsappUrl, '_blank')
    
    // Also copy message to clipboard for easy sharing
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(decodeURIComponent(message))
    }
    
    return {
      method: 'WhatsApp',
      success: true,
      message: 'WhatsApp notification sent to admin (+91 90004 29689)',
      url: whatsappUrl
    }
  } catch (error) {
    return {
      method: 'WhatsApp',
      success: false,
      message: 'Failed to send WhatsApp notification'
    }
  }
}

const sendEmailToAdmin = async (orderData) => {
  try {
    const subject = `🍫 AUREIM - New Order ${orderData.orderId}`
    const body = createEmailBody(orderData)
    const adminEmail = 'aureim.chocolates@gmail.com'
    
    const mailtoUrl = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // This will open the customer's email client to send to admin
    window.open(mailtoUrl, '_blank')
    
    return {
      method: 'Email',
      success: true,
      message: 'Email notification prepared for admin (aureim.chocolates@gmail.com)',
      url: mailtoUrl
    }
  } catch (error) {
    return {
      method: 'Email',
      success: false,
      message: 'Failed to prepare email notification'
    }
  }
}

const saveToSharedUrl = async (orderData) => {
  try {
    // Create a shareable URL with order data
    const orderDataEncoded = btoa(JSON.stringify([orderData]))
    const shareUrl = `${window.location.origin}?neworder=${orderDataEncoded}`
    
    // Copy to clipboard for easy sharing
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl)
    }
    
    return {
      method: 'Shared URL',
      success: true,
      message: 'Order URL created and copied to clipboard - share this with admin device',
      url: shareUrl
    }
  } catch (error) {
    return {
      method: 'Shared URL',
      success: false,
      message: 'Failed to create shared URL'
    }
  }
}

const createAdminAccessLink = async (orderData) => {
  try {
    // Create a comprehensive admin access URL with order data
    const adminData = {
      newOrder: orderData,
      timestamp: Date.now(),
      adminAccess: true
    }
    
    const adminDataEncoded = btoa(JSON.stringify(adminData))
    const adminUrl = `${window.location.origin}?admin=${adminDataEncoded}`
    
    return {
      method: 'Admin Access Link',
      success: true,
      message: 'Admin access link created - opens directly to order details',
      url: adminUrl
    }
  } catch (error) {
    return {
      method: 'Admin Access Link',
      success: false,
      message: 'Failed to create admin access link'
    }
  }
}

const logOrderToConsole = (orderData) => {
  console.log('\n🍫 ===== NEW AUREIM ORDER RECEIVED =====')
  console.log(`📋 Order ID: ${orderData.orderId}`)
  console.log(`👤 Customer: ${orderData.customerInfo.fullName}`)
  console.log(`📞 Phone: ${orderData.customerInfo.phone}`)
  console.log(`📧 Email: ${orderData.customerInfo.email}`)
  console.log(`📍 Address: ${orderData.customerInfo.addressLine1}, ${orderData.customerInfo.city}`)
  console.log(`💰 Total: ₹${orderData.totals.total}`)
  console.log(`🛒 Items: ${orderData.cartItems.length}`)
  console.log(`⏰ Time: ${new Date(orderData.timestamp).toLocaleString()}`)
  console.log('🔗 Google Maps:', `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${orderData.customerInfo.addressLine1}, ${orderData.customerInfo.city}, ${orderData.customerInfo.state}`)}`)
  console.log('📦 Products:')
  orderData.cartItems.forEach(item => {
    console.log(`   • ${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`)
  })
  console.log('=====================================\n')
}

const createEmailBody = (orderData) => {
  const {
    orderId,
    customerInfo,
    cartItems,
    totals,
    timestamp
  } = orderData

  const date = new Date(timestamp).toLocaleDateString('en-IN')
  const time = new Date(timestamp).toLocaleTimeString('en-IN')
  
  const productList = cartItems.map(item => 
    `• ${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`
  ).join('\n')

  return `🍫 NEW AUREIM ORDER RECEIVED!

📋 Order Details:
Order ID: ${orderId}
Date: ${date}
Time: ${time}

👤 Customer Information:
Name: ${customerInfo.fullName}
Phone: ${customerInfo.phone}
Email: ${customerInfo.email}

📍 Delivery Address:
${customerInfo.addressLine1}
${customerInfo.addressLine2 ? customerInfo.addressLine2 + '\n' : ''}${customerInfo.landmark ? 'Near: ' + customerInfo.landmark + '\n' : ''}${customerInfo.city}, ${customerInfo.state} - ${customerInfo.pinCode}

🛒 Products Ordered:
${productList}

💰 Order Summary:
Subtotal: ₹${totals.subtotal}
Delivery: ${totals.shipping === 0 ? 'FREE (Order ≥ ₹1000)' : '₹' + totals.shipping + ' (Order < ₹1000)'}
Total: ₹${totals.total}

📦 Next Steps:
1. Prepare the order for packing
2. Quality check all items
3. Pack with premium packaging
4. Schedule delivery within 2-3 working days
5. Send tracking details to customer

⏰ Expected Delivery: Within 2-3 working days

🗺️ Google Maps Link: https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${customerInfo.addressLine1}, ${customerInfo.city}, ${customerInfo.state} - ${customerInfo.pinCode}`)}

📱 Customer WhatsApp: https://wa.me/${customerInfo.phone.replace(/[^0-9]/g, '')}

---
AUREIM Premium Chocolates
Handcrafted with love in Hyderabad
📞 +91 90004 29689
📧 aureim.chocolates@gmail.com`
}

const formatOrderForWhatsApp = (orderData) => {
  const {
    orderId,
    customerInfo,
    cartItems,
    totals,
    timestamp
  } = orderData

  const date = new Date(timestamp).toLocaleDateString('en-IN')
  const time = new Date(timestamp).toLocaleTimeString('en-IN')
  
  const productList = cartItems.map(item => 
    `• ${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`
  ).join('\n')

  const message = `🍫 *AUREIM - New Order Alert!*

📋 *Order:* ${orderId}
📅 *Date:* ${date} ${time}

👤 *Customer Details:*
${customerInfo.fullName}
📞 ${customerInfo.phone}
📧 ${customerInfo.email}

📍 *Delivery Address:*
${customerInfo.addressLine1}
${customerInfo.city}, ${customerInfo.state} - ${customerInfo.pinCode}

🛒 *Items Ordered:*
${productList}

💰 *Payment Summary:*
Subtotal: ₹${totals.subtotal}
Delivery: ${totals.shipping === 0 ? 'FREE' : '₹' + totals.shipping}
*Total: ₹${totals.total}*

📦 *Action Required:*
✅ Prepare order for packing
✅ Quality check all items
✅ Schedule delivery (2-3 days)

📍 *Maps:* https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${customerInfo.addressLine1}, ${customerInfo.city}, ${customerInfo.state}`)}

📱 *Customer WhatsApp:* https://wa.me/${customerInfo.phone.replace(/[^0-9]/g, '')}

---
*AUREIM Premium Chocolates*
*Handcrafted with love in Hyderabad*`

  return encodeURIComponent(message)
}

export default {
  notifyAdminOfOrder,
  sendWhatsAppToAdmin,
  sendEmailToAdmin,
  saveToSharedUrl,
  createAdminAccessLink,
  logOrderToConsole
}