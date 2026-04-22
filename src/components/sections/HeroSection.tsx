'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const HERO_VIDEO_SRC = '/hero/hero-background.mp4';

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute('muted', '');
    el.setAttribute('playsinline', '');
    const p = el.play();
    if (p !== undefined) {
      p.catch(() => {
        /* autoplay blocked — user gesture may be required on some browsers */
      });
    }
  }, []);

  return (
    <section className="hero-minimal relative min-h-screen overflow-hidden">
      {/* Video lives under /hero/* (not /media — many blockers target /media/) */}
      <video
        ref={videoRef}
        src={HERO_VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="hero-bg-video absolute inset-0 z-0 h-full w-full min-h-full min-w-full object-cover"
        aria-hidden
      />

      {/* Subtle overlay for better logo visibility */}
      <div
        className="absolute inset-0 z-[1] bg-black/15"
        style={{ backdropFilter: 'blur(0.3px)' }}
      />
      
      {/* Centered Logo with proper fade-in */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 2, 
            delay: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-center"
        >
          <motion.img
            src="/Logos/TheDirtLOGO.png"
            alt="The Dirt"
            className="mx-auto"
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: 'min(1040px, 92vw)',
              maxHeight: 'min(560px, 54vh)',
              filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.35))',
              WebkitFilter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.35))'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 1.5, 
              delay: 1.2,
              ease: "easeOut"
            }}
          />
        </motion.div>
      </div>
      
      {/* Scroll indicator - positioned at bottom */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div 
          className="w-px h-16 bg-white/60"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection; 