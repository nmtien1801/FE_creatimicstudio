import { useState } from 'react';
import { Zap, ExternalLink } from 'lucide-react';
import { formatNumber, parseNumber, sanitizeAddInfo } from '../../utils/format.js';

const TEMPLATES = [
  { value: 'compact2', label: 'compact2 — 540×640' },
  { value: 'compact', label: 'compact — 540×540' },
  { value: 'qr_only', label: 'qr_only — 480×480' },
  { value: 'print', label: 'print — 600×776' },
];

export default function QuickLinkPanel({ bankBin, accountNo }) {
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [template, setTemplate] = useState('compact2');
  const [url, setUrl] = useState('');

  const generate = () => {
    if (!bankBin || !accountNo) return;
    const params = new URLSearchParams();
    const amt = parseNumber(amount);
    if (amt) params.set('amount', amt);
    const safeDesc = sanitizeAddInfo(desc);
    if (safeDesc) params.set('addInfo', safeDesc);
    const q = params.toString();
    setUrl(`https://img.vietqr.io/image/${bankBin}-${accountNo}-${template}.png${q ? '?' + q : ''}`);
  };

  return (
    <div className="card p-4 space-y-4">
      <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
        <Zap size={13} className="text-brand-400" /> Quick Link Generator
      </h3>

      <div className="space-y-3">
        <div>
          <label className="label text-xs">Số tiền (tuỳ chọn)</label>
          <input
            value={amount}
            onChange={(e) => setAmount(formatNumber(e.target.value.replace(/\D/g, '')))}
            placeholder="0 ₫"
            className="input text-sm py-2"
          />
        </div>

        <div>
          <label className="label text-xs">Nội dung</label>
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            maxLength={50}
            placeholder="Nội dung chuyển khoản"
            className="input text-sm py-2"
          />
        </div>

        <div>
          <label className="label text-xs">Template</label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="input text-sm py-2 bg-surface-elevated"
          >
            {TEMPLATES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <button
          onClick={generate}
          disabled={!bankBin || !accountNo}
          className="btn-primary w-full text-sm py-2.5"
        >
          Tạo Quick Link
        </button>

        {url && (
          <div className="space-y-3 animate-fade-up">
            <img
              src={url}
              alt="Quick Link QR"
              className="w-full rounded-xl bg-white p-2 shadow-lg shadow-black/30"
            />
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 break-all leading-relaxed"
            >
              <ExternalLink size={11} className="shrink-0" />
              {url}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
