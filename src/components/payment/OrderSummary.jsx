import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { formatCurrency } from '../../utils/format.js';

export default function OrderSummary({ items = [], totalAmount }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
        <ShoppingBag size={13} className="text-emerald-500" />
        Đơn hàng
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm text-slate-700 font-medium leading-tight">{item.name}</p>
              {item.qty > 1 && (
                <p className="text-xs text-slate-400 mt-0.5">×{item.qty}</p>
              )}
            </div>
            <span className="text-sm font-semibold text-slate-800 shrink-0">
              {formatCurrency(item.price * (item.qty || 1))}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-dashed border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">Tổng cộng</span>
        <span className="text-base font-semibold text-emerald-600">
          {formatCurrency(totalAmount)}
        </span>
      </div>
    </div>
  );
}
