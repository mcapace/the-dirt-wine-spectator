'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const wineries = [
  {
    id: 1,
    name: 'Sullivan',
    logo: '/Logos/SRE Logo.png',
    website: 'https://sullivanwine.com/',
    social: {
      instagram: 'https://www.instagram.com/sullivan.rutherford.estate',
      facebook: 'https://www.facebook.com/SullivanRutherfordEstateWinery'
    }
  },
  {
    id: 2,
    name: 'Trefethen',
    logo: '/Logos/TFV - Gray.png',
    website: 'https://www.trefethen.com/',
    social: {
      instagram: 'https://www.instagram.com/trefethenfamily/',
      facebook: 'https://www.facebook.com/trefethenfamily'
    }
  },
  {
    id: 3,
    name: 'HALL',
    logo: '/Logos/HALL Napa Valley Logo - Red.png',
    website: 'https://www.hallwines.com/',
    social: {
      instagram: 'https://www.instagram.com/hallwines/',
      facebook: 'https://www.facebook.com/hallwines'
    }
  },
  {
    id: 4,
    name: 'J Vineyards',
    logo: '/Logos/JVW_Primary_Logo_Yellow.png',
    website: 'https://www.jwine.com/',
    social: {
      instagram: 'https://www.instagram.com/jwinery/',
      facebook: 'https://www.facebook.com/JWinery'
    }
  },
  {
    id: 5,
    name: 'Whitehaven',
    logo: '/Logos/WHV_Logo_2019-removebg-preview.png',
    website: 'https://www.whitehavenwine.com/',
    social: {
      instagram: 'https://www.instagram.com/whitehaven/?hl=en',
      facebook: 'https://www.facebook.com/whitehavenwine/'
    }
  }
];

