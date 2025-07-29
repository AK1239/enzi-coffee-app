'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 relative overflow-hidden">
      {/* Dynamic gradient overlays */}
      <div className="absolute inset-0">
        <div
          className="absolute -top-96 -right-96 w-[800px] h-[800px] bg-gradient-to-br from-amber-500/20 via-orange-600/15 to-transparent rounded-full blur-3xl transform"
          style={{
            transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.1}px)`,
          }}
        ></div>
        <div
          className="absolute -bottom-96 -left-96 w-[900px] h-[900px] bg-gradient-to-tr from-orange-500/15 via-amber-600/20 to-transparent rounded-full blur-3xl transform"
          style={{
            transform: `translate(${-scrollY * 0.15}px, ${-scrollY * 0.1}px)`,
          }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-400/10 via-orange-500/15 to-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Use the Navigation component */}
      <Navigation />

      {/* Hero Section */}
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
              . Boost efficiency, delight customers, and scale your business
              with cutting-edge technology.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 hover:scale-105 overflow-hidden text-base"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Enter Dashboard</span>
                    <span className="text-xl">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
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
                  </Link>
                  <Link
                    href="/login"
                    className="group inline-flex items-center justify-center px-8 py-3 bg-white/5 backdrop-blur-xl text-white font-bold rounded-2xl border-2 border-white/20 hover:border-amber-400/50 hover:bg-white/10 transition-all duration-500 shadow-2xl hover:shadow-white/10 text-base"
                  >
                    <span className="flex items-center space-x-2">
                      <span>Sign In</span>
                      <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </span>
                  </Link>
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

      {/* Features Section with enhanced cards */}
      <div
        id="features"
        data-section
        className={`relative z-10 py-20 transition-all duration-1000 ${visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Everything you need to transform your coffee shop into a modern,
              efficient business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 - Enhanced */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 hover:border-amber-400/30 shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors duration-300">
                  Lightning Speed
                </h3>
                <p className="text-gray-300 leading-relaxed text-base">
                  Process orders in milliseconds with our quantum-optimized
                  interface. Zero lag, maximum efficiency.
                </p>
              </div>
            </div>

            {/* Feature 2 - Enhanced */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 hover:border-emerald-400/30 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                  AI Analytics
                </h3>
                <p className="text-gray-300 leading-relaxed text-base">
                  Predictive insights powered by machine learning. Forecast
                  trends and optimize inventory automatically.
                </p>
              </div>
            </div>

            {/* Feature 3 - Enhanced */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  Brand Magic
                </h3>
                <p className="text-gray-300 leading-relaxed text-base">
                  Stunning, customizable receipts and reports that reflect your
                  brand&apos;s unique personality and style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Testimonials Section */}
      <div
        id="testimonials"
        data-section
        className={`relative z-10 py-20 transition-all duration-1000 ${visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                What Our Customers Say
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Join hundreds of coffee shop owners who have transformed their
              business with Enzi Coffee POS
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 hover:border-amber-400/30 shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Sarah Chen</h4>
                    <p className="text-gray-400 text-sm">
                      Brew & Bean, San Francisco
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed text-base mb-4">
                  &ldquo;Enzi Coffee POS has completely revolutionized our
                  operations. The AI analytics helped us increase our daily
                  sales by 40% within the first month!&rdquo;
                </p>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 hover:border-emerald-400/30 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">
                      Marcus Rodriguez
                    </h4>
                    <p className="text-gray-400 text-sm">Café Latino, Miami</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed text-base mb-4">
                  &ldquo;The lightning-fast interface and intuitive design make
                  serving customers a breeze. Our staff training time was cut in
                  half!&rdquo;
                </p>
                <div className="flex text-emerald-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    E
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Emma Thompson</h4>
                    <p className="text-gray-400 text-sm">
                      Artisan Coffee, Portland
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed text-base mb-4">
                  &ldquo;The brand customization features are incredible. Our
                  receipts now perfectly match our aesthetic and customers love
                  them!&rdquo;
                </p>
                <div className="flex text-purple-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div
        id="stats"
        data-section
        className={`relative z-10 py-20 bg-gradient-to-r from-amber-600/10 to-orange-600/10 backdrop-blur-3xl border-y border-white/10 transition-all duration-1000 ${visibleSections.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-gray-300 text-lg font-medium">
                Coffee Shops Powered
              </div>
              <div className="text-gray-500 text-sm mt-1">
                Across 25 countries
              </div>
            </div>
            <div className="group">
              <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                99.9%
              </div>
              <div className="text-gray-300 text-lg font-medium">
                Uptime Guarantee
              </div>
              <div className="text-gray-500 text-sm mt-1">
                Rock-solid reliability
              </div>
            </div>
            <div className="group">
              <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-gray-300 text-lg font-medium">
                Expert Support
              </div>
              <div className="text-gray-500 text-sm mt-1">
                Always here to help
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer
        id="footer"
        data-section
        className={`relative z-10 bg-gradient-to-r from-black/40 to-black/60 backdrop-blur-2xl border-t border-white/10 py-12 transition-all duration-1000 ${visibleSections.has('footer') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-2xl">
              <span className="text-white text-lg font-bold">☕</span>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Enzi Coffee
              </span>
              <div className="text-xs text-amber-300/60 font-medium tracking-wider">
                PROFESSIONAL POS
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-base mb-3">
            Crafted with ❤️ using Next.js and cutting-edge design
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 Enzi Coffee Shop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
