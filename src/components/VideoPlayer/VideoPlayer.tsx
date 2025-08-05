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
  const [showControls, setShowControls] = useState(false)
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
    } else {
      document.exitFullscreen()
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
    <div className="space-y-8">
      {/* Main Video Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative group"
      >
        <div 
          ref={containerRef}
          className="relative aspect-[16/9] rounded-lg overflow-hidden bg-black cursor-pointer shadow-lg"
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
                      <h3 className="text-2xl font-bold text-white">{featuredVideo.title}</h3>
                      <p className="text-white/70">{featuredVideo.brand}</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        const nextIndex = (featuredIndex + 1) % videos.length
                        onVideoSelect(nextIndex)
                      }}
                      className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
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
                      className="absolute left-0 top-0 h-full bg-red-600"
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
                        className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                      >
                        {playing ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white" />}
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setMuted(!muted)
                        }}
                        className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                      >
                        {muted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
                      </button>
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFullscreen()
                      }}
                      className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
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

      {/* Thumbnail Videos */}
      <div className="grid grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`relative cursor-pointer rounded-lg overflow-hidden shadow-md ${
              index === featuredIndex ? 'ring-2 ring-red-600' : ''
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <div className="relative aspect-[16/9]">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              
              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                <div className="p-2 rounded-full bg-white/90">
                  <Play size={16} className="text-gray-900" />
                </div>
              </div>
              
              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <h4 className="text-sm font-semibold text-white truncate">{video.title}</h4>
                <p className="text-xs text-white/70">{video.brand}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 