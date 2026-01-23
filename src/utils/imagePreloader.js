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
  'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=1920&h=1080&fit=crop&crop=center&q=80',
  'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=400&fit=crop&crop=center&q=80',
  'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop&crop=center&q=80',
  'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=400&fit=crop&crop=center&q=80'
]