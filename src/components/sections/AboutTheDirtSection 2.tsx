'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Video {
  id: string;
  mediaId: string;
  title: string;
  image: string;
  embedUrl: string;
}

const AboutTheDirtSection = () => {
  const [shuffledVideos, setShuffledVideos] = useState<Video[]>([]);
  const [currentMainVideo, setCurrentMainVideo] = useState<Video | null>(null);
  const [thumbnailVideos, setThumbnailVideos] = useState<Video[]>([]);

  // Video configuration with iframe URLs only
  const videos: Video[] = [
    {
      id: 'video1',
      mediaId: 'kncdFPTD',
      title: 'The-Dirt-Series J Vineyards 1080x1920',
      image: 'https://cdn.jwplayer.com/thumbs/kncdFPTD-720.jpg',
      embedUrl: 'https://cdn.jwplayer.com/players/kncdFPTD-O0V5rBgo.html'
    },
    {
      id: 'video2',
      mediaId: '2OKwwi9w',
      title: 'The-Dirt-Series Hall 1080x1920',
      image: 'https://cdn.jwplayer.com/thumbs/2OKwwi9w-720.jpg',
      embedUrl: 'https://cdn.jwplayer.com/players/2OKwwi9w-O0V5rBgo.html'
    },
    {
      id: 'video3',
      mediaId: 'FSUUFWTG',
      title: 'The-Dirt-Series Trefethen 1920x1080',
      image: 'https://cdn.jwplayer.com/thumbs/FSUUFWTG-720.jpg',
      embedUrl: 'https://cdn.jwplayer.com/players/FSUUFWTG-O0V5rBgo.html'
    },
    {
      id: 'video4',
      mediaId: 'UPdMdryM',
      title: 'The-Dirt-Series Sullivan 1080x1920',
      image: 'https://cdn.jwplayer.com/thumbs/UPdMdryM-720.jpg',
      embedUrl: 'https://cdn.jwplayer.com/players/UPdMdryM-O0V5rBgo.html'
    },
    {
      id: 'video5',
      mediaId: '7bnWKUei',
      title: 'The-Dirt-Series Trefethen 1080x1920',
      image: 'https://cdn.jwplayer.com/thumbs/7bnWKUei-720.jpg',
      embedUrl: 'https://cdn.jwplayer.com/players/7bnWKUei-O0V5rBgo.html'
    }
  ];

  const shuffleArray = (array: Video[]): Video[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const swapVideos = (newVideo: Video) => {
    // Find current positions
    const mainIndex = shuffledVideos.findIndex(v => v.id === currentMainVideo?.id);
    const newIndex = shuffledVideos.findIndex(v => v.id === newVideo.id);
    
    // Swap in array
    const newShuffled = [...shuffledVideos];
    [newShuffled[mainIndex], newShuffled[newIndex]] = [newShuffled[newIndex], newShuffled[mainIndex]];
    
    setShuffledVideos(newShuffled);
    setCurrentMainVideo(newVideo);
    setThumbnailVideos(newShuffled.slice(1));
  };

  useEffect(() => {
    // Initialize with iframe approach
    const shuffled = shuffleArray(videos);
    setShuffledVideos(shuffled);
    setCurrentMainVideo(shuffled[0]);
    setThumbnailVideos(shuffled.slice(1));
  }, []);

  useEffect(() => {
    if (currentMainVideo) {
      const backgroundCanvas = document.getElementById('backgroundCanvas') as HTMLElement;
      if (backgroundCanvas) {
        backgroundCanvas.style.backgroundImage = `url(${currentMainVideo.image})`;
      }
    }
  }, [currentMainVideo]);

  return (
    <section id="about" data-videos-section className="section-minimal bg-beige-light">
      <div className="container-minimal">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            className="font-light text-black mb-6 tracking-wide"
            style={{ fontSize: '2.5rem', lineHeight: '1.1' }}
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.1em" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Dig Into the Story Behind the Soil
          </motion.h2>
          
          <motion.p 
            className="text-black leading-relaxed font-light"
            style={{ fontSize: '1.25rem', lineHeight: '1.6' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Welcome to <em>The Dirt</em> — Wine Spectator's newest video series that brings wine lovers straight to the vineyard. Through quick, compelling vertical videos filmed by the winemakers themselves, we uncover how the soil beneath the vines shapes the character of every bottle.
          </motion.p>
        </motion.div>

        {/* Video Gallery */}
        {currentMainVideo && (
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
              {/* Main Player with Blur Background */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                {/* Background canvas with blur effect */}
                <div 
                  id="backgroundCanvas"
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${currentMainVideo.image})`,
                    filter: 'blur(40px) brightness(0.7)',
                    transform: 'scale(1.2)',
                    zIndex: 1
                  }}
                />
                
                {/* Iframe player */}
                <iframe 
                  src={currentMainVideo.embedUrl}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  style={{ zIndex: 2 }}
                  allowFullScreen
                />
              </div>

              {/* Thumbnails Below Main Player */}
              <div className="bg-gray-50 p-6">
                <div className="flex justify-center items-center video-thumbnails-mobile">
                  {/* Left scroll arrow (mobile only) */}
                  <button 
                    className="scroll-arrow-left hidden md:hidden"
                    onClick={() => {
                      const container = document.querySelector('.video-thumbnails-mobile');
                      if (container) {
                        container.scrollBy({ left: -220, behavior: 'smooth' });
                      }
                    }}
                  >
                    ←
                  </button>
                  
                  {thumbnailVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      className="relative cursor-pointer group flex-shrink-0 video-thumbnail-mobile"
                      style={{ 
                        width: '200px', 
                        height: '120px',
                        marginRight: index < thumbnailVideos.length - 1 ? '24px' : '0'
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => swapVideos(video)}
                    >
                      <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <img 
                          src={video.image} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <div className="w-0 h-0 border-l-6 border-l-gray-700 border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                          <p className="text-white text-sm font-medium truncate">{video.title}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Right scroll arrow (mobile only) */}
                  <button 
                    className="scroll-arrow-right hidden md:hidden"
                    onClick={() => {
                      const container = document.querySelector('.video-thumbnails-mobile');
                      if (container) {
                        container.scrollBy({ left: 220, behavior: 'smooth' });
                      }
                    }}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AboutTheDirtSection; 