'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'

interface Brand {
  id: string
  name: string
  logo: string
  headline: string
  description: string
  accentColor: string
}

// Sample data - replace with your actual brands
const brands: Brand[] = [
  {
    id: '1',
    name: 'Château Margaux',
    logo: '/brands/margaux.png',
    headline: 'Where Limestone Meets Legend',
    description: 'Discover how the unique gravelly soils of the Médoc create wines of unparalleled elegance and longevity.',
    accentColor: '#8B0000'
  },
  {
    id: '2',
    name: 'Opus One',
    logo: '/brands/opus.png',
    headline: 'Napa Valley Terroir Excellence',
    description: 'Experience the perfect marriage of Bordeaux tradition and California innovation through volcanic soils.',
    accentColor: '#4B0082'
  },
  {
    id: '3',
    name: 'Penfolds',
    logo: '/brands/penfolds.png',
    headline: 'Australian Soil Stories',
    description: 'From the iron-rich terra rossa of Coonawarra to the ancient soils of Barossa Valley.',
    accentColor: '#DC143C'
  },
  {
    id: '4',
    name: 'Antinori',
    logo: '/brands/antinori.png',
    headline: 'Tuscan Earth Traditions',
    description: '26 generations of winemaking rooted in the galestro and alberese soils of Chianti Classico.',
    accentColor: '#8B4513'
  }
]

function BrandCard({ brand, index }: { brand: Brand; index: number }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      className="relative"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        whileHover={{ scale: 1.02 }}
        className="relative group"
      >
        <div className="glass-effect rounded-2xl p-8 h-full overflow-hidden">
          {/* Background Gradient */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${brand.accentColor}20 0%, transparent 70%)`
            }}
          />
          
          {/* Content */}
          <div className="relative z-10 space-y-6">
            {/* Logo Container */}
            <motion.div
              className="h-24 flex items-center justify-center"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-full w-auto object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </motion.div>
            
            {/* Headline */}
            <h3 className="text-2xl font-bold text-center">
              {brand.headline}
            </h3>
            
            {/* Description */}
            <p className="text-white/70 text-center leading-relaxed">
              {brand.description}
            </p>
            
            {/* CTA */}
            <motion.button
              className="w-full py-3 rounded-full border border-white/20 text-sm font-medium hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore {brand.name}
            </motion.button>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl" />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function BrandGrid() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={containerRef} className="relative py-24 px-4 overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Wineries</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Each episode unveils the unique story of soil and tradition that defines these exceptional wines
          </p>
        </motion.div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-6">
            Join Wine Spectator&apos;s revolutionary video series
          </p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full font-semibold text-black hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Your Wine Story
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 