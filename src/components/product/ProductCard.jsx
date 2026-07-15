import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from 'lucide-react';
import ImageLoader from "../../components/FormFields/ImageLoader";
import { slug } from '../../utils/constants.js';

export default function ProductCard({ product, isTopSeller = false }) {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const catId = product.category_id || product.categoryId || 'all';
    const prodId = product.id;
    const productUrl = `/${slug(product.name)}/${catId}/${prodId}`;

    return (
        <Link
            to={productUrl}
            className="group block bg-white rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 w-full max-w-full min-w-0 box-border"
        >
            <div className="relative overflow-hidden h-40 sm:h-44 bg-gray-50 flex flex-col items-center justify-center p-2 w-full max-w-full box-border">

                {/* ImageLoader: Thêm class w-full h-full để nó tuân thủ kích thước của khung cha */}
                <ImageLoader
                    imagePath={product.image}
                    className="w-full h-full max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700 block"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute top-2 right-2 bg-red-500 text-white font-bold shadow-lg rounded-full px-3 py-1 text-xs">
                    -25%
                </div>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsWishlisted(!isWishlisted);
                    }}
                    className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg w-9 h-9"
                >
                    <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
            </div>

            <div className="p-3 sm:p-4 w-full box-border">
                <h3 className="text-gray-800 font-bold mb-1.5 line-clamp-2 group-hover:text-orange-600 transition-colors text-xs sm:text-base md:text-lg min-h-fit sm:min-h-[40px]">
                    {product.name}
                </h3>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-2 mb-2 w-full">
                    <div className="flex flex-col min-w-fit">
                        <span className="font-bold text-[11px] sm:text-[13px] text-gray-900 whitespace-nowrap">
                            {Number(product.price).toLocaleString('vi-VN')} VNĐ
                        </span>
                        <span className="text-gray-400 line-through text-[10px] sm:text-[11px] font-medium whitespace-nowrap">
                            {(Number(product.price || 0) * 1.25).toLocaleString('vi-VN')} VNĐ
                        </span>
                    </div>

                    <div className="bg-green-50 border border-green-100 rounded-full flex items-center shadow-sm transition-colors hover:bg-green-100 w-fit px-2.5 py-1 sm:ml-auto">
                        <span className="text-[9px] uppercase tracking-wider text-green-600 font-bold mr-1">LH:</span>
                        <span className="font-bold text-green-700 tracking-wider text-[11px] sm:text-[12px] whitespace-nowrap">
                            037.2672.396
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}