const FeaturedWineriesSection = () => {
  const [selectedWinery, setSelectedWinery] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWineryClick = (winery: any) => {
    console.log('Winery clicked:', winery.name);
    setSelectedWinery(winery);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
    setSelectedWinery(null);
  };

  return (
    <>
      <motion.section 
        id="wineries"
        className="bg-beige-light py-1 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Background texture and connecting elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-[#98231f] to-transparent" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-32 bg-gradient-to-t from-transparent via-[#98231f] to-transparent" />
        </div>
        <div className="container-minimal">
          <motion.div 
            className="section-header text-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.h2 
              className="section-title mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              FEATURED WINERIES
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-transparent via-[#98231f] to-transparent mx-auto mb-4"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.p 
              className="section-subtitle"
              style={{ fontSize: '1.5rem', fontWeight: 500, marginTop: '1rem' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              From the Ground Up: Stories That Start in the Soil
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="text-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.p 
              className="text-gray-700 max-w-4xl mx-auto leading-relaxed"
              style={{ fontSize: '1.25rem', lineHeight: '1.8' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Get to know the wineries bringing <em className="text-[#98231f] font-semibold">The Dirt</em> to life. Each of these trailblazing producers invites you behind the scenes of their vineyards — offering a rare look at how soil, climate, and craftsmanship come together in every bottle. These aren't just wines; they're stories rooted in place, passion, and authenticity.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-5 gap-4 lg:gap-6 winery-grid-mobile mb-2"
            initial="hidden"
            whileInView="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {wineries.map((winery, index) => (
              <motion.div
                key={winery.id}
                className="winery-card wine-card-glass cursor-pointer group"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleWineryClick(winery)}
                style={{
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(152, 35, 31, 0.15) 0%, transparent 70%)',
                    filter: 'blur(20px)'
                  }}
                />
                
                <motion.div
                  className="wine-image relative z-10"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <div className="h-full w-auto flex items-center justify-center">
                    <div className="text-center">
                      <Image
                        src={winery.logo}
                        alt={`${winery.name} Logo`}
                        width={80}
                        height={80}
                        className="w-auto h-16 object-contain mx-auto mb-2 transition-all duration-300 group-hover:drop-shadow-lg"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </div>
                  </div>
                </motion.div>
                
                {/* Subtle shine effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                    transform: 'translateX(-100%)'
                  }}
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Modal */}
      {isModalOpen && selectedWinery && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'rgba(0,0,0,0.4)', 
            backdropFilter: 'blur(20px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={closeModal}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ 
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(40px) saturate(180%)',
              padding: '30px', 
              borderRadius: '20px',
              maxWidth: '400px',
              width: '100%',
              height: 'auto',
              minHeight: '300px',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: 
                '0 40px 80px rgba(0, 0, 0, 0.4), ' +
                '0 0 0 1px rgba(255, 255, 255, 0.3), ' +
                'inset 0 1px 0 rgba(255, 255, 255, 0.4)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={closeModal}
              style={{ 
                position: 'absolute',
                top: '10px',
                right: '15px',
                width: '40px',
                height: '40px',
                background: 'rgba(152, 35, 31, 0.9)',
                backdropFilter: 'blur(20px) saturate(150%)',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                fontSize: '24px',
                cursor: 'pointer',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: 
                  '0 8px 32px rgba(152, 35, 31, 0.4), ' +
                  'inset 0 1px 0 rgba(255, 255, 255, 0.3), ' +
                  'inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
                zIndex: 1000
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.15)';
                e.currentTarget.style.background = 'rgba(152, 35, 31, 1)';
                e.currentTarget.style.boxShadow = 
                  '0 12px 40px rgba(152, 35, 31, 0.6), ' +
                  'inset 0 1px 0 rgba(255, 255, 255, 0.4), ' +
                  'inset 0 -1px 0 rgba(0, 0, 0, 0.15), ' +
                  '0 0 20px rgba(152, 35, 31, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'rgba(152, 35, 31, 0.9)';
                e.currentTarget.style.boxShadow = 
                  '0 8px 32px rgba(152, 35, 31, 0.4), ' +
                  'inset 0 1px 0 rgba(255, 255, 255, 0.3), ' +
                  'inset 0 -1px 0 rgba(0, 0, 0, 0.2)';
              }}
            >
              ×
            </button>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '200px'
            }}>
              {/* Logo Only */}
              <div style={{ 
                textAlign: 'center',
                padding: '15px',
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(20px) saturate(150%)',
                boxShadow: 
                  '0 8px 32px rgba(0, 0, 0, 0.1), ' +
                  'inset 0 1px 0 rgba(255, 255, 255, 0.5), ' +
                  'inset 0 -1px 0 rgba(0, 0, 0, 0.05)'
              }}>
                <img 
                  src={selectedWinery.logo} 
                  alt={`${selectedWinery.name} Logo`}
                  style={{ 
                    height: '80px', 
                    width: 'auto', 
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
                  }}
                />
              </div>
              
              {/* Icon Links - Just Icons */}
              <div style={{ 
                display: 'flex', 
                gap: '15px',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {/* Website Link */}
                <a 
                  href={selectedWinery.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.8)',
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
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                  }}
                >
                  <img 
                    src="/Icons/web icon.png" 
                    alt="Website" 
                    style={{ width: '24px', height: '24px', filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}
                  />
                </a>
                
                {/* Instagram Link */}
                <a 
                  href={selectedWinery.social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.8)',
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
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                  }}
                >
                  <img 
                    src="/Icons/IG icon.png" 
                    alt="Instagram" 
                    style={{ width: '24px', height: '24px' }}
                  />
                </a>
                
                {/* Facebook Link */}
                <a 
                  href={selectedWinery.social.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.8)',
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
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                  }}
                >
                  <img 
                    src="/Icons/FB icon.png" 
                    alt="Facebook" 
                    style={{ width: '24px', height: '24px' }}
                  />
                </a>
              </div>
              </div>
            </motion.div>
          </motion.div>
      )}
    </>
  );
};

export default FeaturedWineriesSection; 