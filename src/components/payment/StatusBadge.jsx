import clsx from 'clsx';
import { CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';

const STATUS_MAP = {
  pending: { label: 'Chờ thanh toán', icon: Clock, color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  paid:    { label: 'Đã thanh toán', icon: CheckCircle2, color: 'text-brand-400 bg-brand-400/10 border-brand-400/20' },
  expired: { label: 'Hết hạn', icon: XCircle, color: 'text-red-400 bg-red-400/10 border-red-400/20' },
  failed:  { label: 'Thất bại', icon: AlertCircle, color: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
};

export default function StatusBadge({ status }) {
  const cfg = STATUS_MAP[status] || STATUS_MAP.pending;
  const Icon = cfg.icon;

  return (
    <span className={clsx('badge border', cfg.color)}>
      <Icon size={12} />
      {cfg.label}
    </span>
  );
}
