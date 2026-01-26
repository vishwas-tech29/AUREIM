import React, { useState, useEffect } from 'react'
import { Download, Package, TrendingUp, Users, Eye, ShoppingBag } from 'lucide-react'
import { getOrdersFromStorage, exportAllOrders, formatCurrency } from '../utils/excelExport'
import LazyImage from './LazyImage'
import OrdersDashboard from './OrdersDashboard'

const AdminDashboard = ({ onClose }) => {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrdersDashboard, setShowOrdersDashboard] = useState(false)
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    avgOrderValue: 0
  })

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = () => {
    const orderData = getOrdersFromStorage()
    setOrders(orderData)
    
    // Calculate stats
    const totalOrders = orderData.length
    const totalRevenue = orderData.reduce((sum, order) => sum + order.totals.total, 0)
    const uniqueCustomers = new Set(orderData.map(order => order.customerInfo.email)).size
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
    
    setStats({
      totalOrders,
      totalRevenue,
      totalCustomers: uniqueCustomers,
      avgOrderValue
    })
  }

  const handleExportAll = () => {
    try {
      exportAllOrders(orders)
      alert('Orders exported successfully!')
    } catch (error) {
      alert('Failed to export orders')
    }
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (showOrdersDashboard) {
    return <OrdersDashboard onClose={() => setShowOrdersDashboard(false)} />
  }

  return (
    <div className="fixed inset-0 bg-chocolate-dark/95 z-50 overflow-y-auto">
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-h1 font-serif text-text-primary">Admin Dashboard</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setShowOrdersDashboard(true)}
                className="btn-secondary flex items-center gap-2"
              >
                <ShoppingBag size={20} />
                Orders Dashboard
              </button>
              <button
                onClick={handleExportAll}
                className="btn-secondary flex items-center gap-2"
              >
                <Download size={20} />
                Export All Orders
              </button>
              <button
                onClick={onClose}
                className="btn-primary"
              >
                Close Dashboard
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card-luxury p-6 text-center">
              <Package className="w-8 h-8 text-caramel-gold mx-auto mb-3" />
              <div className="text-2xl font-serif text-text-primary mb-1">{stats.totalOrders}</div>
              <div className="text-text-secondary text-sm">Total Orders</div>
            </div>
            
            <div className="card-luxury p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-serif text-text-primary mb-1">{formatCurrency(stats.totalRevenue)}</div>
              <div className="text-text-secondary text-sm">Total Revenue</div>
            </div>
            
            <div className="card-luxury p-6 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-serif text-text-primary mb-1">{stats.totalCustomers}</div>
              <div className="text-text-secondary text-sm">Unique Customers</div>
            </div>
            
            <div className="card-luxury p-6 text-center">
              <Package className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-serif text-text-primary mb-1">{formatCurrency(stats.avgOrderValue)}</div>
              <div className="text-text-secondary text-sm">Avg Order Value</div>
            </div>
          </div>

          {/* Packing Management Section */}
          <div className="card-luxury p-6 mb-8">
            <h2 className="text-h3 font-serif text-text-primary mb-6">Order Fulfillment</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-cream-beige rounded-lg p-4 text-center">
                <div className="text-2xl font-serif text-caramel-gold mb-2">{orders.length}</div>
                <div className="text-text-secondary text-sm">Orders to Pack</div>
                <div className="text-xs text-text-secondary mt-1">WhatsApp notifications sent</div>
              </div>
              
              <div className="bg-cream-beige rounded-lg p-4 text-center">
                <div className="text-2xl font-serif text-blue-600 mb-2">
                  {orders.reduce((sum, order) => sum + order.cartItems.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)}
                </div>
                <div className="text-text-secondary text-sm">Total Items</div>
                <div className="text-xs text-text-secondary mt-1">Across all orders</div>
              </div>
              
              <div className="bg-cream-beige rounded-lg p-4 text-center">
                <div className="text-2xl font-serif text-green-600 mb-2">
                  {orders.length}
                </div>
                <div className="text-text-secondary text-sm">COD Orders</div>
                <div className="text-xs text-text-secondary mt-1">Ready for delivery</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-caramel-gold/10 border border-caramel-gold/20 rounded-lg">
              <div className="flex items-center gap-3 text-text-primary">
                <Package size={20} />
                <div>
                  <div className="font-medium">WhatsApp Order Notifications</div>
                  <div className="text-sm text-text-secondary">
                    Order details are automatically sent via WhatsApp with customer information, shipping address, and product details for easy fulfillment.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="card-luxury p-6">
            <h2 className="text-h3 font-serif text-text-primary mb-6">Recent Orders</h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <Package size={48} className="text-text-secondary mx-auto mb-4" />
                <p className="text-text-secondary">No orders found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cream-beige">
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">Order ID</th>
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">Customer</th>
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">Items</th>
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">Total</th>
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">Payment</th>
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.orderId} className="border-b border-cream-beige hover:bg-cream-blush">
                        <td className="py-3 px-4 text-text-primary font-mono text-sm">{order.orderId}</td>
                        <td className="py-3 px-4">
                          <div className="text-text-primary">{order.customerInfo.fullName}</div>
                          <div className="text-text-secondary text-sm">{order.customerInfo.email}</div>
                        </td>
                        <td className="py-3 px-4 text-text-secondary text-sm">{formatDate(order.timestamp)}</td>
                        <td className="py-3 px-4 text-text-secondary">{order.cartItems.length} items</td>
                        <td className="py-3 px-4 text-caramel-gold font-medium">{formatCurrency(order.totals.total)}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                            COD
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-caramel-gold hover:text-caramel-light transition-colors duration-300"
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Order Detail Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-chocolate-dark/95 z-60 flex items-center justify-center p-6">
              <div className="card-luxury p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-h3 font-serif text-text-primary">Order Details</h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-text-secondary hover:text-text-primary transition-colors duration-300"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Customer Info */}
                  <div>
                    <h4 className="text-lg font-serif text-text-primary mb-3">Customer Information</h4>
                    <div className="bg-cream-beige rounded-lg p-4 space-y-2 text-sm">
                      <div><span className="text-text-secondary">Name:</span> <span className="text-text-primary">{selectedOrder.customerInfo.fullName}</span></div>
                      <div><span className="text-text-secondary">Email:</span> <span className="text-text-primary">{selectedOrder.customerInfo.email}</span></div>
                      <div><span className="text-text-secondary">Phone:</span> <span className="text-text-primary">{selectedOrder.customerInfo.phone}</span></div>
                      <div><span className="text-text-secondary">Address:</span> <span className="text-text-primary">{selectedOrder.customerInfo.addressLine1}, {selectedOrder.customerInfo.city}, {selectedOrder.customerInfo.state} - {selectedOrder.customerInfo.pinCode}</span></div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="text-lg font-serif text-text-primary mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {selectedOrder.cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3 bg-cream-beige rounded-lg p-3">
                          <LazyImage
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="text-text-primary font-medium">{item.name}</div>
                            <div className="text-text-secondary text-sm">Qty: {item.quantity} × {formatCurrency(item.price)}</div>
                          </div>
                          <div className="text-caramel-gold font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="bg-cream-beige rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-text-secondary">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(selectedOrder.totals.subtotal)}</span>
                      </div>
                      {selectedOrder.totals.tax > 0 && (
                        <div className="flex justify-between text-text-secondary">
                          <span>Tax:</span>
                          <span>{formatCurrency(selectedOrder.totals.tax)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-text-secondary">
                        <span>Delivery:</span>
                        <span>{selectedOrder.totals.shipping === 0 ? 'Free' : formatCurrency(selectedOrder.totals.shipping)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-medium text-text-primary pt-2 border-t border-cream-blush">
                        <span>Total:</span>
                        <span className="text-caramel-gold">{formatCurrency(selectedOrder.totals.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard