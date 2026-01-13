import React, { useState, useEffect } from 'react'; // Thêm useEffect
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getListRecruitment } from '../redux/recruitmentSlice';
import ImageLoader from '../components/FormFields/ImageLoader';

const NewsCard = ({ news }) => (
    <NavLink to={`/careers/${news.id}`} className="block">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 h-full flex flex-col cursor-pointer">
            {/* Image placeholder */}
            <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-500">
                <ImageLoader imagePath={news.image} className="w-10 h-10 rounded-md border object-cover" />
            </div>
            {/* Title & Content */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-base font-bold text-gray-800 line-clamp-2 hover:text-orange-700 transition mb-2">
                    {news.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 flex-grow">
                    {news.description}
                </p>
            </div>
        </div>
    </NavLink>
);

// Component Pagination
const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems }) => {
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
        <div className="flex flex-col gap-6 mt-10">
            {/* Phần phân trang */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
                {/* Nút Previous */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-orange-50 hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    title="Trang trước"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>

                {/* Dấu ... ở đầu */}
                {startPage > 1 && (
                    <span className="px-2 text-gray-400">...</span>
                )}

                {/* Các nút trang */}
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`min-w-10 h-10 border rounded-lg transition-all duration-200 text-sm font-medium
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
                {endPage < totalPages && (
                    <span className="px-2 text-gray-400">...</span>
                )}

                {/* Nút Next */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-orange-50 hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    title="Trang tiếp theo"
                >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
            </div>
        </div>
    );
};

const TuyenDung = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { RecruitmentList, RecruitmentTotal } = useSelector((state) => state.recruitment);

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20;
    const totalPages = Math.ceil(RecruitmentTotal / limit);

    // ========================================== INIT ========================================
    const fetchList = async () => {
        let res = await dispatch(getListRecruitment({ page: currentPage, limit: limit })).unwrap();
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };

    useEffect(() => {
        fetchList();
    }, [currentPage]);

    // --- LOGIC TỰ ĐỘNG CHUYỂN HƯỚNG KHI CÓ 1 TIN---
    useEffect(() => {
        if (
            RecruitmentTotal === 1 &&
            RecruitmentList.length === 1 &&
            currentPage === 1
        ) {
            navigate(`/careers/${RecruitmentList[0].id}`, {
                replace: true,
            });
        }
    }, [RecruitmentTotal, RecruitmentList, currentPage, navigate]);

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-0xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <h1 className="text-3xl md:text-4xl font-black mb-12 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                    TUYỂN DỤNG
                </h1>

                <div className="grid grid-cols-1 gap-8">

                    {/* Main Content - Giờ chiếm full width */}
                    <div className="lg:col-span-4">
                        {/* Grid News - 4 cột trên màn hình lớn */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {RecruitmentList.map((news) => (
                                <NewsCard key={news.id} news={news} />
                            ))}
                        </div>

                        {/* Pagination chỉ hiển thị khi có nhiều trang */}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                itemsPerPage={limit}
                                totalItems={RecruitmentTotal}
                            />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TuyenDung;