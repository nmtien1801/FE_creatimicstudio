import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/product/ProductCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getListPost } from '../redux/postSlice';
import { toast } from 'react-toastify';
import ImageLoader from '../components/FormFields/ImageLoader';
import { getListProductDropdown } from '../redux/productSlice';
import { typeCategory_obligatory } from '../utils/constants.js'
import ApiProductCategory from '../apis/ApiProductCategory'

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

const CategorySection = ({ header, products, bannerImage, buttonLink }) => (
    <section className="px-5 sm:px-0 bg-gray-50 border-y border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12 mt-5">
                <h2 className="text-2xl lg:text-3xl font-black text-black uppercase tracking-tighter">
                    {header}
                </h2>
                <div className="hidden md:block flex-1 h-[1px] bg-gray-100 mx-10"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Banner Dọc */}
                <div className="md:col-span-4 flex justify-center">
                    <div className="hidden md:block relative w-full max-w-[542px] aspect-[542/640] rounded-[2.5rem] overflow-hidden shadow-2xl group cursor-pointer">
                        <img
                            src={bannerImage}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    </div>
                </div>

                {/* Lưới Sản phẩm */}
                <div className="md:col-span-8">
                    <div className={`grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 cursor-pointer`}>
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} ProductCard={true} />
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
    <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer md:hover:-translate-y-1 border border-gray-100">
        {/* Chiều cao ảnh: h-48 trên mobile, h-56 trên desktop */}
        <div className="h-40 md:h-48 w-full overflow-hidden">
            <ImageLoader
                imagePath={article.image}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
        </div>

        {/* Padding: p-5 trên mobile, p-8 trên desktop */}
        <div className="p-4 md:p-6">
            {/* Font size & min-h: Nhỏ lại trên mobile để tiết kiệm không gian */}
            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 line-clamp-2 min-h-[40px] md:min-h-[44px] group-hover:text-[#ed792f] transition-colors uppercase italic">
                {article.title}
            </h3>

            <span className="inline-flex items-center text-[#ed792f] font-black text-[10px] md:text-xs uppercase tracking-widest">
                Đọc thêm <ArrowRight className="ml-1 md:ml-2 w-3 h-3 md:w-4 md:h-4" />
            </span>
        </div>
    </div>
);

export default function TrangChu() {
    const dispatch = useDispatch();
    const [currentSlide, setCurrentSlide] = useState(0);
    const { PostList } = useSelector((state) => state.post);
    const { ProductDropdown } = useSelector((state) => state.product);
    const [comboLivestream, setComboLivestream] = useState([]);
    const [phuKien, setPhuKien] = useState([]);
    const [loa, setLoa] = useState([]);

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
        let resPost = await dispatch(getListPost({ page: 1, limit: 3 })).unwrap();
        if (resPost && resPost.EC !== 0) {
            toast.error(resPost.EM);
        }

        let resProductTopSeller = await dispatch(getListProductDropdown()).unwrap();

        // comboLivestream
        let resCombo = await ApiProductCategory.getProductsByCategory(typeCategory_obligatory.comboLivestream);
        if (resCombo && resCombo.DT) {
            setComboLivestream(resCombo.DT)
        }

        // Phu Kien Thu Am
        let resPhuKienThuAm = await ApiProductCategory.getProductsByCategory(typeCategory_obligatory.resPhuKienThuAm);
        if (resPhuKienThuAm && resPhuKienThuAm.DT) {
            setPhuKien(resPhuKienThuAm.DT)
        }

        // Loa
        let resLoa = await ApiProductCategory.getProductsByCategory(typeCategory_obligatory.Loa);
        if (resLoa && resLoa.DT) {
            setLoa(resLoa.DT)
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    // ========================================== ACTION ===========================================
    const randomTopSellers = useMemo(() => {
        return [...ProductDropdown]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
    }, [ProductDropdown]);

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-[#ed792f] selection:text-white">
            <main className="">

                {/* 1. HERO SLIDER */}
                <section className="w-full mt-6 mb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative w-full max-w-[650px] lg:max-w-[1280px] aspect-[3/2] rounded-[3rem] overflow-hidden shadow-2xl mx-auto">
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
                                            className="absolute inset-0 w-full h-full object-contain"
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
                <section className="py-8 md:py-10 px-4 bg-[#ed792f] overflow-hidden">
                    <div className="max-w-6xl mx-auto">
                        {/* Tiêu đề */}
                        <div className="flex flex-col items-center mb-10 md:mb-16">
                            <h2 className="text-3xl lg:text-4xl font-black text-black tracking-tighter uppercase">
                                TOP SELLER
                            </h2>
                            <p className="text-black/80 font-bold uppercase mt-4 md:mt-6 text-xs md:text-sm text-center">
                                Sản phẩm khách hàng tin dùng nhất
                            </p>
                        </div>

                        {/* Container Carousel: Flex trên mobile (< 640px), Grid trên sm trở lên */}
                        <div className="
                            flex flex-nowrap overflow-x-auto gap-6 pb-10 scrollbar-hide
                            sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-3 sm:gap-y-4 sm:overflow-visible sm:pb-0
                            snap-x snap-mandatory
                        ">
                            {randomTopSellers.map((p) => (
                                <div
                                    key={p.id}
                                    className="relative min-w-[80%] sm:min-w-0 snap-center flex-shrink-0 sm:flex-shrink"
                                >
                                    {/* Thẻ sản phẩm */}
                                    <ProductCard product={p} isTopSeller={true} />

                                    {/* Nhãn Top Seller đè lên trên */}
                                    <div
                                        className="absolute -top-2 -left-2 bg-black text-white px-3 py-1 text-[10px] font-bold shadow-lg transform -rotate-12 origin-top-left z-10"
                                        style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' }}
                                    >
                                        <div className="transform rotate-12 text-center leading-tight">
                                            <div className="text-[8px]">TOP</div>
                                            <div className="font-black">SELLER</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. COMBO LIVESTREAM */}
                <CategorySection
                    header="COMBO LIVESTREAM"
                    products={comboLivestream}
                    bannerImage="/BannerBộLivestream.png"
                    buttonLink="#"
                />

                {/* 4. PHỤ KIỆN THU ÂM  */}
                <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-0xl mx-auto">

                        {/* Tiêu đề: Giảm mb trên mobile */}
                        <div className="flex justify-between items-center mb-6 md:mb-6">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-black uppercase tracking-tighter">
                                PHỤ KIỆN THU ÂM
                            </h2>
                            <div className="hidden md:block flex-1 h-[1px] bg-gray-100 mx-10"></div>
                        </div>

                        {/* Lưới sản phẩm: Giảm gap-y trên mobile */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-6 md:gap-y-10">
                            {phuKien.slice(0, 12).map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>

                        {/* Nút Xem thêm: Giảm mt trên mobile */}
                        <div className="mt-10 md:mt-16 text-center">
                            <a
                                href="#"
                                className="inline-flex items-center justify-center px-8 md:px-12 py-3 md:py-4 bg-[#ed792f] text-white text-xs md:text-sm font-black uppercase tracking-widest rounded-full shadow-xl hover:bg-black hover:scale-105 transition-all duration-300"
                            >
                                Xem thêm sản phẩm
                            </a>
                        </div>
                    </div>
                </section>

                {/* 5. 4 BANNER COMBO - Thay my-20 thành responsive margin */}
                <section className="sm:px-4 lg:px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-nowrap overflow-x-auto pb-6 gap-4 md:gap-8 scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
                            {comboBanners.map((banner, i) => (
                                <div
                                    key={i}
                                    className="group relative aspect-[4/3] min-w-[85%] sm:min-w-0 overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl cursor-pointer bg-gray-100 flex-shrink-0 sm:flex-shrink"
                                >
                                    <img src={banner.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#ed792f] via-[#ed792f]/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>

                                    {/* Nội dung Banner: Giảm padding trên mobile */}
                                    <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end text-white">
                                        <span className="text-[10px] font-black tracking-[0.3em] mb-1 md:mb-2 opacity-80 uppercase">{banner.subtitle}</span>
                                        <h3 className="text-lg md:text-xl font-black leading-tight uppercase italic drop-shadow-md group-hover:text-yellow-300 transition-colors">
                                            {banner.title}
                                        </h3>
                                        <div className="mt-2 md:mt-4 w-12 h-1 bg-white group-hover:w-24 transition-all duration-500"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. LOA KIỂM ÂM */}
                <CategorySection
                    header="LOA KIỂM ÂM"
                    products={loa}
                    bannerImage="/BannerLoa.png"
                    buttonLink="#"
                />

                {/* 8. BÀI VIẾT HỮU ÍCH */}
                <section className="py-16 md:py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100 overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        {/* Tiêu đề: Giảm mb trên mobile */}
                        <div className="text-center mb-6 md:mb-10">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-black uppercase tracking-tighter">
                                BÀI VIẾT HỮU ÍCH
                            </h2>
                            <p className="text-gray-400 font-medium uppercase tracking-[0.3em] text-[9px] md:text-[10px] mt-2">
                                Chia sẻ kinh nghiệm & Kỹ thuật âm thanh
                            </p>
                        </div>

                        {/* Container Carousel: Flex trên mobile, Grid trên md */}
                        <div className="
                            flex flex-nowrap overflow-x-auto gap-6 pb-8 scrollbar-hide
                            md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:pb-0
                            snap-x snap-mandatory
                        ">
                            {PostList.map((article, index) => (
                                <div
                                    key={index}
                                    className="min-w-[80%] sm:min-w-[45%] md:min-w-0 snap-center flex-shrink-0 md:flex-shrink"
                                >
                                    <ArticleCard article={article} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}