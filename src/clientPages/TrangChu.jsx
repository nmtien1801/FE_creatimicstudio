import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '../components/product/ProductCard.jsx';

const comboBanners = [
    {
        title: "COMBO KẾT NỐI LIVESTREAM",
        subtitle: "CHUYÊN NGHIỆP",
        img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80', // Thay bằng link ảnh thật
        bgColor: "bg-[#ed792f]"
    },
    {
        title: "COMBO PHỤ KIỆN CƠ BẢN",
        subtitle: "TỐI ƯU HIỆU SUẤT",
        img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&q=80',
        bgColor: "bg-[#ed792f]"
    },
    {
        title: "BỘ 3 PHỤ KIỆN",
        subtitle: "CHO MIC KHÔNG DÂY",
        img: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=500&q=80',
        bgColor: "bg-[#ed792f]"
    },
    {
        title: "COMBO CHẶN ÂM",
        subtitle: "DÀNH CHO PODCASTER",
        img: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=500&q=80',
        bgColor: "bg-[#ed792f]"
    },
];

const productsData = [
    { id: 1, name: "Micro thu âm BM-800", price: "990.000₫", oldPrice: "1.290.000₫", phone: "037.2672.396", img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop' },
    { id: 2, name: "Soundcard XOX K10", price: "1.250.000₫", oldPrice: "1.590.000₫", phone: "037.2672.396", img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop' },
    { id: 3, name: "Tai nghe kiểm âm OneOdio", price: "750.000₫", oldPrice: "950.000₫", phone: "037.2672.396", img: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=400&fit=crop' },
    { id: 4, name: "Combo Livestream Cao Cấp", price: "3.500.000₫", oldPrice: "4.200.000₫", phone: "037.2672.396", img: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&h=400&fit=crop' },
    { id: 5, name: "Loa kiểm âm Edifier R1280DB", price: "2.800.000₫", oldPrice: "3.200.000₫", phone: "037.2672.396", img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
    { id: 6, name: "Phụ kiện chân đế Micro", price: "150.000₫", oldPrice: "190.000₫", phone: "037.2672.396", img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop' },
    { id: 7, name: "Micro cài áo không dây", price: "690.000₫", oldPrice: "890.000₫", phone: "037.2672.396", img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop' },
    { id: 8, name: "Mixer Yamaha MG10XU", price: "5.500.000₫", oldPrice: "6.200.000₫", phone: "037.2672.396", img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop' },
    { id: 9, name: "Hộp Livestream Mini", price: "450.000₫", oldPrice: "590.000₫", phone: "037.2672.396", img: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&h=400&fit=crop' },
    { id: 10, name: "Sản phẩm khác", price: "Liên hệ", oldPrice: "", phone: "037.2672.396", img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop' },
];

const articlesData = [
    { title: "Hướng dẫn chọn Micro phù hợp cho giọng hát", img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&h=400&fit=crop' },
    { title: "5 mẹo để Livestream chuyên nghiệp hơn", img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop' },
    { title: "Soundcard là gì? Chọn loại nào tốt?", img: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&h=400&fit=crop' },
];

const CategorySection = ({ title, products, bannerText, buttonLink, countText, isLoudspeaker = false }) => {
    return (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-0xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-black text-[#ed792f] mb-2 uppercase">
                            {title}
                        </h2>
                        <p className="text-sm text-gray-600">sản phẩm thuộc danh mục {countText}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Banner Dọc */}
                    <div className="md:col-span-3">
                        <div className="h-[400px] md:h-full min-h-[500px] bg-[#ed792f] rounded-2xl flex items-center justify-center p-6 shadow-xl relative overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all"></div>
                            <div className="relative text-center text-white">
                                <div className="text-2xl font-black mb-4 leading-tight">{bannerText}</div>
                                <div className="text-sm opacity-90 mb-6">Khuyến mãi đặc biệt</div>
                                <div className="inline-flex items-center gap-2 text-sm font-bold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full group-hover:bg-white/30 transition-all">
                                    Xem ngay →
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lưới Sản phẩm */}
                    <div className="md:col-span-9">
                        <div className={`grid grid-cols-2 ${isLoudspeaker ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-4 sm:gap-6`}>
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
};

const ArticleCard = ({ article }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group cursor-pointer hover:-translate-y-2">
            <div className="h-48 w-full overflow-hidden">
                <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
            </div>

            <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 min-h-[56px] group-hover:text-[#ed792f] transition-colors">
                    {article.title}
                </h3>
                <a href="#" className="inline-flex items-center text-[#ed792f] hover:brightness-90 font-semibold text-sm group/link">
                    Đọc thêm
                    <svg className="ml-2 w-4 h-4 group-hover/link:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </a>
            </div>
        </div>
    );
};


export default function TrangChu() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { text: 'Flash Sale 50%', color: 'bg-[#ed792f]' },
        { text: 'Freeship toàn quốc', color: 'bg-[#ed792f]' },
        { text: 'Mua 1 tặng 1', color: 'bg-[#ed792f]' },
    ];

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    const comboProducts = productsData.slice(0, 8);
    const accessoryProducts = productsData.slice(0, 8).sort(() => 0.5 - Math.random());
    const loaProducts = productsData.slice(4, 10).sort(() => 0.5 - Math.random());

    return (
        <div className="min-h-screen bg-white">
            <main className="pb-20 md:pb-8">
                {/* Banner Slider */}
                <section className="w-full mb-12 my-8 px-4 sm:px-6 lg:px-8 max-w-0xl mx-auto">
                    <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden shadow-xl">
                        <div
                            className="flex h-full transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {slides.map((slide, index) => (
                                <div key={index} className={`flex-shrink-0 w-full h-full ${slide.color} flex items-center justify-center relative`}>
                                    <div className="absolute inset-0 bg-black/5"></div>
                                    <div className="relative text-center text-white px-6">
                                        <div className="text-5xl md:text-7xl font-black mb-4">{slide.text}</div>
                                        <div className="text-xl md:text-2xl opacity-90">Khuyến mãi đặc biệt trong tháng</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Dots */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-8' : 'bg-white/50 w-2'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* TOP SELLER */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#ed792f] ">
                    <div className="max-w-0xl mx-auto ">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-3">
                                TOP SELLER
                            </h2>
                            <p className="text-white">Sản phẩm bán chạy nhất trong tháng</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {productsData.slice(0, 3).map(product => (
                                <ProductCard key={product.id} product={product} isTopSeller={true} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* COMBO LIVESTREAM */}
                <CategorySection
                    title="COMBO LIVESTREAM"
                    products={comboProducts}
                    bannerText="Combo Livestream Chất Lượng Cao"
                    buttonLink="#"
                    countText="Bộ livestream, thu âm"
                />

                {/* PHỤ KIỆN THU ÂM */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-0xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-black text-[#ed792f] mb-2 uppercase">
                                    PHỤ KIỆN THU ÂM
                                </h2>
                                <p className="text-sm text-gray-600">sản phẩm thuộc danh mục Phụ kiện thu âm</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                            {accessoryProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        {/* Nút Xem thêm */}
                        <div className="mt-12 text-center">
                            <a href="#" className="inline-flex items-center justify-center px-10 py-4 bg-[#ed792f] text-white text-lg font-bold rounded-full shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300">
                                Xem thêm
                            </a>
                        </div>
                    </div>
                </section>

                {/* 4 Banner Ngang */}
                <section className="max-w-0xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {comboBanners.map((banner, i) => (
                            <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl cursor-pointer">
                                {/* Hình nền sản phẩm */}
                                <img 
                                    src={banner.img} 
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                    alt={banner.title}
                                />
                                {/* Overlay màu cam theo thiết kế */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#ed792f]/90 via-[#ed792f]/40 to-transparent flex flex-col justify-end p-6 text-white">
                                    <h4 className="text-xs font-medium tracking-widest mb-1 opacity-90">{banner.subtitle}</h4>
                                    <h3 className="text-lg font-black leading-tight group-hover:text-yellow-300 transition-colors uppercase">
                                        {banner.title}
                                    </h3>
                                    <div className="mt-4 w-10 h-1 bg-white group-hover:w-20 transition-all duration-500"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* LOA */}
                <CategorySection
                    title="LOA"
                    products={loaProducts}
                    bannerText="Loa Kiểm Âm Studio"
                    buttonLink="#"
                    countText="Loa"
                    isLoudspeaker={true}
                />

                {/* BÀI VIẾT HỮU ÍCH */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                    <div className="max-w-0xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-black text-[#ed792f] mb-3 uppercase">
                                BÀI VIẾT HỮU ÍCH
                            </h2>
                            <p className="text-gray-600">Kiến thức và hướng dẫn về thiết bị thu âm</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {articlesData.map((article, index) => (
                                <ArticleCard key={index} article={article} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}