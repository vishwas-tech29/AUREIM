import React from 'react'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import LazyImage from './LazyImage'
import { formatCurrency, calculateTax, calculateShipping } from '../utils/excelExport'

const CartPage = ({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onProceedToCheckout, 
  onContinueShopping 
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = calculateTax(subtotal)
  const shipping = calculateShipping(subtotal)
  const total = subtotal + tax + shipping

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-stone-950 pt-24">
        <div className="section-padding section-spacing">
          <div className="max-w-2xl mx-auto text-center">
            {/* Empty Cart State */}
            <div className="card-luxury p-12">
              <div className="w-24 h-24 mx-auto mb-8 bg-stone-800 rounded-full flex items-center justify-center">
                <ShoppingBag size={32} className="text-stone-400" />
              </div>
              
              <h2 className="text-h2 font-serif text-beige mb-4">
                Your cart is empty
              </h2>
              
              <p className="text-stone-400 mb-8 leading-relaxed">
                Discover our collection of mindful luxury chocolates and start your journey of pure bliss.
              </p>
              
              <button 
                onClick={onContinueShopping}
                className="btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-950 pt-24">
      <div className="section-padding section-spacing">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <button 
              onClick={onContinueShopping}
              className="text-stone-400 hover:text-beige transition-colors duration-300"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-h1 font-serif text-beige">
              Your Cart
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="card-luxury p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <LazyImage
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-serif text-beige mb-2">
                            {item.name}
                          </h3>
                          <p className="text-stone-400 text-sm mb-2">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.notes?.slice(0, 2).map((note, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-stone-800 text-stone-300 text-xs rounded-full"
                              >
                                {note}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-red-400 transition-colors duration-300 p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 rounded-full bg-stone-800 text-beige hover:bg-stone-700 transition-colors duration-300 flex items-center justify-center"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-beige w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-stone-800 text-beige hover:bg-stone-700 transition-colors duration-300 flex items-center justify-center"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-stone-400 mb-1">
                            {formatCurrency(item.price)} each
                          </div>
                          <div className="text-xl font-serif text-amber-200">
                            {formatCurrency(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="card-luxury p-8 sticky top-32">
                <h3 className="text-h3 font-serif text-beige mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-stone-300">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-stone-300">
                    <span>Tax (GST 18%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  
                  <div className="flex justify-between text-stone-300">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-400">Free</span>
                      ) : (
                        formatCurrency(shipping)
                      )}
                    </span>
                  </div>
                  
                  {subtotal < 2000 && (
                    <div className="text-xs text-stone-500 italic">
                      Free shipping on orders over ₹2,000
                    </div>
                  )}
                </div>

                <div className="border-t border-stone-700 pt-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-beige">Total</span>
                    <span className="text-2xl font-serif text-amber-200">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => onProceedToCheckout({ subtotal, tax, shipping, total })}
                  className="w-full btn-primary text-lg py-4 mb-4"
                >
                  Proceed to Checkout
                </button>

                <button 
                  onClick={onContinueShopping}
                  className="w-full btn-secondary text-sm py-3"
                >
                  Continue Shopping
                </button>

                {/* Trust Badges */}
                <div className="mt-8 pt-6 border-t border-stone-800">
                  <div className="text-center space-y-2">
                    <div className="text-xs text-stone-500 uppercase tracking-wide">
                      Secure Checkout
                    </div>
                    <div className="flex justify-center gap-4 text-xs text-stone-400">
                      <span>🔒 SSL Encrypted</span>
                      <span>💳 Secure Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage