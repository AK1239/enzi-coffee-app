interface QuickAction {
  title: string;
  icon: React.ReactNode;
  color: 'amber' | 'blue' | 'green';
  onClick?: () => void;
}

interface QuickActionsCardProps {
  actions: QuickAction[];
}

const colorConfig = {
  amber: {
    bg: 'bg-gradient-to-r from-amber-500/20 to-orange-500/20',
    border: 'border-amber-400/30',
    hover: 'hover:from-amber-500/30 hover:to-orange-500/30',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
  },
  blue: {
    bg: 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20',
    border: 'border-blue-400/30',
    hover: 'hover:from-blue-500/30 hover:to-indigo-500/30',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
  },
  green: {
    bg: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20',
    border: 'border-green-400/30',
    hover: 'hover:from-green-500/30 hover:to-emerald-500/30',
    iconBg: 'bg-green-500/20',
    iconColor: 'text-green-400',
  },
};

export default function QuickActionsCard({ actions }: QuickActionsCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, index) => {
          const config = colorConfig[action.color];
          return (
            <button
              key={index}
              onClick={action.onClick}
              className={`w-full flex items-center justify-between p-4 ${config.bg} border ${config.border} rounded-xl ${config.hover} transition-all duration-300 cursor-pointer`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${config.iconBg} rounded-lg flex items-center justify-center`}>
                  <div className={config.iconColor}>{action.icon}</div>
                </div>
                <span className="text-white font-medium">{action.title}</span>
              </div>
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
} 