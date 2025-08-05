'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 wine-gradient opacity-20" />
        
        {/* Animated Orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,69,19,0.3) 0%, transparent 70%)',
            left: `${mousePosition.x - 50}%`,
            top: `${mousePosition.y - 50}%`,
            x: '-50%',
            y: '-50%',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Wine Spectator Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="text-sm uppercase tracking-[0.3em] text-white/60 mb-4">
            Wine Spectator Presents
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-7xl md:text-9xl font-black mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block" style={{ 
            background: 'linear-gradient(135deg, #D4A574 0%, #8B4513 50%, #D4A574 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 80px rgba(139,69,19,0.5)'
          }}>
            THE DIRT
          </span>
        </motion.h1>
        
        {/* Tagline */}
        <motion.p
          className="text-2xl md:text-3xl text-white/80 mb-8 font-light italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Fresh, vertical-video storytelling
        </motion.p>
        
        {/* Description */}
        <motion.div
          className="max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-lg text-white/70 leading-relaxed">
            &quot;The Dirt&quot; takes viewers straight to the vineyard—showing how the soil 
            beneath your feet shapes each featured wine.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              Filmed by you
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              Packaged by us
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              30-60 sec clips
            </span>
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="group relative px-8 py-4 overflow-hidden rounded-full font-semibold">
            <div className="absolute inset-0 wine-gradient group-hover:scale-105 transition-transform duration-300" />
            <span className="relative text-white">Watch Now</span>
          </button>
          <button className="px-8 py-4 glass-effect rounded-full font-semibold hover:bg-white/10 transition-all duration-300 border border-white/20">
            Learn More
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.section>
  )
} 