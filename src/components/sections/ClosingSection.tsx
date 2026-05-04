'use client';

import { motion } from 'framer-motion';

const ClosingSection = () => {
  return (
    <section
      id="submit"
      className="relative bg-ws-ink py-12 text-white"
      style={{ backgroundColor: '#1a1410' }}
    >
      <svg
        className="pointer-events-none absolute left-0 right-0 top-0 w-full"
        style={{ height: 18 }}
        viewBox="0 0 800 18"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 18 Q 100 4, 200 12 T 400 8 T 600 14 T 800 6 L 800 0 L 0 0 Z"
          fill="#d4a87a"
          opacity="0.15"
        />
        <path
          d="M 0 18 Q 100 8, 200 16 T 400 12 T 600 18 T 800 10 L 800 18 Z"
          fill="#d4a87a"
          opacity="0.15"
        />
      </svg>

      <div className="container-minimal mx-auto max-w-4xl px-4 pt-6">
        <motion.div
          className="mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="font-serif mb-4 font-normal tracking-wide text-[#faf6ee]"
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              lineHeight: 1.1,
            }}
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.1em' }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Keep Your Boots on the Ground
          </motion.h2>

          <motion.h3
            className="font-serif mb-6 mt-4 italic text-[#c9a96a]"
            style={{ fontSize: 22 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            This is just the beginning.
          </motion.h3>

          <motion.p
            className="font-sans mx-auto mb-8 max-w-[580px] leading-relaxed text-[rgba(250,246,238,0.7)]"
            style={{ fontSize: 14, fontWeight: 300 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <em>The Dirt</em> is more than a video series — it&apos;s a movement to reconnect wine
            lovers with the land, the people, and the passion behind every bottle. Follow along as
            more wineries join the journey, and discover how the story of great wine always starts
            beneath the surface.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.button
              type="button"
              className="font-mono rounded-[2px] bg-[#98231f] px-8 py-[14px] text-[12px] tracking-widest text-[#faf6ee]"
              style={{
                boxShadow: '0 6px 20px rgba(152,35,31,0.35)',
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                const subject = encodeURIComponent('The Dirt - Winery Story Submission');
                const body = encodeURIComponent(`Hi Emily,

I'm interested in sharing my winery's story for The Dirt video series.

Winery Name:
Location:
Contact Information:

I'd love to discuss how we can showcase our unique terroir and winemaking story through your vertical video format.

Best regards,
[Your Name]`);
                window.open(`mailto:ebain@mshanken.com?subject=${subject}&body=${body}`, '_blank');
              }}
            >
              WANT YOUR STORY IN THE DIRT?
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingSection;
