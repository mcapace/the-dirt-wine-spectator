'use client'

import { motion, useInView } from 'framer-motion'
import { ShoppingCart, Star, Heart, Share2, Eye } from 'lucide-react'
import { useRef } from 'react'

interface Winery {
  id: string
  name: string
  logo: string
  wine: string
  points: number
  description: string
  alcohol: string
  price: string
  shopUrl: string
  region: string
  vintage: string
}

const wineries: Winery[] = [
  {
    id: '1',
    name: 'Château Margaux',
    logo: '/images/margaux-logo.png',
    wine: 'Château Margaux 2015',
    points: 98,
    description: 'Elegant and refined with notes of black cherry, cedar, and tobacco. The limestone soils impart exceptional minerality and aging potential.',
    alcohol: '13.5%',
    price: '$1,200',
    shopUrl: '#',
    region: 'Bordeaux, France',
    vintage: '2015'
  },
  {
    id: '2',
    name: 'Opus One',
    logo: '/images/opus-logo.png',
    wine: 'Opus One 2018',
    points: 97,
    description: 'Bold and complex with layers of dark fruit, vanilla, and spice. Volcanic soils create remarkable depth and structure.',
    alcohol: '14.2%',
    price: '$850',
    shopUrl: '#',
    region: 'Napa Valley, CA',
    vintage: '2018'
  },
  {
    id: '3',
    name: 'Penfolds',
    logo: '/images/penfolds-logo.png',
    wine: 'Penfolds Grange 2017',
    points: 99,
    description: 'Powerful and concentrated with intense blackberry, chocolate, and leather notes. Terra rossa soils deliver exceptional character.',
    alcohol: '14.5%',
    price: '$950',
    shopUrl: '#',
    region: 'Barossa Valley, Australia',
    vintage: '2017'
  },
  {
    id: '4',
    name: 'Antinori',
    logo: '/images/antinori-logo.png',
    wine: 'Tignanello 2019',
    points: 96,
    description: 'Sophisticated and balanced with cherry, plum, and herbal notes. Galestro soils create wines of exceptional finesse.',
    alcohol: '13.8%',
    price: '$180',
    shopUrl: '#',
    region: 'Tuscany, Italy',
    vintage: '2019'
  },
  {
    id: '5',
    name: 'Chapoutier',
    logo: '/images/chapoutier-logo.png',
    wine: 'Hermitage La Sizeranne 2018',
    points: 97,
    description: 'Rich and powerful with black fruit, pepper, and mineral notes. Granite soils create wines of extraordinary complexity.',
    alcohol: '14.0%',
    price: '$320',
    shopUrl: '#',
    region: 'Rhône Valley, France',
    vintage: '2018'
  }
]

function WineryCard({ winery, index }: { winery: Winery; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ 
        y: -10, 
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group relative perspective-1000"
    >
      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-700/50">
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/40 to-gray-900/20 backdrop-blur-sm" />
        
        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(220, 20, 60, 0.1), transparent)',
            backgroundSize: '200% 200%'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-red-400 transition-colors duration-300">
                {winery.wine}
              </h3>
              <p className="text-sm text-gray-400">{winery.region}</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full"
            >
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-sm">{winery.points}</span>
            </motion.div>
          </div>

          {/* Winery Name */}
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-white mb-1">
              {winery.name}
            </h4>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              {winery.vintage} Vintage
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            {winery.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Alcohol</p>
              <p className="text-sm font-semibold text-white">{winery.alcohol}</p>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Price</p>
              <p className="text-sm font-semibold text-white">{winery.price}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group/btn"
            >
              <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              SHOP NOW
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200"
            >
              <Heart className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      </div>
    </motion.div>
  )
}

export default function WineryShowcase() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-50px" })

  return (
    <div ref={containerRef} className="space-y-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Featured{' '}
          <span className="gradient-text">Wineries</span>
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Discover exceptional wines from world-renowned producers, each shaped by their unique terroir and winemaking traditions.
        </motion.p>
      </motion.div>

      {/* Winery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wineries.map((winery, index) => (
          <WineryCard key={winery.id} winery={winery} index={index} />
        ))}
      </div>

      {/* Sponsored Content Label */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          SPONSORED CONTENT
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          View All Wineries
        </motion.button>
      </motion.div>
    </div>
  )
} 