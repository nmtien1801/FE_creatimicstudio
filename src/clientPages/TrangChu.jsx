import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, ChevronRight, ChevronLeft, Play } from 'lucide-react';
import ProductCard from '../components/product/ProductCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getListPost } from '../redux/postSlice';
import { toast } from 'react-toastify';
import ImageLoader from '../components/FormFields/ImageLoader';
import { getListProductDropdown } from '../redux/productSlice';
import { typeCategory_obligatory } from '../utils/constants.js';
import ApiProductCategory from '../apis/ApiProductCategory';

// Danh mục icon bar phía trên danh sách sản phẩm
const quickCategories = [
    // 5 danh mục hàng trên
    { title: "Combo thu âm", img: "/trangchu/danhmuc1.png", link: "/combo-thu-am" },
    { title: "Soundcard & Mixer", img: "/trangchu/danhmuc2.png", link: "/soundcard-mixer" },
    { title: "Micro", img: "/trangchu/danhmuc3.png", link: "/micro" },
    { title: "Laptop cài phần mềm", img: "/trangchu/danhmuc4.png", link: "/laptop-cai-phan-mem" },
    { title: "Phần mềm", img: "/trangchu/danhmuc5.png", link: "/phan-mem" },

    // 5 danh mục hàng dưới
    { title: "Loa", img: "/trangchu/danhmuc6.png", link: "/loa-kiem-am/12/all" },
    { title: "Tai nghe", img: "/trangchu/danhmuc7.png", link: "/tai-nghe" },
    { title: "Box Livestream", img: "/trangchu/danhmuc8.png", link: "/box-livestream" },
    { title: "Setup Livestream", img: "/trangchu/danhmuc9.png", link: "/setup-livestream" },
    { title: "Thuê thiết bị", img: "/trangchu/danhmuc10.png", link: "/thue-thiet-bi" },
];

const youtubeReviews = [
    {
        id: '1',
        title: 'Hướng dẫn cài đặt trọn bộ Micro và Soundcard Livestream',
        thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80',
        url: 'https://youtube.com',
        duration: '12:45'
    },
    {
        id: '2',
        title: 'Review chi tiết Soundcard thu âm chuyên nghiệp 2026',
        thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&q=80',
        url: 'https://youtube.com',
        duration: '08:20'
    },
    {
        id: '3',
        title: 'Top 3 Combo thu âm dành cho người mới bắt đầu',
        thumbnail: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=500&q=80',
        url: 'https://youtube.com',
        duration: '15:10'
    },
    {
        id: '4',
        title: 'Test chất âm Micro kiểm âm thực tế trong phòng kín',
        thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80',
        url: 'https://youtube.com',
        duration: '06:40'
    },
    {
        id: '5',
        title: 'Kinh nghiệm setup góc livestream chuẩn studio tại nhà',
        thumbnail: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=500&q=80',
        url: 'https://youtube.com',
        duration: '10:15'
    }
];

const brandPartners = [
    { name: "AVANTA", src: "/thuonghieu/th1.png" },
    { name: "LUMINA", src: "/thuonghieu/th2.png" },
    { name: "ÁNH DƯƠNG", src: "/thuonghieu/th3.png" },
    { name: "MENSPIRE", src: "/thuonghieu/th4.png" },
    { name: "LUMINELLA", src: "/thuonghieu/th5.png" },
    { name: "VANGUARD", src: "/thuonghieu/th6.png" },
    { name: "SEN AN", src: "/thuonghieu/th7.png" },
    { name: "CHRONOS AURA", src: "/thuonghieu/th8.png" },
    { name: "GIA DỤNG AN KHANG", src: "/thuonghieu/th9.png" },
    { name: "AURELIA LUNA", src: "/thuonghieu/th10.png" }
];

