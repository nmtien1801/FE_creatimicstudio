import React, { useState, useMemo } from 'react';
import { Link, ChevronLeft, ChevronRight, Search } from 'lucide-react';

// Dữ liệu mẫu tin tức (Giữ nguyên)
const longContent = "Đây là nội dung chi tiết của tin tức. Để kiểm tra tính năng giới hạn dòng, tôi sẽ thêm một đoạn văn bản khá dài vào đây. Nội dung này cần phải đủ dài để vượt qua giới hạn 3 dòng hiển thị trên NewsCard. Việc sử dụng line-clamp trong Tailwind CSS giúp chúng ta làm điều này một cách dễ dàng và hiệu quả mà không cần tính toán bằng JavaScript.";

const newsData = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Tiêu đề tin tức ${i + 1} mới nhất 🌟`,
    content: i % 3 === 0 ? longContent : `Nội dung tóm tắt tin tức ${i + 1}.`,
    image: null,
    url: `/news/${i + 1}`,
}));

// Component NewsCard (Giữ nguyên)
const NewsCard = ({ news }) => (
    <a href={news.url} className="block">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
            {/* Image placeholder */}
            <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-500">
                Hình
            </div>
            {/* Title & Content */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Title: Giới hạn 2 dòng */}
                <h3 className="text-base font-bold text-gray-800 line-clamp-2 hover:text-orange-700 transition mb-2">
                    {news.title}
                </h3>
                {/* Content: Giới hạn 3 dòng, tự động thêm ... */}
                <p className="text-sm text-gray-600 line-clamp-3 flex-grow">
                    {news.content}
                </p>
            </div>
        </div>
    </a>
);

// Component Pagination (Giữ nguyên)
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
        <div className="flex items-center justify-center gap-2 mt-8">
            {/* Nút Previous */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 transition"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dấu ... ở đầu */}
            {startPage > 1 && <span className="px-1 text-gray-500">...</span>}

            {/* Các nút trang */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 border rounded transition duration-200 text-sm font-medium
                        ${currentPage === page
                            ? 'bg-orange-600 text-white border-orange-600 shadow-md'
                            : 'border-gray-300 text-gray-700 hover:bg-orange-50 hover:border-orange-400'
                        }
                    `}
                >
                    {page}
                </button>
            ))}

            {/* Dấu ... ở cuối */}
            {endPage < totalPages && <span className="px-1 text-gray-500">...</span>}

            {/* Nút Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 transition"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};


// Component Thanh Tìm Kiếm tách riêng để tái sử dụng
const SearchBar = ({ search, setSearch, className = '' }) => (
    <div className={`bg-white p-4 rounded-xl shadow-md ${className}`}>
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Tìm kiếm</h2>
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
                type="text"
                placeholder="Tìm kiếm tiêu đề hoặc nội dung..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
            />
        </div>
    </div>
);


const TinTuc = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const itemsPerPage = 9;

    // Logic lọc tin tức (Giữ nguyên)
    const filteredNews = useMemo(() => {
        let result = newsData;

        if (search) {
            const lowercasedSearch = search.toLowerCase();
            result = result.filter(news =>
                news.title.toLowerCase().includes(lowercasedSearch) ||
                news.content.toLowerCase().includes(lowercasedSearch)
            );
        }

        setCurrentPage(1);
        return result;
    }, [search]);

    // Tính toán phân trang
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const displayedNews = filteredNews.slice(startIdx, startIdx + itemsPerPage);

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <h1 className="text-4xl md:text-5xl font-black mb-12 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                    TIN TỨC
                </h1>

                {/* 1. Thanh tìm kiếm trên đầu (Hiển thị từ màn hình nhỏ đến lớn, ẩn đi ở màn hình lớn trở lên) */}
                <div className="mb-8 lg:hidden">
                    <SearchBar search={search} setSearch={setSearch} />
                </div>
                {/* --- */}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Main Content - 3/4 cột */}
                    <div className="lg:col-span-3">
                        {/* Grid News - 3 cột */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedNews.length > 0 ? (
                                displayedNews.map((news) => (
                                    <NewsCard key={news.id} news={news} />
                                ))
                            ) : (
                                <p className="text-lg text-gray-500 lg:col-span-3">
                                    Không tìm thấy tin tức nào phù hợp.
                                </p>
                            )}
                        </div>

                        {/* Pagination chỉ hiển thị khi có tin tức */}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </div>

                    {/* Sidebar - 1/4 cột */}
                    <div className="lg:col-span-1 space-y-8">

                        {/* 2. Thanh tìm kiếm trong Sidebar (Ẩn đi ở màn hình nhỏ, hiển thị từ màn hình lớn trở lên) */}
                        <div className="hidden lg:block">
                            <SearchBar search={search} setSearch={setSearch} />
                        </div>

                        {/* Banner Dọc (Giữ nguyên) */}
                        <div className="md:h-[700px] lg:min-h-[500px] bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center p-6 shadow-xl relative overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                            <div className="relative text-center text-white">
                                <div className="text-2xl font-black mb-4 leading-tight">Combo Livestream Chất Lượng Cao</div>
                                <div className="text-sm opacity-90 mb-6">Khuyến mãi đặc biệt</div>
                                <div className="inline-flex items-center gap-2 text-sm font-bold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full group-hover:bg-white/30 transition-all">
                                    Xem ngay →
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TinTuc;