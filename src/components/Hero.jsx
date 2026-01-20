import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Hero = () => {
  const containerRef = useRef(null)
  const gradientRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax transformations
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.7])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  // State for animated gradient
  const [gradientPosition, setGradientPosition] = useState({ x: 0, y: 0 })

  // Animate gradient position
  useEffect(() => {
    let animationFrameId
    let time = 0
    
    const animateGradient = () => {
      time += 0.002
      
      // Calculate smooth, flowing positions
      const x = Math.sin(time) * 20 + Math.cos(time * 0.7) * 15
      const y = Math.cos(time * 0.5) * 15 + Math.sin(time * 0.3) * 10
      
      setGradientPosition({ x, y })
      
      animationFrameId = requestAnimationFrame(animateGradient)
    }
    
    animateGradient()
    
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 1.2, 
        ease: [0.83, 0, 0.17, 1] 
      },
    },
  }

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 40 
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(180, 83, 9, 0.4)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  }

  const chocolateBarVariants = {
    hidden: { 
      opacity: 0,
      x: 100,
      rotate: 10,
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
        delay: 1
      }
    }
  }

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Animated Gradient Background Layer */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        animate={{
          backgroundPosition: [`${gradientPosition.x}% ${gradientPosition.y}%`, 
                              `${gradientPosition.x + 50}% ${gradientPosition.y + 50}%`],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(120, 53, 15, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 70% 70%, rgba(180, 83, 9, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 50% 20%, rgba(245, 158, 11, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(113, 63, 18, 0.1) 0%, transparent 40%),
            linear-gradient(135deg, rgba(28, 25, 23, 0.95) 0%, rgba(41, 37, 36, 0.98) 100%)
          `,
          backgroundSize: '200% 200%, 200% 200%, 200% 200%, 200% 200%, 100% 100%',
          backgroundBlendMode: 'overlay, overlay, overlay, overlay, normal'
        }}
      >
        {/* Subtle Gradient Orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              background: `radial-gradient(circle, 
                ${i % 2 === 0 ? 'rgba(180, 83, 9, 0.1)' : 'rgba(120, 53, 15, 0.08)'} 0%, 
                transparent 70%)`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
            animate={{
              x: [0, Math.sin(i * 0.5) * 20, 0],
              y: [0, Math.cos(i * 0.5) * 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </motion.div>

      {/* Parallax Background Layers */}
      <div className="absolute inset-0">
        {/* Deep Background - Cocoa Beans with parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ 
            y: backgroundY,
            scale 
          }}
        >
          <div 
            className="w-full h-full bg-[url('https://images.unsplash.com/photo-1575377427642-087cf684f29d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cocoa-primary/70 via-cocoa-primary/50 to-cocoa-primary/70" />
        </motion.div>

        {/* Animated Gradient Overlay */}
        <motion.div 
          ref={gradientRef}
          className="absolute inset-0"
          animate={{
            backgroundPosition: [
              '0% 0%',
              '100% 100%',
              '0% 100%',
              '100% 0%',
              '0% 0%'
            ],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `
              linear-gradient(45deg, 
                transparent 0%, 
                rgba(245, 158, 11, 0.03) 25%, 
                transparent 50%, 
                rgba(180, 83, 9, 0.02) 75%, 
                transparent 100%
              ),
              linear-gradient(135deg, 
                rgba(113, 63, 18, 0.02) 0%, 
                transparent 25%, 
                rgba(245, 158, 11, 0.01) 50%, 
                transparent 75%, 
                rgba(180, 83, 9, 0.03) 100%
              )
            `,
            backgroundSize: '400% 400%, 400% 400%',
            mixBlendMode: 'overlay'
          }}
        />

        {/* Foreground Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-cream-primary/10 via-transparent to-cream-primary/20"
          style={{ opacity: overlayOpacity }}
        />

        {/* Animated Light Streaks */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`streak-${i}`}
              className="absolute top-0 h-full w-1 bg-gradient-to-b from-transparent via-gold/10 to-transparent"
              style={{
                left: `${20 + i * 30}%`,
              }}
              animate={{
                y: ['-100%', '200%'],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1.5
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Chocolate Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cocoa-primary/30 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
            }}
            animate={{
              y: [null, `-${Math.random() * 100 + 50}px`],
              x: [null, `${Math.random() * 50 - 25}px`],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="col-span-1 lg:col-span-7 xl:col-span-6 text-center lg:text-left relative z-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ y: textY }}
            >
              {/* Vertical Decorative Text */}
              <motion.div
                className="hidden lg:flex absolute -left-24 top-1/2 -translate-y-1/2 opacity-40"
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 0.4, x: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                <div
                  className="text-xs font-light tracking-[0.3em] text-cream-primary/80 whitespace-nowrap"
                  style={{
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'center',
                  }}
                >
                  R E F I N E D · D A R K · P U R E
                </div>
              </motion.div>

              {/* Subtitle */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-3 mb-6"
              >
                <div className="w-8 h-px bg-gold" />
                <small className="text-sm font-light tracking-widest text-cream-primary/90 uppercase">
                  SINCE 2024
                </small>
                <div className="w-8 h-px bg-gold" />
              </motion.div>

              {/* Main Title */}
              <motion.h1
                variants={itemVariants}
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[0.9] mb-6 text-cream-primary"
                style={{ textShadow: '0 4px 30px rgba(0, 0, 0, 0.3)' }}
              >
                <span className="block">Chocolate</span>
                <span className="block">
                  <motion.span 
                    className="relative"
                    animate={{ 
                      textShadow: [
                        "0 0 30px rgba(245, 241, 237, 0.5)",
                        "0 0 60px rgba(245, 241, 237, 0.8)",
                        "0 0 30px rgba(245, 241, 237, 0.5)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Redefined
                  </motion.span>
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-cream-primary/90 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0"
              >
                Experience the pure essence of chocolate with AUREIM 80% Cocoa Dark Chocolate.
                Crafted with single-origin cocoa and sweetened naturally with monk fruit.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                variants={containerVariants}
              >
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="btn-luxury-gold px-10 py-4 text-base font-medium tracking-widest"
                >
                  DISCOVER AUREIM
                </motion.button>
                
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-10 py-4 text-base font-medium tracking-widest border border-cream-primary/30 text-cream-primary rounded-full hover:bg-cream-primary/10 transition-colors backdrop-blur-sm"
                >
                  OUR STORY
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right: 3D Chocolate Bar */}
            <motion.div
              className="col-span-1 lg:col-span-5 xl:col-span-6 flex items-center justify-center lg:justify-end relative"
              variants={chocolateBarVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative w-full max-w-xl">
                {/* Floating Chocolate Bar */}
                <motion.div
                  className="relative w-80 h-96 mx-auto lg:mr-0 lg:ml-auto"
                  animate={{ 
                    y: [0, -15, 0],
                    rotateY: [0, 5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                >
                  {/* Chocolate Bar Main */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cocoa-primary via-cocoa-secondary to-cocoa-primary rounded-2xl shadow-2xl">
                    {/* Chocolate Texture Overlay */}
                    <div 
                      className="absolute inset-0 rounded-2xl bg-[url('../1.jpg')] bg-cover mix-blend-overlay opacity-20"
                    />
                    
                    {/* Glossy Reflection */}
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl" />
                    
                    {/* Bar Segments */}
                    <div className="absolute inset-4 flex flex-col gap-3">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-full bg-gradient-to-r from-cocoa-primary/50 to-cocoa-secondary/50 rounded-lg" />
                      ))}
                    </div>
                    
                    {/* Branding */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-cream-primary text-center">
                        <div className="text-2xl font-display tracking-widest mb-2">AUREIM</div>
                        <div className="text-sm font-light tracking-widest opacity-80">80% DARK</div>
                      </div>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-gold/20 via-amber-500/10 to-gold/20 blur-2xl opacity-50" />

                  {/* Floating Cocoa Beans */}
                  <motion.div
                    className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-gradient-to-br from-cocoa-primary to-cocoa-secondary shadow-lg"
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                  
                  <motion.div
                    className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-gradient-to-br from-cocoa-secondary to-cocoa-primary shadow-lg"
                    animate={{ 
                      y: [0, 15, 0],
                      rotate: [0, -360]
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  />
                </motion.div>

                {/* Decorative Elements */}
                <motion.div 
                  className="absolute -bottom-12 -left-12 w-24 h-0.5 bg-gradient-to-r from-gold to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2, duration: 1.5 }}
                />
                <motion.div 
                  className="absolute -top-12 -right-12 w-24 h-0.5 bg-gradient-to-l from-gold to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2.2, duration: 1.5 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs tracking-widest text-cream-primary/60 uppercase">
            Scroll
          </div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-gold to-transparent"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero