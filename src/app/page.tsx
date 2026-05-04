'use client'

import HeroSection from '@/components/sections/HeroSection';
import EpisodeCarousel from '@/components/sections/EpisodeCarousel';
import FeaturedWineriesSection from '@/components/sections/FeaturedWineriesSection';
import ClosingSection from '@/components/sections/ClosingSection';
import Footer from '@/components/Footer/Footer';
import SectionSeparator from '@/components/UI/SectionSeparator';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 2. Hero Section */}
      <HeroSection />
      
      {/* 3. Episodes carousel */}
      <EpisodeCarousel />
      
      {/* Separator */}
      <SectionSeparator />
      
      {/* 4. Featured Wineries */}
      <FeaturedWineriesSection />
      
      {/* 5. Closing Section */}
      <ClosingSection />
      
      {/* 6. Footer */}
      <Footer />
    </main>
  );
}
