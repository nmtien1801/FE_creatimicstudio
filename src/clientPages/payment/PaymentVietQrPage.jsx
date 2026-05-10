import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Loader2, Zap, CheckCircle2,
  ShieldCheck, CreditCard, Info, Copy, ExternalLink,
  ShoppingBag, Receipt, Mail, Plus,
} from 'lucide-react';
import BankSelect from '../../components/payment/BankSelect.jsx';
import QRDisplay from '../../components/payment/QRDisplay.jsx';
import StepIndicator from '../../components/payment/StepIndicator.jsx';
import PaymentTimer from '../../components/payment/PaymentTimer.jsx';
import StatusBadge from '../../components/payment/StatusBadge.jsx';
import ApiPaymentVietQr from '../../apis/payment/ApiPaymentVietQr.js';
import { formatCurrency, formatNumber, parseNumber, sanitizeAddInfo } from '../../utils/format.js';
import clsx from 'clsx';

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Lấy sản phẩm từ state truyền sang, nếu không có thì dùng object rỗng để tránh lỗi
  const product = location.state?.product;

  // 2. Chuyển đổi sản phẩm sang định dạng danh sách item (thay cho DEMO_ITEMS)
  const currentItems = product ? [
    {
      name: product.name,
      qty: 1,
      price: product.price
    }
  ] : [];

  // Tính tổng tiền dựa trên sản phẩm thật
  const totalAmount = currentItems.reduce((s, i) => s + i.price * i.qty, 0);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    bankBin: '970415',
    bankInfo: null,
    accountNo: '113366668888',
    accountName: 'NGUYEN VAN A',
    amount: formatNumber(totalAmount),
    addInfo: `Thanh toan don hang: ${product?.name || 'don hang'}`,
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [payment, setPayment] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    if (!product) {
      toast.error("Không tìm thấy thông tin sản phẩm");
      navigate('/');
    }
  }, [product, navigate]);

  const validate = () => {
    const errs = {};
    if (!form.bankBin) errs.bankBin = 'Vui lòng chọn ngân hàng';
    if (!form.accountNo || form.accountNo.length < 6) errs.accountNo = 'Số tài khoản không hợp lệ';
    if (!parseNumber(form.amount)) errs.amount = 'Vui lòng nhập số tiền';
    return errs;
  };

  const getAppIdFromBank = (bank) => {
    if (!bank) return 'vietinbank'; // Mặc định nếu chưa chọn

    // Chuyển shortName (ví dụ: "VietinBank") thành "vietinbank"
    const shortName = bank.shortName.toLowerCase().replace(/\s+/g, '');

    // Các trường hợp đặc biệt không theo quy tắc "tên viết tắt"
    const specialCases = {
      'mbbank': 'mb',
      'vietcombank': 'vcb',
      'techcombank': 'tcb',
      'agribank': 'agribank'
    };

    return specialCases[shortName] || shortName;
  };

  const handleNext = async () => {
    const errs = validate();
    const appId = getAppIdFromBank(form.bankInfo);

    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    setFormErrors({});
    setLoading(true);
    try {
      const res = await ApiPaymentVietQr.createOrder({
        items: currentItems,
        totalAmount: parseNumber(form.amount),
        description: sanitizeAddInfo(form.addInfo),
        bankBin: form.bankBin,
        accountNo: form.accountNo,
        accountName: form.accountName,
      });
      if (!res.success) throw new Error(res.message);
      const updatedPayment = {
        ...res.payment,
        deeplink: res.payment.deeplink.replace('bank=', `app=${appId}&bank=`)
      };

      setOrder(res.order);
      setPayment(res.payment);
      setOrderStatus('pending');
      setStep(2);
    } catch (err) {
      setFormErrors({ submit: err.message || 'Lỗi hệ thống, vui lòng thử lại' });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!order) return;
    setLoading(true);
    try {
      await ApiPaymentVietQr.confirmOrder(order.orderId);
      setOrderStatus('paid');
      setStep(3);
    } catch (err) {
      setFormErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] font-['DM_Sans',sans-serif]">
      {/* ── Main ── */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Step indicator */}
        <div className="max-w-sm mx-auto mb-10">
          <StepIndicator current={step} />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-3xl">

            {/* STEP 1 — Form */}
            {step === 1 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="mb-7">
                  <h2 className="text-xl font-semibold text-slate-900">Thông tin tài khoản nhận tiền</h2>
                  <p className="text-sm text-slate-400 mt-1">Điền đầy đủ để tạo mã QR chuyển khoản</p>
                </div>

                <div className="space-y-5">
                  {/* Bank */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                      Ngân hàng thụ hưởng *
                    </label>
                    <BankSelect
                      value={form.bankBin}
                      onChange={(bin, bank) => setForm(f => ({ ...f, bankBin: bin, bankInfo: bank }))}
                      error={formErrors.bankBin}
                    />
                  </div>

                  {/* Account No + Name */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                        Số tài khoản *
                      </label>
                      <div className="relative">
                        <CreditCard size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                        <input
                          value={form.accountNo}
                          onChange={e => setForm(f => ({ ...f, accountNo: e.target.value.replace(/\D/g, '') }))}
                          placeholder="113366668888"
                          maxLength={19}
                          className={clsx(
                            'w-full pl-9 pr-4 py-3 rounded-xl border text-sm font-mono text-slate-800',
                            'bg-slate-50/60 outline-none transition-all',
                            'focus:bg-white focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500',
                            formErrors.accountNo ? 'border-red-300' : 'border-slate-200'
                          )}
                        />
                      </div>
                      {formErrors.accountNo && (
                        <p className="mt-1.5 text-xs text-red-500">{formErrors.accountNo}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                        Tên chủ tài khoản
                      </label>
                      <input
                        value={form.accountName}
                        onChange={e => setForm(f => ({ ...f, accountName: e.target.value.toUpperCase() }))}
                        placeholder="NGUYEN VAN A"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 text-sm font-semibold text-slate-800 uppercase outline-none transition-all focus:bg-white focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-dashed border-slate-100" />

                  {/* Amount */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                      Số tiền (VNĐ) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₫</span>
                      <input
                        value={form.amount}
                        onChange={e => {
                          const raw = e.target.value.replace(/\D/g, '');
                          setForm(f => ({ ...f, amount: formatNumber(raw) }));
                        }}
                        placeholder="0"
                        className={clsx(
                          'w-full pl-8 pr-4 py-3 rounded-xl border text-base font-semibold font-mono text-slate-800',
                          'bg-slate-50/60 outline-none transition-all',
                          'focus:bg-white focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500',
                          formErrors.amount ? 'border-red-300' : 'border-slate-200'
                        )}
                      />
                    </div>
                    {form.amount && (
                      <p className="mt-1.5 text-xs text-emerald-600 font-medium">
                        = {formatCurrency(parseNumber(form.amount))}
                      </p>
                    )}
                    {formErrors.amount && <p className="mt-1 text-xs text-red-500">{formErrors.amount}</p>}
                  </div>

                  {/* Add info */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                      Nội dung chuyển khoản
                    </label>
                    <input
                      value={form.addInfo}
                      onChange={e => setForm(f => ({ ...f, addInfo: e.target.value }))}
                      placeholder="Nội dung (tối đa 25 ký tự, không dấu)"
                      maxLength={50}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500"
                    />
                    <p className="mt-1.5 text-xs text-slate-400">
                      Sẽ gửi: <span className="font-mono text-slate-600">"{sanitizeAddInfo(form.addInfo)}"</span>
                    </p>
                  </div>

                  {/* Submit error */}
                  {formErrors.submit && (
                    <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                      <Info size={15} className="shrink-0 mt-0.5" />
                      {formErrors.submit}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleNext}
                  disabled={loading}
                  className="mt-8 w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold transition-all shadow-sm shadow-emerald-100 active:scale-[.99]"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Đang khởi tạo...</>
                  ) : (
                    <>Tạo mã QR thanh toán <ArrowRight size={16} /></>
                  )}
                </button>
              </div>
            )}

            {/* STEP 2 — QR */}
            {step === 2 && payment && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
                {/* Header row */}
                <div className="flex items-center justify-between mb-7">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">Quét mã QR thanh toán</h2>
                      <p className="text-sm text-slate-400 mt-0.5">Dùng app ngân hàng bất kỳ hỗ trợ VietQR</p>
                    </div>
                  </div>
                  <PaymentTimer
                    expiresAt={order?.expiresAt}
                    onExpire={() => setOrderStatus('expired')}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-8 items-start">
                  {/* QR */}
                  <QRDisplay
                    qrImageUrl={payment.qrImageUrl}
                    deeplink={payment.deeplink}
                    accountInfo={{
                      accountName: form.accountName,
                      accountNo: form.accountNo,
                      bankName: form.bankInfo?.name,
                    }}
                    amount={parseNumber(form.amount)}
                    addInfo={sanitizeAddInfo(form.addInfo)}
                  />

                  {/* Guide */}
                  <div className="space-y-5">
                    {/* Amount card */}
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                      <p className="text-xs text-emerald-700 font-semibold mb-1">Số tiền cần thanh toán</p>
                      <p className="text-2xl font-semibold text-emerald-700">
                        {formatCurrency(parseNumber(form.amount))}
                      </p>
                      <p className="text-xs text-emerald-600 mt-1 font-mono">
                        Nội dung: {sanitizeAddInfo(form.addInfo)}
                      </p>
                    </div>

                    {/* Steps */}
                    <div className="space-y-3">
                      {[
                        'Mở app ngân hàng, chọn Quét QR',
                        'Hướng camera vào mã QR bên cạnh',
                        `Kiểm tra số tiền ${formatCurrency(parseNumber(form.amount))} rồi xác nhận`,
                      ].map((text, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Info note */}
                    <div className="flex items-start gap-2.5 p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Mã QR hết hạn sau <strong>15 phút</strong>. Không thoát trang trong khi chờ xác nhận.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Confirm button */}
                <div className="mt-8 pt-6 border-t border-slate-50 space-y-2.5">
                  <p className="text-center text-xs text-slate-400">
                    Sau khi chuyển khoản thành công, nhấn xác nhận bên dưới
                  </p>
                  <button
                    onClick={handleConfirm}
                    disabled={loading || orderStatus === 'expired'}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold transition-all shadow-sm active:scale-[.99]"
                  >
                    {loading ? (
                      <><Loader2 size={16} className="animate-spin" /> Đang xác nhận...</>
                    ) : (
                      <><CheckCircle2 size={16} /> Xác nhận đã chuyển khoản</>
                    )}
                  </button>
                </div>

                {formErrors.submit && (
                  <div className="mt-3 flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                    <Info size={15} className="shrink-0 mt-0.5" />
                    {formErrors.submit}
                  </div>
                )}
              </div>
            )}

            {/* STEP 3 — Success */}
            {step === 3 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center animate-in fade-in zoom-in-95 duration-300">
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={32} className="text-emerald-600" />
                </div>

                <h2 className="text-xl font-semibold text-slate-900 mb-2">Thanh toán thành công!</h2>
                <p className="text-sm text-slate-400 mb-8">Giao dịch đã được xác nhận qua VietQR</p>

                {/* Detail card */}
                {order && (
                  <div className="bg-slate-50 rounded-xl p-5 text-left space-y-3 mb-7 border border-slate-100">
                    {[
                      { label: 'Mã đơn hàng', value: `#${order.orderId}`, mono: true },
                      { label: 'Ngân hàng', value: form.bankInfo?.shortName || 'VietinBank' },
                      { label: 'Số tài khoản', value: form.accountNo, mono: true },
                      { label: 'Nội dung', value: sanitizeAddInfo(form.addInfo) },
                      { label: 'Số tiền', value: formatCurrency(order.totalAmount), highlight: true },
                    ].map(({ label, value, mono, highlight }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">{label}</span>
                        <span className={clsx(
                          'text-sm font-medium',
                          highlight ? 'text-emerald-600 text-base' : 'text-slate-800',
                          mono && 'font-mono text-xs'
                        )}>
                          {value}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                      <span className="text-sm text-slate-500">Trạng thái</span>
                      <StatusBadge status="paid" />
                    </div>
                  </div>
                )}

                {/* Email note */}
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-7">
                  <Mail size={13} />
                  Biên lai đã được gửi đến email đăng ký của bạn
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate('/san-pham/all/all')}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors">
                    Quay lại
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
