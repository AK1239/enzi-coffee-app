'use client';

import FeatureCard from './FeatureCard';

interface FeaturesSectionProps {
  visibleSections: Set<string>;
}

export default function FeaturesSection({
  visibleSections,
}: FeaturesSectionProps) {
  const features = [
    {
      icon: '⚡',
      title: 'Lightning Speed',
      description:
        'Process orders in milliseconds with our quantum-optimized interface. Zero lag, maximum efficiency.',
      colorScheme: 'amber' as const,
    },
    {
      icon: '🧠',
      title: 'AI Analytics',
      description:
        'Predictive insights powered by machine learning. Forecast trends and optimize inventory automatically.',
      colorScheme: 'emerald' as const,
    },
    {
      icon: '🎨',
      title: 'Brand Magic',
      description:
        "Stunning, customizable receipts and reports that reflect your brand's unique personality and style.",
      colorScheme: 'purple' as const,
    },
  ];

  return (
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
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              colorScheme={feature.colorScheme}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
