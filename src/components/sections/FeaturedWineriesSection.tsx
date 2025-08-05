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
    name: 'The Dirt',
    logo: '/Logos/New Dirt logo V.2.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    website: 'https://thedirt.com',
    contact: 'info@thedirt.com',
    phone: '+1 (555) 567-8901',
    social: {
      instagram: 'https://instagram.com/thedirt',
      facebook: 'https://facebook.com/thedirt',
      twitter: 'https://twitter.com/thedirt'
    }
  }
];

const WineryModal = ({ winery, isOpen, onClose }: { winery: any; isOpen: boolean; onClose: () => void }) => {
  console.log('Modal props:', { isOpen, wineryName: winery?.name });
  if (!isOpen || !winery) {
    console.log('Modal not rendering - isOpen:', isOpen, 'winery:', winery);
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[80vh] overflow-hidden"
        initial={{ scale: 0.8, rotateY: -90, opacity: 0 }}
        animate={{ scale: 1, rotateY: 0, opacity: 1 }}
        exit={{ scale: 0.8, rotateY: 90, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left side - Logo */}
          <div className="lg:w-2/5 p-8 lg:p-12 flex items-center justify-center bg-gradient-to-br from-beige-light to-beige">
            <motion.div
              initial={{ scale: 0.5, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-center"
            >
              <Image
                src={winery.logo}
                alt={`${winery.name} Logo`}
                width={300}
                height={150}
                className="w-auto h-32 lg:h-40 object-contain mx-auto"
              />
              <h2 className="text-2xl lg:text-3xl font-bold text-black mt-6">{winery.name}</h2>
            </motion.div>
          </div>
          
          {/* Right side - Content */}
          <div className="lg:w-3/5 p-6 lg:p-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6"
            >
              {/* Main Content */}
              <div>
                <h3 className="text-2xl lg:text-3xl font-semibold text-black mb-4">About {winery.name}</h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-xl font-semibold text-black mb-4">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-500 text-lg">🌐</span>
                    <a href={winery.website} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800 transition-colors">
                      {winery.website}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-500 text-lg">✉️</span>
                    <a href={`mailto:${winery.contact}`} 
                       className="text-blue-600 hover:text-blue-800 transition-colors">
                      {winery.contact}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-500 text-lg">📞</span>
                    <a href={`tel:${winery.phone}`} 
                       className="text-blue-600 hover:text-blue-800 transition-colors">
                      {winery.phone}
                    </a>
                  </div>
                </div>
                
                {/* Social Media */}
                <div>
                  <h4 className="text-lg font-semibold text-black mb-3">Connect With Us</h4>
                  <div className="flex space-x-4">
                    <motion.a
                      href={winery.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      📷
                    </motion.a>
                    <motion.a
                      href={winery.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      📘
                    </motion.a>
                    <motion.a
                      href={winery.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      🐦
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FeaturedWineriesSection = () => {
  const [selectedWinery, setSelectedWinery] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWineryClick = (winery: any) => {
    console.log('Winery clicked:', winery.name);
    setSelectedWinery(winery);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWinery(null);
  };

  return (
    <>
      <motion.section 
        id="wineries"
        className="section-minimal bg-beige-light py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container-minimal">
          <motion.div 
            className="section-header text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">FEATURED WINERIES</h2>
            <p className="section-subtitle">From the Ground Up: Stories That Start in the Soil</p>
          </motion.div>
          
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Get to know the wineries bringing <em>The Dirt</em> to life. Each of these trailblazing producers invites you behind the scenes of their vineyards — offering a rare look at how soil, climate, and craftsmanship come together in every bottle. These aren't just wines; they're stories rooted in place, passion, and authenticity.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-5 gap-6 lg:gap-8"
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
                className="winery-card wine-card-glass cursor-pointer"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleWineryClick(winery)}
              >
                <motion.div
                  className="wine-image"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-full w-auto flex items-center justify-center">
                    <div className="text-center">
                      <Image
                        src={winery.logo}
                        alt={`${winery.name} Logo`}
                        width={80}
                        height={80}
                        className="w-auto h-16 object-contain mx-auto mb-2"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Rotating modal */}
      {isModalOpen && selectedWinery && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'rgba(0,0,0,0.3)', 
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={closeModal}
        >
          <motion.div 
            initial={{ scale: 0.8, rotateY: -90, opacity: 0 }}
            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
            exit={{ scale: 0.8, rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ 
              background: 'white', 
              padding: '40px', 
              borderRadius: '20px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto',
              position: 'relative'
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
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* Logo and Name */}
              <div style={{ textAlign: 'center' }}>
                <img 
                  src={selectedWinery.logo} 
                  alt={`${selectedWinery.name} Logo`}
                  style={{ 
                    height: '80px', 
                    width: 'auto', 
                    marginBottom: '20px' 
                  }}
                />
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
                  {selectedWinery.name}
                </h2>
              </div>
              
              {/* Content */}
              <div>
                <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
                  About {selectedWinery.name}
                </h3>
                <div style={{ lineHeight: '1.8', color: '#666', marginBottom: '30px' }}>
                  <p style={{ marginBottom: '15px' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                </div>
              </div>
              
              {/* Contact Information */}
              <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>
                  Contact Information
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px' }}>🌐</span>
                    <a href={selectedWinery.website} target="_blank" rel="noopener noreferrer" 
                       style={{ color: '#0066cc', textDecoration: 'none' }}>
                      {selectedWinery.website}
                    </a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px' }}>✉️</span>
                    <a href={`mailto:${selectedWinery.contact}`} 
                       style={{ color: '#0066cc', textDecoration: 'none' }}>
                      {selectedWinery.contact}
                    </a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px' }}>📞</span>
                    <a href={`tel:${selectedWinery.phone}`} 
                       style={{ color: '#0066cc', textDecoration: 'none' }}>
                      {selectedWinery.phone}
                    </a>
                  </div>
                </div>
                
                {/* Social Media */}
                <div>
                  <h4 style={{ fontSize: '18px', marginBottom: '15px', color: '#333' }}>
                    Connect With Us
                  </h4>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <a href={selectedWinery.social.instagram} target="_blank" rel="noopener noreferrer"
                       style={{ fontSize: '24px', color: '#e4405f' }}>📷</a>
                    <a href={selectedWinery.social.facebook} target="_blank" rel="noopener noreferrer"
                       style={{ fontSize: '24px', color: '#1877f2' }}>📘</a>
                    <a href={selectedWinery.social.twitter} target="_blank" rel="noopener noreferrer"
                       style={{ fontSize: '24px', color: '#1da1f2' }}>🐦</a>
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