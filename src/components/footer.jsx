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
    Facebook,
    Youtube,
    Instagram,
    // Thêm các icon cho Social/Chat
    MessageCircle, // Dùng cho Zalo
    Rss,           // Dùng cho TikTok
    // Thêm các icon cho Payment (dùng phổ thông)
    CreditCard,
    Landmark,
} from "lucide-react";
import FormContact from "../components/contact/FormContact.jsx";

export default function Footer() {
    const [email, setEmail] = useState('');

    const PLACEHOLDER_LOGO_URL = "https://placehold.co/200x200/4F46E5/ffffff?text=NEXERGY+LOGO";

    // Placeholder URLs cho Payment Methods
    const ZALOPAY_IMG = "../../public/zalopay.png";
    const MOMO_IMG = "../../public/MoMo.png";
    const BANK_TRANSFER_IMG = "../../public/Bank.png";


    // DANH SÁCH SOCIAL ĐÃ CẬP NHẬT
    const socialImages = [
        { name: "Facebook", src: "../../public/facebook.png", href: "https://www.facebook.com/creatimicstudio" },
        { name: "YouTube", src: "../../public/youtube.png", href: "#" },
        { name: "TikTok", src: "../../public/tiktok.png", href: "#" },
        { name: "Zalo", src: "../../public/zalo.webp", href: "#" }
    ];

    const IconCircle = ({ bg, children, size = 'w-10 h-10' }) => (
        <div
            className={`${size} rounded-full flex items-center justify-center shadow-md`}
            style={{ backgroundColor: bg }}
        >
            {children}
        </div>
    );

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            alert(`Đã đăng ký nhận tin với email: ${email}`);
            setEmail('');
        }
    };

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
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-16 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
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
                        description="Hỗ trợ đổi trả miễn phí trong 7 ngày nếu sản phẩm lỗi."
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
                    {/* Cột 1: Logo và Thông tin liên hệ, Social, Payment */}
                    <div className="space-y-6">
                        <div className="flex justify-start items-center space-x-4">
                            <img
                                src={PLACEHOLDER_LOGO_URL}
                                alt="Nexergy Full Logo"
                                className="h-28 w-28 rounded-full object-cover shadow-lg"
                            />
                            <h2 className="text-xl font-extrabold text-indigo-400 mt-2">
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
                            <h3 className="text-lg font-semibold text-indigo-400 mb-3 border-b border-gray-700 pb-1">
                                Phương thức Thanh toán
                            </h3>
                            <div className="flex items-center space-x-4">
                                <img src={ZALOPAY_IMG} alt="ZaloPay" className="h-12 rounded-md shadow-md" />
                                <img src={MOMO_IMG} alt="MoMo" className="h-12 rounded-md shadow-md" />
                                <img src={BANK_TRANSFER_IMG} alt="Chuyển khoản Ngân hàng" className="h-12 rounded-md shadow-md" />
                            </div>
                        </div>
                    </div>

                    {/* Cột 2: Form liên hệ */}
                    <div className="lg:col-span-1 bg-gray-900 p-6 rounded-2xl shadow-lg">
                        <FormContact />
                    </div>

                </div>
            </div>

            <div className="bg-gray-950 text-center py-4 text-sm text-gray-500">
                © 2025 CREATIMICSTUDIO. All rights reserved. Designed with ❤️
            </div>
        </footer>
    );
}