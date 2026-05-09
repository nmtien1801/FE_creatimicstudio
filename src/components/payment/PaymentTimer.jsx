import { Clock, AlertCircle } from 'lucide-react';
import { usePaymentTimer } from '../../utils/vietQRhooks/usePaymentTimer.js';
import clsx from 'clsx';

export default function PaymentTimer({ expiresAt, onExpire }) {
  const remaining = usePaymentTimer(expiresAt, onExpire);

  if (!remaining) {
    return (
      <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
        <AlertCircle size={15} />
        <span>Mã QR đã hết hạn</span>
      </div>
    );
  }

  const [mins, secs] = remaining.split(':').map(Number);
  const isUrgent = mins === 0 && secs <= 60;

  return (
    <div className={clsx(
      'flex items-center gap-2 text-sm font-medium transition-colors',
      isUrgent ? 'text-orange-400' : 'text-gray-400'
    )}>
      <Clock size={14} className={isUrgent ? 'animate-pulse' : ''} />
      <span>Hết hạn sau</span>
      <span className={clsx(
        'font-mono font-bold tabular-nums',
        isUrgent ? 'text-orange-300' : 'text-brand-400'
      )}>
        {remaining}
      </span>
    </div>
  );
}
