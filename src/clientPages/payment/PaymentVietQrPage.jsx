import { useState } from 'react';
import { ArrowLeft, ArrowRight, Loader2, Zap, CheckCircle2 } from 'lucide-react';
import BankSelect from '../../components/payment/BankSelect.jsx';
import QRDisplay from '../../components/payment/QRDisplay.jsx';
import StepIndicator from '../../components/payment/StepIndicator.jsx';
import PaymentTimer from '../../components/payment/PaymentTimer.jsx';
import OrderSummary from '../../components/payment/OrderSummary.jsx';
import StatusBadge from '../../components/payment/StatusBadge.jsx';
import QuickLinkPanel from '../../components/payment/QuickLinkPanel.jsx';
import ApiPaymentVietQr from '../../apis/payment/ApiPaymentVietQr.js';
import { formatCurrency, formatNumber, parseNumber, sanitizeAddInfo } from '../../utils/format.js';
import clsx from 'clsx';

const DEMO_ITEMS = [
  { name: 'MacBook Pro M4', qty: 1, price: 35990000 },
  { name: 'Apple Care+', qty: 1, price: 2990000 },
];
const DEMO_TOTAL = DEMO_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);

export default function PaymentPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    bankBin: '970415',
    bankInfo: null,
    accountNo: '113366668888',
    accountName: 'NGUYEN VAN A',
    amount: formatNumber(DEMO_TOTAL),
    addInfo: 'Thanh toan don hang',
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [payment, setPayment] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);

  const validate = () => {
    const errs = {};
    if (!form.bankBin) errs.bankBin = 'Vui lòng chọn ngân hàng';
    if (!form.accountNo || form.accountNo.length < 6) errs.accountNo = 'Số tài khoản không hợp lệ';
    if (!parseNumber(form.amount)) errs.amount = 'Vui lòng nhập số tiền';
    return errs;
  };

  const handleNext = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    setFormErrors({});
    setLoading(true);
    try {
      const res = await ApiPaymentVietQr.createOrder({
        items: DEMO_ITEMS,
        totalAmount: parseNumber(form.amount),
        description: sanitizeAddInfo(form.addInfo),
        bankBin: form.bankBin,
        accountNo: form.accountNo,
        accountName: form.accountName,
      });

      if (!res.success) {
        throw new Error(res.message || 'Không thể tạo đơn hàng VietQR');
      }

      setOrder(res.order);
      setPayment(res.payment);
      setOrderStatus('pending');
      setStep(2);
    } catch (err) {
      setFormErrors({ submit: err.message || 'Đã có lỗi xảy ra' });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!order) return;
    setLoading(true);
    try {
      const res = await ApiPaymentVietQr.confirmOrder(order.orderId);
      if (!res.success) {
        throw new Error(res.message || 'Không thể xác nhận thanh toán');
      }
      setOrderStatus('paid');
      setStep(3);
    } catch (err) {
      setFormErrors({ submit: err.message || 'Đã có lỗi khi xác nhận thanh toán' });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1); setOrder(null); setPayment(null);
    setOrderStatus(null); setFormErrors({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-surface-border bg-surface/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-gradient">VietQR Pay</span>
          </div>
          <div className="flex items-center gap-3">
            {order && <StatusBadge status={orderStatus} />}
            {order && <span className="text-xs text-gray-500 font-mono hidden sm:inline">#{order.orderId}</span>}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <div className="mb-10"><StepIndicator current={step} /></div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-5">

            {step === 1 && (
              <div className="card p-6 space-y-5 animate-fade-up">
                <div>
                  <h2 className="text-xl font-display font-bold text-white">Thông tin thanh toán</h2>
                  <p className="text-sm text-gray-500 mt-1">Nhập thông tin tài khoản nhận tiền VietQR</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="label">Ngân hàng nhận tiền *</label>
                    <BankSelect
                      value={form.bankBin}
                      onChange={(bin, bank) => setForm((f) => ({ ...f, bankBin: bin, bankInfo: bank }))}
                      error={formErrors.bankBin}
                    />
                  </div>

                  <div>
                    <label className="label">Số tài khoản *</label>
                    <input
                      value={form.accountNo}
                      onChange={(e) => setForm((f) => ({ ...f, accountNo: e.target.value.replace(/\D/g, '') }))}
                      placeholder="Nhập số tài khoản"
                      maxLength={19}
                      className={clsx('input font-mono', formErrors.accountNo && 'border-red-500/70')}
                    />
                    {formErrors.accountNo && <p className="mt-1.5 text-red-400 text-xs">{formErrors.accountNo}</p>}
                  </div>

                  <div>
                    <label className="label">Tên chủ tài khoản</label>
                    <input
                      value={form.accountName}
                      onChange={(e) => setForm((f) => ({ ...f, accountName: e.target.value.toUpperCase() }))}
                      placeholder="NGUYEN VAN A"
                      className="input uppercase"
                    />
                  </div>

                  <div>
                    <label className="label">Số tiền *</label>
                    <div className="relative">
                      <input
                        value={form.amount}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, '');
                          setForm((f) => ({ ...f, amount: formatNumber(raw) }));
                        }}
                        placeholder="0"
                        className={clsx('input pr-14', formErrors.amount && 'border-red-500/70')}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₫</span>
                    </div>
                    {form.amount && (
                      <p className="mt-1 text-xs text-gray-500">= {formatCurrency(parseNumber(form.amount))}</p>
                    )}
                    {formErrors.amount && <p className="mt-1.5 text-red-400 text-xs">{formErrors.amount}</p>}
                  </div>

                  <div>
                    <label className="label">Nội dung chuyển khoản</label>
                    <input
                      value={form.addInfo}
                      onChange={(e) => setForm((f) => ({ ...f, addInfo: e.target.value }))}
                      placeholder="Ghi chú (tối đa 25 ký tự, không dấu)"
                      maxLength={50}
                      className="input"
                    />
                    <p className="mt-1 text-xs text-gray-600">Sẽ gửi: "{sanitizeAddInfo(form.addInfo)}"</p>
                  </div>

                  {formErrors.submit && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                      {formErrors.submit}
                    </div>
                  )}
                </div>

                <button onClick={handleNext} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  {loading ? 'Đang tạo đơn hàng...' : 'Tạo mã QR thanh toán'}
                  {!loading && <ArrowRight size={16} />}
                </button>
              </div>
            )}

            {step === 2 && payment && (
              <div className="card p-6 space-y-5 animate-fade-up">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-display font-bold text-white">Quét mã QR thanh toán</h2>
                    <p className="text-sm text-gray-500 mt-1">Mở app ngân hàng và quét mã QR</p>
                  </div>
                  <button onClick={() => setStep(1)} className="btn-ghost flex items-center gap-1.5 text-sm">
                    <ArrowLeft size={14} /> Sửa
                  </button>
                </div>

                {order && (
                  <PaymentTimer expiresAt={order.expiresAt} onExpire={() => setOrderStatus('expired')} />
                )}

                <QRDisplay
                  qrImageUrl={payment.qrImageUrl}
                  deeplink={payment.deeplink}
                  accountInfo={{ accountName: form.accountName, accountNo: form.accountNo, bankName: form.bankInfo?.name }}
                  amount={parseNumber(form.amount)}
                  addInfo={sanitizeAddInfo(form.addInfo)}
                  onRegenerate={reset}
                />

                <div className="pt-2 border-t border-surface-border">
                  <p className="text-xs text-gray-600 text-center mb-4">Sau khi chuyển khoản xong, nhấn xác nhận</p>
                  <button
                    onClick={handleConfirm}
                    disabled={loading || orderStatus === 'expired'}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                    {loading ? 'Đang xác nhận...' : 'Xác nhận đã thanh toán'}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="card p-8 text-center space-y-5 animate-fade-up">
                <div className="w-20 h-20 rounded-full bg-brand-500/15 border-2 border-brand-500/30 flex items-center justify-center mx-auto glow">
                  <CheckCircle2 size={40} className="text-brand-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-white">Thanh toán thành công!</h2>
                  <p className="text-gray-400 mt-2">Cảm ơn bạn đã thanh toán qua VietQR</p>
                </div>
                {order && (
                  <div className="card-elevated p-4 text-left space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Mã đơn hàng</span>
                      <span className="font-mono font-medium text-white">#{order.orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Số tiền</span>
                      <span className="font-bold text-brand-400">{formatCurrency(order.totalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Trạng thái</span>
                      <StatusBadge status="paid" />
                    </div>
                  </div>
                )}
                <button onClick={reset} className="btn-secondary w-full">Tạo thanh toán mới</button>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <OrderSummary items={DEMO_ITEMS} totalAmount={DEMO_TOTAL} />
            <QuickLinkPanel bankBin={form.bankBin} accountNo={form.accountNo} />
          </div>
        </div>
      </main>
    </div>
  );
}
