import { DailySummary } from '../../types';

interface SalesSummaryCardsProps {
  dailySummary: DailySummary;
  formatCurrency: (amount: number) => string;
}

export default function SalesSummaryCards({
  dailySummary,
  formatCurrency,
}: SalesSummaryCardsProps) {
  const cards = [
    {
      title: 'Total Orders',
      value: dailySummary.totalOrders,
      color: 'green',
      icon: (
        <svg
          className="w-6 h-6 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(dailySummary.totalAmount),
      color: 'blue',
      icon: (
        <svg
          className="w-6 h-6 text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
    },
    {
      title: 'Items Sold',
      value: dailySummary.totalItems,
      color: 'purple',
      icon: (
        <svg
          className="w-6 h-6 text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      green:
        'from-green-500/10 to-emerald-500/10 border-green-500/20 text-green-400 bg-green-500/20',
      blue: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-400 bg-blue-500/20',
      purple:
        'from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400 bg-purple-500/20',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.green;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const colorClasses = getColorClasses(card.color);
        const [gradient, border, textColor, bgColor] = colorClasses.split(' ');

        return (
          <div
            key={index}
            className={`bg-gradient-to-r ${gradient} border ${border} rounded-xl p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`${textColor} text-sm font-medium`}>
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-white">{card.value}</p>
              </div>
              <div
                className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
