'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Grape, Mountain, Sun, Wind, Calendar, MapPin } from 'lucide-react'

interface Brand {
  id: string
  name: string
  logo: string
  headline: string
  description: string
  accentColor: string
  icon: React.ReactNode
  stats: {
    label: string
    value: string
    icon: React.ReactNode
  }[]
}

const brands: Brand[] = [
  {
    id: '1',
    name: 'Château Margaux',
    logo: '/brands/margaux.png',
    headline: 'Where Limestone Meets Legend',
    description: 'Discover how the unique gravelly soils of the Médoc create wines of unparalleled elegance and longevity. The gravel and limestone composition provides exceptional drainage and mineral complexity.',
    accentColor: '#8B0000',
    icon: <Mountain className="w-6 h-6" />,
    stats: [
      { label: 'Established', value: '1572', icon: <Calendar className="w-4 h-4" /> },
      { label: 'Soil Type', value: 'Gravel & Limestone', icon: <MapPin className="w-4 h-4" /> }
    ]
  },
  {
    id: '2',
    name: 'Opus One',
    logo: '/brands/opus.png',
    headline: 'Napa Valley Terroir Excellence',
    description: 'Experience the perfect marriage of Bordeaux tradition and California innovation through volcanic soils. The volcanic ash and alluvial deposits create wines of remarkable depth and structure.',
    accentColor: '#B8860B',
    icon: <Sun className="w-6 h-6" />,
    stats: [
      { label: 'Founded', value: '1979', icon: <Calendar className="w-4 h-4" /> },
      { label: 'Soil Type', value: 'Volcanic Ash', icon: <MapPin className="w-4 h-4" /> }
    ]
  },
  {
    id: '3',
    name: 'Penfolds',
    logo: '/brands/penfolds.png',
    headline: 'Australian Soil Stories',
    description: 'From the iron-rich terra rossa of Coonawarra to the ancient soils of Barossa Valley. The distinctive red clay soils impart unique character and aging potential to every vintage.',
    accentColor: '#DC143C',
    icon: <Wind className="w-6 h-6" />,
    stats: [
      { label: 'Since', value: '1844', icon: <Calendar className="w-4 h-4" /> },
      { label: 'Soil Type', value: 'Terra Rossa', icon: <MapPin className="w-4 h-4" /> }
    ]
  },
  {
    id: '4',
    name: 'Antinori',
    logo: '/brands/antinori.png',
    headline: 'Tuscan Earth Traditions',
    description: '26 generations of winemaking rooted in the galestro and alberese soils of Chianti Classico. The schist and clay soils create wines of exceptional complexity and finesse.',
    accentColor: '#8B4513',
    icon: <Grape className="w-6 h-6" />,
    stats: [
      { label: 'Heritage', value: '1385', icon: <Calendar className="w-4 h-4" /> },
      { label: 'Soil Type', value: 'Galestro & Clay', icon: <MapPin className="w-4 h-4" /> }
    ]
  }
]

function BrandCard({ brand, index }: { brand: Brand; index: number }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ 
        y: -8,
        scale: 1.01,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      className="group relative"
    >
      <div className="relative h-full glass-effect rounded-2xl p-8 overflow-hidden border border-white/5 hover:border-white/30 transition-all duration-500 backdrop-blur-xl">
        {/* Background Accent */}
        <motion.div 
          className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-opacity duration-700"
          style={{ backgroundColor: brand.accentColor }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 space-y-6 h-full flex flex-col">
          {/* Icon & Number */}
          <div className="flex items-start justify-between">
            <motion.div 
              className="p-4 rounded-xl glass-effect"
              style={{ backgroundColor: `${brand.accentColor}20` }}
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {brand.icon}
            </motion.div>
            <motion.div 
              className="text-4xl font-bold opacity-10 group-hover:opacity-30 transition-opacity duration-500"
              style={{ color: brand.accentColor }}
            >
              {index + 1}
            </motion.div>
          </div>
          
          {/* Brand Name */}
          <motion.div 
            className="text-2xl font-bold text-white/90 group-hover:text-white transition-colors duration-300"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {brand.name}
          </motion.div>
          
          {/* Headline */}
          <h3 className="text-xl font-semibold leading-tight text-white">
            {brand.headline}
          </h3>
          
          {/* Description */}
          <p className="text-white/70 text-sm leading-relaxed flex-grow">
            {brand.description}
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
            {brand.stats.map((stat, i) => (
              <motion.div 
                key={i}
                className="flex items-center gap-3"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${brand.accentColor}20` }}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-sm font-semibold mt-1 text-white">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA */}
          <motion.button
            className="w-full py-4 rounded-xl border border-white/10 text-sm font-medium 
                     hover:bg-white/5 hover:border-white/30 transition-all duration-300 
                     flex items-center justify-center gap-2 group/btn"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileTap={{ scale: 0.98 }}
            style={{
              borderColor: `${brand.accentColor}40`,
              color: brand.accentColor
            }}
          >
            <span>Explore {brand.name}</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function BrandGrid() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative py-32 px-4 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-amber-900/5 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-burgundy-900/5 blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-6xl md:text-7xl font-bold mb-8"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="gradient-text">Featured Wineries</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-white/60 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Each episode unveils the unique story of soil and tradition that defines 
            these exceptional wines. From limestone to volcanic ash, discover how 
            terroir shapes every bottle and creates the distinctive character that 
            makes each vintage unforgettable.
          </motion.p>
        </motion.div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {brands.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} index={index} />
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <motion.div 
            className="inline-flex items-center gap-4 glass-effect rounded-full px-8 py-4 mb-8"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-white/80 font-medium">Now accepting submissions for Season 2</span>
          </motion.div>
          
          <motion.h3 
            className="text-3xl font-semibold mb-6 text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Join Wine Spectator&apos;s Revolutionary Video Series
          </motion.h3>
          <motion.p 
            className="text-white/70 mb-10 max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Share your vineyard&apos;s story. Submit your 30-60 second vertical videos 
            showcasing the unique relationship between your soil and wine. 
            Let the world discover the terroir that makes your wines extraordinary.
          </motion.p>
          
          <motion.a
            href="https://formspree.io/f/mkgzqkpb"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-12 py-6 overflow-hidden rounded-full font-semibold text-lg inline-block"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div 
              className="absolute inset-0 wine-gradient group-hover:scale-110 transition-transform duration-300" 
            />
            <span className="relative text-white flex items-center gap-3">
            Want Your Story in The Dirt?
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
} 