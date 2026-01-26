import React, { useState } from 'react'

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = '/images/products/aureim-product-1.jpeg',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc)
    }
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 bg-cream-beige animate-pulse rounded-xl ${className}`} />
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  )
}

export default LazyImage