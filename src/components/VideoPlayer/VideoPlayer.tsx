'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, RefreshCw } from 'lucide-react'
import ReactPlayer from 'react-player'

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
  const playerRef = useRef<ReactPlayer>(null)

  const featuredVideo = videos[featuredIndex]

  const handleProgress = (state: { played: number }) => {
    setProgress(state.played * 100)
  }

  const handleThumbnailClick = (index: number) => {
    onVideoSelect(index)
    setPlaying(true)
    setProgress(0)
  }

  const handleVideoEnd = () => {
    const nextIndex = (featuredIndex + 1) % videos.length
    onVideoSelect(nextIndex)
  }

  return (
    <section className="relative px-4 py-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="space-y-8"
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="gradient-text">Featured Stories</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Discover the soil beneath exceptional wines
          </motion.p>
        </div>

        {/* Main Featured Video */}
        <motion.div
          className="relative group"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black/50 video-glow">
            <ReactPlayer
              ref={playerRef}
              url={featuredVideo.url}
              playing={playing}
              muted={muted}
              width="100%"
              height="100%"
              onProgress={handleProgress}
              onEnded={handleVideoEnd}
              progressInterval={100}
              config={{
                file: {
                  attributes: {
                    style: { width: '100%', height: '100%', objectFit: 'cover' }
                  }
                }
              }}
            />
            
            {/* Video Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
              {/* Top Info */}
              <div className="absolute top-0 left-0 right-0 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{featuredVideo.title}</h3>
                    <p className="text-white/70">{featuredVideo.brand}</p>
                  </div>
                  <button 
                    onClick={() => onVideoSelect((featuredIndex + 1) % videos.length)}
                    className="p-3 rounded-full glass-effect hover:bg-white/20 transition-colors"
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                {/* Progress Bar */}
                <div className="relative h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-400 to-yellow-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setPlaying(!playing)}
                      className="p-3 rounded-full glass-effect hover:bg-white/20 transition-colors"
                    >
                      {playing ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    
                    <button
                      onClick={() => setMuted(!muted)}
                      className="p-3 rounded-full glass-effect hover:bg-white/20 transition-colors"
                    >
                      {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                  </div>
                  
                  <button className="p-3 rounded-full glass-effect hover:bg-white/20 transition-colors">
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Thumbnail Videos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <AnimatePresence mode="popLayout">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative group cursor-pointer ${
                  index === featuredIndex ? 'ring-2 ring-amber-500' : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
                onMouseEnter={() => setHoveredThumb(index)}
                onMouseLeave={() => setHoveredThumb(null)}
              >
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden glass-effect">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    {/* Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="p-3 rounded-full glass-effect backdrop-blur-sm">
                        <Play size={20} className="text-white" />
                      </div>
                    </div>
                    
                    {/* Video Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h4 className="text-sm font-semibold truncate">{video.title}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-white/70">{video.brand}</p>
                        <p className="text-xs text-white/50">{video.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {index === featuredIndex && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500"
                      layoutId="activeIndicator"
                    />
                  )}
                </div>

                {/* Hover Tooltip */}
                <AnimatePresence>
                  {hoveredThumb === index && index !== featuredIndex && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full glass-effect backdrop-blur-md rounded-lg p-3 w-64 z-20"
                    >
                      <p className="text-xs text-white/90 leading-relaxed">{video.description}</p>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/10" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
} 