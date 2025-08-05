'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Grape, Mountain, Sun, Wind } from 'lucide-react'

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
  }[]
}

const brands: Brand[] = [
  {
    id: '1',
    name: 'Château Margaux',
    logo: '/brands/margaux.png',
    headline: 'Where Limestone Meets Legend',
    description: 'Discover how the unique gravelly soils of the Médoc create wines of unparalleled elegance and longevity.',
    accentColor: '#8B0000',
    icon: <Mountain className="w-5 h-5" />,
    stats: [
      { label: 'Established', value: '1572' },
      { label: 'Soil Type', value: 'Gravel & Limestone' }
    ]
  },
  {
    id: '2',
    name: 'Opus One',
    logo: '/brands/opus.png',
    headline: 'Napa Valley Terroir Excellence',
    description: 'Experience the perfect marriage of Bordeaux tradition and California innovation through volcanic soils.',
    accentColor: '#4B0082',
    icon: <Sun className="w-5 h-5" />,
    stats: [
      { label: 'Founded', value: '1979' },
      { label: 'Soil Type', value: 'Volcanic Ash' }
    ]
  },
  {
    id: '3',
    name: 'Penfolds',
    logo: '/brands/penfolds.png',
    headline: 'Australian Soil Stories',
    description: 'From the iron-rich terra rossa of Coonawarra to the ancient soils of Barossa Valley.',
    accentColor: '#DC143C',
    icon: <Wind className="w-5 h-5" />,
    stats: [
      { label: 'Since', value: '1844' },
      { label: 'Soil Type', value: 'Terra Rossa' }
    ]
  },
  {
    id: '4',
    name: 'Antinori',
    logo: '/brands/antinori.png',
    headline: 'Tuscan Earth Traditions',
    description: '26 generations of winemaking rooted in the galestro and alberese soils of Chianti Classico.',
    accentColor: '#8B4513',
    icon: <Grape className="w-5 h-5" />,
    stats: [
      { label: 'Heritage', value: '1385' },
      { label: 'Soil Type', value: 'Galestro & Clay' }
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
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="relative h-full glass-effect rounded-2xl p-8 overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500">
        {/* Background Accent */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{ backgroundColor: brand.accentColor }}
        />
        
        {/* Content */}
        <div className="relative z-10 space-y-6 h-full flex flex-col">
          {/* Icon & Name */}
          <div className="flex items-start justify-between">
            <div 
              className="p-3 rounded-xl glass-effect"
              style={{ backgroundColor: `${brand.accentColor}20` }}
            >
              {brand.icon}
            </div>
            <div className="text-3xl font-bold opacity-10 group-hover:opacity-20 transition-opacity">
              {index + 1}
            </div>
          </div>
          
          {/* Brand Name - Using text instead of logo for demo */}
          <div className="text-2xl font-bold text-white/80 group-hover:text-white transition-colors">
            {brand.name}
          </div>
          
          {/* Headline */}
          <h3 className="text-xl font-semibold leading-tight">
            {brand.headline}
          </h3>
          
          {/* Description */}
          <p className="text-white/60 text-sm leading-relaxed flex-grow">
            {brand.description}
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            {brand.stats.map((stat, i) => (
              <div key={i}>
                <p className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</p>
                <p className="text-sm font-semibold mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
          
          {/* CTA */}
          <motion.button
            className="w-full py-3 rounded-xl border border-white/10 text-sm font-medium 
                     hover:bg-white/5 hover:border-white/30 transition-all duration-300 
                     flex items-center justify-center gap-2 group/btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={containerRef} className="relative py-24 px-4 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-900/5 blur-3xl" />
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
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Featured Wineries</span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Each episode unveils the unique story of soil and tradition that defines 
            these exceptional wines. From limestone to volcanic ash, discover how 
            terroir shapes every bottle.
          </p>
        </motion.div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} index={index} />
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 glass-effect rounded-full px-6 py-3 mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-white/70">Now accepting submissions for Season 2</span>
          </div>
          
          <h3 className="text-2xl font-semibold mb-4">
            Join Wine Spectator&apos;s Revolutionary Video Series
          </h3>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Share your vineyard&apos;s story. Submit your 30-60 second vertical videos 
            showcasing the unique relationship between your soil and wine.
          </p>
          
          <motion.button
            className="group relative px-8 py-4 overflow-hidden rounded-full font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 wine-gradient group-hover:scale-110 transition-transform duration-300" />
            <span className="relative text-white flex items-center gap-2">
              Submit Your Wine Story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 