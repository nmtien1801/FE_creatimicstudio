import React, { useState } from "react";
import { Menu, Search, Phone } from "lucide-react";
import { NavLink } from "react-router-dom";
import MegaMenu from "../DanhMuc.jsx";

export default function Header({ categories, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Menu chính tái sử dụng
  const menuItems = [
    { label: "TRANG CHỦ", path: "/home" },
    { label: "GIỚI THIỆU", path: "/about" },
    { label: "SẢN PHẨM", path: "/products" },
    { label: "TIN TỨC", path: "/news" },
    { label: "TUYỂN DỤNG", path: "/careers" },
    { label: "LIÊN HỆ", path: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">

      {/* MAIN HEADER */}
      <div className="w-full px-4 py-4 flex items-center justify-between gap-4">

        {/* LOGO */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-xl">CS</span>
          </div>

          <div className="hidden sm:block">
            <h1 className="text-2xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              CREATIMICSTUDIO
            </h1>
            <p className="text-xs text-gray-500 font-medium">Thiết bị thu âm chuyên nghiệp</p>
          </div>
        </div>

        {/* SEARCH + MEGA MENU */}
        <div className="flex-1 max-w-2xl mx-4 hidden md:flex rounded-2xl overflow-visible shadow-lg border-2 border-gray-100">
          <input
            type="text"
            placeholder="Nhập sản phẩm tìm kiếm nhanh hơn..."
            className="flex-1 px-6 py-3 text-gray-700 focus:outline-none bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MegaMenu categories={categories || []} />
          <button className="px-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 transition-all flex items-center justify-center rounded-r-xl">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* CONTACT */}
        <div className="hidden lg:flex space-x-8 text-sm text-gray-600 items-center">
          <a href="tel:0372672396" className="flex items-center gap-2 hover:text-orange-600 transition-colors font-medium">
            <Phone className="w-4 h-4 text-orange-600" />
            037.2672.396 - Hotline đặt hàng
          </a>
          <a href="tel:0347577034" className="flex items-center gap-2 hover:text-orange-600 transition-colors font-medium">
            <Phone className="w-4 h-4 text-orange-600" />
            034.7577.034 - Hợp tác truyền thông
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative p-3 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-xl md:hidden hover:shadow-xl hover:scale-110 transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* DESKTOP NAVIGATION */}
      <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 hidden md:block">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex space-x-2">

            {menuItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-6 py-4 text-sm font-bold transition-all group
                  ${isActive ? "text-white" : "text-gray-300 hover:text-white"}`
                }
              >

                {({ isActive }) => (
                  <>
                    {item.label}

                    {/* ACTIVE underline */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1
                                      bg-gradient-to-r from-orange-500 to-pink-500"></div>
                    )}

                    {/* HOVER underline (nhẹ) */}
                    {!isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/0
                                      group-hover:bg-white/20 transition-all duration-300"></div>
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
              <h3 className="text-2xl font-black text-orange-600">Menu</h3>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded hover:bg-gray-100 transition-colors">✕</button>
            </div>

            {/* MOBILE MENU ITEMS */}
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block p-3 text-gray-800 font-bold hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors
                         ${isActive ? "text-orange-600" : ""}`
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
            <div className="mt-8 pt-4 border-t">
              <h4 className="font-bold text-gray-800 mb-2">Danh mục sản phẩm</h4>

              <ul className="space-y-1">
                {categories?.map((cat, index) => (
                  <li key={index}>
                    <NavLink
                      to={cat.path || "#"}
                      className="block py-2 text-sm text-gray-600 hover:text-orange-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {cat.name}
                    </NavLink>

                    {cat.subs?.length > 0 && (
                      <ul className="pl-4 mt-1 space-y-1">
                        {cat.subs.map((sub, i) => (
                          <li key={i}>
                            <NavLink
                              to={sub.path || "#"}
                              className="block py-1 text-sm text-gray-500 hover:text-orange-500"
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
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
