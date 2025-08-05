'use client'

import { useState, useEffect } from 'react'
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'
import BrandGrid from '@/components/BrandSection/BrandGrid'
import Hero from '@/components/Hero/Hero'
import Navbar from '@/components/Navigation/Navbar'
import Footer from '@/components/Footer/Footer'
import { videos } from '@/data/videos'

export default function Home() {
  const [featuredVideo, setFeaturedVideo] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedVideo((prev) => (prev + 1) % videos.length)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-black via-red-950/10 to-black pt-20">
        <Hero />
        <VideoPlayer 
          videos={videos}
          featuredIndex={featuredVideo}
          onVideoSelect={setFeaturedVideo}
        />
        <BrandGrid />
      </main>
      <Footer />
    </>
  )
}
