import React from 'react'
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const Footer = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { name: 'All Products', action: () => onNavigate && onNavigate('home', 'collection') },
      { name: 'Single Origin', action: () => onNavigate && onNavigate('home', 'collection') },
      { name: 'Gift Sets', action: () => onNavigate && onNavigate('home', 'collection') },
      { name: 'Subscriptions', action: () => onNavigate && onNavigate('home', 'collection') },
      { name: 'Limited Editions', action: () => onNavigate && onNavigate('home', 'collection') }
    ],
    about: [
      { name: 'Our Story', action: () => onNavigate && onNavigate('home', 'story') },
      { name: 'The Craft', action: () => onNavigate && onNavigate('craft') },
      { name: 'Sustainability', action: () => onNavigate && onNavigate('home', 'story') },
      { name: 'Press', action: () => onNavigate && onNavigate('contact') },
      { name: 'Careers', action: () => onNavigate && onNavigate('contact') }
    ],
    support: [
      { name: 'Contact Us', action: () => onNavigate && onNavigate('contact') },
      { name: 'Shipping Info', action: () => onNavigate && onNavigate('contact') },
      { name: 'Returns', action: () => onNavigate && onNavigate('contact') },
      { name: 'Size Guide', action: () => onNavigate && onNavigate('contact') },
      { name: 'FAQ', action: () => onNavigate && onNavigate('contact') }
    ]
  }

  const socialLinks = [
    { icon: <Instagram size={20} />, href: '#', name: 'Instagram' },
    { icon: <Facebook size={20} />, href: '#', name: 'Facebook' },
    { icon: <Twitter size={20} />, href: '#', name: 'Twitter' }
  ]

  return (
    <footer className="bg-stone-900 border-t border-stone-800">
      <div className="section-padding py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-5 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-serif text-beige mb-6 tracking-luxury">
                AUREIM
              </h3>
              <p className="text-stone-400 leading-relaxed mb-8 max-w-md">
                Mindful luxury chocolate crafted in India. Each piece is a ritual of 
                guilt-free indulgence, designed for those who seek wellness in every moment.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-stone-400">
                  <Mail size={16} />
                  <span>hello@aureim.com</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400">
                  <Phone size={16} />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400">
                  <MapPin size={16} />
                  <span>Mumbai, India</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-stone-800 hover:bg-amber-800 text-stone-400 hover:text-stone-950 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="text-beige font-medium mb-6 tracking-wide">Shop</h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className="text-stone-400 hover:text-amber-200 transition-colors duration-300 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Links */}
            <div>
              <h4 className="text-beige font-medium mb-6 tracking-wide">About</h4>
              <ul className="space-y-3">
                {footerLinks.about.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className="text-stone-400 hover:text-amber-200 transition-colors duration-300 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-beige font-medium mb-6 tracking-wide">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className="text-stone-400 hover:text-amber-200 transition-colors duration-300 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="border-t border-stone-800 pt-12 mb-12">
            <div className="max-w-md">
              <h4 className="text-beige font-medium mb-4 tracking-wide">
                Stay Connected
              </h4>
              <p className="text-stone-400 text-sm mb-6">
                Subscribe for new releases and mindful living insights
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-beige placeholder-stone-500 focus:outline-none focus:border-amber-800 transition-colors duration-300"
                />
                <button className="px-6 py-3 bg-amber-800 hover:bg-amber-900 text-stone-950 rounded-lg font-medium transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-stone-500 text-sm">
              © {currentYear} AUREIM. All rights reserved.
            </div>
            
            <div className="text-stone-400 text-sm italic">
              Crafted with love in India 🇮🇳
            </div>
            
            <div className="flex gap-6 text-stone-500 text-sm">
              <a href="#privacy" className="hover:text-amber-200 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-amber-200 transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer