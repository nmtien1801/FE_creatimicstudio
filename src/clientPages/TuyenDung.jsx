import React, { useState, useEffect } from 'react'; // Thêm useEffect
import { ChevronLeft, ChevronRight } from 'lucide-react'; 
import { NavLink, useNavigate } from "react-router-dom"; // Thêm useNavigate


const longContent = "Đây là nội dung chi tiết của tin tức. Để kiểm tra tính năng giới hạn dòng, tôi sẽ thêm một đoạn văn bản khá dài vào đây. Nội dung này cần phải đủ dài để vượt qua giới hạn 3 dòng hiển thị trên NewsCard. Việc sử dụng line-clamp trong Tailwind CSS giúp chúng ta làm điều này một cách dễ dàng và hiệu quả mà không cần tính toán bằng JavaScript.";

// Giữ nguyên newsData (25 mục)
const newsData = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Tiêu đề tin tức ${i + 1} mới nhất 🌟`,
    content: i % 3 === 0 ? longContent : `Nội dung tóm tắt tin tức ${i + 1}.`,
    image: null,
    url: `/careers/${i + 1}`, 
}));

// Component NewsCard (Giữ nguyên)
const NewsCard = ({ news }) => (
    // Thay thẻ <a> bằng NavLink từ React Router
    <NavLink to={news.url} className="block">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 h-full flex flex-col cursor-pointer">
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
    </NavLink>
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

const TuyenDung = () => {
    const navigate = useNavigate(); // Khởi tạo hook navigate
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    
    // Dữ liệu hiển thị
    const filteredNews = newsData; 

    // Tính toán phân trang
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const displayedNews = filteredNews.slice(startIdx, startIdx + itemsPerPage);

    // --- LOGIC TỰ ĐỘNG CHUYỂN HƯỚNG ---
    useEffect(() => {
        // Kiểm tra nếu chỉ có 1 tin tức VÀ là trang đầu tiên (đảm bảo không bị chuyển hướng khi đang ở trang 2)
        // Lưu ý: Nếu có thanh tìm kiếm, logic này sẽ hoạt động khi kết quả tìm kiếm chỉ còn 1.
        if (displayedNews.length === 1 && currentPage === 1) {
            const soleJobUrl = displayedNews[0].url;
            navigate(soleJobUrl, { replace: true }); // Chuyển hướng
        }
    }, [displayedNews, currentPage, navigate]);
    // --- KẾT THÚC LOGIC CHUYỂN HƯỚNG ---

    // Nếu chuyển hướng đã xảy ra, component sẽ không render lưới tin tức
    if (displayedNews.length === 1 && currentPage === 1) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <p className="text-lg text-gray-600">Đang chuyển hướng đến trang chi tiết...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <h1 className="text-4xl md:text-5xl font-black mb-12 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                    TUYỂN DỤNG
                </h1>

                <div className="grid grid-cols-1 gap-8">

                    {/* Main Content - Giờ chiếm full width */}
                    <div className="lg:col-span-4"> 
                        {/* Grid News - 4 cột trên màn hình lớn */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {displayedNews.map((news) => (
                                <NewsCard key={news.id} news={news} />
                            ))}
                        </div>

                        {/* Pagination chỉ hiển thị khi có nhiều trang */}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TuyenDung;