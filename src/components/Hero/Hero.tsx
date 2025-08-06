'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ChevronDown, Play, ArrowRight } from 'lucide-react'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, 200])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 0.85])
  const titleY = useTransform(scrollY, [0, 600], [0, -100])
  const titleScale = useTransform(scrollY, [0, 600], [1, 0.9])
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300])

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

  // Floating orbs data
  const orbs = [
    { id: 1, size: 200, color: 'rgba(139,69,19,0.15)', delay: 0 },
    { id: 2, size: 300, color: 'rgba(220,20,60,0.1)', delay: 1 },
    { id: 3, size: 150, color: 'rgba(255,215,0,0.12)', delay: 2 },
    { id: 4, size: 250, color: 'rgba(139,69,19,0.08)', delay: 3 },
    { id: 5, size: 180, color: 'rgba(220,20,60,0.06)', delay: 4 },
  ]

  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ y, opacity, scale }}
    >
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-amber-950/10" />
        
        {/* Floating Wine-Colored Orbs */}
        {orbs.map((orb) => (
          <motion.div
            key={orb.id}
            className="absolute rounded-full blur-xl"
            style={{
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 30, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 8 + orb.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: orb.delay,
            }}
          />
        ))}

        {/* Mouse-following orb */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-2xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(139,69,19,0.2) 0%, rgba(220,20,60,0.1) 50%, transparent 70%)',
            left: `${mousePosition.x - 50}%`,
            top: `${mousePosition.y - 50}%`,
            x: '-50%',
            y: '-50%',
          }}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Wine Spectator Branding */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.div 
            className="text-sm uppercase tracking-[0.4em] text-white/60 mb-2"
            whileHover={{ scale: 1.05 }}
          >
            Wine Spectator Presents
          </motion.div>
          <motion.div 
            className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-8xl md:text-[12rem] lg:text-[15rem] font-black mb-8 leading-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          style={{ y: titleY, scale: titleScale }}
        >
          <span 
            className="block relative"
            style={{ 
              background: 'linear-gradient(135deg, #D4A574 0%, #8B4513 25%, #FFD700 50%, #8B4513 75%, #D4A574 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 30px rgba(139,69,19,0.3))'
            }}
          >
            <motion.span
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              THE DIRT
            </motion.span>
          </span>
        </motion.h1>
        
        {/* Tagline */}
        <motion.p
          className="text-2xl md:text-4xl text-white/90 mb-8 font-light italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Fresh, vertical-video storytelling
        </motion.p>
        
        {/* Description */}
        <motion.div
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-xl text-white/80 leading-relaxed mb-6">
            &quot;The Dirt&quot; takes viewers straight to the vineyard—showing how the soil 
            beneath your feet shapes each featured wine. Experience the terroir that makes every bottle unique.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
            <motion.span 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              Filmed by you
            </motion.span>
            <motion.span 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              Packaged by us
            </motion.span>
            <motion.span 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              30-60 sec clips
            </motion.span>
          </div>
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button 
            className="group relative px-10 py-5 overflow-hidden rounded-full font-semibold text-lg"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="absolute inset-0 wine-gradient"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
              }}
            />
            <span className="relative text-white flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Play size={20} />
              </motion.div>
              Watch Now
            </span>
          </motion.button>
          
          <motion.button 
            className="group relative px-10 py-5 glass-effect rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 border border-white/20 flex items-center gap-2 overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)',
                transform: 'translateX(-100%)'
              }}
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            />
            <span className="relative">Learn More</span>
            <motion.div
              className="relative"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ArrowRight size={20} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-white/50 uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center relative overflow-hidden">
            <motion.div 
              className="w-1 h-3 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full mt-2"
              animate={{ 
                y: [0, 15, 0],
                opacity: [1, 0.5, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
} 