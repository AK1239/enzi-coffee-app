'use client';

interface FooterProps {
  visibleSections: Set<string>;
}

export default function Footer({ visibleSections }: FooterProps) {
  return (
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
  );
}
