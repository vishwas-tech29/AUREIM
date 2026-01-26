import React from 'react'
import { ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react'
import LazyImage from './LazyImage'
import { formatCurrency } from '../utils/excelExport'

const HomeCartSection = ({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onViewCart, 
  onCheckout 
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (cartItems.length === 0) return null

  return (
    <section className="section-padding py-16 bg-cream-blush">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-h2 font-serif text-text-primary mb-4">
            Your Cart
          </h2>
          <p className="text-text-secondary">
            {itemCount} item{itemCount !== 1 ? 's' : ''} ready for checkout
          </p>
        </div>

        <div className="card-luxury p-8">
          {/* Cart Items */}
          <div className="space-y-6 mb-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-cream-soft rounded-xl">
                <LazyImage
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-text-primary font-medium mb-1 truncate">
                    {item.name}
                  </h3>
                  <p className="text-text-secondary text-sm mb-3 truncate">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 rounded-full bg-cream-beige text-text-primary hover:bg-caramel-light transition-colors duration-300 flex items-center justify-center"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-text-primary font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-cream-beige text-text-primary hover:bg-caramel-light transition-colors duration-300 flex items-center justify-center"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-caramel-gold font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-text-secondary hover:text-red-500 text-xs transition-colors duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border-t border-cream-beige pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium text-text-primary">
                Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})
              </span>
              <span className="text-2xl font-serif text-caramel-gold">
                {formatCurrency(subtotal)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onViewCart}
                className="flex-1 btn-secondary py-4 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} />
                View Full Cart
              </button>
              
              <button
                onClick={onCheckout}
                className="flex-1 btn-luxury-gold py-4 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight size={20} />
              </button>
            </div>

            <p className="text-xs text-text-secondary text-center mt-4">
              Free shipping on orders over ₹1000
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeCartSection