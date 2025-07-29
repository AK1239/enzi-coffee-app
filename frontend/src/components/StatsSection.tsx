'use client';

interface StatsSectionProps {
  visibleSections: Set<string>;
}

export default function StatsSection({ visibleSections }: StatsSectionProps) {
  const stats = [
    {
      value: '500+',
      title: 'Coffee Shops Powered',
      subtitle: 'Across 25 countries',
      colorScheme: 'amber',
    },
    {
      value: '99.9%',
      title: 'Uptime Guarantee',
      subtitle: 'Rock-solid reliability',
      colorScheme: 'emerald',
    },
    {
      value: '24/7',
      title: 'Expert Support',
      subtitle: 'Always here to help',
      colorScheme: 'purple',
    },
  ];

  const colorClasses = {
    amber: 'from-amber-300 to-orange-400',
    emerald: 'from-emerald-300 to-teal-400',
    purple: 'from-purple-300 to-pink-400',
  };

  return (
    <div
      id="stats"
      data-section
      className={`relative z-10 py-20 bg-gradient-to-r from-amber-600/10 to-orange-600/10 backdrop-blur-3xl border-y border-white/10 transition-all duration-1000 ${visibleSections.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div
                className={`text-4xl lg:text-5xl font-black bg-gradient-to-r ${colorClasses[stat.colorScheme as keyof typeof colorClasses]} bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300`}
              >
                {stat.value}
              </div>
              <div className="text-gray-300 text-lg font-medium">
                {stat.title}
              </div>
              <div className="text-gray-500 text-sm mt-1">{stat.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
