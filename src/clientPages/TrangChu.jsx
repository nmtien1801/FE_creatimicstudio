import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/product/ProductCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getListPost } from '../redux/postSlice';
import { toast } from 'react-toastify';
import ImageLoader from '../components/FormFields/ImageLoader';

const comboBanners = [
    {
        title: "COMBO KẾT NỐI LIVESTREAM",
        subtitle: "CHUYÊN NGHIỆP",
        img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=80',
    },
    {
        title: "COMBO PHỤ KIỆN CƠ BẢN",
        subtitle: "TỐI ƯU HIỆU SUẤT",
        img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80',
    },
    {
        title: "BỘ 3 PHỤ KIỆN",
        subtitle: "CHO MIC KHÔNG DÂY",
        img: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&q=80',
    },
    {
        title: "COMBO CHẶN ÂM",
        subtitle: "DÀNH CHO PODCASTER",
        img: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=600&q=80',
    },
];

const productsData = [
    { id: 1, name: "Micro thu âm BM-800", price: "990.000₫", oldPrice: "1.290.000₫", phone: "037.2672.396", img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop' },
    { id: 2, name: "Soundcard XOX K10", price: "1.250.000₫", oldPrice: "1.590.000₫", phone: "037.2672.396", img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop' },
    { id: 3, name: "Tai nghe kiểm âm OneOdio", price: "750.000₫", oldPrice: "950.000₫", phone: "037.2672.396", img: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=400&fit=crop' },
    { id: 4, name: "Combo Livestream Cao Cấp", price: "3.500.000₫", oldPrice: "4.200.000₫", phone: "037.2672.396", img: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&h=400&fit=crop' },
    { id: 5, name: "Loa kiểm âm Edifier R1280DB", price: "2.800.000₫", oldPrice: "3.200.000₫", phone: "037.2672.396", img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
    { id: 6, name: "Phụ kiện chân đế Micro", price: "150.000₫", oldPrice: "190.000₫", phone: "037.2672.396", img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop' },
];

const CategorySection = ({ title, products, bannerText, buttonLink, countText }) => (
    <section className="py-5 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-black text-black mb-2 uppercase tracking-tighter">
                        {title}
                    </h2>
                    <p className="text-sm text-gray-500 font-medium">Danh mục: {countText}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Banner Dọc */}
                <div className="md:col-span-3">
                    <div className="h-full min-h-[450px] bg-gradient-to-br from-[#ed792f] to-[#f4a261] rounded-[2.5rem] flex items-center justify-center p-8 shadow-2xl relative overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-all duration-500"></div>
                        <div className="relative text-center text-white z-10">
                            <div className="text-3xl font-black mb-4 leading-tight uppercase drop-shadow-xl">{bannerText}</div>
                            <div className="text-xs uppercase tracking-[0.2em] opacity-80 mb-8 font-bold">Giá tốt nhất thị trường</div>
                            <div className="inline-flex items-center gap-2 text-sm font-black bg-white text-[#ed792f] px-6 py-3 rounded-full shadow-lg group-hover:bg-black group-hover:text-white transition-all">
                                XEM CHI TIẾT
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lưới Sản phẩm */}
                <div className="md:col-span-9">
                    <div className={`grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6`}>
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Nút Xem thêm */}
            <div className="mt-12 text-center">
                <a href={buttonLink} className="inline-flex items-center justify-center px-10 py-4 bg-[#ed792f] text-white text-lg font-bold rounded-full shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300">
                    Xem thêm
                </a>
            </div>
        </div>
    </section>
);

const ArticleCard = ({ article }) => (
    <div className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer hover:-translate-y-2 border border-gray-100">
        <div className="h-56 w-full overflow-hidden">
            <ImageLoader imagePath={article.image} className="w-full h-50 object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 min-h-[56px] group-hover:text-[#ed792f] transition-colors uppercase italic">
                {article.title}
            </h3>
            <span className="inline-flex items-center text-[#ed792f] font-black text-xs uppercase tracking-widest">
                Đọc thêm <ArrowRight className="ml-2 w-4 h-4" />
            </span>
        </div>
    </div>
);

export default function TrangChu() {
    const dispatch = useDispatch();
    const [currentSlide, setCurrentSlide] = useState(0);
    const { PostList } = useSelector((state) => state.post);

    const slides = [
        { img: '/bannerhome1.png', },
        { img: '/bannerhome2.png', },
        { img: '/bannerhome3.png', },
    ];

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    // ========================================== INIT ========================================
    const fetchList = async () => {
        let res = await dispatch(getListPost({ page: 1, limit: 3 })).unwrap();
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-[#ed792f] selection:text-white">
            <main className="pb-20">

                {/* 1. HERO SLIDER */}
                <section className="w-full mt-6 mb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative h-[450px] md:h-[800px] rounded-[3rem] overflow-hidden shadow-2xl">
                            <div
                                className="flex h-full transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {slides.map((slide, index) => (
                                    <div
                                        key={index}
                                        className="relative flex-shrink-0 w-full h-full"
                                    >
                                        {/* Background Image */}
                                        <img
                                            src={slide.img}
                                            alt=""
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* Dots */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
                                {slides.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentSlide(i)}
                                        className={`h-2 rounded-full transition-all ${currentSlide === i ? 'bg-white w-12' : 'bg-white/40 w-2'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. TOP SELLER SECTION */}
                <section className="py-10 px-4 sm:px-6 lg:px-8 bg-[#ed792f]">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col items-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-black text-black tracking-tighter uppercase">TOP SELLER</h2>
                            <p className="text-black/80 font-bold uppercase mt-6 text-sm text-center">Sản phẩm khách hàng tin dùng nhất</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {productsData.slice(0, 3).map(p => (
                                <ProductCard key={p.id} product={p} isTopSeller={true} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. COMBO LIVESTREAM */}
                <CategorySection
                    title="COMBO LIVESTREAM"
                    products={productsData}
                    bannerText="Combo Livestream Chất Lượng Cao"
                    buttonLink="#"
                    countText="Bộ livestream, thu âm"
                />

                {/* 4. PHỤ KIỆN THU ÂM - CHIA THÀNH 2 HÀNG */}
                <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">

                        {/* Tiêu đề */}
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-2xl lg:text-3xl font-black text-black uppercase tracking-tighter">
                                PHỤ KIỆN THU ÂM
                            </h2>
                            <div className="hidden md:block flex-1 h-[1px] bg-gray-100 mx-10"></div>
                        </div>

                        {/* Lưới sản phẩm: 2 hàng trên Desktop (6 cột x 2 hàng = 12 sản phẩm) */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-10">
                            {productsData.slice(0, 12).map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>

                        {/* Nút Xem thêm */}
                        <div className="mt-16 text-center">
                            <a
                                href="#"
                                className="inline-flex items-center justify-center px-12 py-4 bg-[#ed792f] text-white text-sm font-black uppercase tracking-widest rounded-full shadow-xl hover:bg-black hover:scale-105 transition-all duration-300"
                            >
                                Xem thêm sản phẩm
                            </a>
                        </div>
                    </div>
                </section>

                {/* 5. 4 BANNER COMBO PHỤ KIỆN (YÊU CẦU TỪ ẢNH) */}
                <section className="px-4 sm:px-6 lg:px-8 my-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {comboBanners.map((banner, i) => (
                                <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-xl cursor-pointer bg-gray-100">
                                    <img src={banner.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="" />
                                    {/* Gradient Overlay Cam đặc trưng */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#ed792f] via-[#ed792f]/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                        <span className="text-[10px] font-black tracking-[0.3em] mb-2 opacity-80 uppercase">{banner.subtitle}</span>
                                        <h3 className="text-xl font-black leading-tight uppercase italic drop-shadow-md group-hover:text-yellow-300 transition-colors">
                                            {banner.title}
                                        </h3>
                                        <div className="mt-4 w-12 h-1 bg-white group-hover:w-24 transition-all duration-500"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. LOA KIỂM ÂM */}
                <CategorySection
                    title="LOA KIỂM ÂM"
                    products={productsData}
                    bannerText="Âm Thanh Chuẩn Studio"
                    buttonLink="#"
                    countText="Loa chuyên dụng"
                />

                {/* 8. BÀI VIẾT HỮU ÍCH */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-black text-black uppercase tracking-tighter">BÀI VIẾT HỮU ÍCH</h2>
                            <p className="text-gray-400 font-medium uppercase tracking-[0.3em] text-[10px] mt-2">Chia sẻ kinh nghiệm & Kỹ thuật âm thanh</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {PostList.map((article, index) => (
                                <ArticleCard key={index} article={article} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}