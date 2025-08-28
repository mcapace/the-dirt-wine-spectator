'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

const timelineData = [
  {
    year: '2024',
    title: 'Dig Into the Story Behind the Soil',
    description: 'Welcome to The Dirt — Wine Spectator\'s newest video series that brings wine lovers straight to the vineyard. Through quick, compelling vertical videos filmed by the winemakers themselves, we uncover how the soil beneath the vines shapes the character of every bottle.',
    icon: '🌱'
  },
  {
    year: 'Authentic',
    title: 'Behind-the-Scenes Access',
    description: 'Edited, branded, and delivered by Wine Spectator, each episode offers an authentic, behind-the-scenes look at what truly makes your wine unique. Experience the terroir through the eyes of those who know it best.',
    icon: '🎬'
  },
  {
    year: 'Unique',
    title: 'Terroir Revealed',
    description: 'Discover how the soil beneath the vines shapes the character of every bottle. From the mineral composition to the microclimate, each vineyard tells its own story through the wines it produces.',
    icon: '🍷'
  }
];

const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 100]);

  const handleTimelineClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="section-minimal bg-beige-light">
      <div className="container-minimal">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1 }}
          >
            THE DIRT
          </motion.h2>
          <p className="section-subtitle">Wine Spectator's newest video series</p>
        </motion.div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <motion.div 
              className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
              style={{ y }}
            />
            
            {/* Timeline Items */}
            <div className="relative flex justify-between items-center py-16">
              {timelineData.map((item, index) => (
                <motion.div
                  key={item.year}
                  className="relative flex flex-col items-center group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => handleTimelineClick(index)}
                >
                  {/* Timeline Dot */}
                  <motion.div 
                    className={`w-6 h-6 rounded-full border-4 transition-all duration-300 ${
                      activeIndex === index 
                        ? 'bg-gold border-gold scale-125' 
                        : 'bg-beige-light border-gold hover:scale-110'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                  
                  {/* Year */}
                  <motion.span 
                    className={`text-sm font-medium mt-4 transition-colors duration-300 ${
                      activeIndex === index ? 'text-gold' : 'text-gray-500'
                    }`}
                  >
                    {item.year}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Content Panel */}
          <motion.div 
            className="mt-12"
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-black mb-4">
                    {timelineData[activeIndex].title}
                  </h3>
                  <p className="text-black leading-relaxed font-medium">
                    {timelineData[activeIndex].description}
                  </p>
                </div>
              </div>

              {/* Image */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <div className="w-full h-80 bg-gradient-to-br from-red-800/20 to-gray-900/20 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">{timelineData[activeIndex].icon}</div>
                      <p className="text-gray-600 text-lg">The Dirt Experience</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden">
          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Timeline Line */}
                {index < timelineData.length - 1 && (
                  <div className="absolute left-3 top-16 bottom-0 w-0.5 bg-gradient-to-b from-gold to-transparent" />
                )}
                
                <div className="flex items-start space-x-4">
                  {/* Timeline Dot */}
                  <motion.div 
                    className="w-6 h-6 rounded-full border-4 bg-beige-light border-gold flex-shrink-0 mt-2"
                    whileHover={{ scale: 1.2 }}
                  />
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-sm font-medium text-gold">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-black mb-3">
                        {item.title}
                      </h3>
                      <p className="text-black leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection; 