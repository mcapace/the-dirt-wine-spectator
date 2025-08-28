'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const InstagramFeed = () => {
  const [activeTab, setActiveTab] = useState('instagram');

  const instagramPosts = [
    {
      id: 1,
      image: '🍷',
      caption: 'Celebrating Italian heritage with Valdo Prosecco',
      likes: '2.4k',
      comments: '156'
    },
    {
      id: 2,
      image: '🍾',
      caption: 'The perfect pairing for any celebration',
      likes: '1.8k',
      comments: '89'
    },
    {
      id: 3,
      image: '🏛️',
      caption: 'Valdobbiadene - where tradition meets excellence',
      likes: '3.2k',
      comments: '234'
    },
    {
      id: 4,
      image: '🌿',
      caption: 'From vine to glass - the Valdo journey',
      likes: '1.6k',
      comments: '67'
    },
    {
      id: 5,
      image: '✨',
      caption: 'Every bubble tells a story of passion',
      likes: '2.1k',
      comments: '143'
    },
    {
      id: 6,
      image: '🇮🇹',
      caption: 'Italian craftsmanship in every bottle',
      likes: '2.8k',
      comments: '198'
    }
  ];

  const twitterPosts = [
    {
      id: 1,
      content: 'Just opened a bottle of Valdo Marca Oro - absolutely divine! 🍾 #ValdoProsecco #ItalianWine',
      author: '@wineenthusiast',
      time: '2h ago',
      likes: '456',
      retweets: '123'
    },
    {
      id: 2,
      content: 'The perfect aperitivo with Valdo Prosecco DOCG. Salute! 🥂 #Aperitivo #Valdo',
      author: '@italianfoodie',
      time: '4h ago',
      likes: '234',
      retweets: '67'
    },
    {
      id: 3,
      content: 'Valdobbiadene region produces the finest Prosecco in the world. Valdo leads the way! 🏆',
      author: '@winecritic',
      time: '6h ago',
      likes: '789',
      retweets: '234'
    }
  ];

  return (
    <motion.section 
      className="py-20 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-light mb-6 tracking-wider">FOLLOW OUR JOURNEY</h2>
          <p className="text-xl text-gray-600 font-light">Join the Valdo community on social media</p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('instagram')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'instagram' 
                  ? 'bg-red-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Instagram
            </button>
            <button
              onClick={() => setActiveTab('twitter')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'twitter' 
                  ? 'bg-red-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Twitter
            </button>
          </div>
        </motion.div>

        {/* Instagram Feed */}
        {activeTab === 'instagram' && (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {instagramPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="aspect-square bg-gradient-to-br from-red-800/20 to-gray-900/20 rounded-lg flex items-center justify-center text-4xl">
                  {post.image}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                    <div className="text-sm font-medium mb-2">{post.caption}</div>
                    <div className="flex justify-center space-x-4 text-xs">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Twitter Feed */}
        {activeTab === 'twitter' && (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {twitterPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white font-bold">
                    {post.author.charAt(1).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-gray-900">{post.author}</span>
                      <span className="text-gray-500 text-sm">{post.time}</span>
                    </div>
                    <p className="text-gray-800 mb-3">{post.content}</p>
                    <div className="flex space-x-6 text-sm text-gray-500">
                      <span>❤️ {post.likes}</span>
                      <span>🔄 {post.retweets}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="https://www.instagram.com/valdoprosecco"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Follow @valdoprosecco
          </motion.a>
          <p className="text-sm text-gray-600 mt-3">
            Join thousands of wine lovers worldwide
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default InstagramFeed; 