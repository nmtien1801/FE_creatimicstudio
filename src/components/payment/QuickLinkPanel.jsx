import React, { useState } from 'react';
import { Link, Copy, Check, ExternalLink } from 'lucide-react';
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
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!bankBin || !accountNo) return;
    const params = new URLSearchParams();
    const amt = parseNumber(amount);
    if (amt) params.set('amount', amt);
    const safe = sanitizeAddInfo(desc);
    if (safe) params.set('addInfo', safe);
    const q = params.toString();
    setUrl(`https://img.vietqr.io/image/${bankBin}-${accountNo}-${template}.png${q ? '?' + q : ''}`);
  };

  const copy = async () => {
    if (!url) return;
    try { await navigator.clipboard.writeText(url); } catch { }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
        <Link size={13} className="text-emerald-500" />
        Quick Link Generator
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-[11px] text-slate-400 mb-1.5">Số tiền (tuỳ chọn)</label>
          <input
            value={amount}
            onChange={e => setAmount(formatNumber(e.target.value.replace(/\D/g, '')))}
            placeholder="0 ₫"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/60 text-xs font-mono text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10"
          />
        </div>

        <div>
          <label className="block text-[11px] text-slate-400 mb-1.5">Nội dung</label>
          <input
            value={desc}
            onChange={e => setDesc(e.target.value)}
            maxLength={50}
            placeholder="Nội dung chuyển khoản"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/60 text-xs text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10"
          />
        </div>

        <div>
          <label className="block text-[11px] text-slate-400 mb-1.5">Template</label>
          <select
            value={template}
            onChange={e => setTemplate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/60 text-xs text-slate-700 outline-none focus:border-emerald-400"
          >
            {TEMPLATES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <button
          onClick={generate}
          disabled={!bankBin || !accountNo}
          className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-100 disabled:text-slate-400 text-white text-xs font-semibold transition-colors"
        >
          Tạo Quick Link
        </button>

        {url && (
          <div className="space-y-2 pt-1">
            <img
              src={url}
              alt="Quick Link QR"
              className="w-full rounded-xl border border-slate-100 bg-white p-2"
            />
            <div className="flex gap-2">
              <button
                onClick={copy}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-[11px] font-medium transition-colors ${copied
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                {copied ? <Check size={11} /> : <Copy size={11} />}
                {copied ? 'Đã sao chép' : 'Sao chép URL'}
              </button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-[11px] text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <ExternalLink size={11} /> Xem
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
