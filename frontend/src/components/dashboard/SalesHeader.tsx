interface SalesHeaderProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export default function SalesHeader({
  selectedDate,
  onDateChange,
}: SalesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Sales Analytics</h1>
        <p className="text-slate-400">
          Track your daily sales and order history
        </p>
      </div>
      <div className="mt-4 sm:mt-0">
        <input
          type="date"
          value={selectedDate}
          onChange={e => onDateChange(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>
    </div>
  );
}
