'use client';

import { motion } from 'framer-motion';

const ClosingSection = () => {
  return (
    <section className="section-minimal bg-black text-white py-8">
      <div className="container-minimal">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Main Title */}
          <motion.h2 
            className="font-light text-white mb-4 tracking-wide"
            style={{ fontSize: '3.5rem', lineHeight: '1.1' }}
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.1em" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Keep Your Boots on the Ground
          </motion.h2>
          
          {/* Subtitle */}
          <motion.h3 
            className="text-2xl font-light text-gray-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            This is just the beginning.
          </motion.h3>
          
          {/* Main Content */}
          <motion.p 
            className="text-white leading-relaxed font-light mb-8"
            style={{ fontSize: '1.25rem', lineHeight: '1.8' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <em>The Dirt</em> is more than a video series — it's a movement to reconnect wine lovers with the land, the people, and the passion behind every bottle. Follow along as more wineries join the journey, and discover how the story of great wine always starts beneath the surface.
          </motion.p>
          
          {/* Call to Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="btn-minimal red text-lg px-12 py-4"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                const subject = encodeURIComponent('The Dirt - Winery Story Submission');
                const body = encodeURIComponent(`Hi John,

I'm interested in sharing my winery's story for The Dirt video series.

Winery Name:
Location:
Contact Information:

I'd love to discuss how we can showcase our unique terroir and winemaking story through your vertical video format.

Best regards,
[Your Name]`);
                window.open(`mailto:jgrecco@mshanken.com?subject=${subject}&body=${body}`, '_blank');
              }}
            >
              Want your story in the dirt?
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingSection;
