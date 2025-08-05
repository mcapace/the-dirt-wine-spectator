'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward } from 'lucide-react'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const [showControls, setShowControls] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const featuredVideo = videos[featuredIndex]

  // Progress tracking disabled due to TypeScript compatibility

  // Handle seeking on progress bar click
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const seekTo = (clickX / width) * 100
    
    if (playerRef.current) {
      playerRef.current.seekTo(seekTo / 100)
    }
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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (showControls) {
      timeout = setTimeout(() => setShowControls(false), 3000)
    }
    return () => clearTimeout(timeout)
  }, [showControls])

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
          <div 
            ref={containerRef}
            className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black/50 video-glow cursor-pointer"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            onClick={() => setShowControls(!showControls)}
          >
            <ReactPlayer
              ref={playerRef}
              url={featuredVideo.url}
              playing={playing}
              muted={muted}
              loop={false}
              width="100%"
              height="100%"
              onEnded={handleVideoEnd}
              progressInterval={100}
            />
            
            {/* Video Overlay */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                >
                  {/* Top Info */}
                  <div className="absolute top-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">{featuredVideo.title}</h3>
                        <p className="text-white/70 text-lg">{featuredVideo.brand}</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          const nextIndex = (featuredIndex + 1) % videos.length
                          onVideoSelect(nextIndex)
                        }}
                        className="p-3 rounded-full glass-effect hover:bg-white/20 transition-colors"
                      >
                        <SkipForward size={20} className="text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                    {/* Progress Bar */}
                    <div 
                      className="relative h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                      onClick={handleSeek}
                    >
                      <motion.div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    
                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setPlaying(!playing)
                          }}
                          className="p-3 rounded-full glass-effect hover:bg-white/20 transition-colors"
                        >
                          {playing ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white" />}
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setMuted(!muted)
                          }}
                          className="p-3 rounded-full glass-effect hover:bg-white/20 transition-colors"
                        >
                          {muted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
                        </button>
                      </div>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFullscreen()
                        }}
                        className="p-3 rounded-full glass-effect hover:bg-white/20 transition-colors"
                      >
                        <Maximize size={20} className="text-white" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
                      <h4 className="text-sm font-semibold truncate text-white">{video.title}</h4>
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