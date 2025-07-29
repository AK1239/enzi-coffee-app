'use client';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  testimonial: string;
  colorScheme: 'amber' | 'emerald' | 'purple';
}

export default function TestimonialCard({
  name,
  role,
  company,
  testimonial,
  colorScheme,
}: TestimonialCardProps) {
  const colorClasses = {
    amber: {
      border: 'hover:border-amber-400/30',
      shadow: 'hover:shadow-amber-500/20',
      gradient: 'from-amber-500/5 to-orange-500/5',
      avatarBg: 'from-amber-400 to-orange-500',
      stars: 'text-amber-400',
    },
    emerald: {
      border: 'hover:border-emerald-400/30',
      shadow: 'hover:shadow-emerald-500/20',
      gradient: 'from-emerald-500/5 to-teal-500/5',
      avatarBg: 'from-emerald-400 to-teal-500',
      stars: 'text-emerald-400',
    },
    purple: {
      border: 'hover:border-purple-400/30',
      shadow: 'hover:shadow-purple-500/20',
      gradient: 'from-purple-500/5 to-pink-500/5',
      avatarBg: 'from-purple-400 to-pink-500',
      stars: 'text-purple-400',
    },
  };

  const colors = colorClasses[colorScheme];
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('');

  return (
    <div
      className={`group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 ${colors.border} shadow-2xl ${colors.shadow} transition-all duration-500 hover:scale-105 overflow-hidden`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
      ></div>
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <div
            className={`w-12 h-12 bg-gradient-to-br ${colors.avatarBg} rounded-full flex items-center justify-center text-white font-bold text-lg mr-4`}
          >
            {initials}
          </div>
          <div>
            <h4 className="text-white font-semibold">{name}</h4>
            <p className="text-gray-400 text-sm">
              {role}, {company}
            </p>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed text-base mb-4">
          &ldquo;{testimonial}&rdquo;
        </p>
        <div className={`flex ${colors.stars}`}>
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-lg">
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
