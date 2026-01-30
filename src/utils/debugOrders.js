// Debug utility for order system
// This helps identify why orders aren't showing in dashboard

export const debugOrderSystem = () => {
  console.log('🔍 DEBUGGING ORDER SYSTEM...')
  
  // 1. Check localStorage
  const orders = localStorage.getItem('aureim_orders')
  console.log('📦 Raw localStorage data:', orders)
  
  if (orders) {
    try {
      const parsedOrders = JSON.parse(orders)
      console.log('📋 Parsed orders:', parsedOrders)
      console.log('📊 Number of orders:', parsedOrders.length)
      
      if (parsedOrders.length > 0) {
        console.log('🔍 Latest order:', parsedOrders[parsedOrders.length - 1])
        console.log('📅 Order timestamps:', parsedOrders.map(o => ({
          id: o.orderId,
          timestamp: o.timestamp,
          date: new Date(o.timestamp).toLocaleString()
        })))
      }
    } catch (error) {
      console.error('❌ Error parsing orders:', error)
    }
  } else {
    console.log('❌ No orders found in localStorage')
  }
  
  // 2. Check all localStorage keys
  console.log('🗂️ All localStorage keys:')
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    console.log(`  - ${key}:`, localStorage.getItem(key)?.substring(0, 100) + '...')
  }
  
  // 3. Test order creation
  console.log('🧪 Testing order creation...')
  const testOrder = createTestOrder()
  console.log('📝 Test order created:', testOrder)
  
  // 4. Test saving
  try {
    const existingOrders = JSON.parse(localStorage.getItem('aureim_orders') || '[]')
    existingOrders.push(testOrder)
    localStorage.setItem('aureim_orders', JSON.stringify(existingOrders))
    console.log('✅ Test order saved successfully')
    
    // Verify save
    const verifyOrders = JSON.parse(localStorage.getItem('aureim_orders') || '[]')
    console.log('✅ Verification - Orders count:', verifyOrders.length)
  } catch (error) {
    console.error('❌ Error saving test order:', error)
  }
}

export const createTestOrder = () => {
  return {
    orderId: `AUR-DEBUG-${Date.now()}`,
    timestamp: Date.now(),
    customerInfo: {
      fullName: 'Debug Test Customer',
      phone: '9876543210',
      email: 'debug@test.com',
      addressLine1: '123 Debug Street',
      city: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500001'
    },
    cartItems: [
      {
        id: 1,
        name: 'Debug Chocolate',
        price: 195,
        quantity: 1
      }
    ],
    totals: {
      subtotal: 195,
      tax: 0,
      shipping: 0,
      total: 195
    },
    paymentInfo: {
      method: 'Debug Payment',
      status: 'Successful',
      transactionId: `DEBUG-${Date.now()}`
    }
  }
}

export const clearAllOrders = () => {
  localStorage.removeItem('aureim_orders')
  console.log('🗑️ All orders cleared from localStorage')
}

export const addMultipleTestOrders = (count = 3) => {
  const orders = []
  for (let i = 0; i < count; i++) {
    const order = {
      ...createTestOrder(),
      orderId: `AUR-TEST-${Date.now()}-${i}`,
      customerInfo: {
        ...createTestOrder().customerInfo,
        fullName: `Test Customer ${i + 1}`,
        email: `test${i + 1}@example.com`
      },
      timestamp: Date.now() - (i * 60000) // Different timestamps
    }
    orders.push(order)
  }
  
  const existingOrders = JSON.parse(localStorage.getItem('aureim_orders') || '[]')
  const allOrders = [...existingOrders, ...orders]
  localStorage.setItem('aureim_orders', JSON.stringify(allOrders))
  
  console.log(`✅ Added ${count} test orders`)
  return orders
}

export const getOrderStats = () => {
  try {
    const orders = JSON.parse(localStorage.getItem('aureim_orders') || '[]')
    return {
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.totals.total, 0),
      latestOrder: orders.length > 0 ? orders[orders.length - 1] : null,
      oldestOrder: orders.length > 0 ? orders[0] : null
    }
  } catch (error) {
    console.error('Error getting order stats:', error)
    return null
  }
}

export default {
  debugOrderSystem,
  createTestOrder,
  clearAllOrders,
  addMultipleTestOrders,
  getOrderStats
}