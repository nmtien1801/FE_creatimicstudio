import React, { useState, useRef, useEffect } from "react";
import { Menu, Search, Phone, ChevronDown, Mic } from "lucide-react";
import { NavLink } from "react-router-dom";
import MegaMenu from "../DanhMuc.jsx";

export default function Header({ categories, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMegaOpen, setIsMegaOpen] = useState(false);

  const menuItems = [
    { label: "TRANG CHỦ", path: "/home" },
    { label: "GIỚI THIỆU", path: "/about" },
    { label: "SẢN PHẨM", path: "/product/all/all" },
    { label: "DỊCH VỤ", path: "/service" },
    { label: "TIN TỨC", path: "/post" },
    { label: "TUYỂN DỤNG", path: "/careers" },
    { label: "LIÊN HỆ", path: "/contact" },
  ];

  const megaRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setIsMegaOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  return (
    <header className="bg-[#ed792f] shadow-md sticky top-0 z-50">

      {/* 1. MAIN HEADER CONTAINER */}
      <div className="max-w-0xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-1 flex items-center justify-between gap-3">
          {/* LOGO */}
          <img src="/logo1.png" alt="logo" className="w-20 h-20 object-contain rounded-lg" />

          {/* SEARCH + MEGA MENU */}
          <div className="hidden md:flex flex-1 w-full max-w-2xl h-[45px] bg-white items-center border border-black/10 shadow-sm">
            {/* Input */}
            <input
              type="text"
              placeholder="" // Trong ảnh input trống
              className="flex-1 h-full px-4 text-gray-700 outline-none text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Phần chọn Danh Mục (Có đường kẻ dọc ngăn cách) */}
            <div ref={megaRef} className="relative h-full border-l border-r border-gray-300">
              {/* Nút bấm */}
              <div
                onClick={() => setIsMegaOpen(!isMegaOpen)}
                className="h-full flex items-center px-4 cursor-pointer hover:bg-gray-50 transition-colors whitespace-nowrap select-none"
              >
                <span className="text-black font-bold text-sm mr-2">DANH MỤC</span>
                <ChevronDown
                  className={`w-4 h-4 text-black transition-transform duration-200 ${isMegaOpen ? "rotate-180" : ""
                    }`}
                />
              </div>

              {/* Mega Menu */}
              {isMegaOpen && (
                <div className="absolute top-full left-0 w-[800px] z-50">
                  <MegaMenu categories={categories || []} />
                </div>
              )}
            </div>


            {/* Nút Search Icon */}
            <button className="h-full px-5 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Search className="w-6 h-6 text-black" />
            </button>
          </div>

          {/* CONTACT */}
          <div className="flex items-center gap-6 ml-2">
            <div className="hidden lg:flex flex-col space-y-1 flex-shrink-0 text-right">
              <a href="tel:0372672396" className="flex items-center justify-end gap-2 text-white transition-colors font-bold text-sm">
                <Phone className="w-4 h-4" /> 037.2672.396
              </a>
              <a href="tel:0347577034" className="flex items-center justify-end gap-2 text-white/90 transition-colors font-medium text-xs">
                Hotline đặt hàng
              </a>
            </div>
            <div className="hidden lg:flex flex-col space-y-1 flex-shrink-0 text-right">
              <a href="tel:0372672396" className="flex items-center justify-end gap-2 text-white transition-colors font-bold text-sm">
                <Phone className="w-4 h-4" /> 034.7577.034
              </a>
              <a href="tel:0347577034" className="flex items-center justify-end gap-2 text-white/90 transition-colors font-medium text-xs">
                Hợp tác truyền thông
              </a>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-3 bg-white/20 text-white rounded-xl md:hidden hover:bg-white/30 transition-all"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 2. DESKTOP NAVIGATION CONTAINER */}
      <nav className="bg-white hidden md:block border-t border-gray-100">
        <div className="max-w-0xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8">
            {menuItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-6 py-4 text-sm font-bold transition-all group
                  ${isActive ? "text-[#ed792f]" : "text-gray-700 hover:text-[#ed792f]"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ed792f]"></div>
                    )}
                    {!isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#ed792f] group-hover:w-full transition-all duration-300"></div>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setIsMobileMenuOpen(false)}>

          <div
            className="fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white shadow-2xl p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* DRAWER HEADER */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-[#ed792f]">Menu</h3>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded hover:bg-gray-100 transition-colors">✕</button>
            </div>

            {/* ============================== MOBILE MENU ITEMS =========================*/}
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block p-3 text-gray-800 font-bold hover:bg-[#ed792f] hover:text-[#ed792f] rounded-lg transition-colors
                         ${isActive ? "text-[#ed792f]" : ""}`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* DANH MỤC SẢN PHẨM */}
            {/* <div className="mt-8 pt-4 border-t">
              <h4 className="font-bold text-gray-800 mb-2">Danh mục sản phẩm</h4>

              <ul className="space-y-1">
                {categories?.map((cat, index) => (
                  <li key={index}>
                    <NavLink
                      to={cat.path || "#"}
                      className="block py-2 text-sm text-gray-600 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {cat.name}
                    </NavLink>

                    {cat.children?.length > 0 && (
                      <ul className="pl-4 mt-1 space-y-1">
                        {cat.children.map((sub, i) => (
                          <li key={i}>
                            <NavLink
                              to={sub.path || "#"}
                              className="block py-1 text-sm text-gray-500 hover:text-[#ed792f]"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {sub.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div> */}

          </div>
        </div>
      )}

    </header>
  );
}