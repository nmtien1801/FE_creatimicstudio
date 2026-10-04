import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  Search,
  Phone,
  ChevronDown,
  X,
  ShoppingCart,
  User,
  ArrowRight,
  Headphones,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import MegaMenu from "../DanhMuc.jsx";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { slug } from "../../utils/constants.js";
import { setSearchResults } from "../../redux/productSlice.js";

export default function Header({
  categories,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const { ProductDropdown } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  const searchRef = useRef(null);
  const megaRef = useRef(null);

  // =========================================================
  // MENU
  // =========================================================

  const menuItems = [
    { label: "TRANG CHỦ", path: "/trang-chu" },
    { label: "SẢN PHẨM", path: "/san-pham/all/all" },
    { label: "DỊCH VỤ CÀI ĐẶT PHẦN MỀM AUTOTONE", path: "dich-vu/phan-mem-auto-tone" },
    { label: "DỊCH VỤ SETUP LIVESTREAM", path: "dich-vu/set-up-phong-livestream" },
    { label: "REVIEW CHI TIẾT", path: "review-detail" },
  ];

  // =========================================================
  // SEARCH SUGGESTION
  // =========================================================

  const filteredSuggestions = ProductDropdown?.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 8);

  // =========================================================
  // CLICK OUTSIDE
  // =========================================================

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }

      if (
        megaRef.current &&
        !megaRef.current.contains(e.target)
      ) {
        setIsMegaOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.warning("Vui lòng nhập từ khóa!");
      return;
    }

    const query = searchQuery.toLowerCase().trim();

    const exactMatch = ProductDropdown?.find((p) => {
      const matchMaSP =
        p.maSP?.toLowerCase() === query;

      const matchName =
        p.name?.toLowerCase() === query;

      return matchMaSP || matchName;
    });

    if (exactMatch) {
      navigate(
        `/${slug(exactMatch.name)}/all/${exactMatch.id}`
      );
    } else {
      const matchedProducts =
        ProductDropdown?.filter((item) =>
          item.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        ) || [];

      dispatch(setSearchResults(matchedProducts));

      navigate("/san-pham/all/all?search=true");
    }

    setShowSuggestions(false);
    setHighlightedIndex(-1);
  };

  // =========================================================
  // GO TO PRODUCT
  // =========================================================

  const handleProductClick = (item) => {
    setSearchQuery(item.name);
    setShowSuggestions(false);
    setHighlightedIndex(-1);

    navigate(
      `/${slug(item.name)}/all/${item.id}`
    );
  };

  return (
    <>
      {/* =====================================================
          CUSTOM KEYFRAMES
      ===================================================== */}
      <style>{`
        @keyframes textMarqueeLTR {
          0% {
            transform: translate3d(-100%, 0, 0);
          }
          100% {
            transform: translate3d(100%, 0, 0);
          }
        }

        .ticker-ltr {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          animation: textMarqueeLTR 11s linear infinite;
          will-change: transform;
        }

        .ticker-ltr:hover {
          animation-play-state: paused;
        }

        .marquee-viewport {
          position: relative;
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-ltr {
            animation: none;
            transform: none;
          }
        }
      `}</style>

      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="sticky top-0 z-[100] w-full bg-[#ed792f] shadow-lg">

        {/* ===================================================
            TOP BAR: CÂN ĐỐI 3 PHẦN
        =================================================== */}
        <div className="border-b border-black/10 bg-[#e46a1e]/90 backdrop-blur-sm">
          <div className="flex h-[38px] items-center justify-between px-4 sm:px-6 lg:px-8 text-[12px] text-white">

            {/* BÊN TRÁI: SĐT & HỖ TRỢ 24/7 */}
            <div className="flex shrink-0 items-center gap-3">
              <a
                href="tel:0372672396"
                className="group flex items-center gap-1.5 rounded-full bg-black/10 px-2.5 py-1 transition-all hover:bg-black/20"
              >
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#ed792f]">
                  <Phone size={10} strokeWidth={2.5} />
                </div>
                <span className="font-semibold tracking-wide text-white group-hover:text-yellow-200">
                  037.267.2396
                </span>
              </a>

              <span className="hidden h-3 w-px bg-white/25 sm:inline-block" />

              <div className="hidden items-center gap-1.5 text-white/90 sm:flex">
                <Headphones size={13} className="text-yellow-200" />
                <span className="text-[11.5px] font-medium">Hỗ trợ 24/7</span>
              </div>
            </div>

            {/* Ở GIỮA: BADGE + TEXT CHẠY TRONG KHUNG GIỚI HẠN */}
            <div className="mx-2 flex min-w-0 flex-1 items-center justify-center gap-2.5">
              {/* Khung giới hạn chạy chữ có hiệu ứng mask 2 bên */}
              <div className="marquee-viewport h-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] flex-1">
                <div className="ticker-ltr flex items-center gap-1.5 text-white drop-shadow-sm">
                  <span className="font-medium text-white/95">
                    Đăng ký khách hàng thân thiết
                  </span>
                  <span className="text-yellow-300 font-bold">•</span>
                  <span className="font-bold text-yellow-200">
                    Nhận ngay ưu đãi cực khủng
                  </span>
                </div>
              </div>
            </div>

            {/* BÊN PHẢI: CÁC NÚT ĐIỀU HƯỚNG CỐ ĐỊNH */}
            <div className="flex shrink-0 items-center gap-1 font-medium sm:gap-2">
              <button
                onClick={() => navigate("/register")}
                className="rounded px-2 py-0.5 transition-colors hover:bg-black/15 hover:text-yellow-200"
              >
                Đăng ký
              </button>

              <span className="text-white/30">|</span>

              <button
                onClick={() => navigate("/login")}
                className="rounded px-2 py-0.5 transition-colors hover:bg-black/15 hover:text-yellow-200"
              >
                Đăng nhập
              </button>

              <span className="hidden text-white/30 md:inline">|</span>

              <button
                onClick={() => navigate("/gio-hang")}
                className="hidden rounded px-2 py-0.5 transition-colors hover:bg-black/15 hover:text-yellow-200 md:inline-block"
              >
                Giỏ hàng
              </button>

              <span className="hidden text-white/30 lg:inline">|</span>

              <button
                onClick={() => navigate("/thanh-toan")}
                className="hidden rounded px-2 py-0.5 transition-colors hover:bg-black/15 hover:text-yellow-200 lg:inline-block"
              >
                Thanh toán
              </button>
            </div>

          </div>
        </div>

        {/* ===================================================
            MAIN HEADER
        =================================================== */}
        <div className="bg-[#ed792f]">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex min-h-[92px] items-center justify-between gap-4">

              {/* 1. CỘT TRÁI: LOGO (Cố định width để cân đối hai bên) */}
              <div className="flex w-[190px] shrink-0 items-center">
                <NavLink to="/trang-chu" className="group block">
                  <img
                    src="/logo.png"
                    alt="CMIC Studio"
                    className="
                      h-[70px]
                      w-auto
                      max-w-[170px]
                      object-contain
                      transition-transform
                      duration-300
                      group-hover:scale-[1.02]
                    "
                  />
                </NavLink>
              </div>

              {/* 2. CỘT GIỮA: THANH TÌM KIẾM (Căn giữa tuyệt đối trục ngang) */}
              <div className="flex min-w-0 flex-1 items-center justify-center px-2">
                <div ref={searchRef} className="relative w-full max-w-4xl">
                  <div
                    className="
                      flex
                      h-[46px]
                      w-full
                      overflow-visible
                      rounded-lg
                      border
                      border-black/10
                      bg-white
                      shadow-[0_2px_12px_rgba(0,0,0,0.08)]
                      transition-all
                      duration-200
                      focus-within:border-black/25
                      focus-within:shadow-[0_4px_20px_rgba(0,0,0,0.14)]
                    "
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      placeholder="Bạn đang tìm kiếm thiết bị gì?"
                      className="
                        min-w-0
                        flex-1
                        bg-transparent
                        px-4
                        text-[13px]
                        text-gray-800
                        outline-none
                        placeholder:text-gray-400
                      "
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(true);
                        setHighlightedIndex(-1);
                      }}
                      onFocus={() => {
                        if (searchQuery) setShowSuggestions(true);
                      }}
                      onKeyDown={(e) => {
                        if (
                          e.key === "ArrowDown" &&
                          filteredSuggestions?.length > 0
                        ) {
                          e.preventDefault();
                          setHighlightedIndex((prev) =>
                            prev < filteredSuggestions.length - 1
                              ? prev + 1
                              : prev
                          );
                        } else if (
                          e.key === "ArrowUp" &&
                          highlightedIndex > 0
                        ) {
                          e.preventDefault();
                          setHighlightedIndex((prev) => prev - 1);
                        } else if (e.key === "Enter") {
                          if (
                            highlightedIndex >= 0 &&
                            filteredSuggestions?.[highlightedIndex]
                          ) {
                            handleProductClick(
                              filteredSuggestions[highlightedIndex]
                            );
                          } else {
                            handleSearch();
                          }
                        } else if (e.key === "Escape") {
                          setShowSuggestions(false);
                          setHighlightedIndex(-1);
                        }
                      }}
                    />

                    {/* Button Danh Mục */}
                    <div ref={megaRef} className="relative hidden h-full md:block">
                      <button
                        type="button"
                        onClick={() => setIsMegaOpen(!isMegaOpen)}
                        className="
                          flex
                          h-full
                          items-center
                          gap-1.5
                          border-l
                          border-gray-200
                          bg-gray-50/80
                          px-4
                          text-xs
                          font-bold
                          text-gray-700
                          transition-all
                          hover:bg-orange-50
                          hover:text-[#ed792f]
                        "
                      >
                        DANH MỤC
                        <ChevronDown
                          size={14}
                          className={`
                            transition-transform
                            duration-300
                            ${isMegaOpen ? "rotate-180" : ""}
                          `}
                        />
                      </button>

                      {isMegaOpen && (
                        <div
                          className="
                            absolute
                            left-0
                            top-[calc(100%+8px)]
                            z-[200]
                            w-[800px]
                            overflow-hidden
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            shadow-2xl
                            animate-[fadeIn_.2s_ease-out]
                          "
                        >
                          <MegaMenu categories={categories || []} />
                        </div>
                      )}
                    </div>

                    {/* Nút Tìm kiếm */}
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="
                        group
                        flex
                        h-full
                        w-[52px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-r-lg
                        bg-neutral-900
                        transition-all
                        duration-200
                        hover:bg-black
                      "
                    >
                      <Search
                        size={20}
                        strokeWidth={2.2}
                        className="text-white transition-transform duration-200 group-hover:scale-110"
                      />
                    </button>
                  </div>

                  {/* DANH SÁCH GỢI Ý TÌM KIẾM */}
                  {showSuggestions &&
                    searchQuery &&
                    filteredSuggestions?.length > 0 && (
                      <div
                        className="
                          absolute
                          left-0
                          right-0
                          top-[54px]
                          z-[300]
                          max-h-[430px]
                          overflow-y-auto
                          rounded-xl
                          border
                          border-gray-200
                          bg-white
                          shadow-[0_15px_40px_rgba(0,0,0,0.18)]
                        "
                      >
                        <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 px-4 py-2.5 backdrop-blur">
                          <p className="text-xs text-gray-500">
                            Tìm thấy{" "}
                            <span className="font-bold text-[#ed792f]">
                              {filteredSuggestions.length}
                            </span>{" "}
                            sản phẩm phù hợp
                          </p>
                        </div>

                        {filteredSuggestions.map((item, index) => (
                          <div
                            key={item.id}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            onClick={() => handleProductClick(item)}
                            className={`
                              flex
                              cursor-pointer
                              items-center
                              gap-3
                              border-b
                              border-gray-100
                              px-4
                              py-3
                              transition-colors
                              ${highlightedIndex === index
                                ? "bg-orange-50"
                                : "hover:bg-gray-50"
                              }
                            `}
                          >
                            {item.ProductImages?.[0]?.image ? (
                              <img
                                src={item.ProductImages[0].image}
                                alt={item.name}
                                className="h-12 w-12 shrink-0 rounded-lg border border-gray-200 object-cover"
                              />
                            ) : (
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                                <Search size={18} className="text-gray-400" />
                              </div>
                            )}

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-gray-800">
                                {item.name}
                              </p>
                              <p className="mt-0.5 truncate text-[11px] text-gray-400">
                                Mã: {item.maSP || "---"}
                              </p>
                            </div>

                            {item.price && (
                              <span className="shrink-0 text-sm font-bold text-[#ed792f]">
                                {item.price.toLocaleString("vi-VN")} ₫
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>

              {/* 3. CỘT PHẢI: TÀI KHOẢN & GIỎ HÀNG (Cố định width w-[190px] bằng với cột logo) */}
              <div className="hidden w-[190px] shrink-0 items-center justify-end gap-2 lg:flex">
                {/* Đăng nhập */}
                <button
                  onClick={() => navigate("/dang-nhap")}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    px-2
                    py-2
                    text-white
                    transition-all
                    hover:bg-black/10
                  "
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:scale-105">
                    <User size={18} strokeWidth={2} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-medium text-white/70">
                      Tài khoản
                    </p>
                    <p className="text-xs font-bold leading-tight">
                      Đăng nhập
                    </p>
                  </div>
                </button>

                {/* Giỏ hàng */}
                <button
                  onClick={() => navigate("/gio-hang")}
                  className="
                    group
                    relative
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    text-white
                    transition-all
                    hover:bg-black/10
                  "
                >
                  <ShoppingCart
                    size={24}
                    strokeWidth={2}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5"
                  />
                  <span
                    className="
                      absolute
                      right-1
                      top-1
                      flex
                      h-[18px]
                      min-w-[18px]
                      items-center
                      justify-center
                      rounded-full
                      bg-[#c62828]
                      px-1
                      text-[10px]
                      font-black
                      text-white
                      shadow-md
                    "
                  >
                    {cartCount}
                  </span>
                </button>
              </div>

              {/* NÚT MENU MOBILE */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="
                  ml-auto
                  rounded-lg
                  border
                  border-white/20
                  bg-white/10
                  p-2.5
                  text-white
                  transition-all
                  hover:bg-white/20
                  md:hidden
                "
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

            </div>
          </div>
        </div>

        {/* =====================================================
            NAVIGATION (MENU NGANG)
        ===================================================== */}
        <nav className="hidden border-t border-gray-200 bg-white shadow-sm md:block">
          <div className="px-4">
            <div className="flex items-center justify-center">
              {menuItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) => `
                    group
                    relative
                    px-5
                    py-3
                    text-[12px]
                    font-bold
                    tracking-wide
                    transition-colors
                    duration-150
                    lg:px-7
                    lg:text-[13px]
                    ${isActive
                      ? "text-[#ed792f]"
                      : "text-gray-700 hover:text-[#ed792f]"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      <span
                        className={`
                          absolute
                          bottom-0
                          left-1/2
                          h-[3px]
                          -translate-x-1/2
                          bg-[#ed792f]
                          transition-all
                          duration-200
                          ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                        `}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

      </header>

      {/* =====================================================
          DRAWER MOBILE
      ===================================================== */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="fixed right-0 top-0 flex h-full w-[290px] flex-col bg-white shadow-2xl animate-[slideInRight_.25s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 bg-[#ed792f] px-5 py-4 text-white">
              <div>
                <p className="text-[10px] font-medium tracking-widest text-white/70">
                  CMIC STUDIO
                </p>
                <h3 className="text-lg font-black">DANH MỤC</h3>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-full bg-white/15 p-2 text-white transition-all hover:bg-white/25"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => `
                      block
                      rounded-lg
                      px-4
                      py-3
                      text-sm
                      font-bold
                      transition-all
                      ${isActive
                        ? "bg-orange-50 text-[#ed792f]"
                        : "text-gray-700 hover:bg-gray-50"
                      }
                    `}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-orange-50 p-4">
                <p className="mb-1 text-xs font-bold text-[#ed792f]">
                  HOTLINE HỖ TRỢ
                </p>
                <a
                  href="tel:0372672396"
                  className="flex items-center gap-2 text-sm font-bold text-gray-800"
                >
                  <Phone size={14} className="text-[#ed792f]" />
                  037.267.2396
                </a>
              </div>
            </nav>

            <div className="border-t border-gray-100 px-5 py-3 text-center">
              <p className="text-[11px] text-gray-400">© 2026 CMIC Studio</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}