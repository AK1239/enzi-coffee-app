'use client';

import { useNavigationWithLoading } from '../hooks';

interface HeroSectionProps {
  isAuthenticated: boolean;
  visibleSections: Set<string>;
}

export default function HeroSection({
  isAuthenticated,
  visibleSections,
}: HeroSectionProps) {
  const { navigateWithLoading } = useNavigationWithLoading();

  const handleNavigation = (href: string, message?: string) => {
    navigateWithLoading(href, message);
  };

  return (
    <div
      id="hero"
      data-section
      className={`relative z-10 transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Floating badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl border border-amber-400/30 rounded-full px-4 py-2 mb-6 text-amber-300 text-sm font-medium">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            <span>Trusted by 500+ Coffee Shops Worldwide</span>
          </div>

          {/* Main Heading with enhanced typography */}
          <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 bg-clip-text text-transparent drop-shadow-2xl">
              Next-Gen
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-amber-100 to-orange-200 bg-clip-text text-transparent">
              Coffee POS
            </span>
          </h1>

          {/* Enhanced subtitle */}
          <p className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Revolutionize your coffee shop with our{' '}
            <span className="text-transparent bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text font-semibold">
              AI-powered point-of-sale system
            </span>
            . Boost efficiency, delight customers, and scale your business with
            cutting-edge technology.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {isAuthenticated ? (
              <button
                onClick={() =>
                  handleNavigation('/dashboard', 'Loading Dashboard...')
                }
                className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 hover:scale-105 overflow-hidden text-base"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Enter Dashboard</span>
                  <span className="text-xl">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            ) : (
              <>
                <button
                  onClick={() =>
                    handleNavigation('/register', 'Loading Registration...')
                  }
                  className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 hover:scale-105 overflow-hidden text-base"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Start Free Trial</span>
                    <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">
                      ✨
                    </span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
                <button
                  onClick={() =>
                    handleNavigation('/login', 'Loading Sign In...')
                  }
                  className="group inline-flex items-center justify-center px-8 py-3 bg-white/5 backdrop-blur-xl text-white font-bold rounded-2xl border-2 border-white/20 hover:border-amber-400/50 hover:bg-white/10 transition-all duration-500 shadow-2xl hover:shadow-white/10 text-base"
                >
                  <span className="flex items-center space-x-2">
                    <span>Sign In</span>
                    <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </span>
                </button>
              </>
            )}
          </div>

          {/* Floating feature preview */}
          <div className="relative">
            <div className="inline-flex items-center space-x-6 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-3 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Real-time Analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Cloud Sync</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>Multi-device</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
