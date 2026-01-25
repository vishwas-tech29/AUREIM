import React, { useEffect } from 'react'
import { CheckCircle, X, AlertCircle } from 'lucide-react'

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [onClose, duration])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />
      case 'error':
        return <AlertCircle size={20} />
      default:
        return <CheckCircle size={20} />
    }
  }

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-caramel-gold text-chocolate-dark border-caramel-light'
      case 'error':
        return 'bg-red-600 text-red-100 border-red-700'
      default:
        return 'bg-caramel-gold text-chocolate-dark border-caramel-light'
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-luxury border ${getStyles()}`}>
        {getIcon()}
        <span className="font-medium tracking-wide">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 hover:opacity-70 transition-opacity duration-200"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export default Toast