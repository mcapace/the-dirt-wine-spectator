'use client'

import HeroSection from '@/components/sections/HeroSection';
import EpisodeCarousel from '@/components/sections/EpisodeCarousel';
import WineryBento from '@/components/sections/WineryBento';
import ClosingSection from '@/components/sections/ClosingSection';
import Footer from '@/components/Footer/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 2. Hero Section */}
      <HeroSection />
      
      {/* 3. Episodes carousel */}
      <EpisodeCarousel />
      
      {/* 4. Winery bento */}
      <WineryBento />
      
      {/* 5. Closing Section */}
      <ClosingSection />
      
      {/* 6. Footer */}
      <Footer />
    </main>
  );
}
