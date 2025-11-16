import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const MegaMenu = ({ categories }) => {
    const [openCategory, setOpenCategory] = useState(null);

    return (
        <div className="relative group w-40 z-[2000]">

            {/* BUTTON DANH MỤC */}
            <button
                className="flex items-center justify-between w-full px-5 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white font-bold rounded-l-xl hover:from-orange-700 hover:to-pink-700 transition-all shadow-lg"
            >
                <span>DANH MỤC</span>
                <ChevronDown className="w-5 h-5 ml-2 transition-transform group-hover:rotate-180" />
            </button>

            {/* MENU DROPDOWN */}
            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[2001]">
                <ul className="p-2 space-y-1">
                    {categories && categories.length > 0 ? categories.map((cat) => (
                        <li
                            key={cat.name}
                            className="relative"
                            onMouseEnter={() => setOpenCategory(cat.name)}
                            onMouseLeave={() => setOpenCategory(null)}
                        >
                            <div className="flex items-center justify-between p-3 text-gray-800 hover:bg-gray-50 hover:text-orange-600 rounded-md cursor-pointer">
                                <span>{cat.name}</span>

                                {cat.subs?.length > 0 && (
                                    <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                                )}
                            </div>

                            {/* SUB MENU */}
                            {cat.subs?.length > 0 && openCategory === cat.name && (
                                <div className="absolute top-0 left-full ml-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-[2002]">
                                    {cat.subs.map((sub, i) => (
                                        <div
                                            key={i}
                                            className="p-2 rounded hover:bg-orange-50 hover:text-orange-600 cursor-pointer text-sm"
                                        >
                                            {sub}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>
                    )) : <li className="p-3 text-gray-500 text-center">Không có danh mục</li>}
                </ul>
            </div>
        </div>
    );
};

export default MegaMenu;
