'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation/Navbar';
import Footer from '@/components/Footer/Footer';
import { theDirtJwVideos, jwEmbedUrl, jwThumbnailUrl } from '@/data/theDirtJwVideos';

const videoData = theDirtJwVideos.map((v) => ({
  id: v.id,
  winery: v.winery,
  embedUrl: jwEmbedUrl(v.id),
  thumbnail: jwThumbnailUrl(v.id),
  description: v.description,
  duration: v.duration,
  cta: v.cta,
}));

interface VideoPageProps {
  params: {
    id: string;
  };
}

export default function VideoPage({ params }: VideoPageProps) {
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundVideo = videoData.find(v => v.id === params.id);
    if (foundVideo) {
      setVideo(foundVideo);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!video) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {video.winery}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            {video.description}
          </motion.p>
        </div>
      </section>

      {/* Video Player Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-2xl"
        >
          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            <iframe
              src={video.embedUrl}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen"
            />
          </div>
          
          {/* Video Info */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">
                {video.winery}
              </h2>
              <span className="text-gray-400">
                Duration: {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
              </span>
            </div>
            
            <p className="text-gray-300 text-lg mb-8">
              {video.description}
            </p>
            
            {/* CTA Button */}
            {video.cta && (
              <motion.a
                href={video.cta.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-md transition-colors duration-200"
              >
                {video.cta.text}
              </motion.a>
            )}
          </div>
        </motion.div>
      </section>

      {/* Navigation Links */}
      <section className="py-16 px-4 text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.a
            href="/videos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            ← All Videos
          </motion.a>
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            ← Back to Main Site
          </motion.a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
