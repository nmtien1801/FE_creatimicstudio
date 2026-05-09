import { useState } from 'react';
import { Download, Copy, Check, ExternalLink, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

export default function QRDisplay({ qrImageUrl, qrDataURL, deeplink, accountInfo, amount, addInfo, onRegenerate }) {
  const [copied, setCopied] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const src = qrDataURL || qrImageUrl;

  const copyDeeplink = async () => {
    if (!deeplink) return;
    await navigator.clipboard.writeText(deeplink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    if (!src) return;
    const a = document.createElement('a');
    a.href = src;
    a.download = `vietqr-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {/* QR Image */}
      <div className="relative">
        {!imgLoaded && (
          <div className="w-52 h-52 rounded-2xl qr-shimmer" />
        )}
        <img
          src={src}
          alt="VietQR Code"
          onLoad={() => setImgLoaded(true)}
          className={clsx(
            'w-52 h-52 rounded-2xl object-contain bg-white p-2 shadow-xl shadow-black/40 transition-opacity duration-300',
            imgLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
          )}
        />
      </div>

      {/* Bank info */}
      {accountInfo && (
        <div className="text-center space-y-0.5">
          <p className="font-semibold text-white">{accountInfo.accountName}</p>
          <p className="text-sm text-gray-400 font-mono">{accountInfo.accountNo}</p>
          {accountInfo.bankName && (
            <p className="text-xs text-gray-500">{accountInfo.bankName}</p>
          )}
        </div>
      )}

      {/* Amount & description */}
      {(amount || addInfo) && (
        <div className="w-full card px-4 py-3 space-y-1 text-center">
          {amount > 0 && (
            <p className="text-brand-400 font-bold text-lg">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(amount)}
            </p>
          )}
          {addInfo && <p className="text-sm text-gray-400">{addInfo}</p>}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 w-full">
        <button onClick={download} className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm">
          <Download size={15} /> Tải QR
        </button>

        {deeplink && (
          <button onClick={copyDeeplink} className={clsx(
            'btn-secondary flex-1 flex items-center justify-center gap-2 text-sm transition-colors',
            copied && 'text-brand-400 border-brand-700'
          )}>
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? 'Đã sao chép' : 'Sao chép link'}
          </button>
        )}
      </div>

      {deeplink && (
        <a
          href={deeplink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
        >
          <ExternalLink size={15} /> Mở app ngân hàng
        </a>
      )}

      {onRegenerate && (
        <button
          onClick={onRegenerate}
          className="btn-ghost flex items-center gap-2 text-sm"
        >
          <RefreshCw size={14} /> Tạo mã mới
        </button>
      )}
    </div>
  );
}
