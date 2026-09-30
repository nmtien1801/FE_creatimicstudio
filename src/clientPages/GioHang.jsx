import React, { useEffect } from "react";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, updateCartItem, persistGuestCart } from "../redux/cartSlice";
import { loadImage2 } from "../utils/constants";

const GioHang = () => {
    const dispatch = useDispatch();
    const { items, isLoading } = useSelector((state) => state.cart);
    const userId = useSelector((state) => state.auth.userInfo?.id);

    useEffect(() => {
        if (!userId) persistGuestCart(items);
    }, [items, userId]);

    const updateQuantity = (item, quantity) => {
        dispatch(updateCartItem({ item, quantity, userId }));
    };

    const total = items.reduce((sum, item) => sum + (Number(item.price) || 0) * item.quantity, 0);

    return (
        <main className="min-h-screen bg-[#f7f7f5] px-4 py-10 sm:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex items-center gap-3">
                    <ShoppingCart className="text-[#ed792f]" size={30} />
                    <h1 className="text-3xl font-black text-gray-900">Giỏ hàng</h1>
                </div>

                {isLoading ? <p className="py-16 text-center text-gray-500">Đang tải giỏ hàng...</p> : null}
                {!isLoading && items.length === 0 ? (
                    <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
                        <ShoppingCart className="mx-auto mb-4 text-gray-300" size={52} />
                        <p className="text-lg font-semibold text-gray-700">Giỏ hàng đang trống</p>
                    </div>
                ) : null}

                {items.length > 0 && (
                    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                        <section className="divide-y divide-gray-100 rounded-2xl bg-white px-5 shadow-sm">
                            {items.map((item) => (
                                <article key={item.id} className="flex gap-4 py-5">
                                    <img src={loadImage2(item.image)} alt={item.name} className="h-24 w-24 rounded-xl bg-gray-50 object-contain" />
                                    <div className="min-w-0 flex-1">
                                        <h2 className="truncate font-bold text-gray-900">{item.name}</h2>
                                        <p className="mt-1 font-semibold text-[#ed792f]">{Number(item.price).toLocaleString("vi-VN")} ₫</p>
                                        <div className="mt-3 flex items-center gap-3">
                                            <div className="flex items-center rounded-lg border border-gray-200">
                                                <button aria-label="Giảm số lượng" onClick={() => updateQuantity(item, item.quantity - 1)} className="p-2 text-gray-600 hover:text-black"><Minus size={15} /></button>
                                                <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                                <button aria-label="Tăng số lượng" onClick={() => updateQuantity(item, item.quantity + 1)} className="p-2 text-gray-600 hover:text-black"><Plus size={15} /></button>
                                            </div>
                                            <button onClick={() => dispatch(removeCartItem({ item, userId }))} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700"><Trash2 size={15} /> Xóa</button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </section>
                        <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900">Tạm tính</h2>
                            <div className="mt-5 flex justify-between border-t border-gray-100 pt-5">
                                <span className="text-gray-500">Tổng cộng</span>
                                <strong className="text-xl text-[#c62828]">{total.toLocaleString("vi-VN")} ₫</strong>
                            </div>
                            <button className="mt-6 w-full rounded-xl bg-[#ed792f] py-3 font-bold text-white transition hover:bg-[#d96520]">Tiến hành thanh toán</button>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    );
};

export default GioHang;
