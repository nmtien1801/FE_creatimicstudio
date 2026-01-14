import React, { useState } from "react";
import { Star, Heart } from 'lucide-react';

export default function ProductCard({ product, isTopSeller = false, isCompact = false }) {
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <div className={`group bg-white rounded-2xl overflow-hidden transition-all duration-500 ${isTopSeller
                ? 'shadow-2xl hover:shadow-[0_20px_60px_rgba(249,115,22,0.3)] border-2 border-orange-400 hover:scale-[1.02]'
                : 'shadow-lg hover:shadow-2xl hover:-translate-y-2'
            }`}>
            {/* Image Container - Giảm chiều cao đáng kể nếu là Compact */}
            <div className={`relative overflow-hidden ${isCompact
                    ? 'h-32 sm:h-40'
                    : (isTopSeller ? 'h-64 sm:h-80' : 'h-48 sm:h-56')
                }`}>
                <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Badge - Nhỏ hơn trong chế độ compact */}
                {isTopSeller && (
                    <div className={`absolute top-0 left-0 bg-black text-white px-3 py-1 text-[10px] font-bold shadow-lg transform -rotate-12 origin-top-left ${isCompact ? 'scale-75' : ''}`}
                        style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' }}>
                        <div className="transform rotate-12">
                            <div className="text-center leading-tight">
                                <div className="text-[8px]">TOP</div>
                                <div className="font-black">SELLER</div>
                            </div>
                        </div>
                    </div>
                )}

                {product.oldPrice && (
                    <div className={`absolute top-2 right-2 bg-red-500 text-white font-bold shadow-lg rounded-full ${isCompact ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'}`}>
                        -25%
                    </div>
                )}

                {/* Wishlist Button - Nhỏ hơn trong compact */}
                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg ${isCompact ? 'w-7 h-7' : 'w-9 h-9'}`}
                >
                    <Heart className={`${isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
            </div>

            {/* Content Section - Giảm Padding */}
            <div className={`${isCompact ? 'p-3' : 'p-4 sm:p-5'}`}>
                <h3 className={`text-gray-800 font-bold mb-1.5 line-clamp-2 group-hover:text-orange-600 transition-colors ${isCompact ? 'text-sm min-h-[40px]' : 'text-base sm:text-lg min-h-[48px]'
                    }`}>
                    {product.name}
                </h3>

                {/* Price & Contact - Chuyển thành cột nếu quá hẹp trong compact */}
                <div className={`flex ${isCompact ? 'flex-col gap-2' : 'flex-row items-baseline gap-2 mb-4 justify-between'}`}>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                            <span className={`font-bold ${isCompact ? 'text-base' : 'text-[10px] sm:text-[11px]'
                                } ${isTopSeller ? 'text-[#ed792f]' : 'text-gray-900'}`}>
                                {product.price}
                            </span>

                            {product.oldPrice && (
                                <span className={`text-gray-400 line-through ${isCompact ? 'text-[10px]' : 'text-[1px]'}`}>
                                    {product.oldPrice}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={`bg-green-50 border border-green-100 rounded-full flex items-center shadow-sm transition-colors hover:bg-green-100 w-fit ${isCompact ? 'px-2 py-1' : 'px-3 py-1.5'
                        }`}>
                        <span className="text-[10px] uppercase tracking-wider text-green-600 font-bold mr-1.5">LH:</span>
                        <span className={`font-bold text-green-700 tracking-wider ${isCompact ? 'text-[11px]' : 'text-[12px]'}`}>
                            {product.phone}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}