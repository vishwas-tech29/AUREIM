// WhatsApp Business API Integration for Order Notifications

// Business WhatsApp number (replace with actual number)
const BUSINESS_WHATSAPP = '+917894561230'

// Format order data for WhatsApp message
export const formatOrderForWhatsApp = (orderData) => {
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

  const message = `🍫 *AUREIM - New Order Received!*

📋 *Order Details:*
Order ID: ${orderId}
Date: ${date}
Time: ${time}

👤 *Customer Information:*
Name: ${customerInfo.fullName}
Phone: ${customerInfo.phone}
Email: ${customerInfo.email}

📍 *Delivery Address:*
${customerInfo.addressLine1}
${customerInfo.addressLine2 ? customerInfo.addressLine2 + '\n' : ''}${customerInfo.landmark ? 'Near: ' + customerInfo.landmark + '\n' : ''}${customerInfo.city}, ${customerInfo.state} - ${customerInfo.pinCode}

🛒 *Products Ordered:*
${productList}

💰 *Order Summary:*
Subtotal: ₹${totals.subtotal}
Tax (GST 18%): ₹${totals.tax}
Delivery: ${totals.shipping === 0 ? 'FREE' : '₹' + totals.shipping}
*Total: ₹${totals.total}*

📦 *Next Steps:*
1. Prepare the order for packing
2. Quality check all items
3. Pack with premium packaging
4. Schedule delivery
5. Send tracking details to customer

⏰ *Expected Delivery:* Within 2-3 working days

---
*AUREIM Premium Chocolates*
_Handcrafted with love in Hyderabad_ 🇮🇳`

  return encodeURIComponent(message)
}

// Send WhatsApp notification to business
export const sendBusinessNotification = (orderData) => {
  try {
    const message = formatOrderForWhatsApp(orderData)
    const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP.replace('+', '')}?text=${message}`
    
    // Open WhatsApp in new tab
    const newWindow = window.open(whatsappUrl, '_blank')
    
    // Check if popup was blocked
    if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
      // Fallback: try to navigate in same window
      window.location.href = whatsappUrl
    }
    
    return {
      success: true,
      message: 'WhatsApp notification opened successfully'
    }
  } catch (error) {
    console.error('Failed to send WhatsApp notification:', error)
    return {
      success: false,
      message: 'Failed to open WhatsApp notification'
    }
  }
}

// Format customer confirmation message
export const formatCustomerConfirmation = (orderData) => {
  const {
    orderId,
    customerInfo,
    cartItems,
    totals
  } = orderData

  const productList = cartItems.map(item => 
    `• ${item.name} (Qty: ${item.quantity})`
  ).join('\n')

  const message = `🍫 *Thank you for your AUREIM order!*

Hi ${customerInfo.fullName.split(' ')[0]},

Your order has been confirmed! 🎉

📋 *Order ID:* ${orderId}
💰 *Total Amount:* ₹${totals.total}

🛒 *Your Items:*
${productList}

📍 *Delivery Address:*
${customerInfo.addressLine1}, ${customerInfo.city}

⏰ *Expected Delivery:* 2-3 working days

We'll start preparing your premium chocolates right away! You'll receive updates as your order progresses.

For any queries, reply to this message or call us at +91 78945 61230.

Thank you for choosing AUREIM! 🙏

---
*AUREIM Premium Chocolates*
_Handcrafted with love in Hyderabad_ 🇮🇳`

  return encodeURIComponent(message)
}

// Send confirmation to customer
export const sendCustomerConfirmation = (orderData) => {
  try {
    const message = formatCustomerConfirmation(orderData)
    const customerPhone = orderData.customerInfo.phone.replace(/\D/g, '') // Remove non-digits
    const whatsappUrl = `https://wa.me/91${customerPhone}?text=${message}`
    
    // This would typically be handled by a backend service
    // For demo, we'll show the business owner what message would be sent
    console.log('Customer confirmation message:', decodeURIComponent(message))
    
    return {
      success: true,
      message: 'Customer confirmation prepared',
      whatsappUrl
    }
  } catch (error) {
    console.error('Failed to prepare customer confirmation:', error)
    return {
      success: false,
      message: 'Failed to prepare customer confirmation'
    }
  }
}

// Quick order summary for instant messaging
export const getQuickOrderSummary = (orderData) => {
  const { orderId, customerInfo, totals, cartItems } = orderData
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  
  return `🆕 Order ${orderId} | ${customerInfo.fullName} | ${itemCount} items | ₹${totals.total} | ${customerInfo.city}`
}

// Delivery status updates
export const createDeliveryUpdate = (orderId, status, customerName, estimatedTime = null) => {
  const statusMessages = {
    'confirmed': '✅ Order confirmed and being prepared',
    'packed': '📦 Order packed and ready for dispatch',
    'dispatched': '🚚 Order dispatched and on the way',
    'delivered': '🎉 Order delivered successfully'
  }

  const message = `🍫 *AUREIM Delivery Update*

Hi ${customerName.split(' ')[0]},

${statusMessages[status]}

📋 *Order ID:* ${orderId}
${estimatedTime ? `⏰ *Estimated Delivery:* ${estimatedTime}` : ''}

${status === 'delivered' ? 
  'Thank you for choosing AUREIM! We hope you enjoy your premium chocolates. Please share your experience with us! 🌟' : 
  'We\'ll keep you updated on your order progress.'
}

---
*AUREIM Premium Chocolates*`

  return encodeURIComponent(message)
}

export default {
  sendBusinessNotification,
  sendCustomerConfirmation,
  formatOrderForWhatsApp,
  formatCustomerConfirmation,
  getQuickOrderSummary,
  createDeliveryUpdate
}