import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    Check,
    Truck,
    ChevronLeft,
    PhoneCall,
    CheckCircle2,
    CalendarDays,
    MapPin,
    Clock,
    XCircle,
    CreditCard,
    Receipt
} from "lucide-react";
import ApiOrder from "../../apis/ApiOrder";

export default function OrderSuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderId } = useParams();

    const [orderDetail, setOrderDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // ==========================================
    // GỌI API LẤY CHI TIẾT ĐƠN HÀNG
    // ==========================================
    useEffect(() => {
        let isActive = true;

        const fetchOrder = async () => {
            if (!orderId) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await ApiOrder.getOrderDetailApi(orderId);
                if (isActive && response?.EC === 0 && response?.DT) {
                    setOrderDetail(response.DT);
                }
            } catch (error) {
                console.error("Lỗi lấy thông tin đơn hàng:", error);
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        fetchOrder();

        return () => {
            isActive = false;
        };
    }, [orderId]);

    const formatCurrency = (val) => new Intl.NumberFormat("vi-VN").format(val || 0) + "đ";

    // Hàm render badge trạng thái
    const renderStatusBadge = (status) => {
        switch (status) {
            case "completed":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 size={14} /> Đã hoàn tất
                    </span>
                );
            case "cancelled":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        <XCircle size={14} /> Đơn hàng đã hủy
                    </span>
                );
            case "pending":
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock size={14} /> Chờ xác nhận
                    </span>
                );
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                    <p className="mt-4 text-sm font-medium text-slate-500">Đang tải thông tin đơn hàng...</p>
                </div>
            </div>
        );
    }

    if (!orderDetail) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900">Không tìm thấy đơn hàng</h2>
                    <p className="text-xs text-slate-500 mt-2">Mã đơn hàng không tồn tại hoặc đã bị xóa.</p>
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="mt-6 px-4 py-2.5 bg-[#14b8a6] hover:bg-[#0d9488] text-white text-xs font-bold rounded-xl transition"
                    >
                        Quay lại trang chủ
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
            <div className="max-w-4xl mx-auto">

                {/* ================= STEPPER PROGRESS BAR ================= */}
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-200 mb-8 gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                            Hoàn tất đơn hàng
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Cảm ơn bạn đã tin tưởng mua sắm tại CMIC STUDIO.
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
                            <div className="w-10 h-10 rounded-full bg-[#dcfce7] text-[#10b981] flex items-center justify-center text-sm">
                                <Check size={18} strokeWidth={2.8} />
                            </div>
                            <span className="text-xs font-semibold text-slate-700 mt-1.5">Thanh toán</span>
                        </div>
                        <div className="w-12 sm:w-16 h-[2px] bg-[#10b981] -mt-5" />
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-[#14b8a6] text-white font-bold flex items-center justify-center ring-4 ring-teal-100 shadow-sm text-sm">
                                3
                            </div>
                            <span className="text-xs font-bold text-slate-900 mt-1.5">Hoàn tất</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* CỘT TRÁI: THÔNG BÁO XÁC NHẬN & TRẠNG THÁI (7 CỘT) */}
                    <div className="lg:col-span-7 space-y-6">

                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 text-center flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#dcfce7] text-[#10b981] rounded-full flex items-center justify-center mb-4 ring-8 ring-green-50">
                                <CheckCircle2 size={32} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-1.5">Đặt hàng thành công!</h2>
                            <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-md">
                                Đơn hàng của bạn đã được ghi nhận vào hệ thống. Đội ngũ CSKH sẽ sớm liên hệ xác nhận thông tin giao hàng.
                            </p>

                            {/* Card Tóm tắt Trạng thái Đơn hàng */}
                            <div className="w-full bg-slate-50 border border-slate-200/70 rounded-2xl p-5 text-left space-y-3.5">
                                <div className="flex justify-between items-center pb-3 border-b border-slate-200/80">
                                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                                        <Receipt size={14} className="text-slate-400" /> Mã đơn hàng:
                                    </span>
                                    <span className="text-sm font-black text-[#0d9488] tracking-wide">
                                        {orderDetail.orderId}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pb-3 border-b border-slate-200/80">
                                    <span className="text-xs text-slate-500 font-medium">Trạng thái xử lý:</span>
                                    <div>{renderStatusBadge(orderDetail.status)}</div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                                        <CreditCard size={14} className="text-slate-400" /> Hình thức:
                                    </span>
                                    <span className="text-xs font-bold text-slate-800">
                                        {orderDetail.paymentMethod === "bank" ? "Chuyển khoản trước (QR/Banking)" : "Thanh toán khi nhận hàng (COD)"}
                                    </span>
                                </div>
                            </div>

                            {/* Thông báo hình thức COD / Bank */}
                            <div className="mt-5 w-full">
                                {orderDetail.paymentMethod === "bank" ? (
                                    <div className="bg-[#f0fdf9] border border-[#ccfbf1] rounded-xl p-4 text-left text-xs text-slate-600 leading-relaxed">
                                        <p className="font-bold text-[#0f766e] mb-0.5">Xác nhận chuyển khoản</p>
                                        Nếu bạn đã thực hiện chuyển tiền, hệ thống sẽ đối soát và cập nhật trạng thái đơn sang <strong className="text-slate-800">Đã hoàn tất</strong> ngay khi nhận được biến động số dư.
                                    </div>
                                ) : (
                                    <div className="bg-[#fff7ed] border border-[#ffedd5] rounded-xl p-4 text-left text-xs text-slate-600 leading-relaxed flex items-start gap-2.5">
                                        <Truck size={18} className="text-[#f97316] shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-[#ea580c] mb-0.5">Thanh toán khi nhận hàng</p>
                                            Bạn vui lòng chuẩn bị số tiền <strong>{formatCurrency(orderDetail.totalAmount)}</strong> khi nhận hàng từ shipper.
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Nút điều hướng */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/")}
                                className="flex-1 bg-white border border-slate-200 hover:border-[#14b8a6] hover:bg-[#f0fdf9] text-slate-700 hover:text-[#0d9488] font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
                            >
                                <ChevronLeft size={16} />
                                Tiếp tục mua sắm
                            </button>
                            <button
                                onClick={() => navigate("/order-history")}
                                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all text-center text-xs sm:text-sm"
                            >
                                Xem lịch sử đơn hàng
                            </button>
                        </div>
                    </div>

                    {/* CỘT PHẢI: CHI TIẾT ĐƠN HÀNG (5 CỘT) */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7">
                            <h3 className="text-base font-bold text-slate-900 pb-4 border-b border-slate-100 mb-5">
                                Thông tin người nhận
                            </h3>

                            <div className="space-y-4 text-sm">
                                <div className="flex items-start gap-3">
                                    <CalendarDays size={18} className="text-slate-400 mt-0.5 shrink-0" />
                                    <div>
                                        <span className="block text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Thời gian đặt</span>
                                        <p className="font-medium text-slate-800">
                                            {orderDetail.createdAt ? new Date(orderDetail.createdAt).toLocaleString("vi-VN") : "—"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin size={18} className="text-slate-400 mt-0.5 shrink-0" />
                                    <div>
                                        <span className="block text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Địa chỉ giao hàng</span>
                                        <p className="font-bold text-slate-800 mb-0.5">{orderDetail.fullName} - {orderDetail.phone}</p>
                                        <p className="text-slate-600 text-xs leading-relaxed">{orderDetail.address}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-5 border-t border-dashed border-slate-200">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm font-bold text-slate-900">Tổng thanh toán</span>
                                    <span className="text-2xl font-black text-[#f97316]">
                                        {formatCurrency(orderDetail.totalAmount)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-xs py-2 text-slate-500">
                            <PhoneCall size={16} className="text-[#f97316]" />
                            <span>Cần hỗ trợ về đơn hàng? Gọi ngay</span>
                            <a href="tel:0372672396" className="font-black text-slate-900 hover:text-[#f97316] transition">
                                037.2672.396
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}