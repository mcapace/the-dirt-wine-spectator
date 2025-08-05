'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Video {
  id: string
  mediaId: string
  title: string
  embedUrl: string
  thumbnail: string
}

const videos: Video[] = [
  {
    id: 'video1',
    mediaId: 'kncdFPTD',
    title: 'MARCA ORO V4.1 Sub Eng',
    embedUrl: 'https://cdn.jwplayer.com/players/kncdFPTD-O0V5rBgo.html',
    thumbnail: 'https://cdn.jwplayer.com/thumbs/kncdFPTD-720.jpg'
  },
  {
    id: 'video2',
    mediaId: '2OKwwi9w',
    title: 'VALDO Tenuta Pradase',
    embedUrl: 'https://cdn.jwplayer.com/players/2OKwwi9w-O0V5rBgo.html',
    thumbnail: 'https://cdn.jwplayer.com/thumbs/2OKwwi9w-720.jpg'
  },
  {
    id: 'video3',
    mediaId: 'FSUUFWTG',
    title: 'Elegant Wine Pour',
    embedUrl: 'https://cdn.jwplayer.com/players/FSUUFWTG-O0V5rBgo.html',
    thumbnail: 'https://cdn.jwplayer.com/thumbs/FSUUFWTG-720.jpg'
  },
  {
    id: 'video4',
    mediaId: 'UPdMdryM',
    title: 'HarveyHarriet',
    embedUrl: 'https://cdn.jwplayer.com/players/UPdMdryM-O0V5rBgo.html',
    thumbnail: 'https://cdn.jwplayer.com/thumbs/UPdMdryM-720.jpg'
  },
  {
    id: 'video5',
    mediaId: '7bnWKUei',
    title: 'Hhbib Culinary-bonds',
    embedUrl: 'https://cdn.jwplayer.com/players/7bnWKUei-O0V5rBgo.html',
    thumbnail: 'https://cdn.jwplayer.com/thumbs/7bnWKUei-720.jpg'
  }
]

// Shuffle array function
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export default function VideoPlayer() {
  const [shuffledVideos, setShuffledVideos] = useState<Video[]>([])
  const [currentMainVideo, setCurrentMainVideo] = useState<Video | null>(null)
  const [thumbnailVideos, setThumbnailVideos] = useState<Video[]>([])
  const [activeThumbnailId, setActiveThumbnailId] = useState<string>('')

  useEffect(() => {
    // Shuffle videos on component mount
    const shuffled = shuffleArray(videos)
    setShuffledVideos(shuffled)
    setCurrentMainVideo(shuffled[0])
    setThumbnailVideos(shuffled.slice(1))
    setActiveThumbnailId(shuffled[0].id)
  }, [])

  const swapVideos = (newVideo: Video) => {
    if (!currentMainVideo) return

    // Find current positions
    const mainIndex = shuffledVideos.findIndex(v => v.id === currentMainVideo.id)
    const newIndex = shuffledVideos.findIndex(v => v.id === newVideo.id)
    
    // Create new shuffled array with swapped videos
    const newShuffled = [...shuffledVideos]
    ;[newShuffled[mainIndex], newShuffled[newIndex]] = [newShuffled[newIndex], newShuffled[mainIndex]]
    
    setShuffledVideos(newShuffled)
    setCurrentMainVideo(newVideo)
    setThumbnailVideos(newShuffled.slice(1))
    setActiveThumbnailId(newVideo.id)
  }

  if (!currentMainVideo) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="space-y-12">
      {/* Main Video Player */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative group"
      >
        <div className="video-gallery-container bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
          {/* Main Player */}
          <div className="main-player-wrapper">
            <iframe 
              src={currentMainVideo.embedUrl} 
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Thumbnails Grid */}
          <div className="thumbnails-container">
            {thumbnailVideos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`thumbnail-item ${activeThumbnailId === video.id ? 'active' : ''}`}
                onClick={() => swapVideos(video)}
              >
                <div className="thumbnail-wrapper">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="thumbnail-image"
                  />
                  <div className="thumbnail-overlay">
                    <div className="play-icon"></div>
                  </div>
                  <div className="video-title">{video.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .video-gallery-container {
          max-width: 1200px;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .main-player-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          background-color: #000;
        }

        .main-player-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .thumbnails-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          padding: 20px;
          background-color: #f8f8f8;
        }

        .thumbnail-item {
          position: relative;
          cursor: pointer;
          border-radius: 4px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background-color: #000;
        }

        .thumbnail-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .thumbnail-item.active {
          box-shadow: 0 0 0 3px #007bff;
        }

        .thumbnail-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
        }

        .thumbnail-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumbnail-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .thumbnail-item:hover .thumbnail-overlay {
          opacity: 1;
        }

        .play-icon {
          width: 48px;
          height: 48px;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .play-icon::after {
          content: '';
          width: 0;
          height: 0;
          border-left: 16px solid #333;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          margin-left: 4px;
        }

        .video-title {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 8px 12px;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          color: white;
          font-size: 14px;
          font-weight: 500;
        }

        .loading {
          text-align: center;
          padding: 40px;
          color: #666;
        }

        @media (max-width: 768px) {
          .thumbnails-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            padding: 15px;
          }

          .video-title {
            font-size: 12px;
            padding: 6px 10px;
          }

          .play-icon {
            width: 36px;
            height: 36px;
          }

          .play-icon::after {
            border-left-width: 12px;
            border-top-width: 8px;
            border-bottom-width: 8px;
          }
        }

        @media (max-width: 480px) {
          .thumbnails-container {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  )
} 