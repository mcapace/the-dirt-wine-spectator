'use client'

import { useState } from 'react'
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'
import BrandGrid from '@/components/BrandSection/BrandGrid'
import Hero from '@/components/Hero/Hero'
import { videos } from '@/data/videos'

export default function Home() {
  const [featuredVideo, setFeaturedVideo] = useState(0)

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-red-950/10 to-black">
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
