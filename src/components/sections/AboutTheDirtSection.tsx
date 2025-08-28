'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Video {
  id: string;
  mediaId: string;
  title: string;
  winery: string;
  duration: number;
  thumbnail: string;
  embedUrl: string;
  cta?: {
    text: string;
    url: string;
  };
}

const AboutTheDirtSection = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ctaTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Video configuration
  const videoData: Video[] = [
    {
      id: 'bE41U3pF',
      mediaId: 'bE41U3pF',
      title: 'Sullivan',
      winery: 'Sullivan Rutherford Estate',
      duration: 38,
      thumbnail: 'https://cdn.jwplayer.com/thumbs/bE41U3pF-720.jpg',
      embedUrl: 'https://cdn.jwplayer.com/players/bE41U3pF-O0V5rBgo.html',
      cta: {
        text: 'Inquire for Availability',
        url: 'https://sullivanwine.com/estate-experiences/'
      }
    },
    {
      id: 'oPFkkAfZ',
      mediaId: 'oPFkkAfZ',
      title: 'HALL',
      winery: 'HALL Napa Valley',
      duration: 44,
      thumbnail: 'https://cdn.jwplayer.com/thumbs/oPFkkAfZ-720.jpg',
      embedUrl: 'https://cdn.jwplayer.com/players/oPFkkAfZ-O0V5rBgo.html',
      cta: {
        text: 'Come See Us!',
        url: 'https://www.hallwines.com/'
      }
    },
    {
      id: 'L6WSfCgB',
      mediaId: 'L6WSfCgB',
      title: 'Whitehaven',
      winery: 'Whitehaven Wine',
      duration: 49,
      thumbnail: 'https://cdn.jwplayer.com/thumbs/L6WSfCgB-720.jpg',
      embedUrl: 'https://cdn.jwplayer.com/players/L6WSfCgB-O0V5rBgo.html',
      cta: {
        text: 'Learn More',
        url: 'https://whitehavenwine.com'
      }
    },
    {
      id: 'kncdFPTD',
      mediaId: 'kncdFPTD',
      title: 'J Vineyards',
      winery: 'J Vineyards & Winery',
      duration: 46,
      thumbnail: 'https://cdn.jwplayer.com/thumbs/kncdFPTD-720.jpg',
      embedUrl: 'https://cdn.jwplayer.com/players/kncdFPTD-O0V5rBgo.html',
      cta: {
        text: '❤️ Follow Us',
        url: 'https://www.instagram.com/jwinery/'
      }
    },
    {
      id: 'FSUUFWTG',
      mediaId: 'FSUUFWTG',
      title: 'Trefethen',
      winery: 'Trefethen Family Vineyards',
      duration: 43,
      thumbnail: 'https://cdn.jwplayer.com/thumbs/FSUUFWTG-720.jpg',
      embedUrl: 'https://cdn.jwplayer.com/players/FSUUFWTG-O0V5rBgo.html',
      cta: {
        text: '🛒 Buy This Wine',
        url: 'https://www.trefethen.com/'
      }
    }
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);



  // Shuffle videos on mount
  useEffect(() => {
    const shuffled = [...videoData].sort(() => Math.random() - 0.5);
    setVideos(shuffled);
    setCurrentVideoIndex(0);
  }, []);

  // Setup CTA timer
  useEffect(() => {
    if (ctaTimerRef.current) {
      clearTimeout(ctaTimerRef.current);
    }
    
    setShowCTA(false);

    const currentVideo = videos[currentVideoIndex];
    
    if (currentVideo?.cta && !isTransitioning) {
      // Show CTA in the last 5 seconds of the video
      const ctaDelay = Math.max((currentVideo.duration - 5), currentVideo.duration * 0.8) * 1000;
      
      console.log(`Video: ${currentVideo.winery} (${currentVideo.duration}s), CTA appears at: ${ctaDelay/1000}s`);
      
      ctaTimerRef.current = setTimeout(() => {
        console.log(`Showing CTA for ${currentVideo.winery}`);
        setShowCTA(true);
      }, ctaDelay);
    }

    return () => {
      if (ctaTimerRef.current) {
        clearTimeout(ctaTimerRef.current);
      }
    };
  }, [currentVideoIndex, videos, isTransitioning]);

  // Full-screen function for mobile
  const enterFullScreen = () => {
    console.log('Entering full screen mode');
    setIsMobileExpanded(true);
  };

  const switchToVideo = (index: number) => {
    if (isTransitioning || index === currentVideoIndex) return;
    
    setIsTransitioning(true);
    setShowCTA(false);
    
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setCurrentVideoIndex(index);
      setIsTransitioning(false);
    }, 100);
  };

  if (videos.length === 0) return null;

  const currentVideo = videos[currentVideoIndex];
  const otherVideos = videos.filter((_, idx) => idx !== currentVideoIndex);

  return (
    <section id="about" className="section-minimal bg-beige-light">
      <div className="container-minimal">
        {/* Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 style={{ 
            fontSize: '3rem', 
            fontWeight: 300,
            marginBottom: '1rem',
            color: '#000',
            letterSpacing: '0.5px'
          }}>
            Dig Into the Story Behind the Soil
          </h2>
          
          <p style={{ 
            fontSize: '1.25rem', 
            lineHeight: '1.7',
            fontWeight: 300,
            color: '#333',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            Welcome to <em>The Dirt</em> — where passionate winemakers take you deep into their vineyards 
            to reveal how the unique soil beneath each vine shapes the character and soul of their wines. 
            Grab a glass and discover the stories that make every bottle extraordinary.
          </p>
        </motion.div>

        {/* Video Player */}
        <div className={isMobile && isMobileExpanded ? '' : 'max-w-6xl mx-auto px-4 sm:px-0'}>
          <div style={{
            backgroundColor: isMobile && isMobileExpanded ? '#000' : 'white',
            borderRadius: isMobile && isMobileExpanded ? '0' : '12px',
            overflow: 'hidden',
            boxShadow: isMobile && isMobileExpanded ? 'none' : '0 20px 60px rgba(0, 0, 0, 0.15)',
            position: isMobile && isMobileExpanded ? 'fixed' : 'relative',
            top: isMobile && isMobileExpanded ? '0' : 'auto',
            left: isMobile && isMobileExpanded ? '0' : 'auto',
            right: isMobile && isMobileExpanded ? '0' : 'auto',
            bottom: isMobile && isMobileExpanded ? '0' : 'auto',
            zIndex: isMobile && isMobileExpanded ? 9999 : 'auto',
            width: isMobile && isMobileExpanded ? '100vw' : '100%',
            height: isMobile && isMobileExpanded ? '100vh' : 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Main Video with Blur Effect */}
            <div style={{ 
              position: 'relative',
              width: '100%',
              paddingBottom: isMobile && isMobileExpanded ? '0' : '56.25%',
              height: isMobile && isMobileExpanded ? '100%' : 'auto',
              backgroundColor: '#000',
              overflow: 'hidden',
              flex: isMobile && isMobileExpanded ? 1 : 'none'
            }}>
              {/* Blurred Background */}
              <div style={{
                position: 'absolute',
                top: '-20%',
                left: '-20%',
                width: '140%',
                height: '140%',
                backgroundImage: `url(${currentVideo.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(80px) brightness(0.4) saturate(1.2)',
                zIndex: 1,
                transform: 'scale(1.2)'
              }} />

              {/* Video Container */}
                <div 
                  onClick={() => {
                    console.log('Video container clicked, isMobile:', isMobile, 'isMobileExpanded:', isMobileExpanded);
                    if (isMobile && !isMobileExpanded) {
                      console.log('Entering full screen');
                      enterFullScreen();
                    }
                  }}
                  style={{
                    position: isMobile && isMobileExpanded ? 'fixed' : 'absolute',
                    top: isMobile && isMobileExpanded ? '0' : '50%',
                    left: isMobile && isMobileExpanded ? '0' : '50%',
                    transform: isMobile && isMobileExpanded ? 'none' : 'translate(-50%, -50%)',
                    width: isMobile && isMobileExpanded ? '100vw' : '95%',
                    maxWidth: isMobile && isMobileExpanded ? '100vw' : '900px',
                    aspectRatio: isMobile && isMobileExpanded ? 'auto' : '16/9',
                    height: isMobile && isMobileExpanded ? '100vh' : 'auto',
                    zIndex: isMobile && isMobileExpanded ? 9999 : 2,
                    cursor: isMobile && !isMobileExpanded ? 'pointer' : 'default'
                  }}
                >
                {/* Video iFrame */}
                <iframe
                  key={currentVideo.id}
                  src={`${currentVideo.embedUrl}?autostart=true&automute=true&mute=true&controls=true&stretching=uniform&repeat=false&displaytitle=false&displaydescription=false&aspectratio=16:9&playsinline=1&preload=auto`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    boxShadow: isMobile && isMobileExpanded ? 'none' : '0 10px 40px rgba(0,0,0,0.5)',
                    opacity: isTransitioning ? 0 : 1,
                    transition: 'opacity 0.3s ease'
                  }}
                  allowFullScreen
                  allow="autoplay *; fullscreen *; encrypted-media *; picture-in-picture *"
                  title={currentVideo.winery}
                />

                {/* Mobile Play Button Overlay */}
                {isMobile && !isMobileExpanded && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      console.log('Play button clicked, entering full screen');
                      enterFullScreen();
                    }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '80px',
                      height: '80px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      cursor: 'pointer',
                      pointerEvents: 'auto'
                    }}
                  >
                    <div style={{
                      width: 0,
                      height: 0,
                      borderLeft: '24px solid white',
                      borderTop: '14px solid transparent',
                      borderBottom: '14px solid transparent',
                      marginLeft: '6px'
                    }} />
                  </div>
                )}

                {/* Mobile Close Button */}
                {isMobile && isMobileExpanded && (
                  <button
                    onClick={() => setIsMobileExpanded(false)}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      width: '40px',
                      height: '40px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      fontSize: '20px',
                      cursor: 'pointer',
                      zIndex: 10000,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
          </div>

            {/* CTA Button - Below Video */}
            {showCTA && currentVideo.cta && !isTransitioning && (!isMobile || !isMobileExpanded) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: isMobile && isMobileExpanded ? '16px' : '24px 0',
                  backgroundColor: 'white',
                  position: isMobile && isMobileExpanded ? 'absolute' : 'relative',
                  bottom: isMobile && isMobileExpanded ? '0' : 'auto',
                  left: isMobile && isMobileExpanded ? '0' : 'auto',
                  right: isMobile && isMobileExpanded ? '0' : 'auto',
                  zIndex: isMobile && isMobileExpanded ? 1001 : 'auto',
                  boxShadow: isMobile && isMobileExpanded ? '0 -2px 10px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <a
                  href={currentVideo.cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentVideo.cta) {
                      window.open(currentVideo.cta.url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#98231f',
                    color: 'white',
                    padding: '16px 36px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '18px',
                    boxShadow: '0 10px 40px rgba(152, 35, 31, 0.6)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    border: '2px solid rgba(255,255,255,0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    background: 'linear-gradient(135deg, #98231f 0%, #b42924 100%)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 15px 50px rgba(152, 35, 31, 0.7)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(152, 35, 31, 0.6)';
                  }}
                >
                  {currentVideo.cta.text}
                </a>
              </motion.div>
            )}

            {/* Thumbnail Gallery */}
            {(!isMobile || !isMobileExpanded) && (
            <div style={{ 
              backgroundColor: '#f8f8f8',
              padding: '16px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '12px',
                maxWidth: '100%',
                margin: '0 auto'
              }}>
                {otherVideos.map((video) => {
                  const videoIndex = videos.indexOf(video);
                  return (
                    <motion.button
                      key={video.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isTransitioning}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{
                        cursor: isTransitioning ? 'wait' : 'pointer',
                        width: '100%',
                        position: 'relative',
                        border: 'none',
                        padding: 0,
                        background: 'none',
                        opacity: isTransitioning ? 0.7 : 1,
                        transition: 'opacity 0.3s ease'
                      }}
                      onClick={() => {
                        console.log('Thumbnail clicked, isMobile:', isMobile);
                        if (isMobile) {
                          // On mobile, switch video and go to full-screen overlay
                          console.log('Switching video and going full-screen');
                          switchToVideo(videoIndex);
                          setTimeout(() => {
                            console.log('Setting isMobileExpanded to true');
                            setIsMobileExpanded(true);
                          }, 200); // Small delay to ensure video is loaded
                        } else {
                          // On desktop, just switch video
                          switchToVideo(videoIndex);
                        }
                      }}
                    >
                      <div style={{
                        position: 'relative',
                        paddingBottom: '56.25%',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}>
                        <img 
                          src={video.thumbnail}
                          alt={video.winery}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            // Custom positioning for each video to keep faces visible
                            objectPosition: 
                              video.id === 'bE41U3pF' ? 'center 40%' :  // Sullivan - show more middle
                              video.id === 'oPFkkAfZ' ? 'center 30%' :  // HALL - show more top
                              video.id === 'L6WSfCgB' ? 'center 45%' :  // Whitehaven - centered
                              video.id === 'kncdFPTD' ? 'center 42%' :  // J Vineyards - show more top
                              video.id === 'FSUUFWTG' ? 'center 38%' :  // Trefethen - show more top
                              'center center'
                          }}
                        />
                        
                        {/* Overlay */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.4) 100%)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          padding: '8px'
                        }}>
                          {/* Play Button */}
                          <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1
                          }}>
                            <div style={{
                              width: '56px',
                              height: '56px',
                              backgroundColor: 'rgba(255,255,255,0.9)',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                            }}>
                              <div style={{
                                width: 0,
                                height: 0,
                                borderLeft: '16px solid #333',
                                borderTop: '10px solid transparent',
                                borderBottom: '10px solid transparent',
                                marginLeft: '4px'
                              }} />
                            </div>
                          </div>
                          
                          {/* Title */}
                          <p style={{
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: 600,
                            lineHeight: 1.2,
                            textAlign: 'center',
                            margin: 0,
                            padding: '4px 2px',
                            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word'
                          }}>
                            {video.winery}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
            )}
          </div>
        </div>
      </div>


    </section>
  );
};

export default AboutTheDirtSection; 