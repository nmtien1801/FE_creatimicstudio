import React, { useEffect, useRef, useState } from 'react';
import { Phone, MapPin, Disc, Music, Sparkles, CheckCircle2, Clock, Zap, Heart } from 'lucide-react';
import ApiContact from '../../apis/ApiContact';
import { toast } from 'react-toastify';

const hexagonStyle = {
    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)'
};

const stepColorMap = {
    cyan: 'bg-cyan-400',
    slate: 'bg-slate-700',
    yellow: 'bg-yellow-400',
    orange: 'bg-orange-400',
};

const stepBorderMap = {
    cyan: "border-cyan-400",
    slate: "border-slate-400",
    yellow: "border-yellow-400",
    orange: "border-orange-400",
};

// Custom Component để bọc và tạo hiệu ứng khi cuộn chuột tới
const ScrollReveal = ({ children, className = "", animation = "animate-fade-up" }) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-1000 ease-out ${isIntersecting
                ? "opacity-100 translate-y-0 translate-x-0 scale-100"
                : animation === "animate-fade-up" ? "opacity-0 translate-y-12"
                    : animation === "animate-fade-left" ? "opacity-0 translate-x-16"
                        : animation === "animate-fade-right" ? "opacity-0 -translate-x-16"
                            : "opacity-0 scale-95"
                }`}
        >
            {children}
        </div>
    );
};

const CMICLandingPage = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const contactData = {
                name: formData.fullName.trim(),
                email: formData.email.trim(),
                message: `Tôi đang quan tâm dịch vụ setup phòng hát livestream. Hãy liên hệ với tôi qua số điện thoại: ${formData.phone}`
            };
            await ApiContact.sendContactApi(contactData);
            toast.success('Đã gửi yêu cầu tư vấn livestream thành công!');
            setFormData({ fullName: '', email: '', phone: '' });
        } catch (error) {
            console.error('Error sending contact:', error);
            toast.error('Gửi yêu cầu tư vấn livestream thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-orange-50 min-h-screen font-sans text-gray-800 pb-12 sm:pb-20 scroll-smooth selection:bg-orange-500 selection:text-white overflow-x-hidden">

            {/* SECTION 0: HERO BANNER (Đã sửa co giãn text) */}
            <section className="relative w-full bg-gradient-to-b from-[#f9f4f0] to-orange-50/30 pt-10 pb-16 sm:pt-16 sm:pb-32 overflow-hidden">
                <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20 animate-pulse duration-4000"
                    style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }}>
                </div>

                <div className="absolute bottom-24 right-0 w-[55%] h-20 bg-orange-500 -z-0 rounded-l-full hidden md:block animate-[slideRight_1s_ease-out]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid md:grid-cols-2 items-center gap-6 md:gap-4">

                        {/* CỘT TRÁI: TEXT & CONTACT */}
                        <div className="flex flex-col space-y-3 sm:space-y-4 text-left animate-[fadeInUp_0.8s_ease-out]">
                            <div className="relative">
                                <h2 className="text-[#e67e22] text-5xl sm:text-6xl md:text-8xl font-black leading-none mb-1 sm:mb-2 tracking-tighter drop-shadow-sm">
                                    Dịch vụ
                                </h2>
                                <h1 className="text-gray-900 text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
                                    SETUP PHÒNG HÁT <br />
                                    LIVESTREAM
                                </h1>
                                <p className="text-gray-600 italic font-semibold text-sm sm:text-base md:text-lg mt-2 sm:mt-4 border-l-4 border-orange-500 pl-3">
                                    Đảm bảo đúng yêu cầu, chuyên nghiệp
                                </p>
                            </div>

                            <div className="pt-4 sm:pt-6">
                                <a href="tel:0372672396" className="inline-flex items-center bg-white border-[2px] sm:border-[3px] border-black rounded-xl sm:rounded-2xl px-4 py-2 sm:px-5 sm:py-3 gap-3 sm:gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer group w-auto self-start">
                                    <div className="bg-black p-1.5 sm:p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                                        <Phone size={16} className="text-white fill-white animate-bounce" />
                                    </div>
                                    <span className="text-lg sm:text-2xl font-black text-gray-900 tracking-wider">037.267.2396</span>
                                </a>
                            </div>
                        </div>

                        {/* CỘT PHẢI: HEXAGON LAYOUT */}
                        <div className="relative h-[450px] mt-12 md:mt-0 hidden md:block animate-[fadeInRight_1s_ease-out]">
                            <div className="absolute top-0 left-20 grid grid-cols-5 gap-2 z-0 opacity-40">
                                {[...Array(10)].map((_, i) => <div key={i} className="font-bold text-xl hover:text-orange-500 transition-colors duration-200 cursor-default">+</div>)}
                            </div>

                            <div className="absolute -right-6 -top-38 w-90 h-90 drop-shadow-xl z-10 hover:z-30 hover:scale-105 transition-all duration-500 ease-out group">
                                <div className="w-full h-full bg-orange-500 p-1.5 shadow-lg group-hover:bg-black transition-colors duration-500" style={hexagonStyle}>
                                    <div className="w-full h-full bg-white overflow-hidden" style={hexagonStyle}>
                                        <img src="/dichvu1.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="setup 1" />
                                    </div>
                                </div>
                            </div>

                            <div className="absolute left-6 top-[20%] translate-y-1 w-90 h-90 drop-shadow-2xl z-20 hover:scale-105 transition-all duration-500 ease-out group">
                                <div className="w-full h-full bg-orange-500 p-1.5 shadow-2xl group-hover:bg-black transition-colors duration-500" style={hexagonStyle}>
                                    <div className="w-full h-full bg-white overflow-hidden" style={hexagonStyle}>
                                        <img src="/dichvu2.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="setup 2" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* SECTION 1: GIỚI THIỆU DỊCH VỤ (Đã sửa text responsive) */}
            <section className="max-w-6xl mx-auto px-4 py-8 sm:py-16">
                <ScrollReveal animation="animate-scale">
                    <p className="text-center text-xs sm:text-base md:text-lg mb-8 sm:mb-16 max-w-4xl mx-auto leading-relaxed font-medium bg-white/40 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-orange-100 shadow-sm transition-all duration-300 hover:shadow-md">
                        Chất lượng livestream phụ thuộc trực tiếp vào âm thanh, ánh sáng và không gian. Những vấn đề như
                        hình ảnh thiếu sáng, âm thanh không ổn định hoặc không gian không phù hợp thường khiến buổi
                        livestream kém hiệu quả và thiếu chuyên nghiệp. CMIC STUDIO cung cấp dịch vụ setup góc livestream
                        hát trọn gói, giúp người dùng sẵn sàng lên sóng với chất lượng ổn định ngay từ đầu.
                    </p>
                </ScrollReveal>

                {/* Grid chuyển từ 1 cột sang 3 cột tùy màn hình */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4">
                    <ScrollReveal className="h-full" animation="animate-fade-up">
                        <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-orange-400 relative shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full text-left">
                            <div className="bg-orange-500 text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-lg sm:rounded-xl absolute -top-4 sm:-top-5 left-4 sm:left-6 text-xs sm:text-sm font-bold shadow-md group-hover:bg-black transition-colors duration-300">
                                Giải pháp âm thanh
                            </div>
                            <p className="mt-4 sm:mt-6 text-xs sm:text-sm leading-relaxed text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                                Hệ thống âm thanh được thiết lập và cân chỉnh phù hợp cho livestream hát, đảm bảo giọng hát rõ ràng, ổn định và hạn chế tối đa các lỗi thường gặp như hú, rè hoặc vỡ tiếng. Thiết bị được lựa chọn dựa trên nhu cầu sử dụng và ngân sách thực tế của khách hàng.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="h-full" animation="animate-fade-up">
                        <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-orange-400 relative shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full text-left">
                            <div className="bg-orange-500 text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-lg sm:rounded-xl absolute -top-4 sm:-top-5 left-4 sm:left-6 text-xs sm:text-sm font-bold shadow-md group-hover:bg-black transition-colors duration-300">
                                Hình ảnh và ánh sáng
                            </div>
                            <p className="mt-4 sm:mt-6 text-xs sm:text-sm leading-relaxed text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                                CMIC STUDIO thiết kế bố cục ánh sáng phù hợp với từng không gian và góc quay, giúp hình ảnh lên sóng rõ nét, cân bằng sáng và nổi bật chủ thể. Người dùng có thể livestream ngay mà không cần xử lý hình ảnh phức tạp.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="h-full" animation="animate-fade-up">
                        <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-orange-400 relative shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full text-left">
                            <div className="bg-orange-500 text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-lg sm:rounded-xl absolute -top-4 sm:-top-5 left-4 sm:left-6 text-xs sm:text-sm font-bold shadow-md group-hover:bg-black transition-colors duration-300">
                                Không gian livestream
                            </div>
                            <p className="mt-4 sm:mt-6 text-xs sm:text-sm leading-relaxed text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                                Không gian được bố trí riêng tư, gọn gàng và phù hợp cho hoạt động livestream hát. Cách sắp xếp tối ưu giúp tạo cảm giác chuyên nghiệp, đồng thời nâng cao trải nghiệm cho cả người livestream và người xem.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* SECTION 2: QUY TRÌNH SETUP (Tối ưu grid 2 cột trên mobile và co chữ) */}
            <section className="max-w-5xl mx-auto px-4 py-10 sm:py-20 overflow-hidden">
                <ScrollReveal>
                    <h2 className="text-orange-600 text-xl sm:text-3xl font-bold text-center mb-12 sm:mb-20 uppercase tracking-wide drop-shadow-sm">
                        Quy trình setup hát livestream
                    </h2>
                </ScrollReveal>

                {/* Thay đổi từ flex-col sang dạng Grid 2 cột ở mobile để form không bị vỡ dọc */}
                <div className="relative grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-12 md:gap-4 mt-4 sm:mt-10">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-gray-300 -z-0"></div>

                    {[
                        { title: "Tiếp nhận nhu cầu & ngân sách", color: "cyan" },
                        { title: "Tư vấn giải pháp phù hợp", color: "slate" },
                        { title: "Setup âm thanh - ánh sáng - góc quay", color: "yellow" },
                        { title: "Hướng dẫn sử dụng & hỗ trợ", color: "orange" }
                    ].map((step, index) => (
                        <ScrollReveal key={index} className="w-full" animation="animate-scale">
                            <div className={`relative z-10 bg-white border-2 ${stepBorderMap[step.color]} rounded-xl sm:rounded-2xl p-3 sm:p-6 w-full shadow-md text-center flex flex-col items-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group min-h-[110px] sm:min-h-[160px] justify-center`}>
                                <div className={`absolute -top-6 sm:-top-10 w-12 h-12 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white font-black text-sm sm:text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ${stepColorMap[step.color]}`}>
                                    {index + 1}
                                </div>
                                <p className="mt-4 sm:mt-10 text-[11px] sm:text-base font-semibold leading-tight sm:leading-relaxed text-gray-700 group-hover:text-black transition-colors duration-300">
                                    {step.title}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* SECTION 3: TẠI SAO CHỌN CMIC */}
            <section className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
                <ScrollReveal>
                    <h2 className="text-orange-600 text-xl sm:text-3xl font-bold text-center mb-6 sm:mb-12 uppercase tracking-wide">Tại sao chọn CMIC Studio?</h2>
                </ScrollReveal>
                <div className="space-y-3 sm:space-y-6">
                    {[
                        "Phòng live mẫu thực tế tại TP.HCM – test live trước khi triển khai",
                        "Giải pháp live trọn gói: ánh sáng – âm thanh – thiết bị đầy đủ",
                        "Đội ngũ kỹ thuật viên nhiều năm kinh nghiệm, từng setup cho idol live và ca sĩ tại many tỉnh thành"
                    ].map((text, i) => (
                        <ScrollReveal key={i} animation={i % 2 === 0 ? "animate-fade-right" : "animate-fade-left"}>
                            <div className="flex items-center bg-white rounded-full shadow-md p-1 sm:p-1.5 border border-orange-100 hover:border-orange-400 hover:shadow-lg transition-all duration-300 group cursor-default text-left">
                                <div className="bg-white border-2 border-orange-500 text-black font-black w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-2 sm:mr-4 shadow-md group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 flex-shrink-0 text-xs sm:text-base">
                                    {i + 1}
                                </div>
                                <p className="font-semibold text-xs sm:text-base text-gray-700 group-hover:text-black pr-4 sm:pr-6 transition-colors duration-300 leading-tight">{text}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* SECTION 4: DỰ ÁN TIÊU BIỂU */}
            <section className="max-w-6xl mx-auto px-4 py-8 sm:py-16">
                <ScrollReveal>
                    <h2 className="text-orange-600 text-xl sm:text-3xl font-bold text-center mb-6 sm:mb-12 uppercase tracking-wide">Một số dự án tiêu biểu</h2>
                </ScrollReveal>
                {/* Mobile: 2 cột grid để không bị dài dọc quá mức */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8 border-2 sm:border-4 border-yellow-200 p-3 sm:p-8 rounded-2xl sm:rounded-3xl bg-white shadow-inner">
                    {[
                        { src: "/duan1.jpg", alt: "Project 1" },
                        { src: "/duan2.jpg", alt: "Project 2" },
                        { src: "/duan3.jpg", alt: "Project 3" }
                    ].map((img, idx) => (
                        <ScrollReveal key={idx} animation="animate-scale">
                            <div className="aspect-[3/4] bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden shadow-md relative group border border-gray-100">
                                <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2 sm:p-4">
                                    <span className="text-white text-[9px] sm:text-xs font-bold uppercase tracking-widest bg-orange-500/90 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md backdrop-blur-sm shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-300">Xem Chi Tiết</span>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* SECTION 5: FORM ĐĂNG KÝ */}
            <section className="max-w-xl mx-auto px-4 sm:px-6 py-10 sm:py-16 bg-white rounded-2xl sm:rounded-3xl border border-orange-100 shadow-xl relative overflow-hidden">
                <div className="absolute -top-12 -left-12 w-24 h-24 bg-orange-400/10 rounded-full blur-xl"></div>
                <ScrollReveal>
                    <h2 className="text-orange-600 text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 uppercase text-center tracking-wide">Đăng ký tư vấn ngay</h2>
                </ScrollReveal>
                <form className="space-y-4 sm:space-y-6 text-left relative z-10" onSubmit={handleSend}>
                    <ScrollReveal className="group">
                        <label className="block text-xs sm:text-base font-bold mb-1 sm:mb-2 text-gray-700 group-focus-within:text-orange-500 transition-colors">*Họ và tên</label>
                        <input
                            name="fullName"
                            type="text"
                            placeholder="Nhập họ và tên"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full p-2.5 sm:p-3.5 text-xs sm:text-sm border-2 border-orange-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 ring-orange-100 transition-all bg-orange-50/20"
                        />
                    </ScrollReveal>
                    <ScrollReveal className="group">
                        <label className="block text-xs sm:text-base font-bold mb-1 sm:mb-2 text-gray-700 group-focus-within:text-orange-500 transition-colors">*Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Nhập địa chỉ email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2.5 sm:p-3.5 text-xs sm:text-sm border-2 border-orange-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 ring-orange-100 transition-all bg-orange-50/20"
                        />
                    </ScrollReveal>
                    <ScrollReveal className="group">
                        <label className="block text-xs sm:text-base font-bold mb-1 sm:mb-2 text-gray-700 group-focus-within:text-orange-500 transition-colors">*Số điện thoại</label>
                        <input
                            name="phone"
                            type="tel"
                            placeholder="Nhập số điện thoại"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-2.5 sm:p-3.5 text-xs sm:text-sm border-2 border-orange-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 ring-orange-100 transition-all bg-orange-50/20"
                        />
                    </ScrollReveal>
                    <ScrollReveal>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg text-base sm:text-xl uppercase tracking-wider active:scale-[0.99] ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-black hover:shadow-orange-200'}`}
                        >
                            {loading ? 'ĐANG GỬI...' : 'Gửi Yêu Cầu'}
                        </button>
                    </ScrollReveal>
                </form>
                <p className="mt-4 sm:mt-6 text-gray-500 italic text-[11px] sm:text-sm text-center">
                    CMIC STUDIO sẽ liên hệ trong vòng 24h. Thông tin của bạn sẽ được bảo mật.
                </p>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes slideRight { from { width: 0%; } to { width: 55%; } }
            `}} />
        </div>
    );
};

export default CMICLandingPage;