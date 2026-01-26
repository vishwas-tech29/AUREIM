import React from 'react'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import LazyImage from './LazyImage'
import { formatCurrency, calculateTax, calculateShipping, calculateDeliveryDate, formatDeliveryDate } from '../utils/excelExport'

const CartSidebar = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onViewCart,
  onCheckout 
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = calculateTax(subtotal)
  const shipping = calculateShipping(subtotal)
  const total = subtotal + tax + shipping
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const deliveryDate = calculateDeliveryDate()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-chocolate-dark/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-cream-soft z-50 transform transition-transform duration-300 shadow-luxury flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cream-beige">
          <h2 className="text-xl font-serif text-cocoa-dark">
            Shopping Cart ({itemCount})
          </h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-cocoa-dark transition-colors duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="text-text-muted mx-auto mb-4" />
              <p className="text-text-muted mb-4">Your cart is empty</p>
              <button 
                onClick={onClose}
                className="text-caramel-gold hover:text-caramel-light transition-colors duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-cream-beige rounded-xl">
                  <LazyImage
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-cocoa-dark font-medium text-sm mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-text-muted text-xs mb-2 truncate">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 rounded-full bg-cream-soft text-text-charcoal hover:bg-caramel-light transition-colors duration-300 flex items-center justify-center"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-text-charcoal text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-cream-soft text-text-charcoal hover:bg-caramel-light transition-colors duration-300 flex items-center justify-center"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-caramel-gold text-sm font-medium">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-text-muted hover:text-red-500 transition-colors duration-300"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-cream-beige p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Subtotal:</span>
                <span className="text-text-charcoal font-medium">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              {tax > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-muted">Tax:</span>
                  <span className="text-text-charcoal font-medium">
                    {formatCurrency(tax)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Delivery:</span>
                <span className="text-text-charcoal font-medium">
                  {shipping === 0 ? <span className="text-green-600">Free</span> : formatCurrency(shipping)}
                </span>
              </div>
            </div>

            <div className="bg-caramel-gold/10 border border-caramel-gold/30 rounded-lg p-3">
              <div className="text-xs text-text-muted mb-1">Estimated Delivery</div>
              <div className="text-sm font-medium text-cocoa-dark">
                {formatDeliveryDate(deliveryDate)}
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-cream-beige">
              <span className="text-cocoa-dark font-medium">Total:</span>
              <span className="text-xl font-serif text-caramel-gold">
                {formatCurrency(total)}
              </span>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={onViewCart}
                className="w-full btn-secondary py-3"
              >
                View Cart
              </button>
              <button 
                onClick={onCheckout}
                className="w-full btn-primary py-3"
              >
                Checkout
              </button>
            </div>
            
            <p className="text-xs text-text-muted text-center">
              Free shipping on orders over ₹1000
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default CartSidebar
