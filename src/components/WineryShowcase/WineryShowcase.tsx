'use client'

import { motion } from 'framer-motion'
import { Star, Heart, Share2, ShoppingCart } from 'lucide-react'

interface Winery {
  id: string
  name: string
  location: string
  producer: string
  vintage: string
  soilType: string
  description: string
  alcohol: string
  price: string
  rating: number
  image: string
}

const wineries: Winery[] = [
  {
    id: '1',
    name: 'Château Margaux 2015',
    location: 'Bordeaux, France',
    producer: 'Château Margaux',
    vintage: '2015',
    soilType: 'LIMESTONE & GRAVEL',
    description: 'A masterpiece of elegance and power, this wine showcases the unique terroir of Margaux. The limestone and gravel soils impart remarkable structure and complexity, with notes of black cherry, violet, and subtle oak.',
    alcohol: '13.5%',
    price: '$1,200',
    rating: 98,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    name: 'Opus One 2018',
    location: 'Napa Valley, California',
    producer: 'Opus One',
    vintage: '2018',
    soilType: 'VOLCANIC & CLAY',
    description: 'A harmonious blend of Cabernet Sauvignon and Merlot, this wine reflects the volcanic soils of Oakville. Rich dark fruit, cocoa, and refined tannins create a wine of exceptional balance and longevity.',
    alcohol: '14.2%',
    price: '$850',
    rating: 97,
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b8d?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    name: 'Penfolds Grange 2016',
    location: 'Barossa Valley, Australia',
    producer: 'Penfolds',
    vintage: '2016',
    soilType: 'TERRA ROSSA & LIMESTONE',
    description: 'Australia\'s most iconic wine, crafted from the ancient terra rossa soils. Intense black fruit, licorice, and spice notes are supported by powerful yet silky tannins, promising decades of evolution.',
    alcohol: '14.5%',
    price: '$950',
    rating: 99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    name: 'Antinori Tignanello 2019',
    location: 'Tuscany, Italy',
    producer: 'Antinori',
    vintage: '2019',
    soilType: 'CLAY & GALESTRO',
    description: 'A revolutionary Super Tuscan that redefined Italian winemaking. The clay and galestro soils contribute to the wine\'s structure, while Sangiovese and Cabernet create a symphony of red fruit and herbs.',
    alcohol: '13.8%',
    price: '$180',
    rating: 96,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    name: 'Chapoutier Hermitage 2017',
    location: 'Rhône Valley, France',
    producer: 'Chapoutier',
    vintage: '2017',
    soilType: 'GRANITE & SCHIST',
    description: 'From the legendary Hermitage hill, this Syrah expresses the granite and schist soils with remarkable precision. Notes of black olive, smoked meat, and violet create a wine of profound complexity.',
    alcohol: '14.0%',
    price: '$320',
    rating: 97,
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b8d?w=400&h=300&fit=crop'
  }
]

export default function WineryShowcase() {
  return (
    <div className="space-y-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-5xl md:text-6xl font-bold premium-gradient-text mb-6 tracking-tight glow-text">
          Featured Wineries
        </h2>
        <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto">
          Discover exceptional wines from world-renowned producers, each shaped by their unique terroir and winemaking traditions.
        </p>
      </motion.div>

      {/* Winery Cards */}
      <div className="space-y-8">
        {wineries.map((winery, index) => (
          <motion.div
            key={winery.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="brand-card group"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Wine Image */}
              <div className="lg:w-1/3">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={winery.image}
                    alt={winery.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Wine Details */}
              <div className="lg:w-2/3 space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-white premium-text">
                    {winery.name}
                  </h3>
                  <p className="text-lg text-gray-300 font-light">
                    {winery.location}
                  </p>
                  <p className="text-xl text-amber-400 font-semibold">
                    {winery.producer}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400 uppercase tracking-wider">
                      {winery.vintage} VINTAGE + {winery.soilType}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-lg">
                  {winery.description}
                </p>

                {/* Stats and Actions */}
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">ALCOHOL</span>
                      <span className="text-white font-semibold">{winery.alcohol}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">PRICE</span>
                      <span className="text-amber-400 font-bold text-xl">{winery.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Rating */}
                    <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-white font-semibold">{winery.rating}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button className="premium-button flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Shop Now
                      </button>
                      <button className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-300">
                        <Heart className="w-5 h-5 text-gray-300 hover:text-red-400 transition-colors duration-300" />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-300">
                        <Share2 className="w-5 h-5 text-gray-300 hover:text-blue-400 transition-colors duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sponsored Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="glass-card rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-semibold text-amber-400 mb-4">
          Sponsored Content
        </h3>
        <p className="text-gray-300 mb-6">
          Discover more exceptional wines and wineries from around the world.
        </p>
        <button className="premium-button">
          View All Wineries →
        </button>
      </motion.div>
    </div>
  )
} 