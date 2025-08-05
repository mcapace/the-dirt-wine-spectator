'use client'

import { useState, useEffect } from 'react'
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

    // Loading animation
    setTimeout(() => setIsLoading(false), 1000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-6xl font-bold gradient-text animate-pulse">THE DIRT</div>
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
