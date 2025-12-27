import React, { useState } from "react";
import { Star, Heart } from 'lucide-react';

export default function ProductCard({ product, isTopSeller = false }) {
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <div className={`group bg-white rounded-2xl overflow-hidden transition-all duration-500 ${isTopSeller
            ? 'shadow-2xl hover:shadow-[0_20px_60px_rgba(249,115,22,0.3)] border-2 border-orange-400 hover:scale-[1.02]'
            : 'shadow-lg hover:shadow-2xl hover:-translate-y-2'
            }`}>
            <div className={`relative overflow-hidden ${isTopSeller ? 'h-64 sm:h-80' : 'h-48 sm:h-56'}`}>
                <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Badge */}
                {isTopSeller && (
                    <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 text-xs font-bold shadow-lg transform -rotate-12 origin-top-left" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' }}>
                        <div className="transform rotate-12">
                            <div className="text-center leading-tight">
                                <div className="text-[10px]">TOP</div>
                                <div className="text-sm font-black">SELLER</div>
                            </div>
                        </div>
                    </div>
                )}

                {product.oldPrice && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        -25%
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute bottom-3 right-3 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
                >
                    <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
            </div>

            <div className="p-4 sm:p-5">
                <h3 className="text-gray-800 font-bold mb-2 line-clamp-2 text-base sm:text-lg min-h-[48px] group-hover:text-orange-600 transition-colors">
                    {product.name}
                </h3>

                <div className="flex items-baseline gap-2 mb-4 justify-between">
                    <div className="flex flex-col gap-3 mb-4">
                        <div className="flex items-center gap-2">
                            <span className={`font-bold text-lg sm:text-xl ${isTopSeller
                                    ? 'text-[#ed792f]'
                                    : 'text-gray-900'
                                }`}>
                                {product.price}
                            </span>

                            {product.oldPrice && (
                                <span className="text-xs text-gray-400 line-through mt-0.5">
                                    {product.oldPrice}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="bg-green-50 border border-green-100 px-3 py-1.5 rounded-full flex items-center shadow-sm transition-colors hover:bg-green-100">
                        <span className="text-[10px] uppercase tracking-wider text-green-600 font-bold mr-2">LH:</span>
                        <span className="text-[12px] font-bold text-green-700 tracking-wider">{product.phone}</span>
                    </div>
                </div>



                {/* <button className={`w-full py-2.5 sm:py-3 font-bold rounded-xl transition-all duration-300 cursor-pointer ${isTopSeller
                    ? 'bg-[#ed792f] text-white hover:shadow-xl hover:scale-105'
                    : 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg'
                    }`}>
                    Mua ngay
                </button> */}
            </div>
        </div>
    );
}
