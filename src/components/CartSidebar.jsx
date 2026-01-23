import React from 'react'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import LazyImage from './LazyImage'
import { formatCurrency } from '../utils/excelExport'

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
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-stone-900 z-50 transform transition-transform duration-300 shadow-luxury">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-800">
          <h2 className="text-xl font-serif text-beige">
            Shopping Cart ({itemCount})
          </h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-beige transition-colors duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="text-stone-600 mx-auto mb-4" />
              <p className="text-stone-400 mb-4">Your cart is empty</p>
              <button 
                onClick={onClose}
                className="text-amber-200 hover:text-amber-100 transition-colors duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-stone-800 rounded-xl">
                  <LazyImage
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-beige font-medium text-sm mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-stone-400 text-xs mb-2 truncate">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 rounded-full bg-stone-700 text-beige hover:bg-stone-600 transition-colors duration-300 flex items-center justify-center"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-beige text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-stone-700 text-beige hover:bg-stone-600 transition-colors duration-300 flex items-center justify-center"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-amber-200 text-sm font-medium">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-red-400 transition-colors duration-300"
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
          <div className="border-t border-stone-800 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-stone-300">Subtotal:</span>
              <span className="text-xl font-serif text-amber-200">
                {formatCurrency(subtotal)}
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
            
            <p className="text-xs text-stone-500 text-center mt-4">
              Shipping calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default CartSidebar