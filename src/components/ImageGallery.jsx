import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import LazyImage from './LazyImage'

const ImageGallery = ({ images, isOpen, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  if (!isOpen) return null

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
  }

  return (
    <div 
      className="fixed inset-0 bg-stone-950/95 z-50 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-beige hover:text-amber-200 transition-colors duration-300 z-10"
      >
        <X size={32} />
      </button>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-6 text-beige hover:text-amber-200 transition-colors duration-300 z-10"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-6 text-beige hover:text-amber-200 transition-colors duration-300 z-10"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* Main Image */}
      <div 
        className="max-w-4xl max-h-[80vh] mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <LazyImage
          src={images[currentIndex]?.src}
          alt={images[currentIndex]?.alt || `Gallery image ${currentIndex + 1}`}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-beige text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex(index)
              }}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex 
                  ? 'border-amber-800' 
                  : 'border-stone-700 hover:border-stone-500'
              }`}
            >
              <LazyImage
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery