import React, { useState, useRef, useEffect } from "react";
import { Menu, Search, Phone, ChevronDown, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import MegaMenu from "../DanhMuc.jsx";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { slug } from '../../utils/constants.js';

export default function Header({ categories, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);

  const { ProductDropdown } = useSelector((state) => state.product);

  const searchRef = useRef(null);
  const megaRef = useRef(null);

  const menuItems = [
    { label: "TRANG CHỦ", path: "/trang-chu" },
    { label: "GIỚI THIỆU", path: "/gioi-thieu" },
    { label: "SẢN PHẨM", path: "/san-pham/all/all" },
    { label: "DỊCH VỤ", path: "/dich-vu" },
    { label: "TIN TỨC", path: "/tin-tuc" },
    { label: "TUYỂN DỤNG", path: "/tuyen-dung" },
    { label: "LIÊN HỆ", path: "/lien-he" },
  ];

  // Lọc danh sách gợi ý dựa trên từ khóa
  const filteredSuggestions = ProductDropdown?.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 8);

  // Xử lý đóng các menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSuggestions(false);
      if (megaRef.current && !megaRef.current.contains(e.target)) setIsMegaOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ==================================================== ACTION =====================================
  const handleSearch = () => {
    if (!searchQuery.trim()) return toast.warning("Vui lòng nhập từ khóa!");

    // Kiểm tra xem có khớp chính xác sản phẩm nào không
    const exactMatch = ProductDropdown?.find(p => {
      const query = searchQuery.toLowerCase().trim();
      // 1. Kiểm tra mã sản phẩm (maSP) trước
      const matchMaSP = p.maSP?.toLowerCase() === query;

      // 2. Nếu không khớp maSP thì kiểm tra tên (name)
      const matchName = p.name?.toLowerCase() === query;

      return matchMaSP || matchName;
    });

    if (exactMatch) {
      navigate(`/${slug(exactMatch.name)}/all/${exactMatch.id}`);
    } else {
      // Nếu không khớp chính xác, chuyển đến trang danh sách kèm query
      navigate(`/san-pham/all/all?search=${encodeURIComponent(searchQuery.trim())}`);
    }
    setShowSuggestions(false);
  };

  return (
    <header className="bg-[#ed792f] shadow-md sticky top-0 z-50 w-full">
      {/* 1. TOP HEADER: LOGO - SEARCH - CONTACT */}
      <div className="max-w-0xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-2 flex items-center justify-between gap-4">

          {/* LOGO (Trái) */}
          <div className="flex-shrink-0 w-[120px] lg:w-[150px]">
            <NavLink to="/trang-chu">
              <img src="/logo1.png" alt="logo" className="w-16 h-16 lg:w-20 lg:h-20 object-contain rounded-lg shadow-sm bg-white/10" />
            </NavLink>
          </div>

          {/* THANH SEARCH (Giữa) */}
          <div className="hidden md:flex flex-1 justify-center max-w-2xl">
            <div ref={searchRef} className="relative w-full h-[45px] bg-white flex items-center border border-black/10 shadow-inner rounded-sm overflow-visible">

              {/* Input nhập liệu */}
              <input
                type="text"
                className="flex-1 h-full px-4 outline-none text-sm text-black placeholder:text-gray-400"
                placeholder="VD: Micro cài tai không dây ...."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />

              {/* Dropdown Gợi ý */}
              {showSuggestions && searchQuery && filteredSuggestions?.length > 0 && (
                <div className="absolute top-[48px] left-0 w-full bg-white border border-gray-200 shadow-2xl z-[70] max-h-[350px] overflow-y-auto rounded-b-md animate-in fade-in slide-in-from-top-1">
                  {filteredSuggestions.map((item) => (
                    <div
                      key={item.id}
                      className="px-4 py-3 hover:bg-orange-50 cursor-pointer text-sm text-gray-700 border-b border-gray-50 flex items-center gap-2 transition-colors"
                      onClick={() => {
                        setSearchQuery(item.name);
                        setShowSuggestions(false);
                      }}
                    >
                      <Search className="w-3 h-3 text-gray-400" />
                      <span className="truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Nút Danh Mục (Ngăn cách bằng line dọc) */}
              <div ref={megaRef} className="relative h-full border-l border-gray-200 bg-gray-50/50">
                <div
                  onClick={() => setIsMegaOpen(!isMegaOpen)}
                  className="h-full flex items-center px-4 cursor-pointer hover:bg-gray-100 transition-all whitespace-nowrap select-none"
                >
                  <span className="text-gray-800 font-bold text-xs lg:text-sm ml-3">DANH MỤC</span>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isMegaOpen ? "rotate-180" : ""}`} />
                </div>

                {isMegaOpen && (
                  <div className="absolute top-full left-0 w-[800px] z-50">
                    <MegaMenu categories={categories || []} />
                  </div>
                )}
              </div>

              {/* Nút Click Search */}
              <button
                onClick={handleSearch}
                className="h-full px-5 flex items-center justify-center bg-gray-50 hover:bg-orange-600 hover:text-white transition-all border-l border-gray-200 group rounded-r-sm"
              >
                <Search className="w-5 h-5 text-gray-600 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* CONTACT (Phải) */}
          <div className="hidden lg:flex flex-shrink-0 items-center justify-end gap-6">
            {/* Khối Hotline 1 */}
            <div className="text-right whitespace-nowrap">
              <a href="tel:0372672396" className="flex items-center justify-end gap-1.5 text-white font-bold text-sm hover:text-black transition-colors">
                <Phone className="w-4 h-4" /> 037.267.2396
              </a>
              <p className="text-[10px] text-white/80 font-medium uppercase tracking-tight mt-0.5">
                Hotline hỗ trợ 24/7
              </p>
            </div>

            {/* Đường kẻ dọc ngăn cách */}
            <div className="w-[1px] h-8 bg-white/20"></div>

            {/* Khối Hotline 2 - Hợp tác truyền thông */}
            <div className="text-right whitespace-nowrap">
              <a href="tel:0347577034" className="flex items-center justify-end gap-1.5 text-white font-bold text-sm hover:text-black transition-colors">
                <Phone className="w-4 h-4" /> 034.757.7034
              </a>
              <p className="text-[10px] text-white/80 font-medium uppercase tracking-tight mt-0.5">
                Hợp tác truyền thông
              </p>
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 bg-white/20 text-white rounded-lg md:hidden hover:bg-white/30 transition-all border border-white/10"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 2. DESKTOP NAVIGATION (Dòng dưới) */}
      <nav className="bg-white hidden md:block border-t border-gray-100/50 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex justify-center items-center">
            {menuItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-5 lg:px-7 py-3.5 text-xs lg:text-[13px] font-bold transition-all group
                                    ${isActive ? "text-[#ed792f]" : "text-gray-700 hover:text-[#ed792f]"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-[#ed792f] transition-all duration-300 
                                            ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></div>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* 3. MOBILE MENU (Drawer) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="fixed top-0 right-0 w-[280px] h-full bg-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b">
              <h3 className="text-xl font-black text-[#ed792f] tracking-tight">MENU</h3>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block p-3.5 rounded-xl font-bold transition-all duration-200
                                                 ${isActive ? "bg-orange-50 text-[#ed792f] translate-x-2" : "text-gray-700 hover:bg-gray-50"}`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto pt-6 border-t text-center">
              <p className="text-xs text-gray-400 font-medium">© 2026 Tien Audio</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}