interface SalesTabsProps {
  activeTab: 'daily' | 'history';
  onTabChange: (tab: 'daily' | 'history') => void;
}

export default function SalesTabs({ activeTab, onTabChange }: SalesTabsProps) {
  const tabs = [
    { id: 'daily', label: 'Todays Orders' },
    { id: 'history', label: 'Order History' },
  ] as const;

  return (
    <div className="border-b border-slate-700">
      <nav className="flex space-x-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
