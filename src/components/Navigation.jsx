import React, { useState, useEffect } from 'react'
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react'

const Navigation = ({ cartCount = 0, onCartClick, onFavoritesClick, onAdminClick, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Collection', href: '#collection', action: () => onNavigate('home', 'collection') },
    { name: 'Our Story', href: '#story', action: () => onNavigate('home', 'story') },
    { name: 'The Craft', href: '#craft', action: () => onNavigate('craft') },
    { name: 'Reviews', href: '#reviews', action: () => onNavigate('reviews') },
    { name: 'Contact', href: '#contact', action: () => onNavigate('contact') }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-nav shadow-luxury border-b border-gray-200' 
        : 'bg-white/90 border-b border-gray-100'
    }`}>
      <div className="nav-container">
        <div className="nav-content">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 
              className={`text-xl sm:text-2xl font-serif tracking-luxury cursor-pointer transition-colors duration-300 text-chocolate-dark`}
              onClick={(e) => {
                if (e.detail === 5) { // 5 clicks to access admin
                  onAdminClick && onAdminClick()
                }
              }}
            >
              AUREIM
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                className={`transition-colors duration-300 font-medium tracking-wide ${
                  isScrolled 
                    ? 'text-chocolate-dark hover:text-caramel-gold' 
                    : 'text-chocolate-dark hover:text-caramel-gold'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className={`transition-colors duration-300 ${
              isScrolled 
                ? 'text-chocolate-dark hover:text-caramel-gold' 
                : 'text-chocolate-dark hover:text-caramel-gold'
            }`}>
              <Search size={20} />
            </button>
            <button 
              onClick={onFavoritesClick}
              className={`transition-colors duration-300 ${
                isScrolled 
                  ? 'text-chocolate-dark hover:text-caramel-gold' 
                  : 'text-chocolate-dark hover:text-caramel-gold'
              }`}
            >
              <Heart size={20} />
            </button>
            <button 
              onClick={() => onNavigate('cart')}
              className={`px-4 py-2 border border-chocolate-dark hover:border-caramel-gold rounded-full transition-all duration-300 ${
                isScrolled 
                  ? 'text-chocolate-dark hover:text-caramel-gold' 
                  : 'text-chocolate-dark hover:text-caramel-gold'
              }`}
            >
              <span className="text-sm font-medium tracking-wide">View Cart</span>
            </button>
            <button 
              onClick={onCartClick}
              className={`relative transition-colors duration-300 group ${
                isScrolled 
                  ? 'text-chocolate-dark hover:text-caramel-gold' 
                  : 'text-chocolate-dark hover:text-caramel-gold'
              }`}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-caramel-gold text-chocolate-dark text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse group-hover:animate-none">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-300 ${
              isScrolled 
                ? 'text-cream-primary hover:text-caramel-light' 
                : 'text-cream-primary hover:text-caramel-light'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-chocolate-dark/95 backdrop-blur-nav border-t border-chocolate-medium">
            <div className="section-padding py-6">
              <div className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      item.action()
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-cream-primary hover:text-caramel-light transition-colors duration-300 font-medium tracking-wide text-left"
                  >
                    {item.name}
                  </button>
                ))}
                
                <div className="flex items-center space-x-6 pt-4 border-t border-chocolate-medium">
                  <button className="text-cream-primary hover:text-caramel-light transition-colors duration-300">
                    <Search size={20} />
                  </button>
                  <button 
                    onClick={onFavoritesClick}
                    className="text-cream-primary hover:text-caramel-light transition-colors duration-300"
                  >
                    <Heart size={20} />
                  </button>
                  <button 
                    onClick={() => {
                      onNavigate('cart')
                      setIsMobileMenuOpen(false)
                    }}
                    className="px-3 py-1 border border-cream-primary hover:border-caramel-light rounded-full text-cream-primary hover:text-caramel-light transition-all duration-300"
                  >
                    <span className="text-sm">Cart</span>
                  </button>
                  <button 
                    onClick={onCartClick}
                    className="relative text-cream-primary hover:text-caramel-light transition-colors duration-300 group"
                  >
                    <ShoppingBag size={20} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-caramel-gold text-chocolate-dark text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse group-hover:animate-none">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation