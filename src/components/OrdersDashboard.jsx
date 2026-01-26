import React, { useState, useEffect } from 'react'
import { Download, Package, Eye, Trash2, AlertTriangle, CheckCircle } from 'lucide-react'
import { getOrdersFromStorage, exportAllOrders, formatCurrency } from '../utils/excelExport'
import LazyImage from './LazyImage'

const OrdersDashboard = ({ onClose }) => {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [deleteAllConfirm, setDeleteAllConfirm] = useState(false)
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

  const handleDeleteCustomerData = (orderId) => {
    try {
      const existingOrders = JSON.parse(localStorage.getItem('aureim_orders') || '[]')
      const updatedOrders = existingOrders.filter(order => order.orderId !== orderId)
      localStorage.setItem('aureim_orders', JSON.stringify(updatedOrders))
      
      // Reload orders
      loadOrders()
      setDeleteConfirm(null)
      setSelectedOrder(null)
      
      alert('Customer data deleted successfully!')
    } catch (error) {
      alert('Failed to delete customer data')
    }
  }

  const handleDeleteAllOrders = () => {
    try {
      localStorage.removeItem('aureim_orders')
      
      // Reload orders
      loadOrders()
      setDeleteAllConfirm(false)
      setSelectedOrder(null)
      
      alert('All customer data deleted successfully!')
    } catch (error) {
      alert('Failed to delete all customer data')
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

  return (
    <div className="fixed inset-0 bg-chocolate-dark/95 z-50 overflow-y-auto">
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-h1 font-serif text-text-primary">Orders Dashboard</h1>
            <div className="flex gap-4">
              <button
                onClick={handleExportAll}
                className="btn-secondary flex items-center gap-2"
              >
                <Download size={20} />
                Export All Orders
              </button>
              {orders.length > 0 && (
                <button
                  onClick={() => setDeleteAllConfirm(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
                >
                  <Trash2 size={20} />
                  Delete All Data
                </button>
              )}
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
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-serif text-text-primary mb-1">{formatCurrency(stats.totalRevenue)}</div>
              <div className="text-text-secondary text-sm">Total Revenue</div>
            </div>
            
            <div className="card-luxury p-6 text-center">
              <Eye className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-serif text-text-primary mb-1">{stats.totalCustomers}</div>
              <div className="text-text-secondary text-sm">Unique Customers</div>
            </div>
            
            <div className="card-luxury p-6 text-center">
              <Package className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-serif text-text-primary mb-1">{formatCurrency(stats.avgOrderValue)}</div>
              <div className="text-text-secondary text-sm">Avg Order Value</div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="card-luxury p-6 mb-8">
            <h2 className="text-h3 font-serif text-text-primary mb-4">Delivery Information</h2>
            <div className="bg-caramel-gold/10 border border-caramel-gold/20 rounded-lg p-4">
              <div className="flex items-center gap-3 text-text-primary">
                <Package size={20} />
                <div>
                  <div className="font-medium">Greater Hyderabad Delivery Area</div>
                  <div className="text-sm text-text-secondary">
                    Orders are delivered across Greater Hyderabad including central Hyderabad, Rangareddy, Medak, Nizamabad, Adilabad, and Karimnagar districts. All orders are packed and shipped from our Hyderabad facility.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="card-luxury p-6">
            <h2 className="text-h3 font-serif text-text-primary mb-6">All Orders</h2>
            
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
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">Location</th>
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
                        <td className="py-3 px-4">
                          <div className="text-text-secondary text-sm">{order.customerInfo.city}</div>
                          <div className="text-text-secondary text-xs">{order.customerInfo.pinCode}</div>
                        </td>
                        <td className="py-3 px-4 text-text-secondary">{order.cartItems.length} items</td>
                        <td className="py-3 px-4 text-caramel-gold font-medium">{formatCurrency(order.totals.total)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.paymentInfo.method === 'cod' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            COD
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="text-caramel-gold hover:text-caramel-light transition-colors duration-300"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(order.orderId)}
                              className="text-red-400 hover:text-red-300 transition-colors duration-300"
                              title="Delete Customer Data"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Delete All Confirmation Modal */}
          {deleteAllConfirm && (
            <div className="fixed inset-0 bg-chocolate-dark/95 z-60 flex items-center justify-center p-6">
              <div className="card-luxury p-8 max-w-md w-full">
                <div className="text-center">
                  <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <h3 className="text-h3 font-serif text-text-primary mb-4">Delete All Customer Data</h3>
                  <p className="text-text-secondary mb-2">
                    Are you sure you want to delete ALL customer order data?
                  </p>
                  <p className="text-red-400 text-sm mb-6">
                    This will permanently delete {orders.length} orders and cannot be undone.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setDeleteAllConfirm(false)}
                      className="flex-1 btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteAllOrders}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      Delete All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {deleteConfirm && (
            <div className="fixed inset-0 bg-chocolate-dark/95 z-60 flex items-center justify-center p-6">
              <div className="card-luxury p-8 max-w-md w-full">
                <div className="text-center">
                  <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <h3 className="text-h3 font-serif text-text-primary mb-4">Delete Customer Data</h3>
                  <p className="text-text-secondary mb-6">
                    Are you sure you want to delete this customer's order data? This action cannot be undone.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteCustomerData(deleteConfirm)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                      <div><span className="text-text-secondary">Address:</span> 
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedOrder.customerInfo.addressLine1}, ${selectedOrder.customerInfo.city}, ${selectedOrder.customerInfo.state} - ${selectedOrder.customerInfo.pinCode}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-caramel-gold hover:text-caramel-light underline"
                        >
                          {selectedOrder.customerInfo.addressLine1}, {selectedOrder.customerInfo.city}, {selectedOrder.customerInfo.state} - {selectedOrder.customerInfo.pinCode}
                        </a>
                      </div>
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

                  {/* Delete Customer Data Button */}
                  <div className="pt-4 border-t border-cream-blush">
                    <button
                      onClick={() => {
                        setSelectedOrder(null)
                        setDeleteConfirm(selectedOrder.orderId)
                      }}
                      className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} />
                      Delete Customer Data
                    </button>
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

export default OrdersDashboard