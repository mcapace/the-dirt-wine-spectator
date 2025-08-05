'use client'

import HeroSection from '@/components/sections/HeroSection';
import AboutTheDirtSection from '../components/sections/AboutTheDirtSection';
import FeaturedWineriesSection from '@/components/sections/FeaturedWineriesSection';
import ClosingSection from '@/components/sections/ClosingSection';
import Navigation from '@/components/Navigation/Navbar';
import Footer from '@/components/Footer/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Navigation */}
      <Navigation />
      
      {/* 2. Hero Section */}
      <HeroSection />
      
      {/* 3. About The Dirt with Video Gallery */}
      <AboutTheDirtSection />
      
      {/* 4. Featured Wineries */}
      <FeaturedWineriesSection />
      
      {/* 5. Closing Section */}
      <ClosingSection />
      
      {/* 6. Footer */}
      <Footer />
    </main>
  );
}
