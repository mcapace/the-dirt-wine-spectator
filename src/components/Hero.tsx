'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Mouse tracking for parallax effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Smooth spring animations for mouse following
  const springConfig = { damping: 25, stiffness: 700 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)
  
  // Transform mouse position to orb movement
  const orb1X = useTransform(mouseXSpring, [-1, 1], [-50, 50])
  const orb1Y = useTransform(mouseYSpring, [-1, 1], [-30, 30])
  const orb2X = useTransform(mouseXSpring, [-1, 1], [30, -30])
  const orb2Y = useTransform(mouseYSpring, [-1, 1], [40, -40])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Normalize mouse position to -1 to 1 range
      const x = (clientX / innerWidth) * 2 - 1
      const y = (clientY / innerHeight) * 2 - 1
      
      mouseX.set(x)
      mouseY.set(y)
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background with wine-red gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-red-800/10" />
      </div>

      {/* Floating Wine-Colored Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-red-600 to-amber-500 rounded-full opacity-20 blur-xl"
        style={{ x: orb1X, y: orb1Y }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-amber-500 to-red-600 rounded-full opacity-15 blur-xl"
        style={{ x: orb2X, y: orb2Y }}
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-red-700 to-amber-600 rounded-full opacity-10 blur-lg"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Wine Spectator Logo */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-10 z-10"
      >
        <Image
          src="/images/WS White.png"
          alt="Wine Spectator"
          width={120}
          height={30}
          className="h-8 w-auto drop-shadow-lg"
          priority
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        {/* The Dirt Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="mb-8"
        >
          <motion.div
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className="relative"
          >
            <Image
              src="/images/New Dirt logo.png"
              alt="The Dirt"
              width={400}
              height={200}
              className="w-[250px] md:w-[400px] mx-auto drop-shadow-2xl"
              priority
            />
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-red-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-2xl md:text-3xl font-light italic text-gray-300 mb-6"
        >
          Fresh, vertical-video storytelling.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto opacity-80 leading-relaxed"
        >
          Discover the soil beneath exceptional wines through intimate vineyard stories, 
          captured by winemakers and crafted by Wine Spectator.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button 
            className="px-8 py-4 wine-btn text-white font-semibold rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Watch Now
          </motion.button>
          
          <motion.button 
            className="px-8 py-4 glass-effect text-white font-semibold rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 165, 116, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
    </section>
  )
} 