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

    // Placeholder URLs cho Payment Methods
    const ZALOPAY_IMG = "/zalopay.png";
    const MOMO_IMG = "/MoMo.png";
    const BANK_TRANSFER_IMG = "/Bank.png";


    // DANH SÁCH SOCIAL ĐÃ CẬP NHẬT
    const socialImages = [
        { name: "Facebook", src: "/facebook.png", href: "https://www.facebook.com/creatimicstudio" },
        { name: "YouTube", src: "/YouTube.png", href: "#" },
        { name: "TikTok", src: "/tiktok.png", href: "#" },
        { name: "Zalo", src: "/zalo.webp", href: "#" }
    ];

    const ServiceCommitment = ({ icon: Icon, title, description }) => (
        <div className="group text-center p-6 bg-white rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                <Icon className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-2">{title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
    );

    return (
        <footer className="text-white mt-16 font-sans">
            <div className="bg-black grid grid-cols-2 md:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 py-12">
                <ServiceCommitment
                    icon={Truck}
                    title="GIAO HÀNG TOÀN QUỐC"
                    description="Phục vụ giao hàng trên toàn quốc, đảm bảo nhanh chóng và đúng hẹn."
                />
                <ServiceCommitment
                    icon={Tag}
                    title="THANH TOÁN COD"
                    description="An tâm khi nhận hàng - chỉ thanh toán khi đã kiểm tra sản phẩm."
                />
                <ServiceCommitment
                    icon={MessageSquare}
                    title="HỖ TRỢ 24/7"
                    description="Luôn sẵn sàng tư vấn mọi thắc mắc về sản phẩm và dịch vụ."
                />
                <ServiceCommitment
                    icon={RefreshCw}
                    title="ĐỔI TRẢ TRONG 7 NGÀY"
                    description="Hỗ trợ đổi trả miễn phí trong 7 ngày nếu sản phẩm lỗi từ nhà sản xuất"
                />
            </div>

            <div className=" bg-[#ed792f] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 px-4 sm:px-6 lg:px-8 py-12">
                {/* Cột 1: Logo và Thông tin liên hệ, Social, Payment */}
                <div className="space-y-6">
                    <div className="flex justify-start items-center space-x-4">
                        <img
                            src={PLACEHOLDER_LOGO_URL}
                            alt="Nexergy Full Logo"
                            className="h-28 w-28 rounded-full object-cover shadow-lg"
                        />
                        <h2 className="text-xl font-extrabold text-orange-800 mt-2">
                            CREATIMIC STUDIO
                            <p className="text-white">
                                Âm thanh sáng tạo - kết nối cảm xúc
                            </p>
                        </h2>
                    </div>

                    <div className="text-sm space-y-3">
                        <div className="flex items-start">
                            <MapPin className="w-5 h-5 text-indigo-400 flex-shrink-0 mr-3 mt-1" />
                            <p className="leading-relaxed">
                                Chung cư Khang gia, Phương 14, Gò Vấp, Tp. Hồ Chí Minh
                            </p>
                        </div>
                        <div className="flex items-center">
                            <Phone className="w-5 h-5 text-indigo-400 flex-shrink-0 mr-3" />
                            <p>
                                <strong>Hotline:</strong> 037.2672.396
                            </p>
                        </div>
                        <div className="flex items-center">
                            <Globe className="w-5 h-5 text-indigo-400 flex-shrink-0 mr-3" />
                            <p>
                                <strong>Website:</strong> creatimicstudio.vn
                            </p>
                        </div>
                        <div className="flex items-center">
                            <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0 mr-3" />
                            <p>
                                <strong>Email:</strong> contact@creatimichub.vn
                            </p>
                        </div>
                    </div>




                </div>

                {/* Cột 2: Form liên hệ */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                    <h2 className="text-white text-1xl md:text-2xl font-bold tracking-wide uppercase">
                        NHẬP EMAIL NHẬN THÔNG BÁO
                    </h2>
                    <p className="text-white text-lg italic opacity-90">
                        Đăng ký nhận tin mới nhất từ chúng tôi
                    </p>

                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex w-full max-w-md h-14 bg-black rounded-xl overflow-hidden p-[2px] shadow-2xl"
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-grow bg-white px-4 outline-none text-black text-lg rounded-l-lg"
                            placeholder="Email của bạn..."
                            required
                        />
                        <button
                            type="submit"
                            className="bg-black text-white px-8 text-lg font-bold uppercase hover:bg-zinc-800 transition-colors"
                        >
                            GỬI
                        </button>
                    </form>

                    {/* Social Icons Đã Cập Nhật */}
                    <div>
                        <div className="flex space-x-3 pt-2">
                            {socialImages.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    aria-label={item.name}
                                    className="p-2 rounded-full bg-gray-800 hover:bg-indigo-600 transition duration-300 shadow-md"
                                >
                                    <img src={item.src} alt={item.name} className="w-8 h-8 object-contain" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Payment Method Đã Thêm */}
                    <div className="pt-4">
                        <h3 className="text-lg font-semibold text-orange-800 mb-3 border-b border-gray-700 pb-1">
                            Phương thức Thanh toán
                        </h3>
                        <div className="flex items-center space-x-4">
                            <img src={ZALOPAY_IMG} alt="ZaloPay" className="h-12 rounded-md shadow-md" />
                            <img src={MOMO_IMG} alt="MoMo" className="h-12 rounded-md shadow-md" />
                            <img src={BANK_TRANSFER_IMG} alt="Chuyển khoản Ngân hàng" className="h-12 rounded-md shadow-md" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#ed780f] text-center py-4 text-sm text-white">
                © 2025 CREATIMICSTUDIO. All rights reserved. Designed with ❤️
            </div>
        </footer>
    );
}