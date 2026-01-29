// Test order utility for debugging WhatsApp automation

export const createTestOrder = () => {
  const testOrder = {
    orderId: `AUR-TEST-${Date.now()}`,
    timestamp: Date.now(),
    customerInfo: {
      fullName: 'Test Customer',
      phone: '9876543210',
      email: 'test@example.com',
      addressLine1: '123 Test Street',
      addressLine2: 'Near Test Mall',
      landmark: 'Test Landmark',
      city: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500001'
    },
    cartItems: [
      {
        id: 1,
        name: 'Aurium Dark Chocolate',
        price: 195,
        quantity: 2
      },
      {
        id: 2,
        name: 'Premium Chocolate Combo',
        price: 340,
        quantity: 1
      }
    ],
    totals: {
      subtotal: 730,
      tax: 131.40,
      shipping: 0,
      total: 861.40
    },
    paymentInfo: {
      method: 'Test Payment',
      status: 'Successful',
      transactionId: `TXN-TEST-${Date.now()}`
    }
  }
  
  return testOrder
}

export const testWhatsAppAutomation = async (autoSendFunction) => {
  console.log('🧪 Starting WhatsApp automation test...')
  
  const testOrder = createTestOrder()
  console.log('📋 Test order created:', testOrder)
  
  try {
    const result = await autoSendFunction(testOrder)
    console.log('✅ Test result:', result)
    return result
  } catch (error) {
    console.error('❌ Test failed:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export default {
  createTestOrder,
  testWhatsAppAutomation
}