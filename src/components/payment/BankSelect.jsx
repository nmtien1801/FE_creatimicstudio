import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Building2 } from 'lucide-react';
import { useBanks } from '../../utils/vietQRhooks/useBanks.js';
import clsx from 'clsx';

export default function BankSelect({ value, onChange, error }) {
  const { banks, loading } = useBanks();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);

  const selected = banks.find((b) => b.bin === value);

  const filtered = query
    ? banks.filter(
        (b) =>
          b.shortName.toLowerCase().includes(query.toLowerCase()) ||
          b.name.toLowerCase().includes(query.toLowerCase()) ||
          b.bin.includes(query)
      )
    : banks;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={clsx(
          'input flex items-center justify-between gap-3 text-left',
          error && 'border-red-500/70 focus:ring-red-500/30',
          !selected && 'text-gray-600'
        )}
      >
        {selected ? (
          <span className="flex items-center gap-3">
            <img
              src={selected.logo}
              alt={selected.shortName}
              className="w-6 h-6 object-contain rounded"
              onError={(e) => (e.target.style.display = 'none')}
            />
            <span className="font-medium text-white">{selected.shortName}</span>
            <span className="text-gray-500 text-sm truncate">{selected.name}</span>
          </span>
        ) : (
          <span className="flex items-center gap-2 text-gray-500">
            <Building2 size={16} />
            {loading ? 'Đang tải ngân hàng...' : 'Chọn ngân hàng'}
          </span>
        )}
        <ChevronDown
          size={16}
          className={clsx('text-gray-500 shrink-0 transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full card-elevated shadow-xl shadow-black/40 overflow-hidden animate-fade-up">
          <div className="p-3 border-b border-surface-border">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm ngân hàng..."
                className="w-full bg-surface pl-8 pr-3 py-2 text-sm rounded-lg border border-surface-border
                           text-white placeholder-gray-600 focus:outline-none focus:border-brand-600"
              />
            </div>
          </div>

          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="p-4 text-center text-gray-500 text-sm">Không tìm thấy</p>
            ) : (
              filtered.map((bank) => (
                <button
                  key={bank.bin}
                  type="button"
                  onClick={() => { onChange(bank.bin, bank); setOpen(false); setQuery(''); }}
                  className={clsx(
                    'w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-surface-border transition-colors text-left',
                    bank.bin === value && 'bg-brand-950/50 text-brand-400'
                  )}
                >
                  <img
                    src={bank.logo}
                    alt={bank.shortName}
                    className="w-6 h-6 object-contain rounded shrink-0"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                  <span className="font-semibold w-20 shrink-0">{bank.shortName}</span>
                  <span className="text-gray-500 truncate">{bank.name}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {error && <p className="mt-1.5 text-red-400 text-xs">{error}</p>}
    </div>
  );
}
