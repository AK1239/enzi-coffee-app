'use client';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  colorScheme: 'amber' | 'emerald' | 'purple';
}

export default function FeatureCard({
  icon,
  title,
  description,
  colorScheme,
}: FeatureCardProps) {
  const colorClasses = {
    amber: {
      border: 'hover:border-amber-400/30',
      shadow: 'hover:shadow-amber-500/20',
      gradient: 'from-amber-500/5 to-orange-500/5',
      iconBg: 'from-amber-400 via-orange-500 to-amber-600',
      titleHover: 'group-hover:text-amber-300',
    },
    emerald: {
      border: 'hover:border-emerald-400/30',
      shadow: 'hover:shadow-emerald-500/20',
      gradient: 'from-emerald-500/5 to-teal-500/5',
      iconBg: 'from-emerald-400 via-teal-500 to-emerald-600',
      titleHover: 'group-hover:text-emerald-300',
    },
    purple: {
      border: 'hover:border-purple-400/30',
      shadow: 'hover:shadow-purple-500/20',
      gradient: 'from-purple-500/5 to-pink-500/5',
      iconBg: 'from-purple-400 via-pink-500 to-purple-600',
      titleHover: 'group-hover:text-purple-300',
    },
  };

  const colors = colorClasses[colorScheme];

  return (
    <div
      className={`group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 ${colors.border} shadow-2xl ${colors.shadow} transition-all duration-500 hover:scale-105 overflow-hidden`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
      ></div>
      <div className="relative z-10">
        <div
          className={`w-16 h-16 bg-gradient-to-br ${colors.iconBg} rounded-2xl flex items-center justify-center mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-500`}
        >
          <span className="text-2xl">{icon}</span>
        </div>
        <h3
          className={`text-xl font-bold text-white mb-3 ${colors.titleHover} transition-colors duration-300`}
        >
          {title}
        </h3>
        <p className="text-gray-300 leading-relaxed text-base">{description}</p>
      </div>
    </div>
  );
}
