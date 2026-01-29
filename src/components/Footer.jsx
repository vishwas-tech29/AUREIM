import React from 'react'
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const Footer = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { name: 'All Products', action: () => onNavigate && onNavigate('home', 'collection') },
      { name: 'Dark Chocolate', action: () => onNavigate && onNavigate('home', 'collection') },
      { name: 'Gift Collections', action: () => onNavigate && onNavigate('home', 'collection') },
      { name: 'Customer Reviews', action: () => onNavigate && onNavigate('reviews') },
      { name: 'New Arrivals', action: () => onNavigate && onNavigate('home', 'collection') }
    ],
    about: [
      { name: 'Our Story', action: () => onNavigate && onNavigate('home', 'story') },
      { name: 'The Craft', action: () => onNavigate && onNavigate('craft') },
      { name: 'Sustainability', action: () => onNavigate && onNavigate('home', 'story') },
      { name: 'Quality Promise', action: () => onNavigate && onNavigate('home', 'story') },
      { name: 'Blog', action: () => onNavigate && onNavigate('contact') }
    ],
    support: [
      { name: 'Contact Us', action: () => onNavigate && onNavigate('contact') },
      { name: 'Shipping & Delivery', action: () => onNavigate && onNavigate('contact') },
      { name: 'Returns & Refunds', action: () => onNavigate && onNavigate('contact') },
      { name: 'Track Your Order', action: () => onNavigate && onNavigate('contact') },
      { name: 'Help Center', action: () => onNavigate && onNavigate('contact') }
    ]
  }

  const socialLinks = [
    { icon: <Instagram size={20} />, href: 'https://www.instagram.com/aureim_chocolates?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', name: 'Instagram' },
    { icon: <Facebook size={20} />, href: 'https://facebook.com/aureim.chocolates', name: 'Facebook' },
    { icon: <Twitter size={20} />, href: 'https://twitter.com/aureim_choco', name: 'Twitter' }
  ]

  return (
    <footer className="bg-chocolate-dark border-t border-chocolate-medium">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid mb-8 sm:mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-serif text-cream-primary mb-4 sm:mb-6 tracking-luxury">
              AUREIM
            </h3>
            <p className="text-cream-soft leading-relaxed mb-6 sm:mb-8 max-w-md mx-auto sm:mx-0">
              Premium handcrafted chocolates made with love in Hyderabad. 
              Experience guilt-free indulgence with our monk fruit sweetened, 
                high-cocoa content chocolates. Free shipping on orders over ₹1000.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-cream-soft">
                  <Mail size={16} />
                  <span>aureim.chocolates@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-cream-soft">
                  <Phone size={16} />
                  <span>+91 90004 29689</span>
                </div>
                <div className="flex items-center gap-3 text-cream-soft">
                  <MapPin size={16} />
                  <span>Hyderabad, India</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-cream-beige hover:bg-caramel-gold text-chocolate-dark hover:text-chocolate-dark rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="text-cream-primary font-medium mb-6 tracking-wide">Shop</h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className="text-cream-soft hover:text-caramel-gold transition-colors duration-300 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Links */}
            <div>
              <h4 className="text-cream-primary font-medium mb-6 tracking-wide">About</h4>
              <ul className="space-y-3">
                {footerLinks.about.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className="text-cream-soft hover:text-caramel-gold transition-colors duration-300 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-cream-primary font-medium mb-6 tracking-wide">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className="text-cream-soft hover:text-caramel-gold transition-colors duration-300 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="border-t border-chocolate-medium pt-12 mb-12">
            <div className="max-w-md">
              <h4 className="text-cream-primary font-medium mb-4 tracking-wide">
                Stay Connected
              </h4>
              <p className="text-cream-soft text-sm mb-6">
                Get exclusive offers, new product launches, and wellness tips
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-cream-beige border border-cream-soft rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-caramel-gold transition-colors duration-300"
                />
                <button className="px-6 py-3 bg-caramel-gold hover:bg-caramel-light text-chocolate-dark rounded-lg font-medium transition-colors duration-300">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-cream-soft mt-2">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-chocolate-medium pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-cream-soft text-sm">
              © {currentYear} AUREIM. All rights reserved.
            </div>
            
            <div className="text-cream-soft text-sm italic">
              Crafted with love in India 🇮🇳
            </div>
            
            <div className="flex gap-6 text-cream-soft text-sm">
              <button 
                onClick={() => onNavigate && onNavigate('contact')}
                className="hover:text-caramel-gold transition-colors duration-300"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => onNavigate && onNavigate('contact')}
                className="hover:text-caramel-gold transition-colors duration-300"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => onNavigate && onNavigate('contact')}
                className="hover:text-caramel-gold transition-colors duration-300"
              >
                Refund Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer