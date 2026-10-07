import React, { useState, useEffect } from 'react';
import {
    ArrowRight,
    CheckCircle2,
    RotateCcw,
    X
} from 'lucide-react';
import { toast } from 'react-toastify';

// Component Biển Cảnh Báo chuẩn theo ảnh mẫu
function WarningSignIcon({ className = "w-16 h-16" }) {
    return (
        <svg
            viewBox="0 0 100 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M44.8 6.4a6 6 0 0 1 10.4 0l39.5 68.4A6 6 0 0 1 89.5 84H10.5a6 6 0 0 1-5.2-9.2L44.8 6.4z"
                fill="#FFFFFF"
                stroke="red"
                strokeWidth="5"
                strokeLinejoin="round"
            />
            <path
                d="M46.5 14.5a4 4 0 0 1 7 0l35 60.5a4 4 0 0 1-3.5 6H15a4 4 0 0 1-3.5-6l35-60.5z"
                fill="red"
            />
            <path
                d="M50 32v24"
                stroke="#FFFFFF"
                strokeWidth="6"
                strokeLinecap="round"
            />
            <circle cx="50" cy="67" r="3.5" fill="#FFFFFF" />
        </svg>
    );
}

export default function SetupLivestreamPage() {
    // -------------------------------------------------------------
    // Multi-step Form State
    // -------------------------------------------------------------
    const [step, setStep] = useState(1);
    const [targetType, setTargetType] = useState('Nhà bán hàng e-commerce');
    const [deviceType, setDeviceType] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [budgetNote, setBudgetNote] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // State phục vụ việc click xem full ảnh báo giá
    const [previewImage, setPreviewImage] = useState(null);

    // Đóng popup khi ấn phím Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setPreviewImage(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Xử lý chọn Ô 1 (Đối tượng) -> Tự động chuyển ngay sang Bước 2 (Chọn thiết bị)
    const handleSelectTarget = (target) => {
        setTargetType(target);
        if (target === 'Nhà bán hàng e-commerce') {
            setDeviceType('Máy ảnh');
        } else {
            setDeviceType('');
        }
        setStep(2);
    };

    // Xử lý chọn Ô 2 (Thiết bị) -> Tự động chuyển ngay sang Bước 3 (Nhập SĐT)
    const handleSelectDevice = (device) => {
        setDeviceType(device);
        setStep(3);
    };

    // Xử lý sau khi nhập SĐT -> Chuyển sang Bước 4 (Báo giá & Ngân sách)
    const handleNextToPrice = (e) => {
        e?.preventDefault?.();
        if (!phoneNumber.trim()) {
            toast.warning('Vui lòng nhập số điện thoại để nhận báo giá!');
            return;
        }
        setStep(4);
    };

    // Gửi form cuối cùng
    const handleFinalSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        toast.success('Đã gửi thông tin tư vấn thành công! CMIC STUDIO sẽ liên hệ sớm nhất.');
    };

    // Khảo sát lại từ đầu
    const handleReset = () => {
        setStep(1);
        setTargetType('Nhà bán hàng e-commerce');
        setDeviceType('');
        setPhoneNumber('');
        setBudgetNote('');
        setIsSubmitted(false);
        setPreviewImage(null);
    };

    // Lựa chọn ảnh báo giá phù hợp dựa trên đối tượng và thiết bị
    const getPricingImage = () => {
        if (targetType === 'Nhà bán hàng e-commerce') {
            return {
                title: "BÁO GIÁ GÓI BÁN HÀNG E-COMMERCE (CAMERA MÁY ẢNH)",
                images: [
                    "/dichvulive/ecommerce-camera-1.png",
                    "/dichvulive/ecommerce-camera-2.png",
                    "/dichvulive/ecommerce-camera-3.png",
                ]
            };
        }
        if (deviceType === 'Điện thoại') {
            return {
                title: "BÁO GIÁ GÓI IDOL LIVE STUDIO (ĐIỆN THOẠI)",
                images: [
                    "/dichvulive/idol-phone-1.png",
                    "/dichvulive/idol-phone-2.png",
                ]
            };
        }
        if (deviceType === 'Máy ảnh') {
            return {
                title: "BÁO GIÁ GÓI IDOL LIVE STUDIO (MÁY ẢNH)",
                images: [
                    "/dichvulive/idol-camera-1.png",
                    "/dichvulive/idol-camera-2.png",
                ]
            };
        }
        return {
            title: "BẢNG BÁO GIÁ TỔNG HỢP CMIC STUDIO",
            images: ["/dichvulive/bang-gia-tong-hop.png"]
        };
    };

    // Danh sách Case study & Thương hiệu
    const caseStudyRow1 = [
        "/dichvulive/cs1.png", "/dichvulive/cs2.png", "/dichvulive/cs3.png",
        "/dichvulive/cs4.png", "/dichvulive/cs5.png"
    ];

    const caseStudyRow2 = [
        "/dichvulive/cs6.png", "/dichvulive/cs7.png", "/dichvulive/cs8.png",
        "/dichvulive/cs9.png", "/dichvulive/cs10.png", "/dichvulive/cs11.png", "/dichvulive/cs12.png", "/dichvulive/cs13.png", "/dichvulive/cs14.png"
    ];

    const brands = [
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

    return (
        <div className="w-full bg-white font-sans text-gray-900 overflow-x-hidden">

            {/* ========================================================= */}
            {/* HERO: BANNER                                              */}
            {/* ========================================================= */}
            <div className="relative w-full overflow-hidden max-h-[500px] flex items-center justify-center">
                <img
                    src="/dvlivehero.png"
                    alt="Banner Dịch Vụ AutoTune AI"
                    className="w-full h-full object-cover min-h-[320px] md:min-h-[420px]"
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 select-none">
                    <div className="mb-4 text-[#ff3b3b]">
                        <svg
                            className="w-12 h-12 md:w-16 md:h-16 inline-block"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <circle cx="12" cy="12" r="3" />
                            <path
                                d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <h1 className="text-xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-wide leading-tight drop-shadow-md">
                        BIẾN MỌI PHIÊN LIVE <br />
                        THÀNH SÂN KHẤU
                    </h1>

                    <p className="mt-3 sm:mt-4 text-base sm:text-xl md:text-2xl font-extrabold uppercase text-[#f97316] tracking-wider drop-shadow-sm">
                        BÙNG NỔ DOANH SỐ &amp; NGHỆ THUẬT
                    </p>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 1. HAI GÓI LIVESTREAM VÀ TICKER CHẠY NGANG               */}
            {/* ========================================================= */}
            <section className="py-8 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative -top-[10px] md:-top-[100px]">

                        {/* Gói Bán Hàng E-Commerce */}
                        <div className="rounded-[32px] p-8 text-center bg-white shadow-[0_0_35px_rgba(237,121,47,0.35)] border-4 border-orange-200/70 flex flex-col items-center justify-between">
                            <div>
                                <div className="flex justify-center items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full border-2 border-red-500 p-1 flex items-center justify-center relative">
                                        <img src="/icons/tiktok-live.png" alt="TikTok Live" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/3046/3046121.png"; }} />
                                        <span className="absolute -bottom-2 bg-red-600 text-white text-[8px] font-bold px-1 rounded">LIVE</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border-2 border-blue-500 p-1 flex items-center justify-center relative">
                                        <img src="/icons/facebook-live.png" alt="FB Live" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/5968/5968764.png"; }} />
                                        <span className="absolute -bottom-2 bg-red-600 text-white text-[8px] font-bold px-1 rounded">LIVE</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border-2 border-orange-500 p-1 flex items-center justify-center relative">
                                        <img
                                            src="/icons/shopee-live.png"
                                            alt="Shopee Live"
                                            className="w-full h-full object-contain"
                                        />
                                        <span className="absolute -bottom-2 bg-red-600 text-white text-[8px] font-bold px-1 rounded">LIVE</span>
                                    </div>
                                </div>

                                <h3 className="text-lg md:text-xl font-black uppercase text-black mb-3">
                                    XEM GÓI <span className="text-[#ed792f]">BÁN HÀNG E-COMMERCE</span>
                                </h3>

                                <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-8 font-medium">
                                    Setup livestream trọn gói dành cho Nhà bán hàng Doanh nghiệp hoặc Cá nhân đang kinh doanh trên các nền tảng số.
                                </p>
                            </div>

                            <a
                                href="#tu-van-bao-gia"
                                onClick={() => {
                                    handleSelectTarget('Nhà bán hàng e-commerce');
                                }}
                                className="px-10 py-3 bg-gradient-to-r from-[#ed792f] to-[#e66311] hover:brightness-105 text-white font-black text-sm md:text-base rounded-full shadow-[0_6px_20px_rgba(237,121,47,0.4)] tracking-wider uppercase transition-all"
                            >
                                BÁO GIÁ
                            </a>
                        </div>

                        {/* Gói Idol Live Studio */}
                        <div className="rounded-[32px] p-8 text-center bg-white shadow-[0_0_35px_rgba(147,51,234,0.3)] border-4 border-purple-200/70 flex flex-col items-center justify-between">
                            <div>
                                <div className="flex justify-center items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full border-2 border-red-500 p-1 flex items-center justify-center relative">
                                        <img src="/icons/tiktok-live.png" alt="TikTok Live" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/3046/3046121.png"; }} />
                                        <span className="absolute -bottom-2 bg-red-600 text-white text-[8px] font-bold px-1 rounded">LIVE</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border-2 border-blue-500 p-1 flex items-center justify-center relative">
                                        <img src="/icons/facebook-live.png" alt="FB Live" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/5968/5968764.png"; }} />
                                        <span className="absolute -bottom-2 bg-red-600 text-white text-[8px] font-bold px-1 rounded">LIVE</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border-2 border-green-500 p-1 flex items-center justify-center relative">
                                        <img
                                            src="/bigo.jpg"
                                            alt="Bigo Live"
                                            className="w-full h-full object-contain"
                                        />
                                        <span className="absolute -bottom-2 bg-red-600 text-white text-[8px] font-bold px-1 rounded">LIVE</span>
                                    </div>
                                </div>

                                <h3 className="text-lg md:text-xl font-black uppercase text-black mb-3">
                                    XEM GÓI <span className="text-[#ed792f]">IDOL LIVE STUDIO</span>
                                </h3>

                                <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-8 font-medium">
                                    Setup livestream trọn gói dành cho Idol Ca hát muốn phát triển hình ảnh thương hiệu cá nhân trên các nền tảng số.
                                </p>
                            </div>

                            <a
                                href="#tu-van-bao-gia"
                                onClick={() => {
                                    handleSelectTarget('Idol Live (ca hát)');
                                }}
                                className="px-10 py-3 bg-gradient-to-r from-[#ed792f] to-[#e66311] hover:brightness-105 text-white font-black text-sm md:text-base rounded-full shadow-[0_6px_20px_rgba(237,121,47,0.4)] tracking-wider uppercase transition-all"
                            >
                                BÁO GIÁ
                            </a>
                        </div>

                    </div>
                </div>

                <div className="mt-12 py-3 bg-gray-50 border-y border-gray-200 overflow-hidden whitespace-nowrap relative flex">
                    <style>{`
                        @keyframes customMarquee {
                            0% { transform: translateX(0%); }
                            100% { transform: translateX(-50%); }
                        }
                        .run-marquee {
                            display: inline-flex;
                            width: max-content;
                            animation: customMarquee 20s linear infinite;
                        }
                        .run-marquee:hover {
                            animation-play-state: paused;
                        }
                    `}</style>

                    <div className="run-marquee font-black text-black text-sm md:text-base tracking-wide uppercase select-none">
                        <span>+150 Phòng Live bàn giao &nbsp;|&nbsp; Hỗ trợ 24/7 &nbsp;|&nbsp; Bảo hành 1 đổi 1 &nbsp;|&nbsp; Setup toàn quốc &nbsp;|&nbsp; 037.2672.396 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>+150 Phòng Live bàn giao &nbsp;|&nbsp; Hỗ trợ 24/7 &nbsp;|&nbsp; Bảo hành 1 đổi 1 &nbsp;|&nbsp; Setup toàn quốc &nbsp;|&nbsp; 037.2672.396 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>+150 Phòng Live bàn giao &nbsp;|&nbsp; Hỗ trợ 24/7 &nbsp;|&nbsp; Bảo hành 1 đổi 1 &nbsp;|&nbsp; Setup toàn quốc &nbsp;|&nbsp; 037.2672.396 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>+150 Phòng Live bàn giao &nbsp;|&nbsp; Hỗ trợ 24/7 &nbsp;|&nbsp; Bảo hành 1 đổi 1 &nbsp;|&nbsp; Setup toàn quốc &nbsp;|&nbsp; 037.2672.396 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 2. BẠN ĐANG MẤT KHÁCH HÀNG VÌ...                          */}
            {/* ========================================================= */}
            <section className="py-14 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-xl md:text-2xl font-black text-center uppercase tracking-tight text-black mb-12">
                        BẠN ĐANG MẤT KHÁCH HÀNG VÌ...
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        <div className="border-2 border-[#E11D48] rounded-[28px] p-6 text-center flex flex-col items-center justify-center min-h-[260px] bg-rose-50/60 shadow-sm hover:shadow-md transition-all">
                            <div className="mb-6">
                                <WarningSignIcon className="w-16 h-16" />
                            </div>
                            <p className="text-base text-gray-900 leading-relaxed font-medium">
                                Ánh sáng mờ, giao diện nhợt nhạt, tổng thể nhìn thiếu chuyên nghiệp.
                            </p>
                        </div>

                        <div className="border-2 border-[#E11D48] rounded-[28px] p-6 text-center flex flex-col items-center justify-center min-h-[260px] bg-rose-50/60 shadow-sm hover:shadow-md transition-all">
                            <div className="mb-6">
                                <WarningSignIcon className="w-16 h-16" />
                            </div>
                            <p className="text-base text-gray-900 leading-relaxed font-medium">
                                Âm thanh rè, lẫn nhiều tạp âm, nghe không rõ.
                            </p>
                        </div>

                        <div className="border-2 border-[#E11D48] rounded-[28px] p-6 text-center flex flex-col items-center justify-center min-h-[260px] bg-rose-50/60 shadow-sm hover:shadow-md transition-all">
                            <div className="mb-6">
                                <WarningSignIcon className="w-16 h-16" />
                            </div>
                            <p className="text-base text-gray-900 leading-relaxed font-medium">
                                Tự setup lộn xộn, thiết bị không tương thích khiến phiên live giật lag.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 3. GIẢI PHÁP TỪ CMIC STUDIO                               */}
            {/* ========================================================= */}
            <section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-xl md:text-2xl font-black text-center uppercase tracking-tight text-black mb-10">
                        GIẢI PHÁP TỪ CMIC STUDIO
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { id: "i0tMf2k0Tpc", title: "Bạn cần SETUP LIVESTREAM" },
                            { id: "Lfz_8kEHJKY", title: "Muốn setup hát live CHUYÊN NGHIỆP" },
                            { id: "c_q4lkbePqc", title: "Ta còn em.." }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-xl bg-black border border-gray-200"
                            >
                                <iframe
                                    className="w-full h-full object-cover"
                                    src={`https://www.youtube.com/embed/${item.id}?rel=0&modestbranding=1`}
                                    title={item.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 4. BẢNG SO SÁNH GIẢI PHÁP CHI TIẾT                        */}
            {/* ========================================================= */}
            <section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
                        <table className="w-full min-w-[760px] text-left border-collapse text-sm md:text-base">
                            <thead>
                                <tr className="bg-[#ed792f] text-white">
                                    <th className="p-4 md:p-5 w-[22%] font-extrabold uppercase text-center border-r border-orange-400">
                                        HẠNG MỤC
                                    </th>
                                    <th className="p-4 md:p-5 w-[39%] font-extrabold uppercase text-center border-r border-orange-400">
                                        GIẢI PHÁP E-COMMERCE LIVE DÀNH CHO<br />NHÀ BÁN HÀNG - CHỦ SHOP
                                    </th>
                                    <th className="p-4 md:p-5 w-[39%] font-extrabold uppercase text-center">
                                        GIẢI PHÁP IDOL LIVE DÀNH CHO<br />NHÀ SÁNG TẠO NỘI DUNG
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white text-gray-700 leading-relaxed font-normal text-base md:text-lg">
                                <tr className="hover:bg-orange-50/30 transition-colors">
                                    <td className="p-4 md:p-5 font-bold text-gray-900 align-middle border-r border-gray-200 text-center md:text-left bg-gray-50/60 md:bg-transparent">
                                        Hình ảnh & Ánh sáng
                                    </td>
                                    <td className="p-4 md:p-5 border-r border-gray-200 space-y-3">
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-bold mt-1 text-sm">●</span>
                                            <span>Sử dụng camera có <span className="text-[#ea580c] font-semibold">lấy nét tự động cực nhanh</span>, bắt nét ngay lập tức khi đưa sản phẩm sát vào ống kính.</span>
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-bold mt-1 text-sm">●</span>
                                            <span>Hệ thống đèn <span className="text-[#ea580c] font-semibold">chuẩn màu tự nhiên</span>, triệt tiêu tình trạng khách hoàn hàng vì <span className="text-[#ea580c] font-semibold">"màu thực tế khác trên live"</span>.</span>
                                        </p>
                                    </td>
                                    <td className="p-4 md:p-5 space-y-3">
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-bold mt-1 text-sm">●</span>
                                            <span>Camera cảm biến lớn cùng ống kính khẩu độ mở to, tạo hiệu ứng <span className="text-[#ea580c] font-semibold">xóa phông mờ mịt chuẩn điện ảnh</span>.</span>
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-bold mt-1 text-sm">●</span>
                                            <span>Ánh sáng chuẩn Studio kết hợp <span className="text-[#ea580c] font-semibold">đèn RGB tạo khối</span>, làm mịn da và tôn thần thái nổi bật cho Idol.</span>
                                        </p>
                                    </td>
                                </tr>

                                <tr className="bg-gray-50/40 hover:bg-orange-50/30 transition-colors">
                                    <td className="p-4 md:p-5 font-bold text-gray-900 align-middle border-r border-gray-200 text-center md:text-left bg-gray-50/80 md:bg-transparent">
                                        Không gian & Âm thanh
                                    </td>
                                    <td className="p-4 md:p-5 border-r border-gray-200 space-y-3">
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-bold mt-1 text-sm">●</span>
                                            <span>Setup bối cảnh dạng <span className="text-[#ea580c] font-semibold">Showroom thu nhỏ</span>, tối ưu kệ trưng bày gọn gàng và đậm dấu ấn thương hiệu.</span>
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-bold mt-1 text-sm">●</span>
                                            <span>Micro lọc ồn thông minh, <span className="text-[#ea580c] font-semibold">triệt tiêu hoàn toàn tạp âm</span> đóng hàng, tiếng kéo băng keo và tiếng ồn xung quanh.</span>
                                        </p>
                                    </td>
                                    <td className="p-4 md:p-5 space-y-3">
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-bold mt-1 text-sm">●</span>
                                            <span>Phòng <span className="text-[#ea580c] font-semibold">tiêu âm chống vang (echo)</span>, giúp Idol thoải mái hát và bung nốt với âm lượng lớn.</span>
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-bold mt-1 text-sm">●</span>
                                            <span>Trang bị trọn bộ <span className="text-[#ea580c] font-semibold">Soundcard và Micro độ nhạy cao</span> chuẩn phòng thu biểu diễn.</span>
                                        </p>
                                    </td>
                                </tr>

                                <tr className="hover:bg-orange-50/30 transition-colors">
                                    <td className="p-4 md:p-5 font-bold text-gray-900 align-middle border-r border-gray-200 text-center md:text-left bg-gray-50/60 md:bg-transparent">
                                        Thiết bị & Phần mềm phụ trợ
                                    </td>
                                    <td className="p-4 md:p-5 border-r border-gray-200 space-y-3">
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-bold mt-1 text-sm">●</span>
                                            <span><span className="text-[#ea580c] font-semibold">Màn hình nhắc lời/comment</span> đặt ngay dưới lens: Vừa nhìn thẳng người xem vừa theo dõi tồn kho và chốt đơn thời gian thực.</span>
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-bold mt-1 text-sm">●</span>
                                            <span>Phông xanh thông minh giúp <span className="text-[#ea580c] font-semibold">thay đổi background và gắn deal flash-sale</span> chỉ với 1 click.</span>
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-semibold">App làm đẹp tự nhiên</span>: Tôn dáng - sáng da mà vẫn giữ độ chi tiết trung thực cho chất liệu sản phẩm.
                                        </p>
                                    </td>
                                    <td className="p-4 md:p-5 space-y-3">
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-bold mt-1 text-sm">●</span>
                                            <span><span className="text-[#ea580c] font-semibold">Màn hình tương tác cận cảnh</span>: Giữ ánh mắt tương tác tự nhiên với người xem, đọc donate không bị lệch góc nhìn.</span>
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-bold mt-1 text-sm">●</span>
                                            <span>Bộ lọc làm đẹp chuyên sâu, hiệu ứng visual bắt mắt giúp hình ảnh luôn <span className="text-[#ea580c] font-semibold">rạng rỡ và cuốn hút</span>.</span>
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-bold mt-1 text-sm">●</span>
                                            <span>Tích hợp <span className="text-[#ea580c] font-semibold">Auto-tune tôn giọng</span> cùng hiệu ứng âm thanh cổ vũ, PK kịch tính giữ chân người xem.</span>
                                        </p>
                                    </td>
                                </tr>

                                <tr className="bg-gray-50/40 hover:bg-orange-50/30 transition-colors">
                                    <td className="p-4 md:p-5 font-bold text-gray-900 align-middle border-r border-gray-200 text-center md:text-left bg-gray-50/80 md:bg-transparent">
                                        Setup tận nơi & Bàn giao
                                    </td>
                                    <td className="p-4 md:p-5 border-r border-gray-200 space-y-3">
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-bold mt-1 text-sm">●</span>
                                            <span>Kỹ thuật viên <span className="text-[#ea580c] font-semibold">khảo sát trực tiếp tại kho</span>, lên layout tối ưu riêng cho từng ngành hàng.</span>
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-bold mt-1 text-sm">●</span>
                                            <span><span className="text-[#ea580c] font-semibold">Đào tạo 1-1 tại chỗ</span> cho nhân sự vận hành trơn tru toàn bộ quy trình trước khi bàn giao.</span>
                                        </p>
                                    </td>
                                    <td className="p-4 md:p-5 space-y-3">
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-bold mt-1 text-sm">●</span>
                                            <span>Lắp đặt và cân chỉnh góc máy, âm thanh <span className="text-[#ea580c] font-semibold">tận nơi theo yêu cầu</span>.</span>
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <span className="text-[#ea580c] font-bold mt-1 text-sm">●</span>
                                            <span>Hướng dẫn chi tiết cách làm chủ phần mềm và thiết bị để <span className="text-[#ea580c] font-semibold">tự tin bắt đầu phiên live ngay trong ngày</span>.</span>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 5. TƯ VẤN NHẬN BÁO GIÁ                                     */}
            {/* ========================================================= */}
            <section id="tu-van-bao-gia" className="py-14 bg-white scroll-mt-6 flex justify-center items-center">
                <div className="w-full max-w-[620px] px-4">
                    <h2 className="text-xl md:text-2xl font-black text-center uppercase tracking-tight text-black mb-10">
                        TƯ VẤN NHẬN BÁO GIÁ
                    </h2>

                    {/* BƯỚC 1: Chọn Đối tượng */}
                    {step === 1 && (
                        <div className="rounded-[36px] border-[3px] border-[#e8702a] bg-[#fffcf7] p-8 sm:p-12 shadow-sm transition-all duration-300">
                            <h2 className="text-xl sm:text-3xl font-black text-[#e8702a] leading-tight tracking-tight mb-6">
                                Bạn thuộc đối tượng nào sau đây?
                            </h2>

                            <p className="text-sm font-bold text-[#e8702a] leading-relaxed mb-6">
                                Bạn vui lòng tick chọn ô phù hợp để nhận được báo giá đúng nhất.*
                            </p>

                            <div className="space-y-4 mb-8">
                                {[
                                    "Nhà bán hàng e-commerce",
                                    "Idol Live (ca hát)",
                                    "Khác"
                                ].map((item) => {
                                    const isSelected = targetType === item;
                                    return (
                                        <div
                                            key={item}
                                            onClick={() => handleSelectTarget(item)}
                                            className={`w-full py-4 px-6 rounded-2xl cursor-pointer transition-all duration-200 text-base sm:text-lg select-none ${isSelected
                                                ? "bg-[#feddc7] text-black font-semibold border-2 border-[#e8702a] shadow-inner"
                                                : "bg-[#faece0] text-[#6b4731] hover:bg-[#f7dfcf] border-2 border-transparent font-medium"
                                                }`}
                                        >
                                            {item}
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                type="button"
                                onClick={() => handleSelectTarget(targetType)}
                                className="w-full py-4 bg-[#e8702a] hover:bg-[#d4621e] active:scale-[0.99] text-white font-black text-lg rounded-2xl shadow-md uppercase tracking-wider transition-all duration-200 cursor-pointer"
                            >
                                GỬI NGAY
                            </button>
                        </div>
                    )}

                    {/* BƯỚC 2: Chọn Thiết bị */}
                    {step === 2 && (
                        <div className="rounded-[36px] border-[3px] border-[#e8702a] bg-[#fffcf7] p-8 sm:p-12 shadow-sm transition-all duration-300">
                            <h2 className="text-2xl sm:text-[34px] font-black text-[#e8702a] leading-tight tracking-tight mb-6">
                                Bạn muốn livestream bằng thiết bị gì?
                            </h2>

                            <p className="text-sm sm:text-base font-bold text-[#e8702a] leading-relaxed mb-6">
                                Bạn vui lòng tick chọn ô phù hợp để nhận được báo giá đúng nhất.*
                            </p>

                            <div className="space-y-4 mb-8">
                                {(targetType === 'Nhà bán hàng e-commerce'
                                    ? ["Máy ảnh"]
                                    : ["Điện thoại", "Máy ảnh", "Tôi muốn tham khảo cả 2"]
                                ).map((item) => {
                                    const isSelected = deviceType === item;
                                    return (
                                        <div
                                            key={item}
                                            onClick={() => handleSelectDevice(item)}
                                            className={`w-full py-4 px-6 rounded-2xl cursor-pointer transition-all duration-200 text-base sm:text-lg select-none ${isSelected
                                                ? "bg-[#feddc7] text-black font-semibold border-2 border-[#e8702a] shadow-inner"
                                                : "bg-[#faece0] text-[#6b4731] hover:bg-[#f7dfcf] border-2 border-transparent font-medium"
                                                }`}
                                        >
                                            {item}
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    const defaultDev = targetType === 'Nhà bán hàng e-commerce' ? 'Máy ảnh' : deviceType;
                                    if (!defaultDev) {
                                        toast.warning("Vui lòng tick chọn thiết bị livestream!");
                                        return;
                                    }
                                    handleSelectDevice(defaultDev);
                                }}
                                className="w-full py-4 bg-[#e8702a] hover:bg-[#d4621e] active:scale-[0.99] text-white font-black text-lg rounded-2xl shadow-md uppercase tracking-wider transition-all duration-200 cursor-pointer"
                            >
                                GỬI NGAY
                            </button>

                            <div className="text-center mt-6">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-black transition-colors"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" /> Khảo sát lại từ đầu
                                </button>
                            </div>
                        </div>
                    )}

                    {/* BƯỚC 3: Nhập SĐT */}
                    {step === 3 && (
                        <div className="rounded-[36px] border-[3px] border-[#e8702a] bg-[#fffcf7] p-8 sm:p-12 shadow-sm transition-all duration-300">
                            <h2 className="text-2xl sm:text-[34px] font-black text-[#e8702a] leading-tight tracking-tight mb-6">
                                CMIC STUDIO có thể liên hệ với bạn bằng cách nào?
                            </h2>

                            <p className="text-sm sm:text-base font-bold text-[#e8702a] leading-relaxed mb-6">
                                Tiếp theo, bạn chỉ cần nhập SĐT để nhận báo giá!*
                            </p>

                            <form onSubmit={handleNextToPrice}>
                                <div className="mb-8">
                                    <input
                                        type="tel"
                                        autoFocus
                                        required
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Nhập số điện thoại của bạn..."
                                        className="w-full py-4 px-5 bg-white border border-[#f5b890] rounded-2xl outline-none focus:border-[#e8702a] focus:ring-2 focus:ring-orange-200 text-base text-gray-900 transition-all placeholder:text-gray-400"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#e8702a] hover:bg-[#d4621e] active:scale-[0.99] text-white font-black text-lg rounded-2xl shadow-md uppercase tracking-wider transition-all duration-200 cursor-pointer"
                                >
                                    GỬI NGAY
                                </button>
                            </form>
                        </div>
                    )}

                    {/* BƯỚC 4: Hiện Báo Giá Tương Ứng & Ô Ngân Sách */}
                    {step === 4 && (() => {
                        const pricing = getPricingImage();
                        return (
                            <div className="space-y-6">
                                {/* Khối Danh Sách Ảnh Báo Giá */}
                                <div className="rounded-3xl border border-orange-200 bg-white p-4 sm:p-6 shadow-sm text-center">
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-[#e8702a] font-extrabold text-xs sm:text-sm uppercase tracking-wider mb-4">
                                        {pricing.title}
                                    </span>

                                    <div
                                        className={`w-screen relative left-1/2 -translate-x-1/2 px-4 md:px-12 grid gap-4 md:gap-6 ${pricing.images.length === 3
                                                ? "grid-cols-1 md:grid-cols-3"
                                                : "grid-cols-1 md:grid-cols-2"
                                            }`}
                                    >
                                        {pricing.images.map((imgSrc, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => setPreviewImage(imgSrc)}
                                                className="w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center p-2 cursor-zoom-in group transition-all"
                                                title="Click để phóng to xem chi tiết"
                                            >
                                                <img
                                                    src={imgSrc}
                                                    alt={`${pricing.title} - Trang ${idx + 1}`}
                                                    className="w-full h-auto object-contain mx-auto block group-hover:scale-[1.02] transition-transform duration-300"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-3 italic">
                                        (Click vào từng ảnh để phóng to toàn màn hình)
                                    </p>
                                </div>

                                {/* Khối Ô Khảo Sát Ngân Sách Cuối Cùng */}
                                <div className="rounded-[36px] border-[3px] border-[#e8702a] bg-[#fffcf7] p-8 sm:p-12 shadow-sm transition-all duration-300">
                                    <h2 className="text-2xl sm:text-[32px] font-black text-[#e8702a] leading-tight tracking-tight mb-4">
                                        Chi phí trong báo giá đã phù hợp với ngân sách của bạn chưa?
                                    </h2>

                                    <p className="text-sm sm:text-base font-bold text-[#e8702a] leading-relaxed mb-6">
                                        Nếu đã phù hợp với ngân sách, bạn vui lòng bỏ qua câu hỏi này. Đội ngũ của CMIC STUDIO sẽ liên hệ để trao đổi thêm. Nếu chưa, bạn hãy điền ngân sách mà mình mong muốn. Chúng tôi sẽ thiết kế báo giá mới phù hợp với ngân sách của bạn!
                                    </p>

                                    <form onSubmit={handleFinalSubmit}>
                                        <div className="mb-8">
                                            <input
                                                type="text"
                                                value={budgetNote}
                                                onChange={(e) => setBudgetNote(e.target.value)}
                                                placeholder="Nhập ngân sách mong muốn (ví dụ: 15 triệu, 25 triệu...)"
                                                className="w-full py-4 px-5 bg-white border border-[#f5b890] rounded-2xl outline-none focus:border-[#e8702a] focus:ring-2 focus:ring-orange-200 text-base text-gray-900 transition-all placeholder:text-gray-400"
                                            />
                                        </div>

                                        {!isSubmitted ? (
                                            <button
                                                type="submit"
                                                className="w-full py-4 bg-[#e8702a] hover:bg-[#d4621e] active:scale-[0.99] text-white font-black text-lg rounded-2xl shadow-md uppercase tracking-wider transition-all duration-200 cursor-pointer"
                                            >
                                                GỬI NGAY
                                            </button>
                                        ) : (
                                            <div className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl text-center flex items-center justify-center gap-2 text-base">
                                                <CheckCircle2 className="w-5 h-5" />
                                                ĐÃ GỬI THÔNG TIN THÀNH CÔNG!
                                            </div>
                                        )}
                                    </form>

                                    <div className="text-center mt-6">
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-black transition-colors"
                                        >
                                            <RotateCcw className="w-3.5 h-3.5" /> Khảo sát lại từ đầu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                </div>
            </section>

            {/* ========================================================= */}
            {/* 6. CASE STUDY SETUP LIVESTREAM                            */}
            {/* ========================================================= */}
            <section className="py-12 bg-white overflow-hidden">
                <style>{`
                    @keyframes scrollLeft {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-33.333%); }
                    }
                    @keyframes scrollRight {
                        0% { transform: translateX(-33.333%); }
                        100% { transform: translateX(0%); }
                    }
                    .marquee-left {
                        display: flex;
                        width: max-content;
                        animation: scrollLeft 35s linear infinite;
                    }
                    .marquee-right {
                        display: flex;
                        width: max-content;
                        animation: scrollRight 35s linear infinite;
                    }
                    .marquee-left:hover, .marquee-right:hover {
                        animation-play-state: paused;
                    }
                `}</style>

                <div className="max-w-6xl mx-auto px-4 mb-8 text-center">
                    <h2 className="text-xl md:text-2xl font-black uppercase text-black tracking-wide leading-tight">
                        CASE STUDY SETUP LIVESTREAM<br />CMIC STUDIO ĐÃ THỰC HIỆN
                    </h2>
                </div>

                <div className="space-y-4">
                    <div className="overflow-hidden w-full">
                        <div className="marquee-left gap-4">
                            {[...caseStudyRow1, ...caseStudyRow1, ...caseStudyRow1].map((src, i) => (
                                <div key={i} className="w-60 sm:w-72 aspect-video rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-black">
                                    <img
                                        src={src}
                                        alt="Case Study"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&q=80";
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-hidden w-full">
                        <div className="marquee-right gap-4">
                            {[...caseStudyRow2, ...caseStudyRow2, ...caseStudyRow2].map((src, i) => (
                                <div key={i} className="w-48 sm:w-56 aspect-[3/4] rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-black">
                                    <img
                                        src={src}
                                        alt="Case Study"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500&q=80";
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 7. MỘT SỐ THƯƠNG HIỆU ĐÃ HỢP TÁC                          */}
            {/* ========================================================= */}
            <section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-wider text-black">
                            MỘT SỐ THƯƠNG HIỆU ĐÃ HỢP TÁC
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 lg:gap-12 items-center justify-items-center">
                        {brands.map((brand, i) => (
                            <div
                                key={i}
                                className="h-30 w-full flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={brand.src}
                                    alt={brand.name}
                                    className="max-h-full max-w-full object-contain filter contrast-105"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-14 text-center">
                        <a
                            href="#tu-van-bao-gia"
                            className="inline-flex items-center gap-3 pl-8 pr-3 py-2.5 bg-[#e8702a] hover:bg-[#d8621d] text-white font-extrabold rounded-full shadow-md transition-all duration-300 hover:shadow-lg uppercase text-sm tracking-wider"
                        >
                            <span>TƯ VẤN BÁO GIÁ</span>
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#e8702a] shadow-inner">
                                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* MODAL LIGHTBOX: PHÓNG TO TOÀN MÀN HÌNH KHI BẤM VÀO ẢNH   */}
            {/* ========================================================= */}
            {previewImage && (
                <div
                    className="fixed inset-0 z-[999999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 transition-opacity duration-300"
                    onClick={() => setPreviewImage(null)}
                >
                    {/* Nút đóng góc phải */}
                    <button
                        type="button"
                        onClick={() => setPreviewImage(null)}
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/90 hover:text-white bg-white/10 hover:bg-white/25 p-2 sm:p-3 rounded-full transition-all cursor-pointer z-50 shadow-md"
                        title="Đóng (Esc)"
                    >
                        <X className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
                    </button>

                    {/* Vùng hiển thị ảnh Full */}
                    <div
                        className="relative max-w-6xl max-h-[92vh] flex items-center justify-center select-none"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={previewImage}
                            alt="Ảnh báo giá chi tiết"
                            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
                        />
                    </div>
                </div>
            )}

        </div>
    );
}