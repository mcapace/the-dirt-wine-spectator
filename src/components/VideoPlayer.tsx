'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play } from 'lucide-react'

interface Video {
  id: string
  mediaId: string
  title: string
  brand: string
  embedUrl: string
  thumbnail: string
}

const videos: Video[] = [
  {
    id: 'video1',
    mediaId: 'kncdFPTD',
    title: 'The Limestone Legacy',
    brand: 'Château Margaux',
    embedUrl: 'https://cdn.jwplayer.com/players/kncdFPTD-O0V5rBgo.html',
    thumbnail: 'https://cdn.jwplayer.com/thumbs/kncdFPTD-720.jpg'
  },
  {
    id: 'video2',
    mediaId: '2OKwwi9w',
    title: 'Volcanic Excellence',
    brand: 'Opus One',
    embedUrl: 'https://cdn.jwplayer.com/players/2OKwwi9w-O0V5rBgo.html',
    thumbnail: 'https://cdn.jwplayer.com/thumbs/2OKwwi9w-720.jpg'
  },
  {
    id: 'video3',
    mediaId: 'FSUUFWTG',
    title: 'Terra Rossa Tales',
    brand: 'Penfolds',
    embedUrl: 'https://cdn.jwplayer.com/players/FSUUFWTG-O0V5rBgo.html',
    thumbnail: 'https://cdn.jwplayer.com/thumbs/FSUUFWTG-720.jpg'
  },
  {
    id: 'video4',
    mediaId: 'UPdMdryM',
    title: 'Tuscan Traditions',
    brand: 'Antinori',
    embedUrl: 'https://cdn.jwplayer.com/players/UPdMdryM-O0V5rBgo.html',
    thumbnail: 'https://cdn.jwplayer.com/thumbs/UPdMdryM-720.jpg'
  }
]

export default function VideoPlayer() {
  const [currentVideo, setCurrentVideo] = useState<Video>(videos[0])
  const [thumbnailVideos, setThumbnailVideos] = useState<Video[]>(videos.slice(1))
  const [activeVideoId, setActiveVideoId] = useState<string>('video1')

  // Auto-rotate videos every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = videos.findIndex(video => video.id === currentVideo.id)
      const nextIndex = (currentIndex + 1) % videos.length
      const nextVideo = videos[nextIndex]
      handleVideoSwap(nextVideo)
    }, 30000)

    return () => clearInterval(interval)
  }, [currentVideo.id])

  const handleVideoSwap = (selectedVideo: Video) => {
    // Update current video
    setCurrentVideo(selectedVideo)
    setActiveVideoId(selectedVideo.id)

    // Update thumbnail videos - move current video to thumbnails and remove selected video
    const newThumbnails = videos.filter(video => video.id !== selectedVideo.id)
    setThumbnailVideos(newThumbnails)
  }

  return (
    <div className="w-full">
      {/* Main Video Player */}
      <motion.div
        key={currentVideo.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-12"
      >
        {/* Video Container with 16:9 aspect ratio */}
        <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
          <iframe
            src={currentVideo.embedUrl}
            className="w-full h-full rounded-2xl shadow-2xl"
            style={{
              boxShadow: '0 25px 50px -12px rgba(212, 175, 55, 0.25), 0 0 0 1px rgba(212, 175, 55, 0.1)'
            }}
            allowFullScreen
            allow="autoplay; fullscreen"
          />
        </div>

        {/* Video Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <h3 className="text-2xl font-semibold text-white mb-2">{currentVideo.title}</h3>
          <p className="text-gray-400 text-lg">{currentVideo.brand}</p>
        </motion.div>
      </motion.div>

      {/* Thumbnail Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {thumbnailVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              transition: { duration: 0.3 }
            }}
            className={`relative cursor-pointer group ${
              activeVideoId === video.id ? 'ring-2 ring-amber-400 ring-opacity-80' : ''
            }`}
            onClick={() => handleVideoSwap(video)}
          >
            {/* Glass morphism container */}
            <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
              {/* Thumbnail Image */}
              <div className="relative w-full h-32 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient overlay for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Play icon overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Play className="w-8 h-8 text-white drop-shadow-lg" />
                  </motion.div>
                </div>
              </div>

              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-sm font-semibold text-white mb-1 truncate drop-shadow-lg">
                  {video.title}
                </h4>
                <p className="text-xs text-gray-300 truncate drop-shadow-lg">
                  {video.brand}
                </p>
              </div>

              {/* Active state indicator */}
              {activeVideoId === video.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-3 h-3 bg-amber-400 rounded-full"
                />
              )}
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>

      {/* Auto-rotation indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <span className="text-xs text-gray-400">Auto-rotating every 30 seconds</span>
        </div>
      </motion.div>
    </div>
  )
} 