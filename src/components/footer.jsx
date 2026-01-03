import React, { useState } from "react";
import {
    Phone,
    Mic,
    Truck,
    RefreshCw,
    MessageSquare,
    Tag,
    MapPin,
    Mail,
    Globe,
} from "lucide-react";

export default function Footer() {
    const [email, setEmail] = useState('');

    const PLACEHOLDER_LOGO_URL = "https://placehold.co/200x200/4F46E5/ffffff?text=NEXERGY+LOGO";
    const ZALOPAY_IMG = "/zalopay.png";
    const MOMO_IMG = "/MoMo.png";
    const BANK_TRANSFER_IMG = "/Bank.png";

    const socialImages = [
        { name: "Facebook", src: "/facebook.png", href: "https://www.facebook.com/creatimicstudio" },
        { name: "YouTube", src: "/YouTube.png", href: "#" },
        { name: "TikTok", src: "/tiktok.png", href: "#" },
        { name: "Zalo", src: "/zalo.webp", href: "#" }
    ];

    const ServiceCommitment = ({ icon: Icon, title, description }) => (
        <div className="group text-center p-3 bg-white rounded-xl hover:shadow-lg transition-all duration-500 hover:-translate-y-1 w-full max-w-[160px] aspect-square flex flex-col justify-center items-center mx-auto border border-gray-50">
            {/* Icon container */}
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-md">
                <Icon className="w-5 h-5 text-white" />
            </div>

            {/* Text content */}
            <div className="px-1">
                <h4 className="text-[13px] font-bold text-gray-900 mb-1 leading-tight line-clamp-1">
                    {title}
                </h4>
                <p className="text-[11px] text-gray-600 leading-tight line-clamp-2">
                    {description}
                </p>
            </div>
        </div>
    );

    return (
        // Giảm mt-16 -> mt-8
        <footer className="text-white mt-8 font-sans">
            <div className="bg-black grid grid-cols-2 md:grid-cols-4 gap-2 px-4 sm:px-6 lg:px-8 py-6">
                <ServiceCommitment
                    icon={Truck}
                    title="GIAO HÀNG TOÀN QUỐC"
                    description="Giao hàng nhanh chóng và đúng hẹn."
                />
                <ServiceCommitment
                    icon={Tag}
                    title="THANH TOÁN COD"
                    description="Thanh toán khi đã kiểm tra sản phẩm."
                />
                <ServiceCommitment
                    icon={MessageSquare}
                    title="HỖ TRỢ 24/7"
                    description="Sẵn sàng tư vấn mọi thắc mắc."
                />
                <ServiceCommitment
                    icon={RefreshCw}
                    title="ĐỔI TRẢ 7 NGÀY"
                    description="Đổi trả miễn phí nếu lỗi nhà SX."
                />
            </div>

            <div className="bg-[#ed792f] text-white flex flex-col lg:flex-row justify-center items-start gap-10 lg:gap-20 px-4 sm:px-6 lg:px-12 py-10">

                {/* Cột 1: Thông tin liên hệ */}
                <div className="w-full lg:w-auto max-w-md space-y-6">
                    <div className="flex justify-start items-center space-x-4">
                        <img
                            src={PLACEHOLDER_LOGO_URL}
                            alt="Logo"
                            className="h-20 w-20 rounded-full object-cover shadow-lg border-2 border-white/20"
                        />
                        <div>
                            <h2 className="text-xl lg:text-2xl font-black text-orange-950 leading-tight tracking-tight">
                                CREATIMIC STUDIO
                            </h2>
                            <p className="text-white text-sm lg:text-base font-medium opacity-90">
                                Âm thanh sáng tạo - kết nối cảm xúc
                            </p>
                        </div>
                    </div>

                    <div className="text-base lg:text-lg space-y-4">
                        <div className="flex items-start">
                            <MapPin className="w-6 h-6 text-orange-950 flex-shrink-0 mr-3 mt-0.5" />
                            <p className="leading-snug">
                                Chung cư Khang gia, Phường 14, Gò Vấp, Tp. Hồ Chí Minh
                            </p>
                        </div>
                        <div className="flex items-center">
                            <Phone className="w-6 h-6 text-orange-950 flex-shrink-0 mr-3" />
                            <p>
                                <strong className="font-bold">Hotline:</strong> 037.2672.396
                            </p>
                        </div>
                        <div className="flex items-center">
                            <Globe className="w-6 h-6 text-orange-950 flex-shrink-0 mr-3" />
                            <p>
                                <strong className="font-bold">Website:</strong> creatimicstudio.vn
                            </p>
                        </div>
                        <div className="flex items-center">
                            <Mail className="w-6 h-6 text-orange-950 flex-shrink-0 mr-3" />
                            <p>
                                <strong className="font-bold">Email:</strong> contact@creatimichub.vn
                            </p>
                        </div>
                    </div>
                </div>

                {/* Cột 2: Form và Social */}
                <div className="w-full lg:w-auto flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
                    <div>
                        <h2 className="text-lg lg:text-xl font-bold uppercase tracking-wider">
                            ĐĂNG KÝ NHẬN TIN
                        </h2>
                        <p className="text-sm italic opacity-90 mt-1">
                            Nhận tin mới nhất từ chúng tôi
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex w-full max-w-sm h-11 bg-black rounded-lg overflow-hidden p-[2px] shadow-md"
                    >
                        <input
                            type="email"
                            className="flex-grow bg-white px-4 outline-none text-black text-sm rounded-l-md"
                            placeholder="Email của bạn..."
                            required
                        />
                        <button className="bg-black text-white px-6 text-sm font-bold uppercase hover:bg-zinc-800 transition-colors">
                            GỬI
                        </button>
                    </form>

                    {/* Social & Payment */}
                    <div className="w-full flex flex-col items-center lg:items-start gap-5 pt-5 border-t border-white/20">
                        <div className="flex space-x-3">
                            {socialImages.map((item) => (
                                <a key={item.name} href={item.href} className="p-2 rounded-full bg-orange-950/20 hover:bg-black transition-all shadow-sm">
                                    <img src={item.src} alt={item.name} className="w-5 h-5 object-contain invert" />
                                </a>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4 opacity-90 grayscale hover:grayscale-0 transition-all">
                            <img src={ZALOPAY_IMG} alt="ZaloPay" className="h-6" />
                            <img src={MOMO_IMG} alt="MoMo" className="h-6" />
                            <img src={BANK_TRANSFER_IMG} alt="Bank" className="h-6" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#ed780f] text-center py-2 text-xs text-white/90">
                © 2025 CREATIMICSTUDIO. All rights reserved. Designed with ❤️
            </div>
        </footer>
    );
}