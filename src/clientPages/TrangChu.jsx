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
import ContactForm from '../components/contact/FormContact.jsx';

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
        title: 'Hướng Dẫn Lắp Đặt Bộ Soundcard Icon Upod Pro và Mic K200',
        thumbnail: 'https://img.youtube.com/vi/DMBHmkSspLA/hqdefault.jpg',
        url: 'https://www.youtube.com/watch?v=DMBHmkSspLA',
        duration: '05:22'
    },
    {
        id: '2',
        title: 'Hướng Dẫn Lắp Đặt Bộ Soundcard Focusrite Solo Gen 4 Và Micro AT2020',
        thumbnail: 'https://img.youtube.com/vi/lfr7wekSFn8/hqdefault.jpg',
        url: 'https://www.youtube.com/watch?v=lfr7wekSFn8',
        duration: '03:40'
    },
    {
        id: '3',
        title: 'Hướng Dẫn Lắp Đặt Hát Live Combo Icon Pro - AKG P120',
        thumbnail: 'https://img.youtube.com/vi/HiD0yz4jqZw/hqdefault.jpg',
        url: 'https://www.youtube.com/watch?v=HiD0yz4jqZw&t=72s',
        duration: '04:49'
    },
    {
        id: '4',
        title: 'Bộ Hát Livestream Tại Nhà: M-Audio Solo + Micro KL250',
        thumbnail: 'https://img.youtube.com/vi/qTrNRpNqkx4/hqdefault.jpg',
        url: 'https://www.youtube.com/watch?v=qTrNRpNqkx4&t=13s',
        duration: '05:09'
    },
    {
        id: '5',
        title: 'Mixer AMX06 Kết Hợp Mic SM8b Gen 2',
        thumbnail: 'https://img.youtube.com/vi/CtHR3ypBJmI/hqdefault.jpg',
        url: 'https://www.youtube.com/watch?v=CtHR3ypBJmI&t=1s',
        duration: '04:33'
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

function ArticleCard({ article }) {
    return (
        <a
            href={article.link || `#article-${article.id}`}
            className="flex items-center gap-3 group p-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all"
        >
            {/* Ảnh thu nhỏ bên trái */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                <img
                    src={article.image || article.img || "/placeholder.jpg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Chữ bên phải */}
            <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-[#ed792f] line-clamp-2 leading-snug">
                    {article.title}
                </h4>
                {article.date && (
                    <span className="text-[11px] text-gray-400 mt-1 block">
                        {article.date}
                    </span>
                )}
            </div>
        </a>
    );
}

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
    const [isHovered, setIsHovered] = useState(false);

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

    useEffect(() => {
        if (isHovered) return; // Dừng chạy khi rê chuột vào

        const interval = setInterval(() => {
            if (toneCarouselRef.current) {
                const container = toneCarouselRef.current;
                const step = container.clientWidth * 0.4; // Bước cuộn mỗi lần

                // Nếu đã cuộn gần hết thì quay về đầu
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: step, behavior: 'smooth' });
                }
            }
        }, 3000); // 3 giây trượt 1 lần

        return () => clearInterval(interval);
    }, [isHovered]);

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

        let resMicro = await ApiProductCategory.getProductsByCategory(typeCategory_obligatory.resMicro);
        if (resMicro && resMicro.DT) {
            setPhuKien(resMicro.DT);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const toneAppImages = [
        { id: 1, img: '/trangchu/img1.png', title: 'Giao diện Dò Tone v1' },
        { id: 2, img: '/trangchu/img2.png', title: 'Setup Tone Phòng Thu' },
        { id: 3, img: '/trangchu/img3.png', title: 'Auto Key Nhận Diện' },
        { id: 4, img: '/trangchu/img4.png', title: 'Plugin Cubase AI' },
        { id: 5, img: '/trangchu/img5.png', title: 'Tinh Chỉnh Giọng Hát' },
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

                                <div
                                    className="relative group/carousel"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    {/* Nút lùi (trái) */}
                                    <button
                                        onClick={() => scrollToneCarousel('left')}
                                        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/95 border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:text-[#ed792f] hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100"
                                        aria-label="Previous"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    {/* Khung Carousel chứa ảnh */}
                                    <div
                                        ref={toneCarouselRef}
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                        className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory py-1 [&::-webkit-scrollbar]:hidden"
                                    >
                                        {toneAppImages.map((item) => (
                                            <div
                                                key={item.id}
                                                className="w-[calc(50%-4px)] sm:w-[calc(33.333%-5px)] md:w-[calc(20%-6.5px)] flex-shrink-0 snap-start group cursor-pointer"
                                            >
                                                <div className="relative aspect-[2/4] overflow-hidden bg-gray-50">
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

                                    {/* Nút tới (phải) */}
                                    <button
                                        onClick={() => scrollToneCarousel('right')}
                                        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/95 border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:text-[#ed792f] hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100"
                                        aria-label="Next"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Video Review */}
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
                                                src={`https://www.youtube.com/embed/vRFUoQ2Qo2g?rel=0`}
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
                                        <a
                                            key={article.id || index}
                                            href={article.link || `#article-${article.id}`}
                                            className="flex items-center gap-3 group p-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                                        >
                                            {/* Ảnh nhỏ vuông bên trái */}
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                                <img
                                                    src={article.image || article.img}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>

                                            {/* Tiêu đề & thông tin bên phải */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-[#ed792f] line-clamp-2 leading-snug">
                                                    {article.title}
                                                </h4>
                                                {article.date && (
                                                    <span className="text-[11px] text-gray-400 mt-1 block">
                                                        {article.date}
                                                    </span>
                                                )}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* 3. BANNER CỘT PHẢI */}
                            <div className="w-full aspect-[3/4] rounded-2xl shadow-xl relative overflow-hidden group cursor-pointer">
                                <img
                                    src="/BannerBộLivestream.png"
                                    alt="Combo livestream"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    loading="lazy"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>

                                {/* Content */}
                                <div className="relative z-10 flex items-center justify-center h-full text-center text-white p-6">
                                    <div>
                                        <div className="text-2xl font-black mb-4 leading-tight">
                                            Combo Livestream Chất Lượng Cao
                                        </div>
                                        <div className="text-sm opacity-90 mb-6">
                                            Khuyến mãi đặc biệt
                                        </div>
                                        <div className="inline-flex items-center gap-2 text-sm font-bold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full group-hover:bg-white/30 transition-all"
                                            onClick={() => navigate('/combo-livestream-thu-am/1/all')}
                                        >
                                            Xem ngay →
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 4. FORM "BẠN CẦN TƯ VẤN?" */}
                            <ContactForm />

                        </aside>
                    </div>

                    {/* ===================== KHỐI DƯỚI TOÀN TRANG (FULL WIDTH): SETUP LIVESTREAM TRỌN GÓI ===================== */}
                    <section className="w-full pt-6 md:pt-8 pb-4 border-t border-gray-100">
                        {/* Tiêu đề góc trái: thanh dọc màu cam + text */}
                        <div className="flex items-center space-x-2 text-sm sm:text-base md:text-lg font-bold text-black uppercase tracking-wide">
                            <span className="w-1.5 h-5 sm:h-6 bg-[#ed792f] inline-block rounded-sm"></span>
                            <span>SETUP LIVESTREAM TRỌN GÓI</span>
                        </div>

                        {/* Tiêu đề giữa */}
                        <div className="text-center mt-4 sm:mt-6 mb-6 md:mb-10">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider text-black">
                                THƯƠNG HIỆU ĐÃ HỢP TÁC
                            </h3>
                        </div>

                        {/* Mobile/App: grid-cols-4 (3 dòng) | Web (md:): grid-cols-5 (2 dòng chuẩn 10 logo) */}
                        <div className="grid grid-cols-4 md:grid-cols-5 gap-3 sm:gap-6 md:gap-8 lg:gap-10 items-center justify-items-center">
                            {brandPartners.map((brand, i) => (
                                <div
                                    key={i}
                                    className="h-12 sm:h-16 md:h-20 lg:h-24 w-full flex items-center justify-center p-1 sm:p-2 hover:scale-105 transition-transform duration-300"
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
                        <div className="mt-8 md:mt-12 text-center">
                            <a
                                href="#form-tu-van"
                                className="inline-flex items-center gap-2 md:gap-3 pl-6 pr-2 py-2 md:pl-8 md:pr-3 md:py-2.5 bg-[#e8702a] hover:bg-[#d8621d] text-white font-extrabold rounded-full shadow-sm md:shadow-md transition-all duration-300 hover:shadow-lg uppercase text-xs md:text-sm tracking-wider"
                            >
                                <span>TƯ VẤN BÁO GIÁ</span>
                                <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center text-[#e8702a] shadow-inner">
                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" />
                                </div>
                            </a>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}