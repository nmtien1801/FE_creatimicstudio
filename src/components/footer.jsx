import React, { useState } from "react";
import {
    Phone,
    Truck,
    RefreshCw,
    MessageSquare,
    Tag,
    MapPin,
    Mail,
    Globe,
} from "lucide-react";
import ApiContact from "../apis/ApiContact";
import { toast } from 'react-toastify'

const ServiceCommitment = ({ icon: Icon, title, description }) => (
    <div className="group text-center p-3 bg-white rounded-xl hover:shadow-lg transition-all duration-500 hover:-translate-y-1 w-full max-w-[150px] aspect-square flex flex-col justify-center items-center mx-auto border border-gray-50">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-md">
            <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="px-1">
            <h4 className="text-[12px] font-bold text-gray-900 mb-1 leading-tight line-clamp-2 uppercase">
                {title}
            </h4>
            <p className="text-[10px] text-gray-600 leading-tight line-clamp-2">
                {description}
            </p>
        </div>
    </div>
);

export default function Footer() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const LOGO = "/logo1.png";
    const ZALOPAY_IMG = "/zalopay.png";
    const MOMO_IMG = "/MoMo.png";
    const BANK_TRANSFER_IMG = "/Bank.png";

    const socialImages = [
        { name: "Facebook", src: "/facebook.png", href: "https://www.facebook.com/cmicstudio" },
        { name: "YouTube", src: "/YouTube.png", href: "https://www.youtube.com/@CMICSTUDIO" },
        { name: "TikTok", src: "/tiktok.png", href: "https://www.tiktok.com/@cmic.studio" },
        { name: "Zalo", src: "/zalo.webp", href: "#" }
    ];

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const contactData = {
                name: "client",
                email: email,
                message: `Tôi đang quan tâm đến sản phẩm của bạn. Hãy liên hệ với tôi sớm nhất có thể!`,
            };
            let res = await ApiContact.sendContactApi(contactData);
            toast.success('Đã gửi thông tin liên hệ thành công!');
            setEmail('');
        } catch (error) {
            console.error('Error sending contact:', error);
            toast.error('Gửi thông tin liên hệ thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="text-white mt-8 font-sans">
            {/* Phần cam kết dịch vụ - Gap nhỏ để xích lại gần nhau */}
            <div className="bg-black">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 px-4 py-8">
                    <ServiceCommitment
                        icon={Truck}
                        title="GIAO HÀNG TOÀN QUỐC"
                        description="Giao hàng nhanh chóng và đúng hẹn."
                    />
                    <ServiceCommitment
                        icon={Tag}
                        title="THANH TOÁN COD"
                        description="Thanh toán khi nhận sản phẩm."
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
            </div>

            {/* Phần thông tin chính - Đã sửa justify-between */}
            <div className="bg-[#ed792f]">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 px-6 py-12">

                    {/* Cột 1: Thông tin liên hệ */}
                    <div className="w-full lg:w-auto space-y-6">
                        <div className="flex justify-center lg:justify-start items-center space-x-4">
                            <img
                                src={LOGO}
                                alt="Logo"
                                className="h-20 w-20 rounded-full object-cover shadow-lg border-2 border-white/20"
                            />
                            <div>
                                <h2 className="text-xl lg:text-2xl font-black text-orange-950 leading-tight tracking-tight">
                                    CMIC STUDIO
                                </h2>
                                <p className="text-white text-sm lg:text-base font-medium opacity-90">
                                    Giải pháp dịch vụ livestream &
                                </p>
                                <p className="text-white text-sm lg:text-base font-medium opacity-90">
                                    thiết bị phòng thu chính hãng
                                </p>
                            </div>
                        </div>

                        <div className="text-base space-y-4">
                            <div className="flex items-start justify-center lg:justify-start">
                                <MapPin className="w-5 h-5 text-orange-950 flex-shrink-0 mr-3 mt-1" />
                                <p className="max-w-xs">Số 49 , Đường 45, P14, Gò Vấp, TP. HCM</p>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start">
                                <Phone className="w-5 h-5 text-orange-950 flex-shrink-0 mr-3" />
                                <p><span className="font-bold">Hotline:</span> 037.2672.396</p>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start">
                                <Globe className="w-5 h-5 text-orange-950 flex-shrink-0 mr-3" />
                                <p><span className="font-bold">Website:</span> cmicstudio.vn</p>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start">
                                <Mail className="w-5 h-5 text-orange-950 flex-shrink-0 mr-3" />
                                <p>
                                    <strong className="font-bold">Email:</strong> contact@creatimichub.vn
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Cột 2: Đăng ký & Social */}
                    <div className="w-full lg:w-auto flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-lg lg:text-xl font-bold uppercase tracking-wider">ĐĂNG KÝ NHẬN TIN</h2>
                            <p className="text-sm italic opacity-90">Nhận tin mới nhất từ chúng tôi</p>
                        </div>

                        <div className="flex w-full max-w-sm h-11 bg-black rounded-lg overflow-hidden p-[2px] shadow-md">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-grow bg-white px-4 outline-none text-black text-sm rounded-l-md"
                                placeholder="Email của bạn..."
                            />
                            <button
                                disabled={loading}
                                onClick={handleSend}
                                className={`
                                    px-6 text-sm font-bold uppercase transition-colors cursor-pointer
                                    ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-zinc-800"}
                                    text-white
                                `}>
                                {loading ? "ĐANG GỬI..." : "GỬI"}
                            </button>
                        </div>

                        <div className="w-full flex flex-col items-center lg:items-start gap-5 pt-5 border-t border-white/20">
                            <div className="flex space-x-3">
                                {socialImages.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target={item.href !== "#" ? "_blank" : undefined}
                                        rel={item.href !== "#" ? "noopener noreferrer" : undefined}
                                        className="p-2 rounded-full bg-orange-950/20 hover:bg-black transition-all"
                                    >
                                        <img src={item.src} alt={item.name} className="w-7 h-7 object-contain" />
                                    </a>
                                ))}
                            </div>
                            <div className="flex items-center space-x-4 opacity-90 transition-all">
                                <img src={ZALOPAY_IMG} alt="ZaloPay" className="h-6" />
                                <img src={MOMO_IMG} alt="MoMo" className="h-6" />
                                <img src={BANK_TRANSFER_IMG} alt="Bank" className="h-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#ed780f] text-center py-3 text-xs text-white/90">
                © 2025 CMICSTUDIO. All rights reserved.
            </div>
        </footer>
    );
}