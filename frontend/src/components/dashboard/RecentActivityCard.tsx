interface ActivityItem {
  id: string;
  title: string;
  time: string;
  type: 'success' | 'info' | 'warning';
  icon: React.ReactNode;
}

interface RecentActivityCardProps {
  activities: ActivityItem[];
}

const typeConfig = {
  success: {
    bg: 'bg-green-500/20',
    iconColor: 'text-green-400',
  },
  info: {
    bg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
  },
  warning: {
    bg: 'bg-yellow-500/20',
    iconColor: 'text-yellow-400',
  },
};

export default function RecentActivityCard({ activities }: RecentActivityCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const config = typeConfig[activity.type];
          return (
            <div key={activity.id} className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-xl">
              <div className={`w-8 h-8 ${config.bg} rounded-full flex items-center justify-center`}>
                <div className={config.iconColor}>{activity.icon}</div>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{activity.title}</p>
                <p className="text-slate-400 text-xs">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 