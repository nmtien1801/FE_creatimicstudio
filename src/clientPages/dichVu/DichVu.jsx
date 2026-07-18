import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { NavLink, useNavigate } from "react-router-dom";

// Mảng dữ liệu đã được thêm trường url động riêng cho mỗi bài viết
const HARDCODED_POSTS = [
    {
        id: 1,
        title: "Dịch vụ SETUP PHÒNG HÁT LIVESTREAM",
        description: "Dịch vụ setup phòng hát livestream chuyên nghiệp, tối ưu không gian và âm thanh cho trải nghiệm hát livestream đỉnh cao.",
        image: "/dichvu1.png",
        url: "/dich-vu/set-up-phong-livestream" // URL động cụ thể cho bài viết 1
    },
    // {
    //     id: 2,
    //     title: "Dịch vụ PHẦN MỀM AUTO TONE CHUYÊN NGHIỆP",
    //     description: "Nâng tầm giọng hát của bạn với Cubase & AutoTune. Dịch vụ tận tâm, hỗ trợ mọi lúc mọi nơi.",
    //     image: "/dichvu3.jpg",
    //     url: "/dich-vu/phan-mem-auto-tone" // URL động cụ thể cho bài viết 2
    // }
];

// --- NewsCard nhận trực tiếp đường dẫn từ thuộc tính news.url (Thu nhỏ chữ khi responsive) ---
const NewsCard = ({ news }) => (
    <NavLink to={news.url} className="block">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 h-full flex flex-col cursor-pointer">
            <div className="w-full h-36 sm:h-40 bg-gray-300 flex items-center justify-center text-gray-500">
                <img src={news.image} alt={news.title} className="w-full h-full rounded-md border object-cover" />
            </div>
            {/* Thu nhỏ padding và text trên mobile */}
            <div className="p-3 sm:p-4 flex flex-col flex-grow">
                <h3 className="text-sm sm:text-base font-bold text-gray-800 line-clamp-2 hover:text-orange-700 transition mb-1 sm:mb-2">
                    {news.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 flex-grow leading-relaxed">
                    {news.description}
                </p>
            </div>
        </div>
    </NavLink>
);

// --- Pagination: Thu nhỏ nút bấm và khoảng cách trên mobile ---
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxPagesToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentPage + 1 >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
    }

    const pages = Array.from({ length: (endPage - startPage) + 1 }, (_, i) => startPage + i);

    return (
        <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1.5 sm:p-2 border border-gray-300 rounded-lg hover:bg-orange-50 hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    title="Trang trước"
                >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </button>

                {startPage > 1 && <span className="px-1 text-xs text-gray-400">...</span>}

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`min-w-8 h-8 sm:min-w-10 sm:h-10 border rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium
                            ${currentPage === page
                                ? 'bg-orange-600 text-white border-orange-600 shadow-md'
                                : 'border-gray-300 text-gray-700 hover:bg-orange-50 hover:border-orange-400'
                            }
                        `}
                    >
                        {page}
                    </button>
                ))}

                {endPage < totalPages && <span className="px-1 text-xs text-gray-400">...</span>}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 sm:p-2 border border-gray-300 rounded-lg hover:bg-orange-50 hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    title="Trang tiếp theo"
                >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </button>
            </div>
        </div>
    );
};

// --- SearchBar: Thu nhỏ chữ thanh tìm kiếm ---
const SearchBar = ({ search, setSearch, className = '' }) => (
    <div className={`bg-white p-3 sm:p-4 rounded-xl shadow-md ${className}`}>
        <h2 className="text-base sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">Tìm kiếm</h2>
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
            <input
                type="text"
                placeholder="Tìm kiếm tiêu đề hoặc nội dung..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
            />
        </div>
    </div>
);

const DichVu = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const limit = 20;
    const totalPages = Math.ceil(HARDCODED_POSTS.length / limit);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    useEffect(() => {
        if (HARDCODED_POSTS.length === 1 && currentPage === 1) {
            navigate(HARDCODED_POSTS[0].url, {
                replace: true,
            });
        }
    }, [currentPage, navigate]);

    const filteredNews = useMemo(() => {
        if (!search) return HARDCODED_POSTS;
        const lower = search.toLowerCase();
        return HARDCODED_POSTS.filter(news =>
            news.title?.toLowerCase().includes(lower)
        );
    }, [search]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Giảm padding dọc trên mobile */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">

                {/* Tiêu đề tự co giãn kích thước */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 sm:mb-12 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                    Dịch Vụ
                </h1>

                {/* Grid tổng quan: Chuyển vị trí cột SearchBar linh hoạt */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">

                    {/* Trên mobile hiển thị ô Search lên trước để tiện thao tác */}
                    <div className="block lg:hidden">
                        <SearchBar search={search} setSearch={setSearch} />
                    </div>

                    {/* Main Content (Chứa lưới các bài viết tin tức dịch vụ) */}
                    <div className="lg:col-span-3">
                        {/* Thay đổi grid thành 2 cột trên mobile thay vì bóp méo 1 cột dọc dài lê thê */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                            {filteredNews.map((news) => (
                                <NewsCard key={news.id} news={news} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </div>

                    {/* Sidebar bên phải hiển thị trên Desktop */}
                    <div className="lg:col-span-1 space-y-6 sm:space-y-8">
                        <div className="hidden lg:block">
                            <SearchBar search={search} setSearch={setSearch} />
                        </div>

                        {/* Banner Dọc: Tự co chữ bên trong */}
                        <div className="w-full aspect-[3/4] rounded-2xl shadow-xl relative overflow-hidden group cursor-pointer">
                            <img
                                src="/BannerBộLivestream.png"
                                alt="Combo livestream"
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                            <div className="relative z-10 flex items-center justify-center h-full text-center text-white p-4 sm:p-6">
                                <div>
                                    <div className="text-lg sm:text-2xl font-black mb-2 sm:mb-4 leading-tight">
                                        Combo Livestream Chất Lượng Cao
                                    </div>
                                    <div className="text-xs sm:text-sm opacity-90 mb-4 sm:mb-6">
                                        Khuyến mãi đặc biệt
                                    </div>
                                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full group-hover:bg-white/30 transition-all"
                                        onClick={() => navigate('/combo-livestream-thu-am/1/all')}
                                    >
                                        Xem ngay →
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default DichVu;