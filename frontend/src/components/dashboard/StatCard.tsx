interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'yellow' | 'purple';
}

const colorConfig = {
  blue: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    icon: 'text-blue-400',
  },
  green: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    icon: 'text-green-400',
  },
  yellow: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    icon: 'text-yellow-400',
  },
  purple: {
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
    icon: 'text-purple-400',
  },
};

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  const config = colorConfig[color];

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div
          className={`w-12 h-12 ${config.bg} rounded-xl flex items-center justify-center shadow-lg`}
        >
          <div className={config.icon}>{icon}</div>
        </div>
      </div>
    </div>
  );
}
