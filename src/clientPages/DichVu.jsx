import React from 'react';
import { Phone, MapPin, Disc, Music, Sparkles, CheckCircle2, Clock, Zap, Heart } from 'lucide-react';

const hexagonStyle = {
    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)'
};

const CMICLandingPage = () => {
    return (
        <div className="bg-orange-50 min-h-screen font-sans text-gray-800 pb-20">
            {/* SECTION 0: HERO BANNER */}
            <section className="relative w-full bg-[#f9f4f0] pt-16 pb-32 overflow-hidden">
                <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20"
                    style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }}>
                </div>
                <div className="absolute bottom-24 right-0 w-[55%] h-20 bg-orange-500 -z-0 rounded-l-full hidden md:block"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 items-center gap-4">
                        <div className="flex flex-col space-y-4">
                            <div className="relative">
                                <h2 className="text-[#e67e22] text-6xl md:text-8xl font-black leading-none mb-2 tracking-tighter">
                                    Dịch vụ
                                </h2>
                                <h1 className="text-gray-900 text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
                                    SETUP PHÒNG HÁT <br />
                                    LIVESTREAM
                                </h1>
                                <p className="text-gray-600 italic font-semibold text-lg mt-4">
                                    Đảm bảo đúng yêu cầu, chuyên nghiệp
                                </p>
                            </div>

                            <div className="pt-6">
                                <div className="inline-flex items-center bg-white border-[3px] border-black rounded-2xl px-5 py-3 gap-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer">
                                    <div className="bg-black p-2 rounded-full">
                                        <Phone size={20} className="text-white fill-white" />
                                    </div>
                                    <span className="text-2xl font-black text-gray-900 tracking-wider">037.267.2396</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[450px] mt-12 md:mt-0 hidden md:block">
                            <div className="absolute top-0 left-20 grid grid-cols-5 gap-2 z-0">
                                {[...Array(10)].map((_, i) => <div key={i} className="font-bold text-xl">+</div>)}
                            </div>
                            <div className="absolute -right-6 -top-38 w-90 h-90 drop-shadow-xl z-10">
                                <div className="w-full h-full bg-orange-500 p-1.5" style={hexagonStyle}>
                                    <div className="w-full h-full bg-white overflow-hidden" style={hexagonStyle}>
                                        <img src="/dichvu1.png" className="w-full h-full object-cover" alt="setup 1" />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute left-6 top-[20%] translate-y-1 w-90 h-90 drop-shadow-2xl z-20">
                                <div className="w-full h-full bg-orange-500 p-1.5" style={hexagonStyle}>
                                    <div className="w-full h-full bg-white overflow-hidden" style={hexagonStyle}>
                                        <img src="/dichvu2.png" className="w-full h-full object-cover" alt="setup 2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 1: GIỚI THIỆU DỊCH VỤ */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <p className="text-center text-lg mb-12 max-w-4xl mx-auto leading-relaxed font-medium text-gray-700">
                    Chất lượng livestream phụ thuộc trực tiếp vào âm thanh, ánh sáng và không gian. CMIC STUDIO cung cấp dịch vụ setup góc livestream hát trọn gói, giúp người dùng sẵn sàng lên sóng với chất lượng ổn định ngay từ đầu.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    {["Giải pháp âm thanh", "Hình ảnh và ánh sáng", "Không gian livestream"].map((title, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border-2 border-orange-200 relative shadow-sm hover:border-[#e67e22] transition-colors">
                            <div className="bg-[#e67e22] text-white px-6 py-2 rounded-xl absolute -top-5 left-6 font-bold shadow-md">
                                {title}
                            </div>
                            <p className="mt-6 text-sm leading-relaxed text-gray-600 font-medium">
                                {i === 0 && "Hệ thống âm thanh được thiết lập và cân chỉnh phù hợp cho livestream hát, đảm bảo giọng hát rõ ràng, ổn định và hạn chế tối đa các lỗi hú rè."}
                                {i === 1 && "Thiết kế bố cục ánh sáng phù hợp với từng không gian và góc quay, giúp hình ảnh rõ nét, cân bằng sáng và nổi bật chủ thể."}
                                {i === 2 && "Không gian được bố trí riêng tư, gọn gàng giúp tạo cảm giác chuyên nghiệp, nâng cao trải nghiệm cho người xem."}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 5: FORM ĐĂNG KÝ */}
            <section className="max-w-xl mx-auto px-4 py-16 text-center">
                <h2 className="text-[#e67e22] text-4xl font-black mb-8 uppercase tracking-tight">Đăng ký tư vấn ngay</h2>
                <form className="space-y-6 text-left">
                    <div className="space-y-2">
                        <label className="block font-bold text-gray-700">* Họ và tên</label>
                        <input type="text" placeholder="Nhập họ và tên" className="w-full p-4 border-2 border-orange-200 rounded-2xl focus:outline-none focus:border-[#e67e22] transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="block font-bold text-gray-700">* Số điện thoại</label>
                        <input type="text" placeholder="Nhập số điện thoại" className="w-full p-4 border-2 border-orange-200 rounded-2xl focus:outline-none focus:border-[#e67e22] transition-colors" />
                    </div>
                    <button className="w-full bg-[#e67e22] hover:bg-orange-600 text-white font-black py-5 rounded-2xl transition shadow-[0px_6px_0px_0px_#c05621] active:shadow-none active:translate-y-1 text-xl uppercase tracking-widest">
                        Gửi Thông Tin
                    </button>
                </form>
            </section>

            {/* SECTION 6: FOOTER SUMMARY */}
            <section className="w-full bg-white py-20 px-4 border-t border-orange-100">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-[#e67e22] text-6xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                        CMIC STUDIO
                    </h2>
                    <div className="space-y-4">
                        <h3 className="text-gray-900 text-2xl md:text-3xl font-black leading-tight uppercase tracking-tight">
                            Giải Pháp Âm Thanh & Phần Mềm Chuyên Nghiệp
                        </h3>
                        <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto italic">
                            Nâng tầm giọng hát của bạn với Cubase & AutoTune. Dịch vụ tận tâm, hỗ trợ mọi lúc mọi nơi.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex items-center gap-3 bg-orange-50 px-8 py-3 rounded-full border border-orange-200">
                            <MapPin className="text-[#e67e22]" size={24} />
                            <span className="text-[#e67e22] text-xl font-bold uppercase tracking-tight">Hồ Chí Minh & Toàn Quốc</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 7: CÁC KHÓ KHĂN */}
            <section className="max-w-6xl mx-auto px-6 py-20 relative">
                <div className="flex items-center gap-4 mb-16">
                    <div className="w-2 h-12 bg-[#e67e22] rounded-full"></div>
                    <h2 className="text-gray-900 text-2xl md:text-3xl font-black tracking-tighter uppercase">
                        Gặp Khó Khăn Khi Cài Đặt?
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {["Rắc Rối Công Nghệ?", "Giọng Hát Thô?"].map((q, i) => (
                        <div key={i} className="bg-white border-2 border-orange-100 p-10 rounded-[40px] hover:border-[#e67e22] transition-all shadow-sm">
                            <h3 className="text-[#e67e22] text-1xl font-black mb-6 uppercase tracking-tight">{q}</h3>
                            <p className="text-gray-600 text-lg font-medium leading-relaxed">
                                {i === 0 ? "Phần mềm Cubase quá phức tạp? Bạn không biết cách kết nối Soundcard và Micro sao cho chuẩn xác?" : "Bạn muốn hát hay như ca sĩ nhưng AutoTune cứ bị méo tiếng, không bắt đúng tông bài hát?"}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <p className="text-gray-800 text-2xl font-black italic tracking-tight">
                        Đừng lo lắng, <span className="text-[#e67e22]">CMIC STUDIO</span> sẽ giải quyết tất cả giúp bạn!
                    </p>
                </div>
            </section>

            {/* SECTION 8: GIẢI PHÁP TOÀN DIỆN */}
            <section className="w-full bg-[#f9f4f0] py-24 px-6 border-y border-orange-100">
                <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
                    <div className="w-20 h-2 bg-[#e67e22] mb-10 rounded-full"></div>
                    <h4 className="text-gray-900 text-3xl md:text-4xl font-black tracking-tighter mb-8 uppercase">
                        Giải Pháp Toàn Diện
                    </h4>
                    <p className="text-gray-600 text-xl md:text-2xl font-medium italic tracking-tight">
                        Mang không gian phòng thu chuyên nghiệp về tận ngôi nhà của bạn
                    </p>
                </div>
            </section>

            {/* SECTION 10: PHẦN MỀM CHUYÊN NGHIỆP */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex items-center gap-4 mb-16">
                    <div className="w-2 h-10 bg-[#e67e22] rounded-full"></div>
                    <h2 className="text-gray-900 text-3xl md:text-4xl font-black tracking-tighter uppercase">Phần Mềm Chuyên Nghiệp</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <Disc size={40} />, title: "Cubase Pro", desc: "Trình quản lý âm thanh mạnh mẽ, ổn định, hỗ trợ thu âm và mix nhạc tốt nhất." },
                        { icon: <Music size={40} />, title: "AutoTune Pro", desc: "Xử lý cao độ thông minh, làm mịn giọng hát, tạo hiệu ứng ảo diệu cho người nghe." },
                        { icon: <Sparkles size={40} />, title: "Bộ VST Plugin", desc: "Lọc tạp âm, nén tiếng, tạo độ vang chuẩn Studio chuyên nghiệp." }
                    ].map((sw, i) => (
                        <div key={i} className="bg-white border-2 border-orange-100 p-10 rounded-[40px] text-center flex flex-col items-center group hover:border-[#e67e22] transition-all shadow-sm">
                            <div className="text-[#e67e22] mb-8 bg-orange-50 p-6 rounded-full group-hover:scale-110 transition-transform">{sw.icon}</div>
                            <h3 className="text-[#e67e22] text-2xl font-black mb-4 uppercase tracking-tighter">{sw.title}</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">{sw.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 11: ĐỘT PHÁ CÔNG NGHỆ */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="bg-white rounded-[60px] border-4 border-orange-100 p-12 md:p-20 grid md:grid-cols-2 gap-16 items-center">
                    <div className="text-center space-y-4">
                        <div className="text-[#e67e22] text-3xl md:text-[160px] font-black leading-none tracking-tighter">100%</div>
                        <p className="text-gray-900 text-2xl md:text-3xl font-black uppercase tracking-tight">Tự Động Dò Tông</p>
                    </div>
                    <div className="space-y-8">
                        <h3 className="text-[#e67e22] text-2xl md:text-3xl font-black leading-none uppercase tracking-tighter">Hát Live Cực Dễ</h3>
                        <p className="text-gray-700 text-xl font-bold leading-tight tracking-tight">Không cần rành nhạc lý! Phần mềm tự động nhận diện tông bài hát một cách chính xác.</p>
                        <div className="p-8 bg-orange-50 border-l-8 border-[#e67e22] rounded-r-3xl">
                            <p className="text-gray-600 text-lg font-medium">Giao diện và hướng dẫn hoàn toàn thân thiện cho người dùng Việt Nam. Chỉ việc chọn bài và hát.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 14: BẢNG GIÁ */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex items-center gap-4 mb-16">
                    <div className="w-2 h-12 bg-[#e67e22] rounded-full"></div>
                    <h2 className="text-gray-900 text-2xl md:text-4xl font-black tracking-tighter uppercase">Bảng Giá Minh Bạch</h2>
                </div>
                <div className="overflow-hidden rounded-[40px] border-[3px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-white">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-black text-white">
                                <th className="py-8 px-10 text-sm font-black uppercase">Gói Dịch Vụ</th>
                                <th className="py-8 px-10 text-sm font-black uppercase text-right">Chi Phí</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-gray-100">
                            {[
                                { n: "Cài Đặt Cubase", p: "800,000 VNĐ" },
                                { n: "Combo Chuyên Nghiệp", p: "1,300,000 VNĐ" },
                                { n: "Laptop Trọn Gói", p: "Liên hệ báo giá" }
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-orange-50 transition-colors">
                                    <td className="py-8 px-10 font-bold text-5sm text-gray-900">{row.n}</td>
                                    <td className="py-8 px-10 text-right font-black text-[#e67e22] text-3sm md:text-5sm">{row.p}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* SECTION 16: QUY TRÌNH */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <h2 className="text-gray-900 text-3xl md:text-4xl font-black tracking-tighter uppercase text-center mb-24">Quy Trình Làm Việc</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative">
                    <div className="hidden md:block absolute top-6 left-0 w-full h-1 bg-orange-100 -z-0"></div>
                    {["Tư Vấn", "Hẹn Lịch", "Cài Đặt", "Bàn Giao"].map((step, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center space-y-6">
                            <div className="w-12 h-12 rounded-full bg-[#e67e22] border-4 border-white shadow-xl flex items-center justify-center text-white font-black text-xl">{i + 1}</div>
                            <div className="text-center">
                                <h3 className="text-[#e67e22] text-xl md:text-2xl font-black uppercase mb-2 tracking-tight">{step}</h3>
                                <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Bước {i + 1}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CMICLandingPage;