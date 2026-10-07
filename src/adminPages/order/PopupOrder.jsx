import React from "react";
import { CalendarDays, Package, Truck, X } from "lucide-react";

const STATUS_STYLES = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const STATUS_LABELS = {
    pending: "Chờ xác nhận",
    completed: "Đã hoàn tất",
    cancelled: "Đã hủy",
};

const formatCurrency = (value) =>
    `${new Intl.NumberFormat("vi-VN").format(Number(value) || 0)}đ`;

export default function OrderDetailModal({ order, onClose }) {
    if (!order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-none border border-slate-200 bg-white shadow-xl">
                {/* Nút đóng góc phải */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 text-slate-400 transition hover:text-slate-600"
                >
                    <X size={24} />
                </button>

                {/* Tiêu đề & Trạng thái */}
                <div className="border-b border-slate-100 p-6">
                    <h2 className="mb-2 text-xl font-black text-slate-900">Chi tiết đơn hàng</h2>
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="font-bold text-teal-700">{order.orderId}</span>
                        <span className="text-slate-300">|</span>
                        <span
                            className={`rounded-none border px-2 py-0.5 text-xs font-bold ${STATUS_STYLES[order.status] || "border-slate-200 bg-slate-100 text-slate-700"
                                }`}
                        >
                            {STATUS_LABELS[order.status] || order.status}
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="flex items-center gap-1.5 text-sm text-slate-500">
                            <CalendarDays size={14} /> {new Date(order.createdAt).toLocaleString("vi-VN")}
                        </span>
                    </div>
                </div>

                {/* Nội dung chi tiết */}
                <div className="space-y-6 p-6">
                    {/* Thông tin khách hàng & Địa chỉ */}
                    <div className="grid gap-6 rounded-none border border-slate-100 bg-slate-50 p-4 sm:grid-cols-2">
                        <div>
                            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                                Thông tin khách hàng
                            </h3>
                            <p className="font-semibold text-slate-900">{order.fullName || "—"}</p>
                            <p className="text-sm text-slate-600">{order.phone || "—"}</p>
                        </div>
                        <div>
                            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                                Địa chỉ giao hàng
                            </h3>
                            <p className="text-sm text-slate-700">{order.address || "—"}</p>
                        </div>
                    </div>

                    {/* Danh sách sản phẩm */}
                    <div>
                        <h3 className="mb-3 border-b border-slate-100 pb-2 text-sm font-bold text-slate-800">
                            Sản phẩm đã đặt
                        </h3>
                        <div className="divide-y divide-slate-100">
                            {(order.items || []).map((item, index) => (
                                <div key={`${item.id}-${index}`} className="flex items-center gap-4 py-3">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-none border border-slate-100 bg-slate-50">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <Package size={20} className="text-slate-300" />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="line-clamp-2 text-sm font-bold text-slate-800">{item.name}</p>
                                        <p className="mt-1 text-sm text-slate-500">
                                            {item.quantity} × {formatCurrency(item.price)}
                                        </p>
                                    </div>
                                    <p className="shrink-0 text-sm font-bold text-teal-700">
                                        {formatCurrency(Number(item.quantity) * Number(item.price))}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Phương thức thanh toán, ghi chú và tổng tiền */}
                    <div className="rounded-none border border-slate-100 bg-slate-50 p-4">
                        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <Truck size={16} className="text-teal-600" />
                            Phương thức: {order.paymentMethod === "bank" ? "Chuyển khoản QR" : "Thanh toán COD"}
                        </div>
                        {order.notes && (
                            <p className="mb-4 rounded-none border border-slate-100 bg-white p-3 text-sm text-slate-600">
                                <span className="font-bold text-slate-800">Ghi chú:</span> {order.notes}
                            </p>
                        )}
                        <div className="flex items-end justify-between border-t border-slate-200 pt-3">
                            <span className="text-sm font-bold uppercase tracking-wide text-slate-500">
                                Tổng thanh toán
                            </span>
                            <span className="text-2xl font-black text-teal-700">
                                {formatCurrency(order.totalAmount)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Nút đóng phía dưới */}
                <div className="flex justify-end border-t border-slate-100 bg-slate-50 p-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-none bg-slate-800 px-6 py-2 text-sm font-bold text-white transition hover:bg-slate-700"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}