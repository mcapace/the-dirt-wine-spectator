'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation/Navbar';
import Footer from '@/components/Footer/Footer';

const JVineyardsPage = () => {
  const [showCTA, setShowCTA] = useState(false);
  const ctaTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Setup CTA timer - show CTA 15 seconds before video ends (46s duration)
  useEffect(() => {
    if (ctaTimerRef.current) {
      clearTimeout(ctaTimerRef.current);
    }
    
    setShowCTA(false);

    // Show CTA 15 seconds before the end (at 31 seconds)
    const ctaDelay = (46 - 15) * 1000; // 31 seconds
    
    console.log(`J Vineyards video (46s), CTA appears at: ${ctaDelay/1000}s`);
    
    ctaTimerRef.current = setTimeout(() => {
      console.log(`Showing CTA for J Vineyards`);
      setShowCTA(true);
    }, ctaDelay);

    return () => {
      if (ctaTimerRef.current) {
        clearTimeout(ctaTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-32 pb-16" style={{ paddingTop: '300px' }}>
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 style={{ 
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
                fontWeight: 600,
                marginTop: '4rem',
                marginBottom: '1.5rem',
                color: '#000',
                letterSpacing: '0.5px',
                fontFamily: 'var(--font-primary)',
                lineHeight: '1.2',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                position: 'relative',
                zIndex: 1
              }}>
                J Vineyards & Winery
              </h1>
              <p style={{ 
                fontSize: '1.25rem', 
                lineHeight: '1.7',
                fontWeight: 500,
                color: '#333',
                maxWidth: '900px',
                margin: '0 auto',
                fontFamily: 'var(--font-primary)'
              }}>
                Discover the elegance and sophistication of J Vineyards & Winery, where tradition meets innovation in the heart of Russian River Valley.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Video Player Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Video Player */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <div style={{position:'relative',overflow:'hidden',paddingBottom:'56.25%'}}>
                  <iframe 
                    src="https://cdn.jwplayer.com/players/kncdFPTD-O0V5rBgo.html" 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="auto" 
                    title="The-Dirt-Series J Vineyards 1080x1920 C03 (1)" 
                    style={{position:'absolute'}} 
                    allowFullScreen
                  />
                  
                  {/* CTA Button - Positioned inside video frame */}
                  {showCTA && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        position: 'absolute',
                        bottom: '60px',
                        left: '0',
                        right: '0',
                        display: 'flex',
                        justifyContent: 'center',
                        zIndex: 10,
                        pointerEvents: 'none'
                      }}
                    >
                      <a
                        href="https://www.instagram.com/jwinery/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open('https://www.instagram.com/jwinery/', '_blank', 'noopener,noreferrer');
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
                          pointerEvents: 'auto',
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
                        ❤️ Follow Us
                      </a>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Video Info */}
              <div className="mt-8 text-center">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  J Vineyards & Winery
                </h2>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Experience the artistry and passion behind J Vineyards' exceptional wines. 
                  This 46-second journey showcases their commitment to crafting world-class Pinot Noir and Chardonnay.
                </p>
                
                {/* CTA Button */}
                <motion.a
                  href="https://www.instagram.com/jwinery/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ❤️ Follow Us
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Links Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 600,
                marginBottom: '2rem',
                color: '#000',
                letterSpacing: '0.5px',
                fontFamily: 'var(--font-primary)'
              }}>
                Connect with J Vineyards & Winery
              </h3>
              
              <div className="flex justify-center items-center gap-6">
                {/* Website Link */}
                <a 
                  href="https://www.jwine.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '50%',
                    textDecoration: 'none',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                  }}
                >
                  <img 
                    src="/Logos/Web logo.png" 
                    alt="Website" 
                    style={{ width: '28px', height: '28px', filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}
                  />
                </a>
                
                {/* Instagram Link */}
                <a 
                  href="https://www.instagram.com/jwinery/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '50%',
                    textDecoration: 'none',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                  }}
                >
                  <img 
                    src="/Logos/IG logo.png" 
                    alt="Instagram" 
                    style={{ width: '28px', height: '28px' }}
                  />
                </a>
                
                {/* Facebook Link */}
                <a 
                  href="https://www.facebook.com/JWinery" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '50%',
                    textDecoration: 'none',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                  }}
                >
                  <img 
                    src="/Logos/FB logo.png" 
                    alt="Facebook" 
                    style={{ width: '28px', height: '28px' }}
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Back to Main Site */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.a
              href="/"
              className="inline-block text-gray-400 hover:text-white transition-colors duration-300 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              ← Back to Main Site
            </motion.a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JVineyardsPage;
