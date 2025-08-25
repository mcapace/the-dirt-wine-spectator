'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const wineries = [
  {
    id: 1,
    name: 'SRE Wines',
    logo: '/Logos/SRE Logo.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    website: 'https://srewines.com',
    contact: 'info@srewines.com',
    phone: '+1 (555) 123-4567',
    social: {
      instagram: 'https://instagram.com/srewines',
      facebook: 'https://facebook.com/srewines',
      twitter: 'https://twitter.com/srewines'
    }
  },
  {
    id: 2,
    name: 'TFV Wines',
    logo: '/Logos/TFV - Gray.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    website: 'https://tfvwines.com',
    contact: 'info@tfvwines.com',
    phone: '+1 (555) 234-5678',
    social: {
      instagram: 'https://instagram.com/tfvwines',
      facebook: 'https://facebook.com/tfvwines',
      twitter: 'https://twitter.com/tfvwines'
    }
  },
  {
    id: 3,
    name: 'HALL Napa Valley',
    logo: '/Logos/HALL Napa Valley Logo - Red.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    website: 'https://hallwines.com',
    contact: 'info@hallwines.com',
    phone: '+1 (555) 345-6789',
    social: {
      instagram: 'https://instagram.com/hallwines',
      facebook: 'https://facebook.com/hallwines',
      twitter: 'https://twitter.com/hallwines'
    }
  },
  {
    id: 4,
    name: 'JVW Wines',
    logo: '/Logos/JVW_Primary_Logo_Yellow.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    website: 'https://jvwwines.com',
    contact: 'info@jvwwines.com',
    phone: '+1 (555) 456-7890',
    social: {
      instagram: 'https://instagram.com/jvwwines',
      facebook: 'https://facebook.com/jvwwines',
      twitter: 'https://twitter.com/jvwwines'
    }
  },
  {
    id: 5,
    name: 'Whitehaven',
    logo: '/Logos/WHV_Logo_2019-removebg-preview.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    website: 'https://whitehaven.co.nz',
    contact: 'info@whitehaven.co.nz',
    phone: '+64 3 520 6215',
    social: {
      instagram: 'https://instagram.com/whitehavenwines',
      facebook: 'https://facebook.com/whitehavenwines',
      twitter: 'https://twitter.com/whitehavenwines'
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
        className="section-minimal bg-beige-light py-32 relative overflow-hidden"
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
            className="section-header text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 
              className="section-title mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              FEATURED WINERIES
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-transparent via-[#98231f] to-transparent mx-auto mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.p 
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              From the Ground Up: Stories That Start in the Soil
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p 
              className="text-gray-700 max-w-4xl mx-auto leading-relaxed"
              style={{ fontSize: '1.25rem', lineHeight: '1.8' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Get to know the wineries bringing <em className="text-[#98231f] font-semibold">The Dirt</em> to life. Each of these trailblazing producers invites you behind the scenes of their vineyards — offering a rare look at how soil, climate, and craftsmanship come together in every bottle. These aren't just wines; they're stories rooted in place, passion, and authenticity.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-5 gap-6 lg:gap-8 winery-grid-mobile"
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
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  transition: { duration: 0.4, ease: "easeOut" }
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
                    scale: 1.12,
                    transition: { duration: 0.4, ease: "easeOut" }
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
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(40px) saturate(180%)',
              padding: '40px', 
              borderRadius: '24px',
              maxWidth: '800px',
              width: '100%',
              height: '70vh',
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
                top: '15px',
                right: '20px',
                width: '60px',
                height: '60px',
                background: 'rgba(152, 35, 31, 0.9)',
                backdropFilter: 'blur(20px) saturate(150%)',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                fontSize: '36px',
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
              gap: '30px',
              height: 'calc(70vh - 120px)',
              overflowY: 'auto',
              paddingRight: '10px',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(152, 35, 31, 0.4) transparent'
            }}
            className="modal-scroll-container">
              {/* Logo and Name */}
              <div style={{ 
                textAlign: 'center',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '20px',
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
                    height: '90px', 
                    width: 'auto', 
                    marginBottom: '25px',
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
                  }}
                />
                <h2 style={{ 
                  fontSize: '32px', 
                  fontWeight: 'bold', 
                  color: '#333',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  margin: '0'
                }}>
                  {selectedWinery.name}
                </h2>
              </div>
              
              {/* Content */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '25px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(15px) saturate(140%)',
                boxShadow: 
                  '0 4px 20px rgba(0, 0, 0, 0.08), ' +
                  'inset 0 1px 0 rgba(255, 255, 255, 0.4), ' +
                  'inset 0 -1px 0 rgba(0, 0, 0, 0.03)'
              }}>
                <h3 style={{ 
                  fontSize: '26px', 
                  marginBottom: '20px', 
                  color: '#333',
                  fontWeight: '600',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                }}>
                  Connect with {selectedWinery.name}
                </h3>
                <div style={{ 
                  lineHeight: '1.6', 
                  color: '#555', 
                  marginBottom: '20px',
                  fontSize: '16px'
                }}>
                  <p style={{ marginBottom: '15px' }}>
                    Discover more about {selectedWinery.name}'s unique terroir and winemaking philosophy. Visit their website and follow them on social media to stay connected with their latest releases and vineyard stories.
                  </p>
                </div>
              </div>
              
              {/* Contact Information */}
              <div style={{ 
                borderTop: '2px solid rgba(152, 35, 31, 0.2)', 
                paddingTop: '25px',
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '16px',
                padding: '25px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(15px) saturate(140%)',
                boxShadow: 
                  '0 4px 20px rgba(0, 0, 0, 0.06), ' +
                  'inset 0 1px 0 rgba(255, 255, 255, 0.3), ' +
                  'inset 0 -1px 0 rgba(0, 0, 0, 0.02)'
              }}>
                <h4 style={{ 
                  fontSize: '22px', 
                  marginBottom: '20px', 
                  color: '#333',
                  fontWeight: '600',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                }}>
                  Contact Information
                </h4>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                  gap: '18px', 
                  marginBottom: '25px' 
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(10px) saturate(150%)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  }}>
                    <img 
                      src="/Logos/Web logo.png" 
                      alt="Website" 
                      style={{ width: '22px', height: '22px', filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}
                    />
                    <a href={selectedWinery.website} target="_blank" rel="noopener noreferrer" 
                       style={{ 
                         color: '#0066cc', 
                         textDecoration: 'none',
                         fontWeight: '500',
                         fontSize: '15px'
                       }}>
                      {selectedWinery.website}
                    </a>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(10px) saturate(150%)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  }}>
                    <img 
                      src="/Logos/Email logo.png" 
                      alt="Email" 
                      style={{ width: '22px', height: '22px', filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}
                    />
                    <a href={`mailto:${selectedWinery.contact}`} 
                       style={{ 
                         color: '#0066cc', 
                         textDecoration: 'none',
                         fontWeight: '500',
                         fontSize: '15px'
                       }}>
                      {selectedWinery.contact}
                    </a>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(10px) saturate(150%)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  }}>
                    <img 
                      src="/Logos/Phone logo.png" 
                      alt="Phone" 
                      style={{ width: '22px', height: '22px', filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}
                    />
                    <a href={`tel:${selectedWinery.phone}`} 
                       style={{ 
                         color: '#0066cc', 
                         textDecoration: 'none',
                         fontWeight: '500',
                         fontSize: '15px'
                       }}>
                      {selectedWinery.phone}
                    </a>
                  </div>
                </div>
                
                {/* Social Media */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px) saturate(130%)'
                }}>
                  <h4 style={{ 
                    fontSize: '20px', 
                    marginBottom: '20px', 
                    color: '#333',
                    fontWeight: '600',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}>
                    Connect With Us
                  </h4>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <a 
                      href={selectedWinery.social.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        width: '48px', 
                        height: '48px', 
                        background: 'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%)',
                        backdropFilter: 'blur(15px) saturate(180%) contrast(1.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: 
                          '0 12px 40px rgba(131, 58, 180, 0.4), ' +
                          'inset 0 1px 0 rgba(255, 255, 255, 0.4), ' +
                          'inset 0 -1px 0 rgba(0, 0, 0, 0.15), ' +
                          '0 0 20px rgba(131, 58, 180, 0.2)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
                        e.currentTarget.style.boxShadow = 
                          '0 12px 40px rgba(131, 58, 180, 0.4), ' +
                          'inset 0 1px 0 rgba(255, 255, 255, 0.5), ' +
                          'inset 0 -1px 0 rgba(0, 0, 0, 0.15)';
                        e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) translateY(0)';
                        e.currentTarget.style.boxShadow = 
                          '0 8px 32px rgba(131, 58, 180, 0.3), ' +
                          'inset 0 1px 0 rgba(255, 255, 255, 0.3), ' +
                          'inset 0 -1px 0 rgba(0, 0, 0, 0.1)';
                        e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                      }}
                    >
                      <img 
                        src="/Logos/IG logo.png" 
                        alt="Instagram" 
                        style={{ width: '24px', height: '24px' }}
                      />
                    </a>
                    <a 
                      href={selectedWinery.social.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        width: '48px', 
                        height: '48px', 
                        background: 'linear-gradient(135deg, #1877F2 0%, #0D6EFD 100%)',
                        backdropFilter: 'blur(10px) saturate(150%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: 
                          '0 8px 32px rgba(24, 119, 242, 0.3), ' +
                          'inset 0 1px 0 rgba(255, 255, 255, 0.3), ' +
                          'inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) translateY(0)';
                      }}
                    >
                      <img 
                        src="/Logos/FB logo.png" 
                        alt="Facebook" 
                        style={{ width: '24px', height: '24px' }}
                      />
                    </a>
                    <a 
                      href={selectedWinery.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        width: '48px', 
                        height: '48px', 
                        background: 'linear-gradient(135deg, #000000 0%, #1DA1F2 100%)',
                        backdropFilter: 'blur(10px) saturate(150%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: 
                          '0 8px 32px rgba(0, 0, 0, 0.3), ' +
                          'inset 0 1px 0 rgba(255, 255, 255, 0.3), ' +
                          'inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) translateY(0)';
                      }}
                    >
                      <img 
                        src="/Logos/X logo.png" 
                        alt="X (Twitter)" 
                        style={{ width: '24px', height: '24px' }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default FeaturedWineriesSection; 