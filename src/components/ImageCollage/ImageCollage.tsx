'use client'

import { motion } from 'framer-motion'

const images = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=600&fit=crop',
    alt: 'Rustic picnic scene with wine, bread, cheese, and cherries'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1566995541428-f2246c17cda1?w=800&h=600&fit=crop',
    alt: 'Close-up of red wine glass with grapes and leaves'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&h=600&fit=crop',
    alt: 'Scenic vineyard at sunrise or sunset'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1543418219-44e30b057fea?w=800&h=600&fit=crop',
    alt: 'Three people toasting with red wine glasses'
  }
]

export default function ImageCollage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 gap-4 md:gap-6"
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-lg"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 