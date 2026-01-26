// Email notification utility for order alerts
// This creates a mailto link that opens the default email client

export const createOrderEmailNotification = (orderData) => {
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

  const subject = `🍫 AUREIM - New Order ${orderId}`
  
  const body = `NEW ORDER RECEIVED!

Order Details:
Order ID: ${orderId}
Date: ${date}
Time: ${time}

Customer Information:
Name: ${customerInfo.fullName}
Phone: ${customerInfo.phone}
Email: ${customerInfo.email}

Delivery Address:
${customerInfo.addressLine1}
${customerInfo.addressLine2 ? customerInfo.addressLine2 + '\n' : ''}${customerInfo.landmark ? 'Near: ' + customerInfo.landmark + '\n' : ''}${customerInfo.city}, ${customerInfo.state} - ${customerInfo.pinCode}

Products Ordered:
${productList}

Order Summary:
Subtotal: ₹${totals.subtotal}
Delivery: ${totals.shipping === 0 ? 'FREE' : '₹' + totals.shipping}
Total: ₹${totals.total}

Next Steps:
1. Prepare the order for packing
2. Quality check all items
3. Pack with premium packaging
4. Schedule delivery
5. Send tracking details to customer

Expected Delivery: Within 2-3 working days

---
AUREIM Premium Chocolates
Handcrafted with love in Hyderabad`

  return {
    subject: encodeURIComponent(subject),
    body: encodeURIComponent(body),
    mailto: `mailto:aureim.chocolates@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }
}

export const sendEmailNotification = (orderData) => {
  try {
    const emailData = createOrderEmailNotification(orderData)
    
    // Open default email client
    window.open(emailData.mailto, '_blank')
    
    return {
      success: true,
      message: 'Email notification opened'
    }
  } catch (error) {
    console.error('Failed to create email notification:', error)
    return {
      success: false,
      message: 'Failed to create email notification'
    }
  }
}

export default {
  createOrderEmailNotification,
  sendEmailNotification
}