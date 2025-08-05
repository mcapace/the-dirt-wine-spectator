'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-red-950/30 to-black" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x - 50,
            y: mousePosition.y - 50,
          }}
          transition={{ type: "spring", damping: 30 }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
          animate={{
            x: -(mousePosition.x - 50) * 0.5,
            y: -(mousePosition.y - 50) * 0.5,
          }}
          transition={{ type: "spring", damping: 30 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo/Title */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/images/The Dirt Logo.png"
              alt="The Dirt"
              width={400}
              height={200}
              className="mx-auto max-w-full h-auto"
              priority
            />
          </motion.div>
          
          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-white/80 mb-8 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Fresh, vertical-video storytelling
          </motion.p>
          
          {/* Description */}
          <motion.p
            className="text-lg text-white/60 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            &quot;The Dirt&quot; takes viewers straight to the vineyard—showing how the soil 
            beneath your feet shapes each featured wine.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full font-semibold text-black hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105">
              Watch Now
            </button>
            <button className="px-8 py-4 glass-effect rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* Animated Badge */}
        <motion.div
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
        >
          <div className="flex items-center space-x-2 text-sm text-white/60">
            <span>Filmed by you</span>
            <span className="w-1 h-1 bg-white/60 rounded-full" />
            <span>Packaged by us</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
} 