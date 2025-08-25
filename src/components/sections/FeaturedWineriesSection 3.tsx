'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const featuredWineries = [
  {
    id: 1,
    name: "Casa Valdo",
    location: "Valdobbiadene, Italy",
    image: "/images/New Dirt logo.png",
    description: "Prosecco Superiore DOCG from the heart of Valdobbiadene"
  },
  {
    id: 2,
    name: "Napa Valley Estate",
    location: "Napa Valley, California",
    image: "/images/New Dirt logo.png",
    description: "Premium Cabernet Sauvignon from historic vineyards"
  },
  {
    id: 3,
    name: "Burgundy Domain",
    location: "Burgundy, France",
    image: "/images/New Dirt logo.png",
    description: "Terroir-driven Pinot Noir from legendary vineyards"
  }
];

export default function FeaturedWineriesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-red-100">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured Wineries
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the stories behind exceptional wines from around the world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredWineries.map((winery, index) => (
            <motion.div
              key={winery.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={winery.image}
                  alt={winery.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {winery.name}
                </h3>
                <p className="text-red-600 font-medium mb-3">
                  {winery.location}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {winery.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Watch Story
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-red-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-red-600"
          >
            View All Wineries
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 