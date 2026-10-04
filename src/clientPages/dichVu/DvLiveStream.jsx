import React, { useState } from 'react';
import {
    AlertTriangle,
    ArrowRight,
    Play,
    CheckCircle2,
    RotateCcw
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function SetupLivestreamPage() {
    // -------------------------------------------------------------
    // Multi-step Form State (Tư vấn nhận báo giá theo đúng 3 ảnh)
    // -------------------------------------------------------------
    const [step, setStep] = useState(1);
    const [deviceType, setDeviceType] = useState('Điện thoại');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [budgetNote, setBudgetNote] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Chuyển từ Bước 1 sang Bước 2
    const handleNextStep1 = () => {
        if (!deviceType) {
            toast.warning('Vui lòng tick chọn thiết bị livestream!');
            return;
        }
        setStep(2);
    };

    // Chuyển từ Bước 2 sang Bước 3
    const handleNextStep2 = () => {
        if (!phoneNumber.trim()) {
            toast.warning('Vui lòng nhập số điện thoại để nhận báo giá!');
            return;
        }
        setStep(3);
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
        setDeviceType('Điện thoại');
        setPhoneNumber('');
        setBudgetNote('');
        setIsSubmitted(false);
    };

    // -------------------------------------------------------------
    // Danh sách Case study & Thương hiệu
    // -------------------------------------------------------------
    const caseStudyRow1 = [
        "/casestudy/cs1.png", "/casestudy/cs2.png", "/casestudy/cs3.png",
        "/casestudy/cs4.png", "/casestudy/cs5.png"
    ];

    const caseStudyRow2 = [
        "/casestudy/cs6.png", "/casestudy/cs7.png", "/casestudy/cs8.png",
        "/casestudy/cs9.png", "/casestudy/cs10.png", "/casestudy/cs11.png"
    ];

    const brands = [
        { name: "AVANTA", src: "/brands/avanta.png" },
        { name: "LUMINA", src: "/brands/lumina.png" },
        { name: "ÁNH DƯƠNG", src: "/brands/anhduong.png" },
        { name: "MENSPIRE", src: "/brands/menspire.png" },
        { name: "LUMINELLA", src: "/brands/luminella.png" },
        { name: "VANGUARD", src: "/brands/vanguard.png" },
        { name: "SEN AN", src: "/brands/senan.png" },
        { name: "CHRONOS AURA", src: "/brands/chronos.png" },
        { name: "GIA DỤNG AN KHANG", src: "/brands/ankhang.png" },
        { name: "AURELIA LUNA", src: "/brands/aurelia.png" }
    ];

    return (
        <div className="w-full bg-white font-sans text-gray-900 overflow-x-hidden">

            {/* ========================================================= */}
            {/* HERO: ẢNH FULL WIDTH SAU BANNER                           */}
            {/* ========================================================= */}
            <div className="w-full">
                <img
                    src="/banner-autotune-full.png"
                    alt="Banner Dịch Vụ AutoTune AI"
                    className="w-full h-auto object-cover max-h-[500px]"
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&q=80";
                    }}
                />
            </div>

            {/* ========================================================= */}
            {/* 1. HAI GÓI LIVESTREAM VÀ TICKER CHẠY NGANG (Ảnh 1)       */}
            {/* ========================================================= */}
            <section className="py-8 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

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
                                        <img src="/icons/shopee-live.png" alt="Shopee Live" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/825/825514.png"; }} />
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
                                onClick={() => { setDeviceType('PC'); setStep(1); }}
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
                                        <img src="/icons/bigo-live.png" alt="Bigo Live" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/1006/1006771.png"; }} />
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
                                onClick={() => { setDeviceType('Điện thoại'); setStep(1); }}
                                className="px-10 py-3 bg-gradient-to-r from-[#ed792f] to-[#e66311] hover:brightness-105 text-white font-black text-sm md:text-base rounded-full shadow-[0_6px_20px_rgba(237,121,47,0.4)] tracking-wider uppercase transition-all"
                            >
                                BÁO GIÁ
                            </a>
                        </div>

                    </div>
                </div>

                {/* Dòng chữ in đậm chạy ngang vô tận */}
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
            {/* 2. BẠN ĐANG MẤT KHÁCH HÀNG VÌ... (Ảnh 2)                   */}
            {/* ========================================================= */}
            <section className="py-14 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-black text-center uppercase tracking-tight text-black mb-12">
                        BẠN ĐANG MẤT KHÁCH HÀNG VÌ...
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        <div className="border-2 border-red-600 rounded-[28px] p-8 text-center flex flex-col items-center justify-center min-h-[260px] bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="mb-6">
                                <AlertTriangle className="w-14 h-14 text-white fill-red-600 stroke-red-600" />
                            </div>
                            <p className="text-base text-gray-900 leading-relaxed font-normal">
                                Ánh sáng mờ, giao diện nhợt nhạt, tổng thể nhìn thiếu chuyên nghiệp.
                            </p>
                        </div>

                        <div className="border-2 border-red-600 rounded-[28px] p-8 text-center flex flex-col items-center justify-center min-h-[260px] bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="mb-6">
                                <AlertTriangle className="w-14 h-14 text-white fill-red-600 stroke-red-600" />
                            </div>
                            <p className="text-base text-gray-900 leading-relaxed font-normal">
                                Âm thanh rè, lẫn nhiều tạp âm, nghe không rõ.
                            </p>
                        </div>

                        <div className="border-2 border-red-600 rounded-[28px] p-8 text-center flex flex-col items-center justify-center min-h-[260px] bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="mb-6">
                                <AlertTriangle className="w-14 h-14 text-white fill-red-600 stroke-red-600" />
                            </div>
                            <p className="text-base text-gray-900 leading-relaxed font-normal">
                                Tự setup lộn xộn, thiết bị không tương thích khiến phiên live giật lag.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 3. GIẢI PHÁP TỪ CMIC STUDIO (NHÚNG VIDEO YOUTUBE)         */}
            {/* ========================================================= */}
            <section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-black text-center uppercase tracking-tight text-black mb-10">
                        GIẢI PHÁP TỪ CMIC STUDIO
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                id: "dQw4w9WgXcQ", // Thay bằng Video ID YouTube 1 (hoặc ID YouTube Shorts)
                                title: "Bạn cần SETUP LIVESTREAM"
                            },
                            {
                                id: "dQw4w9WgXcQ", // Thay bằng Video ID YouTube 2
                                title: "Muốn setup hát live CHUYÊN NGHIỆP"
                            },
                            {
                                id: "dQw4w9WgXcQ", // Thay bằng Video ID YouTube 3
                                title: "Ta còn em.."
                            }
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
            {/* 4. BẢNG SO SÁNH GIẢI PHÁP CHI TIẾT (Ảnh 4)                */}
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
                            <tbody className="divide-y divide-gray-200 bg-white text-gray-800 leading-relaxed font-normal">
                                <tr>
                                    <td className="p-4 md:p-5 font-bold text-black align-middle border-r border-gray-200 text-center md:text-left">
                                        Hình ảnh & Ánh sáng
                                    </td>
                                    <td className="p-4 md:p-5 border-r border-gray-200 space-y-2">
                                        <p>• Sử dụng hệ thống camera có tốc độ lấy nét tự động cực nhanh để bắt nét ngay lập tức khi người bán đưa sản phẩm sát vào ống kính.</p>
                                        <p>• Setup hệ thống đèn mô phỏng ánh sáng tự nhiên giúp hiển thị màu sắc và chất liệu sản phẩm chuẩn xác nhất so với thực tế, tránh tình trạng khách hàng hoàn trả vì "màu trên live khác màu nhận được".</p>
                                    </td>
                                    <td className="p-4 md:p-5 space-y-2">
                                        <p>• Sử dụng camera cảm biến lớn kết hợp ống kính khẩu độ mở to để tạo hiệu ứng xóa phông mờ mịt, tôn chủ thể lên như một bộ phim điện ảnh.</p>
                                        <p>• Hệ thống ánh sáng thiết lập theo chuẩn Studio chuyên nghiệp (Key light, Fill light, Hair light) kết hợp với đèn RGB tạo hiệu ứng màu sắc. Setup này giúp làm mịn da, che hoàn toàn khuyết điểm khuôn mặt, tạo độ nổi khối (3D) cho góc mặt của Idol.</p>
                                    </td>
                                </tr>

                                <tr className="bg-gray-50/50">
                                    <td className="p-4 md:p-5 font-bold text-black align-middle border-r border-gray-200 text-center md:text-left">
                                        Không gian & Âm thanh
                                    </td>
                                    <td className="p-4 md:p-5 border-r border-gray-200 space-y-2">
                                        <p>• Thiết kế bối cảnh dạng "Showroom thu nhỏ": Tối ưu kệ trưng bày phía sau gọn gàng, có điểm nhấn thương hiệu.</p>
                                        <p>• Sử dụng Micro định hướng cài áo hoặc treo cao (Boom mic) có khả năng lọc tiếng ồn, tiếng băng keo đóng hàng hay tiếng nhân viên soạn kho xung quanh.</p>
                                    </td>
                                    <td className="p-4 md:p-5 space-y-2">
                                        <p>• Thi công phòng tiêu âm cơ bản để Idol có thể thoải mái ca hát, chơi nhạc cụ với âm lượng lớn mà không bị dội âm (echo) hay ảnh hưởng không gian bên ngoài.</p>
                                        <p>• Trang bị các thiết bị hát chuyên dụng như Soundcard và Micro có độ nhạy cao.</p>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="p-4 md:p-5 font-bold text-black align-middle border-r border-gray-200 text-center md:text-left">
                                        Thiết bị & Phần mềm phụ trợ
                                    </td>
                                    <td className="p-4 md:p-5 border-r border-gray-200 space-y-2">
                                        <p>• Trang bị màn hình phụ ngay dưới camera để người bán vừa nhìn thẳng ống kính tương tác, vừa đọc được bình luận, kịch bản live và kiểm soát số lượng tồn kho theo thời gian thực mà không bị phân tâm.</p>
                                        <p>• Bố trí phông xanh cho Nhà bán hàng giúp thay đổi background, lên deal dễ dàng chỉ với 1 cú click.</p>
                                        <p>• Phần mềm làm đẹp tích hợp hiệu ứng trang điểm, đẹp da, chỉnh dáng, kéo dài chân,... giúp Nhà bán hàng tiết kiệm thời gian lên hình đẹp hơn mà vẫn tôn được sản phẩm.</p>
                                    </td>
                                    <td className="p-4 md:p-5 space-y-2">
                                        <p>• Trang bị màn hình phụ ngay dưới camera để Idol vừa hát vừa nhìn thẳng ống kính tương tác, vừa đọc được bình luận, donate của khán giả.</p>
                                        <p>• Phần mềm làm đẹp tích hợp hiệu ứng trang điểm, đẹp da, chỉnh dáng, kết hợp cùng nhiều hiệu ứng hình ảnh giúp Idol lên hình “xinh lung linh”.</p>
                                        <p>• Phần mềm Autotune giúp chỉnh giọng hát, tích hợp hiệu ứng PK khi có người donate, người đăng ký mới giúp phiên live không bao giờ nhàm chán.</p>
                                    </td>
                                </tr>

                                <tr className="bg-gray-50/50">
                                    <td className="p-4 md:p-5 font-bold text-black align-middle border-r border-gray-200 text-center md:text-left">
                                        Setup tận nơi & Hướng dẫn bàn giao
                                    </td>
                                    <td className="p-4 md:p-5 border-r border-gray-200 space-y-2">
                                        <p>• Chuyên viên kỹ thuật trực tiếp đến kho/shop từ khâu khảo sát không gian, tư vấn giải pháp setup phù hợp nhất với tình hình thực tế, cho đến khi hoàn thành quá trình setup.</p>
                                        <p>• Hướng dẫn sử dụng dàn thiết bị và phần mềm livestream cho nhân sự phụ trách vận hành sau khi lắp đặt.</p>
                                    </td>
                                    <td className="p-4 md:p-5 space-y-2">
                                        <p>• Chuyên viên kỹ thuật trực tiếp đến không gian được yêu cầu để lắp đặt thiết bị và cài đặt phần mềm.</p>
                                        <p>• Hướng dẫn sử dụng dàn thiết bị và phần mềm livestream cho Idol sau khi lắp đặt.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 5. TƯ VẤN NHẬN BÁO GIÁ (MULTI-STEP FORM CHUẨN 3 ẢNH)      */}
            {/* ========================================================= */}
            <section id="tu-van-bao-gia" className="py-14 bg-white scroll-mt-6 flex justify-center items-center">
                <div className="w-full max-w-[620px] px-4">
                    <h2 className="text-2xl md:text-3xl font-black text-center uppercase tracking-tight text-black mb-10">
                        TƯ VẤN NHẬN BÁO GIÁ
                    </h2>
                    
                    {/* BƯỚC 1: Chọn thiết bị livestream */}
                    {step === 1 && (
                        <div className="rounded-[36px] border-[3px] border-[#e8702a] bg-[#fffcf7] p-8 sm:p-12 shadow-sm transition-all duration-300">
                            <h2 className="text-2xl sm:text-[34px] font-black text-[#e8702a] leading-tight tracking-tight mb-6">
                                Bạn muốn livestream bằng thiết bị gì?
                            </h2>

                            <p className="text-sm sm:text-base font-bold text-[#e8702a] leading-relaxed mb-6">
                                Bạn vui lòng tick chọn ô phù hợp để nhận được báo giá đúng nhất.*
                            </p>

                            <div className="space-y-4 mb-8">
                                {[
                                    "Điện thoại",
                                    "PC",
                                    "Tôi muốn tham khảo cả 2"
                                ].map((item) => {
                                    const isSelected = deviceType === item;
                                    return (
                                        <div
                                            key={item}
                                            onClick={() => setDeviceType(item)}
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
                                onClick={handleNextStep1}
                                className="w-full py-4 bg-[#e8702a] hover:bg-[#d4621e] active:scale-[0.99] text-white font-black text-lg rounded-2xl shadow-md uppercase tracking-wider transition-all duration-200 cursor-pointer"
                            >
                                GỬI NGAY
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-3">
                                Tên hồ sơ Canva của bạn sẽ được chia sẻ
                            </p>
                        </div>
                    )}

                    {/* BƯỚC 2: Nhập số điện thoại */}
                    {step === 2 && (
                        <div className="rounded-[36px] border-[3px] border-[#e8702a] bg-[#fffcf7] p-8 sm:p-12 shadow-sm transition-all duration-300">
                            <h2 className="text-2xl sm:text-[34px] font-black text-[#e8702a] leading-tight tracking-tight mb-6">
                                CMIC STUDIO có thể liên hệ với bạn bằng cách nào?
                            </h2>

                            <p className="text-sm sm:text-base font-bold text-[#e8702a] leading-relaxed mb-6">
                                Tiếp theo, bạn chỉ cần nhập SĐT để nhận báo giá!*
                            </p>

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
                                type="button"
                                onClick={handleNextStep2}
                                className="w-full py-4 bg-[#e8702a] hover:bg-[#d4621e] active:scale-[0.99] text-white font-black text-lg rounded-2xl shadow-md uppercase tracking-wider transition-all duration-200 cursor-pointer"
                            >
                                GỬI NGAY
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-3">
                                Tên hồ sơ Canva của bạn sẽ được chia sẻ. Tuyệt đối không gửi mật khẩu.
                            </p>
                        </div>
                    )}

                    {/* BƯỚC 3: Hiện [HÌNH ẢNH BÁO GIÁ] & Chi phí ngân sách */}
                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="text-center font-extrabold text-black text-lg sm:text-xl uppercase tracking-wider">
                                [HÌNH ẢNH BÁO GIÁ]
                            </div>

                            <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white">
                                <img
                                    src="/pricing/bang-gia-tong-hop.png"
                                    alt="Báo giá chi tiết"
                                    className="w-full h-auto object-contain max-h-[420px]"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80";
                                    }}
                                />
                            </div>

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

                                    <p className="text-xs text-gray-500 text-center mt-3">
                                        Tên hồ sơ Canva của bạn sẽ được chia sẻ. Tuyệt đối không gửi mật khẩu.
                                    </p>
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
                    )}

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
                    {/* Hàng 1: Chạy liên tục sang trái */}
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

                    {/* Hàng 2: Chạy liên tục sang phải */}
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
                                className="h-24 w-full flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={brand.src}
                                    alt={brand.name}
                                    className="max-h-full max-w-full object-contain filter contrast-105"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                        e.currentTarget.parentElement.innerText = brand.name;
                                        e.currentTarget.parentElement.className =
                                            "h-24 w-full flex items-center justify-center text-xs font-bold text-gray-500 uppercase tracking-wider";
                                    }}
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

        </div>
    );
}