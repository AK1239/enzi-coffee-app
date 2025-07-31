import { Order } from '../../types';

interface OrdersTableProps {
  orders: Order[];
  title: string;
  formatCurrency: (amount: number) => string;
  formatDate: (date: string | Date) => string;
  emptyMessage: string;
  emptyDescription: string;
}

export default function OrdersTable({
  orders,
  title,
  formatCurrency,
  formatDate,
  emptyMessage,
  emptyDescription,
}: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-slate-400"
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
        </div>
        <h3 className="text-lg font-medium text-white mb-2">{emptyMessage}</h3>
        <p className="text-slate-400">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-white">
          {title} ({orders.length})
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/30">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                {title.includes('Today') ? 'Time' : 'Date'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {orders.map(order => (
              <tr
                key={order.id}
                className="hover:bg-slate-700/20 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {order.id.slice(0, 8)}...
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.name}</span>
                        <span className="text-slate-400">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {formatCurrency(order.totalAmount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                  {formatDate(order.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
