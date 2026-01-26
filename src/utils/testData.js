// Test data utility for admin dashboard testing

import { generateOrderId } from './excelExport'

export const createTestOrders = () => {
  const testOrders = [
    {
      orderId: generateOrderId(),
      customerInfo: {
        fullName: "Priya Sharma",
        email: "priya.sharma@gmail.com",
        phone: "+91 98765 43210",
        addressLine1: "123 MG Road",
        addressLine2: "Near City Mall",
        landmark: "Opposite Metro Station",
        city: "Hyderabad",
        state: "Telangana",
        pinCode: "500001"
      },
      cartItems: [
        {
          id: 1,
          name: "Aurium Dark Chocolate",
          description: "Premium 70% Single Origin",
          price: 195,
          quantity: 2,
          image: "/images/products/aureim-product-1.jpeg"
        }
      ],
      totals: {
        subtotal: 390,
        tax: 0,
        shipping: 0,
        total: 390
      },
      paymentInfo: {
        method: "cod",
        status: "confirmed",
        transactionId: null
      },
      timestamp: Date.now() - (2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      orderId: generateOrderId(),
      customerInfo: {
        fullName: "Rajesh Kumar",
        email: "rajesh.kumar@yahoo.com",
        phone: "+91 87654 32109",
        addressLine1: "456 Jubilee Hills",
        addressLine2: "Apartment 3B",
        landmark: "Near KFC",
        city: "Hyderabad",
        state: "Telangana",
        pinCode: "500033"
      },
      cartItems: [
        {
          id: 2,
          name: "Aurium Dark Chocolate Combo",
          description: "Buy 2 Premium Bars - Save ₹50",
          price: 340,
          quantity: 1,
          image: "/images/products/aureim-product-2.jpeg"
        }
      ],
      totals: {
        subtotal: 340,
        tax: 0,
        shipping: 0,
        total: 340
      },
      paymentInfo: {
        method: "cod",
        status: "confirmed",
        transactionId: null
      },
      timestamp: Date.now() - (1 * 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
      orderId: generateOrderId(),
      customerInfo: {
        fullName: "Anita Reddy",
        email: "anita.reddy@hotmail.com",
        phone: "+91 76543 21098",
        addressLine1: "789 Banjara Hills",
        addressLine2: "Villa 12",
        landmark: "Near GVK Mall",
        city: "Hyderabad",
        state: "Telangana",
        pinCode: "500034"
      },
      cartItems: [
        {
          id: 1,
          name: "Aurium Dark Chocolate",
          description: "Premium 70% Single Origin",
          price: 195,
          quantity: 3,
          image: "/images/products/aureim-product-1.jpeg"
        }
      ],
      totals: {
        subtotal: 585,
        tax: 0,
        shipping: 50,
        total: 635
      },
      paymentInfo: {
        method: "cod",
        status: "confirmed",
        transactionId: null
      },
      timestamp: Date.now() - (3 * 60 * 60 * 1000) // 3 hours ago
    }
  ]

  return testOrders
}

export const addTestOrdersToStorage = () => {
  try {
    const existingOrders = JSON.parse(localStorage.getItem('aureim_orders') || '[]')
    const testOrders = createTestOrders()
    
    // Add test orders if no orders exist
    if (existingOrders.length === 0) {
      localStorage.setItem('aureim_orders', JSON.stringify(testOrders))
      return {
        success: true,
        message: `Added ${testOrders.length} test orders to admin dashboard`,
        count: testOrders.length
      }
    } else {
      return {
        success: false,
        message: `${existingOrders.length} orders already exist in admin dashboard`,
        count: existingOrders.length
      }
    }
  } catch (error) {
    console.error('Failed to add test orders:', error)
    return {
      success: false,
      message: 'Failed to add test orders',
      count: 0
    }
  }
}

export const clearAllOrders = () => {
  try {
    localStorage.removeItem('aureim_orders')
    return {
      success: true,
      message: 'All orders cleared from admin dashboard'
    }
  } catch (error) {
    console.error('Failed to clear orders:', error)
    return {
      success: false,
      message: 'Failed to clear orders'
    }
  }
}

export const getOrderCount = () => {
  try {
    const orders = JSON.parse(localStorage.getItem('aureim_orders') || '[]')
    return orders.length
  } catch (error) {
    console.error('Failed to get order count:', error)
    return 0
  }
}

export default {
  createTestOrders,
  addTestOrdersToStorage,
  clearAllOrders,
  getOrderCount
}