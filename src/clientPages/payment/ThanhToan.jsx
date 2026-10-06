import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ApiOrder from "../../apis/ApiOrder";
import { removePurchasedItems } from "../../redux/cartSlice"; // Kiểm tra nếu file cartSlice có action này, hoặc import action clear giỏ hàng của bạn
import {
    Check,
    MapPin,
    ShieldCheck,
    Truck,
    Landmark,
    PhoneCall,
    Edit3,
    AlertCircle,
    X
} from "lucide-react";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const reduxCartItems = useSelector((state) => state.cart?.items || []);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        note: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [agreedPolicy, setAgreedPolicy] = useState(false);

    // State quản lý hiển thị popup xác nhận chuyển khoản
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const cartItems = location.state?.cartItems ?? reduxCartItems;
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const grandTotal = subtotal;

    const formatCurrency = (val) => new Intl.NumberFormat("vi-VN").format(val) + "đ";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Hàm gọi API xử lý đặt hàng
    const executeOrder = async () => {
        setIsSubmitting(true);

        const orderPayload = {
            fullName: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            notes: formData.note,
            paymentMethod: paymentMethod, // 'cod' | 'bank'
            items: cartItems.map((item) => ({
                productId: item.productId ?? item.id,
                quantity: item.quantity,
            })),
        };

        try {
            const res = await ApiOrder.createOrderApi(orderPayload);

            if (res?.EC === 0 && res?.DT?.order?.orderId) {
                // 1. Dọn dẹp giỏ hàng
                localStorage.removeItem("cartItems");
                if (typeof removePurchasedItems === "function") {
                    dispatch(removePurchasedItems(cartItems.map((item) => item.productId ?? item.id)));
                }

                // 2. Chuyển hướng sang trang trạng thái đơn hàng kèm mã đơn từ backend
                navigate(`/order-status/${encodeURIComponent(res.DT.order.orderId)}`);
            } else {
                alert(res?.EM || "Không thể tạo đơn hàng, vui lòng thử lại!");
            }
        } catch (err) {
            console.error("Lỗi đặt hàng:", err);
            alert(err.response?.data?.EM || err.response?.data?.message || err.message || "Có lỗi xảy ra khi tạo đơn hàng!");
        } finally {
            setIsSubmitting(false);
            setShowConfirmModal(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.fullName || !formData.phone || !formData.address) {
            alert("Vui lòng điền đầy đủ các trường thông tin bắt buộc!");
            return;
        }
        if (cartItems.length === 0) {
            alert("Giỏ hàng của bạn đang trống!");
            return;
        }
        if (!agreedPolicy) {
            alert("Vui lòng đồng ý với chính sách bảo hành, đổi trả trước khi xác nhận đơn!");
            return;
        }

        // Nếu là chuyển khoản trước thì mở Popup xác nhận
        if (paymentMethod === "bank") {
            setShowConfirmModal(true);
            return;
        }

        // Nếu là COD thì thực hiện đặt hàng luôn
        await executeOrder();
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-200 mb-8 gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                            Thông tin thanh toán
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Điền thông tin nhận hàng, chúng tôi sẽ liên hệ xác nhận trước khi giao.
                        </p>
                    </div>

                    <div className="flex items-center space-x-3 sm:space-x-4 self-center md:self-auto">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-[#dcfce7] text-[#10b981] flex items-center justify-center text-sm">
                                <Check size={18} strokeWidth={2.8} />
                            </div>
                            <span className="text-xs font-semibold text-slate-700 mt-1.5">Giỏ hàng</span>
                        </div>

                        <div className="w-12 sm:w-16 h-[2px] bg-[#10b981] -mt-5" />

                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-[#14b8a6] text-white font-bold flex items-center justify-center ring-4 ring-teal-100 shadow-sm text-sm">
                                2
                            </div>
                            <span className="text-xs font-bold text-slate-900 mt-1.5">Thanh toán</span>
                        </div>

                        <div className="w-12 sm:w-16 h-[2px] bg-slate-200 -mt-5" />

                        <div className="flex flex-col items-center">
                            <div className="w-9 h-9 rounded-full bg-white border border-slate-300 text-slate-400 font-semibold flex items-center justify-center text-sm">
                                3
                            </div>
                            <span className="text-xs font-medium text-slate-400 mt-1.5">Hoàn tất</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 space-y-6">

                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                                <div>
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                                        Kiểm tra lần cuối
                                    </span>
                                    <h2 className="text-base font-bold text-slate-900">Sản phẩm ({cartItems.length})</h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="text-xs font-bold text-[#0d9488] hover:text-[#0f766e] flex items-center gap-1 transition"
                                >
                                    <Edit3 size={13} /> Chỉnh sửa
                                </button>
                            </div>

                            <div className="pt-5 space-y-4">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                                        <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 pr-2">
                                            <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                                                {item.name}
                                            </h3>
                                            <p className="text-xs text-slate-400 mt-1">
                                                Số lượng: {item.quantity} · {formatCurrency(item.price)} / sản phẩm
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[11px] text-slate-400 block mb-0.5">Thành tiền</span>
                                            <span className="text-base font-black text-[#f97316]">
                                                {formatCurrency(item.price * item.quantity)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7">
                            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-[#ccfbf1] text-[#0d9488] flex items-center justify-center">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                                            Thông tin người nhận
                                        </span>
                                        <h2 className="text-base font-bold text-slate-900">Địa chỉ giao hàng</h2>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-[#0d9488] font-medium bg-[#f0fdf9] px-2.5 py-1 rounded-full border border-[#ccfbf1]">
                                    <ShieldCheck size={14} />
                                    <span>Được bảo mật</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                            Họ và tên <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            placeholder="Ví dụ: Nguyễn Văn Anh"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14b8a6] transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                            Số điện thoại <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            placeholder="Ví dụ: 0923456789"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14b8a6] transition"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                        Địa chỉ giao hàng <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14b8a6] transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                        Ghi chú đơn hàng <span className="font-normal text-slate-400">(không bắt buộc)</span>
                                    </label>
                                    <textarea
                                        rows={3}
                                        name="note"
                                        placeholder="Thời gian nhận hàng, yêu cầu xuất hóa đơn hoặc lưu ý khác..."
                                        value={formData.note}
                                        onChange={handleInputChange}
                                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14b8a6] transition resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7">
                            <div className="flex items-center gap-3.5 pb-5 border-b border-slate-100">
                                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                                    <ShieldCheck size={19} />
                                </div>
                                <div>
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                                        Đơn hàng {cartItems.length} sản phẩm
                                    </span>
                                    <h3 className="text-base font-bold text-slate-900">Xác nhận đơn hàng</h3>
                                </div>
                            </div>

                            <div className="pt-5">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                            Thanh toán an toàn
                                        </span>
                                        <h4 className="text-xs font-bold text-slate-800">Phương thức thanh toán</h4>
                                    </div>
                                    <ShieldCheck size={16} className="text-[#0d9488]" />
                                </div>

                                <div className="space-y-3">
                                    <label
                                        onClick={() => setPaymentMethod("cod")}
                                        className={`flex items-center gap-3.5 p-3 rounded-xl border cursor-pointer transition ${paymentMethod === "cod"
                                            ? "border-[#14b8a6] bg-[#f0fdf9]"
                                            : "border-slate-200 hover:border-slate-300"
                                            }`}
                                    >
                                        <div className="w-4 h-4 rounded-full border border-teal-500 flex items-center justify-center">
                                            {paymentMethod === "cod" && <div className="w-2 h-2 rounded-full bg-teal-600" />}
                                        </div>
                                        <div className="w-9 h-9 rounded-lg bg-[#f97316] text-white flex items-center justify-center flex-shrink-0">
                                            <Truck size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900">Ship COD</p>
                                            <p className="text-[11px] text-slate-400">Thanh toán khi nhận hàng</p>
                                        </div>
                                    </label>

                                    <div>
                                        <label
                                            onClick={() => setPaymentMethod("bank")}
                                            className={`flex items-center gap-3.5 p-3 rounded-xl border cursor-pointer transition ${paymentMethod === "bank"
                                                ? "border-[#14b8a6] bg-[#f0fdf9]"
                                                : "border-slate-200 hover:border-slate-300"
                                                }`}
                                        >
                                            <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center">
                                                {paymentMethod === "bank" && <div className="w-2 h-2 rounded-full bg-teal-600" />}
                                            </div>
                                            <div className="w-9 h-9 rounded-lg bg-[#0d9488] text-white flex items-center justify-center flex-shrink-0">
                                                <Landmark size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-900">Chuyển khoản trước</p>
                                                <p className="text-[11px] text-slate-400">Quét mã QR bên dưới để thanh toán</p>
                                            </div>
                                        </label>

                                        {paymentMethod === "bank" && (
                                            <div className="mt-3 flex flex-col items-center justify-center p-4 bg-white border border-[#ccfbf1] rounded-xl shadow-sm animate-fade-in">
                                                <img
                                                    src="/qr.png"
                                                    alt="Mã QR Thanh Toán"
                                                    className="w-48 h-48 object-contain rounded-lg"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-600 leading-relaxed">
                                <div className="flex items-start gap-2">
                                    <Check size={14} className="text-[#0d9488] mt-0.5 flex-shrink-0" />
                                    <span><strong>1-5 ngày</strong> nhận hàng tùy vùng miền, được kiểm tra.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Check size={14} className="text-[#0d9488] mt-0.5 flex-shrink-0" />
                                    <span>Nhận hàng, kiểm tra <strong>đúng hàng, đủ hàng</strong> rồi mới <strong>THANH TOÁN</strong>.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Check size={14} className="text-[#0d9488] mt-0.5 flex-shrink-0" />
                                    <span>Lỗi, bảo hành và đổi trả theo <a href="#" className="underline font-bold text-slate-800 hover:text-teal-700">QUY ĐỊNH của shop</a>.</span>
                                </div>
                            </div>

                            <div className="space-y-2.5 py-4 border-t border-slate-100 text-xs mt-4">
                                <div className="flex justify-between items-center text-slate-500">
                                    <span>Tạm tính sản phẩm</span>
                                    <span className="font-bold text-slate-900">{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-500">
                                    <span className="font-bold text-[#0d9488]">Chưa bao gồm phí vận chuyển</span>
                                </div>
                            </div>

                            <div className="pt-4 pb-5 border-t border-dashed border-slate-200 flex justify-between items-baseline">
                                <span className="text-sm font-bold text-slate-900">Tổng thanh toán</span>
                                <span className="text-2xl font-black text-[#f97316]">
                                    {formatCurrency(grandTotal)}
                                </span>
                            </div>

                            <div className="mb-5 flex items-start gap-2.5">
                                <input
                                    type="checkbox"
                                    id="policy"
                                    checked={agreedPolicy}
                                    onChange={(e) => setAgreedPolicy(e.target.checked)}
                                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                />
                                <label htmlFor="policy" className="text-xs text-slate-500 leading-snug cursor-pointer select-none">
                                    Tôi đã đọc và đồng ý với{" "}
                                    <a href="#" className="font-bold text-teal-700 underline hover:text-teal-800">
                                        chính sách bảo hành, đổi trả
                                    </a>.
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#f97316] hover:bg-[#ea580c] active:scale-[0.99] transition-all text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
                            >
                                <ShieldCheck size={18} />
                                <span>{isSubmitting ? "Đang tạo đơn..." : "Xác nhận đơn hàng"}</span>
                            </button>

                            <p className="text-[11px] text-center text-slate-400 mt-3 leading-tight">
                                <strong className="text-slate-700">CMIC STUDIO</strong> sẽ liên hệ xác nhận thông tin trước khi giao hàng.
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-xs py-2 text-slate-500">
                            <PhoneCall size={16} className="text-[#f97316]" />
                            <span>Cần hỗ trợ nhanh?</span>
                            <a href="tel:0372672396" className="font-black text-slate-900 hover:text-[#f97316] transition">
                                037.2672.396
                            </a>
                        </div>
                    </div>

                </form>
            </div>

            {/* Modal popup xác nhận chuyển khoản */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
                        <button
                            type="button"
                            onClick={() => setShowConfirmModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition p-1"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-3.5 mb-4">
                            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                                <AlertCircle size={24} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-900">
                                    Xác nhận đã chuyển khoản?
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Vui lòng kiểm tra lại trạng thái giao dịch trên app ngân hàng.
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 text-xs text-slate-600 space-y-1.5 mb-6">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Số tiền chuyển:</span>
                                <span className="font-bold text-[#f97316]">{formatCurrency(grandTotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Hình thức:</span>
                                <span className="font-semibold text-slate-800">Quét mã QR ngân hàng</span>
                            </div>
                            <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-200/60 leading-relaxed">
                                Đơn hàng sẽ được chuyển vào hệ thống để shop kiểm tra biến động số dư và xác nhận giao hàng.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setShowConfirmModal(false)}
                                disabled={isSubmitting}
                                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                            >
                                Kiểm tra lại
                            </button>
                            <button
                                type="button"
                                onClick={executeOrder}
                                disabled={isSubmitting}
                                className="flex-1 py-2.5 px-4 rounded-xl bg-[#14b8a6] hover:bg-[#0d9488] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-teal-600/20"
                            >
                                {isSubmitting ? (
                                    <span>Đang tạo đơn...</span>
                                ) : (
                                    <>
                                        <Check size={16} strokeWidth={2.5} />
                                        <span>Tôi đã chuyển tiền</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}