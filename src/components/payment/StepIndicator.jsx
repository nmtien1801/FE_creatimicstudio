import { Check } from 'lucide-react';
import clsx from 'clsx';

const steps = [
  { id: 1, label: 'Thông tin' },
  { id: 2, label: 'Xem QR' },
  { id: 3, label: 'Xác nhận' },
];

export default function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0 w-full max-w-xs mx-auto">
      {steps.map((step, i) => {
        const done = current > step.id;
        const active = current === step.id;

        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5">
              <div className={clsx(
                'step-indicator border-2 transition-all duration-300',
                done
                  ? 'bg-brand-500 border-brand-500 text-white'
                  : active
                  ? 'border-brand-500 text-brand-400 bg-brand-950/50'
                  : 'border-surface-border text-gray-600 bg-surface-card'
              )}>
                {done ? <Check size={14} strokeWidth={3} /> : step.id}
              </div>
              <span className={clsx(
                'text-xs font-medium whitespace-nowrap transition-colors',
                active ? 'text-brand-400' : done ? 'text-gray-400' : 'text-gray-600'
              )}>
                {step.label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div className={clsx(
                'flex-1 h-px mx-2 mb-5 transition-colors duration-500',
                current > step.id ? 'bg-brand-500' : 'bg-surface-border'
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
