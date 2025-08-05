'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Brand } from '@/types'

const brands: Brand[] = [
  {
    id: '1',
    name: 'Château Margaux',
    logo: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop',
    headline: 'Where Limestone Meets Legend',
    description: 'Unique gravelly soils of the Médoc create wines of unparalleled elegance and longevity.',
    accentColor: '#8B4513'
  },
  {
    id: '2',
    name: 'Opus One',
    logo: 'https://images.unsplash.com/photo-1566995541428-f2246c17cda1?w=400&h=300&fit=crop',
    headline: 'Napa Valley Terroir Excellence',
    description: 'The perfect marriage of Bordeaux tradition and California innovation through volcanic soils.',
    accentColor: '#DC143C'
  },
  {
    id: '3',
    name: 'Penfolds',
    logo: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&h=300&fit=crop',
    headline: 'Australian Soil Stories',
    description: 'From the iron-rich terra rossa of Coonawarra to the ancient soils of Barossa Valley.',
    accentColor: '#FFD700'
  },
  {
    id: '4',
    name: 'Antinori',
    logo: 'https://images.unsplash.com/photo-1543418219-44e30b057fea?w=400&h=300&fit=crop',
    headline: 'Tuscan Earth Traditions',
    description: '26 generations of winemaking rooted in the galestro and alberese soils of Chianti Classico.',
    accentColor: '#228B22'
  }
]

export default function BrandGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          style={{ y, opacity }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured Wineries
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Each episode unveils the unique story of soil and tradition that defines these exceptional wines.
          </p>
        </motion.div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
                {/* Brand Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div 
                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                    style={{ backgroundColor: brand.accentColor }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ color: brand.accentColor }}
                  >
                    {brand.headline}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {brand.description}
                  </p>
                  
                  {/* Explore Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 border-2 hover:shadow-lg"
                    style={{
                      borderColor: brand.accentColor,
                      color: brand.accentColor,
                      backgroundColor: 'transparent'
                    }}
                    onHoverStart={(e) => {
                      const target = e.currentTarget as HTMLButtonElement
                      target.style.backgroundColor = brand.accentColor
                      target.style.color = '#000'
                    }}
                    onHoverEnd={(e) => {
                      const target = e.currentTarget as HTMLButtonElement
                      target.style.backgroundColor = 'transparent'
                      target.style.color = brand.accentColor
                    }}
                  >
                    Explore {brand.name}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Submit Your Wine Story Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-lg rounded-lg hover:shadow-2xl transition-all duration-300"
          >
            Submit Your Wine Story
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 