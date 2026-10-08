import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import ImageLoader from "../../components/FormFields/ImageLoader";
import { slug } from '../../utils/constants.js';
import { addCartItem } from '../../redux/cartSlice';

export default function ProductCard({ product, isTopSeller = false }) {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth || {});

    // Lấy danh sách sản phẩm trong giỏ hàng từ Redux (kiểm tra cả cartItems hoặc items)
    const cartItems = useSelector((state) => state.cart?.cartItems || state.cart?.items || []);

    const catId = product.category_id || product.categoryId || 'all';
    const prodId = product.id;
    const productUrl = `/${slug(product.name)}/${catId}/${prodId}`;

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa (được lưu trong Redux/LocalStorage nên reload vẫn giữ)
    const isInCart = cartItems.some((item) => String(item.id) === String(product.id));

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isInCart) {
            toast.info("Sản phẩm đã có trong giỏ hàng!");
            return;
        }

        const cartItem = {
            id: String(product.id || ""),
            name: String(product.name || ""),
            price: Number(product.price) || 0,
            image: typeof product.image === 'string' ? product.image : "",
            quantity: 1,
        };

        try {
            await dispatch(addCartItem({ item: cartItem, userId: userInfo?.id })).unwrap();
            toast.success("Đã thêm sản phẩm vào giỏ hàng");
        } catch (error) {
            toast.error(error.message || 'Không thể thêm sản phẩm vào giỏ hàng');
        }
    };

    return (
        <Link
            to={productUrl}
            className="group block bg-white rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 w-full max-w-full min-w-0 box-border"
        >
            <div className="relative overflow-hidden h-40 sm:h-44 bg-gray-50 flex flex-col items-center justify-center p-2 w-full max-w-full box-border">

                <ImageLoader
                    imagePath={product.image}
                    className="w-full h-full max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700 block"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute top-2 right-2 bg-red-500 text-white font-bold shadow-lg rounded-full px-3 py-1 text-xs">
                    -25%
                </div>

                {/* Nút tim: Luôn hiển thị và sáng đỏ nếu isInCart = true */}
                <button
                    onClick={handleAddToCart}
                    className={`absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg w-9 h-9 ${isInCart ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                >
                    <Heart className={`w-4 h-4 transition-colors ${isInCart ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
            </div>

            <div className="p-3 sm:p-4 w-full box-border">
                <h3 className="text-gray-800 mb-1.5 line-clamp-2 group-hover:text-orange-600 transition-colors text-xs sm:text-base md:text-lg min-h-fit sm:min-h-[40px]">
                    {product.name}
                </h3>

                <div className="flex flex-col gap-1 mb-2 w-full min-w-0">
                    {/* Hàng trên: Giá bán chính + Giá gốc gạch ngang bên cạnh */}
                    <div className="flex items-baseline gap-1.5 min-w-0">
                        <span className="text-xs sm:text-sm md:text-base font-bold text-orange-600 whitespace-nowrap inline-flex items-baseline scale-75 sm:scale-90 md:scale-100 origin-left">
                            <span>{Number(product.price).toLocaleString('vi-VN')}</span>
                            <span className="inline-block translate-y-[2px] text-[0.85em] underline">đ</span>
                        </span>
                        <span className="text-gray-400 line-through text-[9px] sm:text-[11px] font-medium whitespace-nowrap inline-flex items-baseline">
                            <span>{(Number(product.price || 0) * 1.25).toLocaleString('vi-VN')}</span>
                            <span className="inline-block translate-y-[1.5px] text-[0.85em] no-underline">đ</span>
                        </span>
                    </div>

                    {/* Hàng dưới: Địa chỉ (bên trái) + Lượt bán (bên phải) */}
                    <div className="flex items-center justify-between text-[10px] sm:text-xs  w-full min-w-0 pt-2">
                        <span className="truncate pr-2 text-gray-500">
                            {"TP. Hồ Chí Minh"}
                        </span>
                        <span className="whitespace-nowrap shrink-0 font-bold ">
                            Đã bán {Number(product.sold) || 0}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}