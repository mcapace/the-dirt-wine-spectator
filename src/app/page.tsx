'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from '@/components/Hero/Hero'
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'
import BrandGrid from '@/components/BrandSection/BrandGrid'
import { videos } from '@/data/videos'

export default function Home() {
  const [featuredVideo, setFeaturedVideo] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Auto-rotate videos every 30 seconds
    const interval = setInterval(() => {
      setFeaturedVideo((prev) => (prev + 1) % videos.length)
    }, 30000)

    // Loading animation with a bit more time for better UX
    const loadingTimer = setTimeout(() => setIsLoading(false), 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(loadingTimer)
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
            className="text-7xl md:text-8xl font-bold gradient-text"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              backgroundSize: ['200% 200%', '200% 200%', '200% 200%']
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
            className="mt-4 text-white/60 text-lg"
          >
            Wine Spectator&apos;s Revolutionary Video Series
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Hero />
      <VideoPlayer 
        videos={videos}
        featuredIndex={featuredVideo}
        onVideoSelect={setFeaturedVideo}
      />
      <BrandGrid />
    </main>
  )
}
