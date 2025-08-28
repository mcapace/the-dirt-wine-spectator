'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation/Navbar';
import Footer from '@/components/Footer/Footer';

// Video data - same as in AboutTheDirtSection
const videoData = [
  {
    id: 'bE41U3pF',
    winery: 'Sullivan Rutherford Estate',
    embedUrl: 'https://cdn.jwplayer.com/players/bE41U3pF-O0V5rBgo.html',
    thumbnail: 'https://cdn.jwplayer.com/thumbs/bE41U3pF-720.jpg',
    description: 'Discover the story behind Sullivan Rutherford Estate and their commitment to excellence.',
    duration: 38,
    cta: {
      text: 'Inquire for Availability',
      url: 'https://sullivanwine.com/estate-experiences/'
    }
  },
  {
    id: 'oPFkkAfZ',
    winery: 'HALL Napa Valley',
    embedUrl: 'https://cdn.jwplayer.com/players/oPFkkAfZ-O0V5rBgo.html',
    thumbnail: 'https://cdn.jwplayer.com/thumbs/oPFkkAfZ-720.jpg',
    description: 'Explore the passion and tradition of HALL Napa Valley.',
    duration: 44,
    cta: {
      text: 'Come See Us!',
      url: 'https://www.hallwines.com/'
    }
  },
  {
    id: 'L6WSfCgB',
    winery: 'Whitehaven Wine Company',
    embedUrl: 'https://cdn.jwplayer.com/players/L6WSfCgB-O0V5rBgo.html',
    thumbnail: 'https://cdn.jwplayer.com/thumbs/L6WSfCgB-720.jpg',
    description: 'Learn about Whitehaven\'s innovative approach to winemaking.',
    duration: 49,
    cta: {
      text: 'Learn More',
      url: 'https://whitehavenwine.com'
    }
  },
  {
    id: 'kncdFPTD',
    winery: 'J Vineyards & Winery',
    embedUrl: 'https://cdn.jwplayer.com/players/kncdFPTD-O0V5rBgo.html',
    thumbnail: 'https://cdn.jwplayer.com/thumbs/kncdFPTD-720.jpg',
    description: 'Experience the unique terroir of J Vineyards & Winery.',
    duration: 46,
    cta: {
      text: '❤️ Follow Us',
      url: 'https://www.instagram.com/jwinery/'
    }
  },
  {
    id: 'FSUUFWTG',
    winery: 'Trefethen Family Vineyards',
    embedUrl: 'https://cdn.jwplayer.com/players/FSUUFWTG-O0V5rBgo.html',
    thumbnail: 'https://cdn.jwplayer.com/thumbs/FSUUFWTG-720.jpg',
    description: 'Discover the artistry behind Trefethen Family Vineyards.',
    duration: 43,
    cta: {
      text: '🛒 Buy This Wine',
      url: 'https://www.trefethen.com/'
    }
  }
];

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Handle URL parameters for direct video selection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const videoParam = urlParams.get('video');
      if (videoParam) {
        setSelectedVideo(videoParam);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            The Dirt
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300"
          >
            Individual Winery Stories
          </motion.p>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoData.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {/* Video Player */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={video.embedUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; fullscreen"
                />
              </div>
              
              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {video.winery}
                </h3>
                <p className="text-gray-300 mb-4">
                  {video.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">
                    Duration: {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.a
                    href={`/videos/${video.id}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-md transition-colors duration-200 font-semibold"
                  >
                    Watch Full Story
                  </motion.a>
                  {video.cta && (
                    <motion.a
                      href={video.cta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white text-center rounded-md transition-colors duration-200 font-semibold"
                    >
                      {video.cta.text}
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Back to Main Site */}
      <section className="py-16 px-4 text-center">
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
        >
          ← Back to Main Site
        </motion.a>
      </section>

      <Footer />
    </div>
  );
}
