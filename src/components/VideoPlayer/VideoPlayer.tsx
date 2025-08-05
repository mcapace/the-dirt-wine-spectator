'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'

interface Video {
  id: string
  title: string
  brand: string
  url: string
  thumbnail: string
  duration: string
  description: string
}

interface VideoPlayerProps {
  videos: Video[]
  featuredIndex: number
  onVideoSelect: (index: number) => void
}

export default function VideoPlayer({ videos, featuredIndex, onVideoSelect }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hoveredThumb, setHoveredThumb] = useState<number | null>(null)
  const playerRef = useRef<HTMLVideoElement>(null)

  const featuredVideo = videos[featuredIndex]
  const thumbnailVideos = videos.filter((_, index) => index !== featuredIndex)



  const handleThumbnailClick = (clickedVideo: Video) => {
    const newIndex = videos.findIndex(v => v.id === clickedVideo.id)
    onVideoSelect(newIndex)
    setPlaying(true)
    setProgress(0)
  }

  return (
    <section className="relative px-4 py-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        {/* Main Featured Video */}
        <div className="relative group">
          <motion.div
            layoutId="featured-video"
            className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black/50 video-glow"
          >
            <video
              ref={playerRef}
              src={featuredVideo.url}
              autoPlay={playing}
              muted={muted}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onTimeUpdate={() => {
                if (playerRef.current) {
                  const video = playerRef.current
                  setProgress((video.currentTime / video.duration) * 100)
                }
              }}
            />
            
            {/* Custom Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                {/* Progress Bar */}
                <div className="relative h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-400 to-yellow-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setPlaying(!playing)}
                      className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                    >
                      {playing ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    
                    <button
                      onClick={() => setMuted(!muted)}
                      className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                    >
                      {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{featuredVideo.title}</h3>
                      <p className="text-sm text-white/70">{featuredVideo.brand}</p>
                    </div>
                  </div>
                  
                  <button className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Thumbnail Videos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {thumbnailVideos.map((video, index) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer"
                onClick={() => handleThumbnailClick(video)}
                onMouseEnter={() => setHoveredThumb(index)}
                onMouseLeave={() => setHoveredThumb(null)}
              >
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden glass-effect">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-3 rounded-full bg-white/20 backdrop-blur-md">
                      <Play size={24} className="text-white" />
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <h4 className="text-sm font-medium truncate">{video.title}</h4>
                    <p className="text-xs text-white/70">{video.duration}</p>
                  </div>
                  
                  {/* Hover Preview */}
                  <AnimatePresence>
                    {hoveredThumb === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-black/90 backdrop-blur-md rounded-lg p-3 w-64 z-10"
                      >
                        <p className="text-xs text-white/90">{video.description}</p>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black/90" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
} 