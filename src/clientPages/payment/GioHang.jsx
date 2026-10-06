import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeCartItem, updateCartItem } from "../../redux/cartSlice";
import {
    Trash2,
    ChevronLeft,
    ShieldCheck,
    ShoppingCart,
    Truck,
    RotateCcw,
    Lock,
    ArrowRight,
    Plus,
    Minus
} from "lucide-react";

export default function CartPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const userId = useSelector((state) => state.auth.userInfo?.id);

    const updateQuantity = (item, delta) => {
        const quantity = Math.max(1, item.quantity + delta);
        dispatch(updateCartItem({ item, quantity, userId }))
            .unwrap()
            .catch((error) => toast.error(error.message || "Không thể cập nhật giỏ hàng"));
    };

    const removeItem = (item) => {
        dispatch(removeCartItem({ item, userId }))
            .unwrap()
            .catch((error) => toast.error(error.message || "Không thể xóa sản phẩm"));
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleProceedToCheckout = () => {
        if (cartItems.length === 0) {
            alert("Giỏ hàng của bạn đang trống!");
            return;
        }
        navigate("/payment", { state: { cartItems, subtotal } });
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-200 mb-8 gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Giỏ hàng của bạn
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Kiểm tra sản phẩm và số lượng trước khi chuyển sang bước thanh toán.
                        </p>
                    </div>

                    <div className="flex items-center space-x-3 sm:space-x-4 self-center md:self-auto">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-[#10b981] text-white font-bold flex items-center justify-center ring-4 ring-orange-200/70 shadow-sm text-sm">
                                1
                            </div>
                            <span className="text-xs font-bold text-slate-700 mt-1.5">Giỏ hàng</span>
                        </div>
                        <div className="w-12 sm:w-16 h-[2px] bg-slate-200 -mt-5" />
                        <div className="flex flex-col items-center">
                            <div className="w-9 h-9 rounded-full bg-white border border-slate-300 text-slate-400 font-semibold flex items-center justify-center text-sm">
                                2
                            </div>
                            <span className="text-xs font-medium text-slate-400 mt-1.5">Thanh toán</span>
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

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7 flex flex-col justify-between min-h-[500px]">
                        <div>
                            <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                                <div>
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                                        Sản phẩm đã chọn
                                    </span>
                                    <h2 className="text-lg font-bold text-slate-900">Giỏ hàng</h2>
                                </div>
                                <span className="bg-[#e6f7f5] text-[#0d9488] text-xs font-bold px-3 py-1.5 rounded-full">
                                    {totalItemsCount} sản phẩm
                                </span>
                            </div>

                            <div className="divide-y divide-slate-100">
                                {cartItems.length > 0 ? (
                                    cartItems.map((item) => (
                                        <div key={item.id} className="py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                            <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-200 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
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
                                                <p className="text-xs text-slate-400 mt-1.5">
                                                    Đơn giá: {formatCurrency(item.price)}
                                                </p>

                                                <div className="inline-flex items-center border border-slate-200 rounded-lg mt-3 bg-slate-50/50 p-0.5">
                                                    <button
                                                        onClick={() => updateQuantity(item, -1)}
                                                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-white rounded transition"
                                                    >
                                                        <Minus size={13} strokeWidth={2.5} />
                                                    </button>
                                                    <span className="px-3 text-xs font-semibold text-slate-800 min-w-[28px] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item, 1)}
                                                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-white rounded transition"
                                                    >
                                                        <Plus size={13} strokeWidth={2.5} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 gap-2">
                                                <button
                                                    onClick={() => removeItem(item)}
                                                    className="text-slate-300 hover:text-red-500 transition-colors p-1"
                                                    title="Xóa sản phẩm"
                                                >
                                                    <Trash2 size={17} />
                                                </button>
                                                <div className="text-right">
                                                    <span className="text-[11px] text-slate-400 block sm:mb-0.5">Thành tiền</span>
                                                    <span className="text-base font-extrabold text-[#f97316]">
                                                        {formatCurrency(item.price * item.quantity)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-12 text-center text-slate-400 text-sm">
                                        Giỏ hàng của bạn đang trống!
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 mt-6">
                            <button
                                onClick={() => window.history.back()}
                                className="flex items-center gap-1.5 font-bold text-teal-700 hover:text-teal-800 transition"
                            >
                                <ChevronLeft size={16} strokeWidth={2.5} />
                                Tiếp tục chọn sản phẩm
                            </button>
                            <div className="flex items-center gap-1.5 text-slate-400">
                                <ShieldCheck size={16} className="text-slate-400" />
                                <span>Sản phẩm được kiểm tra kỹ trước khi giao</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7">
                        <div className="flex items-center gap-3.5 pb-6">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                                <ShoppingCart size={19} />
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                                    Đơn hàng của bạn
                                </span>
                                <h3 className="text-base font-bold text-slate-900">Tóm tắt thanh toán</h3>
                            </div>
                        </div>

                        <div className="space-y-3.5 py-4 border-t border-slate-100 text-sm">
                            <div className="flex justify-between items-center text-slate-600">
                                <span>Tạm tính</span>
                                <span className="font-bold text-slate-900">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-600">
                                <span>Phí vận chuyển</span>
                                <span className="text-[#0d9488] font-bold">Xác nhận sau</span>
                            </div>
                        </div>

                        <div className="pt-5 pb-6 border-t border-dashed border-slate-200 flex justify-between items-baseline">
                            <span className="text-sm font-bold text-slate-900">Tổng tạm tính</span>
                            <span className="text-2xl font-black text-[#f97316]">
                                {formatCurrency(subtotal)}
                            </span>
                        </div>

                        <div className="p-3.5 bg-[#f0fdf9] rounded-xl border border-[#ccfbf1] flex items-start gap-3 mb-6">
                            <Truck size={18} className="text-[#0d9488] mt-0.5 flex-shrink-0" />
                            <div className="text-xs">
                                <p className="font-bold text-[#0f766e]">Giao hàng toàn quốc</p>
                                <p className="text-slate-500 mt-0.5">Phí giao hàng được báo trước khi xác nhận đơn.</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleProceedToCheckout}
                            className="w-full bg-[#f97316] hover:bg-[#ea580c] active:scale-[0.99] transition-all text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <span>Tiến hành thanh toán</span>
                            <ArrowRight size={17} strokeWidth={2.5} />
                        </button>

                        <div className="mt-5 flex items-center justify-center gap-4 text-[11px] text-slate-400">
                            <div className="flex items-center gap-1">
                                <Lock size={13} />
                                <span>Bảo mật thông tin</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <RotateCcw size={13} />
                                <span>Hỗ trợ đổi trả</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}