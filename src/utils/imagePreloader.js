// Image preloader utility for better performance
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export const preloadImages = async (imageUrls) => {
  try {
    const promises = imageUrls.map(url => preloadImage(url))
    await Promise.all(promises)
    console.log('All images preloaded successfully')
  } catch (error) {
    console.warn('Some images failed to preload:', error)
  }
}

// Critical images that should be preloaded
export const criticalImages = [
  '/images/products/aureim-product-1.jpeg',
  '/images/products/aureim-product-2.jpeg',
  '/images/products/aureim-product-3.jpeg',
  '/images/products/1.png',
]