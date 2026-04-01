import React, { useState } from "react";
import { Link } from "react-router-dom"; // Thay đổi ở đây
import { Star, Heart } from 'lucide-react';
import ImageLoader from "../../components/FormFields/ImageLoader";
import { slug } from '../../utils/constants.js';
// url: /product/:slug/:catId/:prodId

export default function ProductCard({ product, isTopSeller = false }) {
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Tạo URL trước để dùng cho thẻ Link
    const catId = product.category_id || product.categoryId || 'all';
    const prodId = product.id;
    const productUrl = `/${slug(product.name)}/${catId}/${prodId}`;

    return (
        <Link
            to={productUrl}
            className="group block bg-white rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2"
        >
            <div className="relative overflow-hidden h-40 sm:h-44">
                <ImageLoader
                    imagePath={product.image}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute top-2 right-2 bg-red-500 text-white font-bold shadow-lg rounded-full px-3 py-1 text-xs">
                    -25%
                </div>

                <button
                    onClick={(e) => {
                        e.preventDefault(); // Ngăn Link chuyển trang
                        e.stopPropagation(); // Ngăn sự kiện nổi bọt
                        setIsWishlisted(!isWishlisted);
                    }}
                    className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg w-9 h-9"
                >
                    <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
            </div>

            {/* Content Section */}
            <div className="p-3 sm:p-4">
                <h3 className="text-gray-800 font-bold mb-1.5 line-clamp-2 group-hover:text-orange-600 transition-colors text-base sm:text-lg min-h-[40px]">
                    {product.name}
                </h3>

                <div className="flex flex-row items-baseline gap-2 mb-4 justify-between">
                    <div className="flex flex-col">
                        <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-[10px] sm:text-[11px] text-gray-900">
                                {Number(product.price).toLocaleString('vi-VN')} VNĐ
                            </span>
                            <span className="text-gray-400 line-through text-[11px] sm:text-[12px] font-medium">
                                {(Number(product.price || 0) * 1.25).toLocaleString('vi-VN')} VNĐ
                            </span>
                        </div>
                    </div>

                    <div className="bg-green-50 border border-green-100 rounded-full flex items-center shadow-sm transition-colors hover:bg-green-100 w-fit px-3 py-1.5">
                        <span className="text-[10px] uppercase tracking-wider text-green-600 font-bold mr-1.5">LH:</span>
                        <span className="font-bold text-green-700 tracking-wider text-[12px]">
                            037.2672.396
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}