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
      mediaId: 'L6WSfCgB',
      title: 'The-Dirt-Series Whitehaven 1080x1920',
      image: 'https://cdn.jwplayer.com/thumbs/L6WSfCgB-720.jpg',
      embedUrl: 'https://cdn.jwplayer.com/players/L6WSfCgB-O0V5rBgo.html'
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
    // Check for video parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const videoParam = urlParams.get('video');
    
    let initialVideos = shuffleArray(videos);
    
    if (videoParam) {
      const targetVideo = videos.find(v => v.id === videoParam);
      if (targetVideo) {
        // Move target video to first position
        const filtered = initialVideos.filter(v => v.id !== videoParam);
        initialVideos = [targetVideo, ...filtered];
      }
    }
    
    setShuffledVideos(initialVideos);
    setCurrentMainVideo(initialVideos[0]);
    setThumbnailVideos(initialVideos.slice(1));
  }, []);

  useEffect(() => {
    if (currentMainVideo) {
      const backgroundCanvas = document.getElementById('backgroundCanvas') as HTMLElement;
      if (backgroundCanvas) {
        backgroundCanvas.style.backgroundImage = `url(${currentMainVideo.image})`;
      }
      
      // Force autoplay after iframe loads
      setTimeout(() => {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          try {
            // Try multiple autoplay approaches
            iframe.contentWindow?.postMessage(JSON.stringify({
              method: 'play'
            }), '*');
            
            iframe.contentWindow?.postMessage(JSON.stringify({
              method: 'load',
              params: {
                file: currentMainVideo.embedUrl,
                autostart: true
              }
            }), '*');
            
            // Try JW Player specific autoplay
            iframe.contentWindow?.postMessage(JSON.stringify({
              method: 'setConfig',
              params: {
                autostart: true,
                mute: true
              }
            }), '*');
            
            // Also try clicking the play button programmatically
            setTimeout(() => {
              const playButton = iframe.contentDocument?.querySelector('.jw-icon-playback');
              if (playButton) {
                (playButton as HTMLElement).click();
              }
            }, 500);
            
          } catch (e) {
            console.log('Autoplay message sent');
          }
        }
      }, 2000);
    }
  }, [currentMainVideo]);

  return (
    <section id="about" data-videos-section className="section-minimal bg-beige-light">
      <div className="container-minimal">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            className="font-light text-black mb-4 tracking-wide"
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
            Welcome to <em>The Dirt</em> — Wine Spectator invited winemakers to grab a bottle and their phone, head into the vineyard, and show you how the soil beneath the vines shapes the character of their wine. Watch the videos and expand your Wine IQ!
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
                  key={currentMainVideo.id}
                  src={`${currentMainVideo.embedUrl}?autostart=true&muted=true&controls=true&rel=0&playsinline=true&preload=auto&repeat=0&stretching=uniform`}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  style={{ zIndex: 2 }}
                  allowFullScreen
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  loading="eager"
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
                        width: '280px', 
                        height: '168px',
                        marginRight: index < thumbnailVideos.length - 1 ? '20px' : '0'
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
                          style={{ 
                            objectPosition: video.id === 'video2' ? 'center 25%' : 
                                       video.id === 'video1' ? 'center 60%' :
                                       video.id === 'video3' ? 'center 40%' :
                                       video.id === 'video4' ? 'center 30%' :
                                       video.id === 'video5' ? 'center 35%' : 'center center'
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <div className="w-0 h-0 border-l-8 border-l-gray-700 border-t-5 border-t-transparent border-b-5 border-b-transparent ml-1"></div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
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