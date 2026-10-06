import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ApiOrder from "../../apis/ApiOrder";

import {
    Search,
    Calendar,
    Filter,
    RotateCcw,
    Clock,
    CheckCircle2,
    XCircle,
    Truck,
    Landmark,
    ChevronRight,
    Package,
    PhoneCall,
    Eye
} from "lucide-react";

export default function OrderHistoryPage() {
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.auth?.userInfo);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Bộ lọc
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // ==========================================
    // GỌI API LẤY DANH SÁCH ĐƠN HÀNG (ORDER)
    // ==========================================
    useEffect(() => {
        const fetchOrderHistory = async () => {
            setLoading(true);
            try {
                const response = await ApiOrder.getOrderHistoryApi({ userId: userInfo?.id });
                if (response?.EC === 0) {
                    setOrders(response.DT);
                }

                setOrders(mockOrders);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi tải lịch sử đơn hàng:", error);
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, [userInfo]);

    const formatCurrency = (val) => new Intl.NumberFormat("vi-VN").format(val) + "đ";

    // Hàm render huy hiệu trạng thái
    const renderStatusBadge = (status) => {
        switch (status) {
            case "pending":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock size={13} />
                        Chờ xác nhận
                    </span>
                );
            case "completed":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 size={13} />
                        Đã hoàn tất
                    </span>
                );
            case "cancelled":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        <XCircle size={13} />
                        Đã hủy đơn
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                        {status}
                    </span>
                );
        }
    };

    // Reset bộ lọc
    const handleResetFilter = () => {
        setStatusFilter("all");
        setSearchTerm("");
        setStartDate("");
        setEndDate("");
    };

    // Xử lý filter danh sách
    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            // 1. Lọc theo trạng thái
            if (statusFilter !== "all" && order.status !== statusFilter) {
                return false;
            }

            // 2. Lọc theo ngày đặt
            const orderDate = new Date(order.createdAt);
            if (startDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                if (orderDate < start) return false;
            }
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                if (orderDate > end) return false;
            }

            // 3. Tìm kiếm theo mã đơn hoặc tên sản phẩm
            if (searchTerm.trim() !== "") {
                const term = searchTerm.toLowerCase();
                const matchId = order.orderId?.toLowerCase().includes(term);
                const matchItem = order.items?.some((i) => i.name?.toLowerCase().includes(term));
                if (!matchId && !matchItem) return false;
            }

            return true;
        });
    }, [orders, statusFilter, startDate, endDate, searchTerm]);

    return (
        <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
            <div className="">

                {/* Header trang */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            Lịch sử thanh toán & Đơn hàng
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Theo dõi chi tiết các đơn hàng và trạng thái xác nhận của bạn.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="self-start sm:self-auto text-xs font-bold text-[#0d9488] hover:text-[#0f766e] flex items-center gap-1 transition"
                    >
                        Tiếp tục mua sắm <ChevronRight size={14} />
                    </button>
                </div>

                {/* Thanh lọc & tìm kiếm */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 mb-8 space-y-4">
                    {/* Tabs trạng thái nhanh */}
                    <div className="flex flex-wrap gap-2 pb-3 border-b border-slate-100">
                        {[
                            { id: "all", label: "Tất cả đơn" },
                            { id: "pending", label: "Chờ xác nhận" },
                            { id: "completed", label: "Đã hoàn tất" },
                            { id: "cancelled", label: "Đã hủy" }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setStatusFilter(tab.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${statusFilter === tab.id
                                    ? "bg-[#14b8a6] text-white shadow-sm shadow-teal-600/20"
                                    : "bg-slate-100/70 hover:bg-slate-200/70 text-slate-600"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Ô nhập thông tin tìm kiếm & ngày tháng */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                        {/* Input từ khóa */}
                        <div className="lg:col-span-5 relative">
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Tìm theo mã đơn hàng hoặc tên sản phẩm..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14b8a6] transition"
                            />
                        </div>

                        {/* Từ ngày */}
                        <div className="lg:col-span-3 relative">
                            <span className="block text-[10px] font-bold uppercase text-slate-400 absolute left-3.5 top-1">Từ ngày</span>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full text-xs pt-4 pb-1 px-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14b8a6] transition text-slate-700"
                            />
                        </div>

                        {/* Đến ngày */}
                        <div className="lg:col-span-3 relative">
                            <span className="block text-[10px] font-bold uppercase text-slate-400 absolute left-3.5 top-1">Đến ngày</span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full text-xs pt-4 pb-1 px-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14b8a6] transition text-slate-700"
                            />
                        </div>

                        {/* Nút reset */}
                        <div className="lg:col-span-1 flex justify-end">
                            <button
                                type="button"
                                onClick={handleResetFilter}
                                title="Làm mới bộ lọc"
                                className="w-full sm:w-auto p-2.5 flex items-center justify-center text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                            >
                                <RotateCcw size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Danh sách đơn hàng */}
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200">
                        <div className="w-9 h-9 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-3"></div>
                        <p className="text-xs text-slate-500 font-medium">Đang tải lịch sử đơn hàng...</p>
                    </div>
                ) : filteredOrders.length > 0 ? (
                    <div className="space-y-5">
                        {filteredOrders.map((order) => (
                            <div
                                key={order.orderId}
                                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6 transition hover:border-slate-300"
                            >
                                {/* Header đơn */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                                        <span className="font-extrabold text-slate-900 text-sm">{order.orderId}</span>
                                        <span className="text-slate-300">|</span>
                                        <span className="text-slate-500 flex items-center gap-1">
                                            <Calendar size={13} />
                                            {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </span>
                                        <span className="text-slate-300">|</span>
                                        <span className="text-slate-500 flex items-center gap-1">
                                            {order.paymentMethod === "bank" ? (
                                                <>
                                                    <Landmark size={13} className="text-[#0d9488]" /> Chuyển khoản QR
                                                </>
                                            ) : (
                                                <>
                                                    <Truck size={13} className="text-[#f97316]" /> Ship COD
                                                </>
                                            )}
                                        </span>
                                    </div>

                                    <div>{renderStatusBadge(order.status)}</div>
                                </div>

                                {/* Danh sách sản phẩm của đơn */}
                                <div className="divide-y divide-slate-100 py-2">
                                    {order.items?.map((item, idx) => (
                                        <div key={idx} className="py-3.5 flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0 pr-2">
                                                <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug line-clamp-1">
                                                    {item.name}
                                                </h4>
                                                <p className="text-xs text-slate-400 mt-1">
                                                    Số lượng: {item.quantity} · {formatCurrency(item.price)}
                                                </p>
                                            </div>
                                            <div className="text-right text-xs font-bold text-slate-800">
                                                {formatCurrency(item.price * item.quantity)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer đơn */}
                                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="text-xs text-slate-500">
                                        <span className="font-semibold text-slate-700">Người nhận:</span> {order.fullName} ({order.phone})
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                                        <div className="text-right">
                                            <span className="text-[11px] text-slate-400 block">Tổng thanh toán</span>
                                            <span className="text-lg font-black text-[#f97316]">
                                                {formatCurrency(order.totalAmount)}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/order-status/${order.orderId}`, { state: order })}
                                            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition"
                                        >
                                            <Eye size={14} /> Xem lại
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-16 text-center bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8">
                        <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Package size={26} />
                        </div>
                        <h3 className="text-base font-bold text-slate-800">Không tìm thấy đơn hàng nào</h3>
                        <p className="text-xs text-slate-400 mt-1">Thử thay đổi bộ lọc trạng thái hoặc khoảng thời gian tìm kiếm.</p>
                    </div>
                )}

                {/* Hỗ trợ chân trang */}
                <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <PhoneCall size={15} className="text-[#f97316]" />
                    <span>Cần hỗ trợ về tình trạng đơn hàng? Liên hệ hotline:</span>
                    <a href="tel:0372672396" className="font-black text-slate-900 hover:text-[#f97316] transition">
                        037.2672.396
                    </a>
                </div>

            </div>
        </div>
    );
}