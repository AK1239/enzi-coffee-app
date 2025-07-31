'use client';

import { useAuthStore } from '../store/authStore';
import {
  Navigation,
  HeroSection,
  FeaturesSection,
  TestimonialsSection,
  StatsSection,
  Footer,
  BackgroundEffects,
} from '../components';
import { useScrollEffects } from '../hooks';

export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const { scrollY, visibleSections } = useScrollEffects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 relative overflow-hidden">
      {/* Dynamic gradient overlays */}
      <BackgroundEffects scrollY={scrollY} />

      {/* Use the Navigation component */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection
        isAuthenticated={isAuthenticated}
        visibleSections={visibleSections}
      />

      {/* Features Section */}
      <FeaturesSection visibleSections={visibleSections} />

      {/* Testimonials Section */}
      <TestimonialsSection visibleSections={visibleSections} />

      {/* Stats Section */}
      <StatsSection visibleSections={visibleSections} />

      {/* Footer */}
      <Footer visibleSections={visibleSections} />
    </div>
  );
}
