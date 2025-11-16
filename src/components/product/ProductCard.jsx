import React, { useState } from "react";
import {  Star, Heart } from 'lucide-react';
import { NavLink } from "react-router-dom";

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
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white" />
                        TOP SELLER
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
                    className="absolute top-3 left-3 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
                >
                    <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
            </div>

            <div className="p-4 sm:p-5">
                <h3 className="text-gray-800 font-bold mb-2 line-clamp-2 text-base sm:text-lg min-h-[48px] group-hover:text-orange-600 transition-colors">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                        ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                    <span className={`font-black text-xl sm:text-2xl ${isTopSeller ? 'bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent' : 'text-orange-600'
                        }`}>
                        {product.price}
                    </span>
                    {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
                    )}
                </div>

                <button className={`w-full py-2.5 sm:py-3 font-bold rounded-xl transition-all duration-300 ${isTopSeller
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-xl hover:scale-105'
                    : 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg'
                    }`}>
                    Mua ngay
                </button>
            </div>
        </div>
    );
}
