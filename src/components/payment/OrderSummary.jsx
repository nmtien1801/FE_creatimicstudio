import { formatCurrency } from '../../utils/format.js';
import { ShoppingBag } from 'lucide-react';

export default function OrderSummary({ items = [], totalAmount }) {
  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-300">
        <ShoppingBag size={15} className="text-brand-400" />
        Đơn hàng
      </div>

      {items.length > 0 && (
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between items-center text-sm">
              <span className="text-gray-400">
                {item.name}
                {item.qty > 1 && <span className="text-gray-600 ml-1">×{item.qty}</span>}
              </span>
              <span className="font-medium text-white">{formatCurrency(item.price * (item.qty || 1))}</span>
            </div>
          ))}
          <div className="border-t border-surface-border pt-2" />
        </div>
      )}

      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-sm">Tổng cộng</span>
        <span className="text-brand-400 font-bold text-lg">{formatCurrency(totalAmount)}</span>
      </div>
    </div>
  );
}