const ArticleCard = ({ article }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 flex flex-col">
        <div className="h-32 sm:h-36 w-full overflow-hidden">
            <ImageLoader
                imagePath={article.image}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
        </div>
        <div className="p-3">
            <h3 className="text-xs md:text-sm text-gray-600 line-clamp-2 min-h-[34px] group-hover:text-[#ed792f] transition-colors uppercase italic leading-snug">
                {article.title}
            </h3>
        </div>
    </div>
);

const SectionHeader = ({ title, viewAllLink, note }) => (
    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-6">
        <div className="flex items-center space-x-3">
            <span className="w-1.5 h-6 bg-[#ed792f] rounded-full inline-block"></span>
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight text-gray-900">
                {title}
            </h2>
            {note && (
                <span className="hidden sm:inline-block bg-yellow-100 text-yellow-800 text-[10px] px-2 py-0.5 rounded font-normal">
                    {note}
                </span>
            )}
        </div>
        {viewAllLink && (
            <a
                href={viewAllLink}
                className="text-[#ed792f] hover:text-[#d4621a] text-xs md:text-sm font-semibold flex items-center gap-1 transition-colors"
            >
                Xem tất cả <ChevronRight className="w-4 h-4" />
            </a>
        )}
    </div>
);

// Lưới sản phẩm chuẩn 5 cột
const ProductGridSection = ({ title, products = [], viewAllLink, limit = 10 }) => {
    const displayProducts = products.slice(0, limit);
    return (
        <section className="mb-10">
            <SectionHeader title={title} viewAllLink={viewAllLink} />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
                {displayProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default function TrangChu() {
    const dispatch = useDispatch();
    const [currentSlide, setCurrentSlide] = useState(0);
    const { PostList } = useSelector((state) => state.post);
    const { ProductDropdown } = useSelector((state) => state.product);
    const [topSeller, setTopSeller] = useState([]);
    const [comboLivestream, setComboLivestream] = useState([]);
    const [phuKien, setPhuKien] = useState([]);
    const [soundcard, setSoundcard] = useState([]);

    const [consultForm, setConsultForm] = useState({ name: '', phone: '', note: '' });

    // ID video YouTube review
    const reviewYoutubeId = "dQw4w9WgXcQ";

    const toneCarouselRef = useRef(null);

    const scrollToneCarousel = (direction) => {
        if (toneCarouselRef.current) {
            const { scrollLeft, clientWidth } = toneCarouselRef.current;
            const scrollAmount = clientWidth * 0.75;
            toneCarouselRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const slides = [
        { img: '/trangchu/hero1.png' },
        { img: '/trangchu/hero2.png' },
        { img: '/trangchu/hero3.png' },
        { img: '/trangchu/hero4.png' },
    ];

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!consultForm.name || !consultForm.phone) {
            toast.error('Vui lòng nhập tên và số điện thoại!');
            return;
        }
        toast.success('Gửi thông tin tư vấn thành công!');
        setConsultForm({ name: '', phone: '', note: '' });
    };

    const fetchList = async () => {
        let resPost = await dispatch(getListPost({ page: 1, limit: 5 })).unwrap();
        if (resPost && resPost.EC !== 0) {
            toast.error(resPost.EM);
        }

        let resProductTopSeller = await dispatch(getListProductDropdown()).unwrap();
        if (resProductTopSeller && resProductTopSeller.EC === 0) {
            setTopSeller(resProductTopSeller.DT.filter((p) => p.isTopSeller === true));
        }

        let resCombo = await ApiProductCategory.getProductsByCategory(typeCategory_obligatory.comboLivestream);
        if (resCombo && resCombo.DT) {
            setComboLivestream(resCombo.DT);
        }

        let resSoundcard = await ApiProductCategory.getProductsByCategory(typeCategory_obligatory.Soundcard);
        if (resSoundcard && resSoundcard.DT) {
            setSoundcard(resSoundcard.DT);
        }

        let resPhuKienThuAm = await ApiProductCategory.getProductsByCategory(typeCategory_obligatory.resPhuKienThuAm);
        if (resPhuKienThuAm && resPhuKienThuAm.DT) {
            setPhuKien(resPhuKienThuAm.DT);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const toneAppImages = [
        { id: 1, img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&q=80', title: 'Giao diện Dò Tone v1' },
        { id: 2, img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80', title: 'Setup Tone Phòng Thu' },
        { id: 3, img: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=500&q=80', title: 'Auto Key Nhận Diện' },
        { id: 4, img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80', title: 'Plugin Cubase AI' },
        { id: 5, img: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=500&q=80', title: 'Tinh Chỉnh Giọng Hát' },
        { id: 6, img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80', title: 'Hỗ Trợ Soundcard Đa Dòng' },
        { id: 7, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', title: 'Cài Đặt Livestream 1 Chạm' }
    ];

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-[#ed792f] selection:text-white">
            <main>
                <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">

                    {/* BỐ CỤC 2 CỘT: TRÁI & PHẢI */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* ===================== CỘT TRÁI ===================== */}
                        <div className="lg:col-span-8 xl:col-span-9 space-y-8">

                            {/* 1. HERO SLIDER BANNER */}
                            <section className="w-full">
                                <div className="relative w-full aspect-[29/9] overflow-hidden shadow-xl mx-auto">
                                    <div
                                        className="flex h-full transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"
                                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                    >
                                        {slides.map((slide, index) => (
                                            <div
                                                key={index}
                                                className="relative flex-shrink-0 w-full h-full"
                                            >
                                                <img
                                                    src={slide.img}
                                                    alt=""
                                                    className="hidden md:block absolute inset-0 w-full h-full object-cover"
                                                />
                                                <img
                                                    src={slide.img}
                                                    alt=""
                                                    className="block md:hidden absolute inset-0 w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                                        {slides.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentSlide(i)}
                                                className={`h-2 rounded-full transition-all ${currentSlide === i ? 'bg-white w-8' : 'bg-white/40 w-2'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* 2. DANH MỤC SẢN PHẨM - DỊCH VỤ */}
                            <section className="mb-10">
                                <SectionHeader
                                    title="DANH MỤC SẢN PHẨM - DỊCH VỤ"
                                    viewAllLink="/danh-muc"
                                />

                                {/* Grid 5 cột (trên mobile 2 hoặc 3 cột, từ sm/md trở lên là 5 cột) */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
                                    {quickCategories.map((cat, idx) => (
                                        <a
                                            key={idx}
                                            href={cat.link}
                                            className="group relative block aspect-[4/3] sm:aspect-square overflow-hidden rounded-xl transition-transform duration-300 hover:-translate-y-1"
                                        >
                                            {/* 1. Ảnh danh mục (chiếm trọn toàn bộ ô) */}
                                            <img
                                                src={cat.img}
                                                alt={cat.title}
                                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                            />

                                            {/* 2. Chữ tiêu đề đặt đè lên phía trên ảnh */}
                                            <div className="absolute top-0 inset-x-0 pt-2.5 px-1 text-center pointer-events-none">
                                                <span className="text-xs sm:text-sm md:text-[15px] font-medium text-gray-900 line-clamp-1 group-hover:text-[#ed792f] transition-colors">
                                                    {cat.title}
                                                </span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </section>

                            {/* 3. TÌM KIẾM NHIỀU NHẤT (5 CỘT - 1 HÀNG) */}
                            <ProductGridSection
                                title="TÌM KIẾM NHIỀU NHẤT"
                                products={topSeller}
                                viewAllLink="/tim-kiem-nhieu-nhat"
                                limit={5}
                            />

                            {/* 4. COMBO THU ÂM - LIVESTREAM (5 CỘT - 2 HÀNG) */}
                            <ProductGridSection
                                title="COMBO THU ÂM - LIVESTREAM"
                                products={comboLivestream}
                                viewAllLink="/combo-livestream/1/all"
                                limit={10}
                            />

                            {/* 5. SOUNDCARD - MIXER (5 CỘT - 2 HÀNG) */}
                            <ProductGridSection
                                title="SOUNDCARD - MIXER"
                                products={soundcard}
                                viewAllLink="/soundcard-mixer/7/all"
                                limit={10}
                            />

                            {/* 6. MICRO THU ÂM (5 CỘT - 2 HÀNG) */}
                            <ProductGridSection
                                title="MICRO THU ÂM"
                                products={phuKien}
                                viewAllLink="/micro-thu-am"
                                limit={10}
                            />

                            {/* 7. PHẦN MỀM DÒ TONE TỰ ĐỘNG */}
                            <section className="mb-10 relative">
                                <SectionHeader
                                    title="PHẦN MỀM DÒ TONE TỰ ĐỘNG"
                                    viewAllLink="/phan-mem-do-tone"
                                />

                                <div className="relative group/carousel">
                                    <button
                                        onClick={() => scrollToneCarousel('left')}
                                        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/95 border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:text-[#ed792f] hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100"
                                        aria-label="Previous"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    <div
                                        ref={toneCarouselRef}
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                        className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-1 [&::-webkit-scrollbar]:hidden"
                                    >
                                        {toneAppImages.map((item) => (
                                            <div
                                                key={item.id}
                                                className="w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] md:w-[calc(20%-13px)] flex-shrink-0 snap-start group cursor-pointer"
                                            >
                                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                                                    <img
                                                        src={item.img}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <h4 className="mt-2 text-xs font-semibold text-gray-800 line-clamp-1 group-hover:text-[#ed792f] transition-colors text-center">
                                                    {item.title}
                                                </h4>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => scrollToneCarousel('right')}
                                        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/95 border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:text-[#ed792f] hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100"
                                        aria-label="Next"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-gray-50 rounded-2xl p-6 mt-6 border border-gray-100">
                                    <div className="md:col-span-5 text-center md:text-left space-y-2">
                                        <h3 className="text-lg md:text-xl font-black text-gray-900 uppercase">
                                            XEM NGAY VIDEO REVIEW
                                        </h3>
                                        <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                                            Autotune AI là giải pháp tinh chỉnh giọng hát thông minh giúp bạn tự tin tỏa sáng mà không cần hiểu biết kỹ thuật phức tạp.
                                        </p>
                                    </div>
                                    <div className="md:col-span-7">
                                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
                                            <iframe
                                                className="w-full h-full object-cover"
                                                src={`https://www.youtube.com/embed/${reviewYoutubeId}?rel=0`}
                                                title="Video Review"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* ===================== CỘT PHẢI ===================== */}
                        <aside className="lg:col-span-4 xl:col-span-3 space-y-6">

                            {/* 1. REVIEW CHI TIẾT (5 Video YouTube) */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                                    <div className="flex items-center space-x-2">
                                        <span className="w-1.5 h-5 bg-[#ed792f] rounded-full inline-block"></span>
                                        <h3 className="text-sm md:text-base font-bold uppercase text-gray-900 tracking-tight">
                                            REVIEW CHI TIẾT
                                        </h3>
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                                        YouTube
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {youtubeReviews.map((video) => (
                                        <a
                                            key={video.id}
                                            href={video.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                                        >
                                            <div className="relative w-28 h-18 rounded-lg overflow-hidden flex-shrink-0 bg-black">
                                                <img
                                                    src={video.thumbnail}
                                                    alt={video.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                                    <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center text-white shadow-md">
                                                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                                                    </div>
                                                </div>
                                                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 rounded font-medium">
                                                    {video.duration}
                                                </span>
                                            </div>

                                            <div className="flex-1 flex flex-col justify-center">
                                                <h4 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-[#ed792f] transition-colors">
                                                    {video.title}
                                                </h4>
                                                <span className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                                                    Xem ngay <ChevronRight className="w-3 h-3 text-[#ed792f]" />
                                                </span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* 2. BÀI VIẾT HỮU ÍCH (5 bài viết) */}
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                                    <div className="flex items-center space-x-2">
                                        <span className="w-1.5 h-5 bg-[#ed792f] rounded-full inline-block"></span>
                                        <h3 className="text-sm md:text-base font-bold uppercase text-gray-900 tracking-tight">
                                            BÀI VIẾT HỮU ÍCH
                                        </h3>
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-[#ed792f]">
                                        Tin tức
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {PostList.slice(0, 5).map((article, index) => (
                                        <ArticleCard key={article.id || index} article={article} />
                                    ))}
                                </div>
                            </div>

                            {/* 3. BANNER CỘT PHẢI */}
                            <div className="w-full rounded-2xl overflow-hidden shadow-md cursor-pointer group bg-gray-50">
                                <img
                                    src="/BannerBộLivestream.png"
                                    alt="Banner Thành Viên"
                                    className="w-full min-h-[480px] aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* 4. FORM "BẠN CẦN TƯ VẤN?" */}
                            <div
                                id="form-tu-van"
                                className="bg-white border-2 border-purple-400 rounded-2xl p-5 shadow-sm"
                            >
                                <h3 className="text-2xl font-bold text-[#ed792f] text-center mb-5">
                                    Bạn cần tư vấn?
                                </h3>
                                <form onSubmit={handleFormSubmit} className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">
                                            Tên*
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Nhập họ và tên"
                                            value={consultForm.name}
                                            onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#ed792f]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">
                                            SĐT*
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="Nhập số điện thoại"
                                            value={consultForm.phone}
                                            onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#ed792f]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">
                                            Để lại lời nhắn
                                        </label>
                                        <textarea
                                            rows="3"
                                            placeholder="Nội dung cần hỗ trợ..."
                                            value={consultForm.note}
                                            onChange={(e) => setConsultForm({ ...consultForm, note: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#ed792f] resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-2.5 bg-[#ed792f] hover:bg-[#d8681e] text-white font-bold text-sm rounded-xl shadow-md transition-colors"
                                    >
                                        Gửi đi
                                    </button>

                                    <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                                        Thông tin của bạn sẽ được bảo mật. Tuyệt đối không gửi mật khẩu.
                                    </p>
                                </form>
                            </div>

                        </aside>
                    </div>

                    {/* ===================== KHỐI DƯỚI TOÀN TRANG (FULL WIDTH): SETUP LIVESTREAM TRỌN GÓI ===================== */}
                    <section className="w-full pt-8 pb-4 border-t border-gray-100">
                        {/* Tiêu đề góc trái: thanh dọc màu cam + text */}
                        <div className="flex items-center space-x-2 text-base md:text-lg font-bold text-black uppercase tracking-wide">
                            <span className="w-1.5 h-6 bg-[#ed792f] inline-block rounded-sm"></span>
                            <span>SETUP LIVESTREAM TRỌN GÓI</span>
                        </div>

                        {/* Tiêu đề giữa */}
                        <div className="text-center mt-6 mb-10">
                            <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-black">
                                THƯƠNG HIỆU ĐÃ HỢP TÁC
                            </h3>
                        </div>

                        {/* Lưới 10 Logo: 5 cột x 2 hàng không viền hộp */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 lg:gap-12 items-center justify-items-center">
                            {brandPartners.map((brand, i) => (
                                <div
                                    key={i}
                                    className="h-24 w-full flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300"
                                >
                                    <img
                                        src={brand.src}
                                        alt={brand.name}
                                        className="max-h-full max-w-full object-contain filter contrast-105"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Nút Tư Vấn Báo Giá */}
                        <div className="mt-12 text-center">
                            <a
                                href="#form-tu-van"
                                className="inline-flex items-center gap-3 pl-8 pr-3 py-2.5 bg-[#e8702a] hover:bg-[#d8621d] text-white font-extrabold rounded-full shadow-md transition-all duration-300 hover:shadow-lg uppercase text-sm tracking-wider"
                            >
                                <span>TƯ VẤN BÁO GIÁ</span>
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#e8702a] shadow-inner">
                                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                                </div>
                            </a>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}