'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'
import WineryShowcase from '@/components/WineryShowcase/WineryShowcase'
import Navbar from '@/components/Navigation/Navbar'
import Footer from '@/components/Footer/Footer'
import { videos } from '@/data/videos'

export default function Home() {
  const [featuredVideo, setFeaturedVideo] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, -100])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    // Auto-rotate videos every 30 seconds
    const interval = setInterval(() => {
      setFeaturedVideo((prev) => (prev + 1) % videos.length)
    }, 30000)

    // Loading animation
    const loadingTimer = setTimeout(() => setIsLoading(false), 1500)

    // Mouse tracking for parallax effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearInterval(interval)
      clearTimeout(loadingTimer)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            className="text-6xl md:text-7xl font-bold gradient-text mb-4"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{
              background: 'linear-gradient(45deg, #8B0000, #DC143C, #FFD700, #8B4513, #8B0000)',
              backgroundSize: '200% 200%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            THE DIRT
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white/60 text-lg"
          >
            Video Series
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative py-20 px-4 bg-black overflow-hidden"
      >
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            backgroundPosition: [
              `${mousePosition.x * 100}% ${mousePosition.y * 100}%`,
              `${(1 - mousePosition.x) * 100}% ${(1 - mousePosition.y) * 100}%`
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(220, 20, 60, 0.1) 0%, transparent 50%)`,
            backgroundSize: '100% 100%'
          }}
        />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.img 
              src="/images/New Dirt logo.png" 
              alt="The Dirt Logo" 
              className="h-24 md:h-32 mx-auto"
              whileHover={{ 
                scale: 1.05,
                filter: "drop-shadow(0 10px 20px rgba(220, 20, 60, 0.3))"
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            THE DIRT
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl md:text-3xl font-semibold text-white mb-8"
          >
            Video Series
          </motion.h2>

          {/* Decorative Dots */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center space-x-2 mb-12"
          >
            <div className="w-3 h-3 bg-red-800 rounded-full"></div>
            <div className="w-3 h-3 bg-red-800 rounded-full"></div>
            <div className="w-3 h-3 bg-red-800 rounded-full"></div>
          </motion.div>

          {/* Concept Sections */}
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Section 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-left"
            >
              <div className="flex items-start space-x-4">
                <div className="w-0 h-0 border-l-8 border-r-0 border-b-8 border-t-8 border-transparent border-l-red-800 mt-2"></div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                    Fresh, vertical-video storytelling.
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    &ldquo;The Dirt&rdquo; takes viewers straight to the vineyard—showing how the soil beneath your feet shapes each featured wine.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="border-t border-dotted border-gray-600"
            ></motion.div>

            {/* Section 2 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-left"
            >
              <div className="flex items-start space-x-4">
                <div className="w-0 h-0 border-l-8 border-r-0 border-b-8 border-t-8 border-transparent border-l-red-800 mt-2"></div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                    Filmed by you, packaged by us.
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Winemakers capture 30-60 sec clips on their phones; Wine Spectator edits, brands, and links each episode directly to your DTC page or social handle.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="border-t border-dotted border-gray-600"
            ></motion.div>

            {/* Section 3 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-left"
            >
              <div className="flex items-start space-x-4">
                <div className="w-0 h-0 border-l-8 border-r-0 border-b-8 border-t-8 border-transparent border-l-red-800 mt-2"></div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                    Multi-channel reach.
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Episodes drop on Wine IQ (email, web hub & newsletter), are amplified via Wine Spectator social, and can extend across our Shanken Extension Network for added scale.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Video Player Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <VideoPlayer 
            videos={videos}
            featuredIndex={featuredVideo}
            onVideoSelect={setFeaturedVideo}
          />
        </div>
      </section>

      {/* Winery Showcase */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <WineryShowcase />
        </div>
      </section>

      <Footer />
    </div>
  )
}
