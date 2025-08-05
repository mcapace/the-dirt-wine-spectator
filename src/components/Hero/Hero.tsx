'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden wine-gradient">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.1,
            y: mousePosition.y * 0.1,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{
            left: '20%',
            top: '20%',
          }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-red-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -0.05,
            y: mousePosition.y * -0.05,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{
            right: '30%',
            bottom: '30%',
          }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.08,
            y: mousePosition.y * 0.08,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{
            left: '60%',
            top: '60%',
          }}
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
          <motion.h2
            className="text-xl md:text-2xl text-white/90 mb-4 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Fresh, vertical-video storytelling
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            &quot;The Dirt&quot; takes viewers straight to the vineyard—showing how the soil beneath your feet shapes each featured wine.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Watch Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Animated Badge */}
          <motion.div
            className="inline-block glass-effect px-6 py-3 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-medium text-white/90">
              🍷 Premium Wine Content
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 