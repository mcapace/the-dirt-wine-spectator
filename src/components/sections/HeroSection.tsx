'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="hero-minimal relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source 
          src="/videos/Create_a_video_202508261657.mp4" 
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      
      {/* Subtle overlay for better logo visibility */}
      <div 
        className="absolute inset-0 bg-black/15"
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
            src="/images/New Dirt logo-edit.png"
            alt="The Dirt Logo"
            className="mx-auto"
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: 'min(1000px, 90vw)',
              maxHeight: 'min(500px, 50vh)',
              filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4)) brightness(1.4) contrast(1.2) saturate(1.1)',
              WebkitFilter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4)) brightness(1.4) contrast(1.2) saturate(1.1)'
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