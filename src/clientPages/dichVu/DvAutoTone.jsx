import React from 'react';
import { MapPin, Disc, Music, Sparkles, CheckCircle2, Clock, Zap, Heart } from 'lucide-react';

const CMICLandingPage = () => {
    return (
        <div className="bg-orange-50 min-h-screen font-sans text-gray-800 pb-20">
            {/* SECTION 6: FOOTER SUMMARY */}
            <section className="w-full bg-white py-16 px-4 border-t border-orange-100">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-[#e67e22] text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">
                        CMIC STUDIO
                    </h2>
                    <div className="space-y-3">
                        <h3 className="text-gray-900 text-xl md:text-2xl font-black leading-tight uppercase tracking-tight">
                            Giải Pháp Âm Thanh & Phần Mềm Chuyên Nghiệp
                        </h3>
                        <p className="text-gray-500 text-base md:text-gray-600 max-w-xl mx-auto italic">
                            Nâng tầm giọng hát của bạn với Cubase & AutoTune. Dịch vụ tận tâm, hỗ trợ mọi lúc mọi nơi.
                        </p>
                    </div>
                    <div className="flex justify-center pt-2">
                        <div className="flex items-center gap-2.5 bg-orange-50 px-6 py-2 rounded-full border border-orange-200">
                            <MapPin className="text-[#e67e22]" size={20} />
                            <span className="text-[#e67e22] text-sm md:text-base font-bold uppercase tracking-tight">Hồ Chí Minh & Toàn Quốc</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 7: CÁC KHÓ KHĂN */}
            <section className="max-w-5xl mx-auto px-6 py-16 relative">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-1.5 h-8 bg-[#e67e22] rounded-full"></div>
                    <h2 className="text-gray-900 text-xl md:text-2xl font-black tracking-tight uppercase">
                        Gặp Khó Khăn Khi Cài Đặt?
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {["Rắc Rối Công Nghệ?", "Giọng Hát Thô?"].map((q, i) => (
                        <div key={i} className="bg-white border-2 border-orange-100 p-8 rounded-[30px] hover:border-[#e67e22] transition-all shadow-sm">
                            <h3 className="text-[#e67e22] text-lg font-black mb-4 uppercase tracking-tight">{q}</h3>
                            <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
                                {i === 0 ? "Phần mềm Cubase quá phức tạp? Bạn không biết cách kết nối Soundcard và Micro sao cho chuẩn xác?" : "Bạn muốn hát hay như ca sĩ nhưng AutoTune cứ bị méo tiếng, không bắt đúng tông bài hát?"}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <p className="text-gray-800 text-lg md:text-xl font-black italic tracking-tight">
                        Đừng lo lắng, <span className="text-[#e67e22]">CMIC STUDIO</span> sẽ giải quyết tất cả giúp bạn!
                    </p>
                </div>
            </section>

            {/* SECTION 8: GIẢI PHÁP TOÀN DIỆN */}
            <section className="w-full bg-[#f9f4f0] py-16 px-6 border-y border-orange-100">
                <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
                    <div className="w-16 h-1.5 bg-[#e67e22] mb-6 rounded-full"></div>
                    <h4 className="text-gray-900 text-2xl md:text-3xl font-black tracking-tight mb-4 uppercase">
                        Giải Pháp Toàn Diện
                    </h4>
                    <p className="text-gray-600 text-base md:text-lg font-medium italic tracking-tight">
                        Mang không gian phòng thu chuyên nghiệp về tận ngôi nhà của bạn
                    </p>
                </div>
            </section>

            {/* SECTION 9: TRẢI NGHIỆM THỰC TẾ */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-1.5 h-8 bg-[#f18132] rounded-full"></div>
                    <h2 className="text-gray-900 text-xl md:text-2xl font-black tracking-tight">
                        Trải Nghiệm Thực Tế
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* CỘT TRÁI: VIDEO YOUTUBE */}
                    <div className="relative group">
                        <div className="absolute -inset-2 border border-dashed border-[#f18132] rounded-[28px] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative aspect-video bg-black rounded-[20px] overflow-hidden shadow-xl border-2 border-gray-900">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                                title="CMIC Studio Demo Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* CỘT PHẢI: NỘI DUNG */}
                    <div className="space-y-4">
                        <h3 className="text-[#f18132] text-xl md:text-2xl font-black">
                            Âm Thanh Đỉnh Cao
                        </h3>
                        <div className="space-y-3">
                            <p className="text-gray-700 text-base md:text-lg font-semibold leading-relaxed">
                                Xem video để cảm nhận sự khác biệt khi sử dụng bộ Plugin chuyên nghiệp từ CMIC STUDIO.
                            </p>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                                Hỗ trợ tinh chỉnh theo từng chất giọng riêng biệt, giúp bạn tự tin tỏa sáng khi Livestream hoặc thu âm.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 10: PHẦN MỀM CHUYÊN NGHIỆP */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-1.5 h-8 bg-[#e67e22] rounded-full"></div>
                    <h2 className="text-gray-900 text-xl md:text-2xl font-black tracking-tight uppercase">Phần Mềm Chuyên Nghiệp</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { icon: <Disc size={32} />, title: "Cubase Pro", desc: "Trình quản lý âm thanh mạnh mẽ, ổn định, hỗ trợ thu âm và mix nhạc tốt nhất." },
                        { icon: <Music size={32} />, title: "AutoTune Pro", desc: "Xử lý cao độ thông minh, làm mịn giọng hát, tạo hiệu ứng ảo diệu cho người nghe." },
                        { icon: <Sparkles size={32} />, title: "Bộ VST Plugin", desc: "Lọc tạp âm, nén tiếng, tạo độ vang chuẩn Studio chuyên nghiệp." }
                    ].map((sw, i) => (
                        <div key={i} className="bg-white border-2 border-orange-100 p-8 rounded-[30px] text-center flex flex-col items-center group hover:border-[#e67e22] transition-all shadow-sm">
                            <div className="text-[#e67e22] mb-6 bg-orange-50 p-4 rounded-full group-hover:scale-105 transition-transform">{sw.icon}</div>
                            <h3 className="text-[#e67e22] text-lg md:text-xl font-black mb-3 uppercase tracking-tight">{sw.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{sw.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 11: ĐỘT PHÁ CÔNG NGHỆ */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <div className="bg-white rounded-[40px] border-2 border-orange-100 p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center">
                    <div className="text-center space-y-2">
                        <div className="text-[#e67e22] text-6xl md:text-7xl font-black leading-none tracking-tight">100%</div>
                        <p className="text-gray-900 text-lg md:text-xl font-black uppercase tracking-tight">Tự Động Dò Tông</p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-[#e67e22] text-xl md:text-2xl font-black uppercase tracking-tight">Hát Live Cực Dễ</h3>
                        <p className="text-gray-700 text-base font-bold leading-snug">Không cần rành nhạc lý! Phần mềm tự động nhận diện tông bài hát một cách chính xác.</p>
                        <div className="p-5 bg-orange-50 border-l-4 border-[#e67e22] rounded-r-2xl">
                            <p className="text-gray-600 text-sm md:text-base font-medium">Giao diện và hướng dẫn hoàn toàn thân thiện cho người dùng Việt Nam. Chỉ việc chọn bài và hát.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 12: LINH HOẠT MỌI NƠI */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* CỘT TRÁI: NỘI DUNG DỊCH VỤ */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-8 bg-[#f18132] rounded-full"></div>
                            <h2 className="text-gray-900 text-xl md:text-2xl font-black tracking-tight uppercase">
                                Linh Hoạt Mọi Nơi
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-gray-800 text-lg md:text-xl font-black">
                                Cài Đặt Online & Offline
                            </h3>
                            <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
                                <p>
                                    <span className="font-bold text-gray-900">Cài đặt Offline:</span> Kỹ thuật viên hỗ trợ tận nhà tại khu vực TP. Hồ Chí Minh.
                                </p>
                                <p>
                                    <span className="font-bold text-gray-900">Cài đặt Online:</span> Toàn quốc và hải ngoại qua UltraView / TeamViewer cực kỳ nhanh chóng và bảo mật.
                                </p>
                                <p className="font-medium text-gray-700">
                                    Hỗ trợ kiểm tra Soundcard, Micro và tối ưu hệ điều hành máy tính để đạt độ trễ thấp nhất.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI: HÌNH ẢNH MINH HỌA */}
                    <div className="relative rounded-[30px] overflow-hidden shadow-xl group border-2 border-white aspect-[4/3]">
                        <img
                            src="/dichvu4.jpg"
                            alt="Studio Setup"
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* SECTION 13: GIẢI PHÁP CHO NGƯỜI NGẠI CÔNG NGHỆ */}
            <section className="max-w-6xl mx-auto px-6 py-16 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-100/20 rounded-full blur-3xl -z-10"></div>
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-1.5 h-8 bg-[#f18132] rounded-full"></div>
                    <h2 className="text-gray-900 text-xl md:text-2xl font-black tracking-tight uppercase">
                        Cho Người Ngại Công Nghệ
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* CỘT TRÁI: HÌNH ẢNH TRÒN */}
                    <div className="relative flex justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 p-1.5 border-2 border-[#f18132] rounded-full shadow-xl overflow-hidden group">
                            <img
                                src="/dichvu3.jpg"
                                alt="Laptop cài sẵn"
                                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 px-3 py-1 rounded-full shadow-sm border border-orange-100 whitespace-nowrap">
                                <p className="text-[10px] md:text-xs font-bold text-gray-800 uppercase tracking-wider">Người lớn tuổi hát vui</p>
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI: NỘI DUNG */}
                    <div className="space-y-4">
                        <h3 className="text-[#f18132] text-xl md:text-2xl font-black">
                            Laptop Cài Sẵn – Hát Ngay!
                        </h3>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-base md:text-lg font-semibold leading-relaxed">
                                Dành riêng cho cô chú lớn tuổi hoặc người không thích phức tạp. Chúng tôi cung cấp Laptop đã setup hoàn chỉnh mọi thứ.
                            </p>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed italic border-l-4 border-gray-200 pl-4">
                                <span className="font-bold text-gray-900 not-italic">Chìa Khóa Trao Tay:</span> Mua về chỉ cần cắm điện, kết nối Micro là có thể hát ngay lập tức với giao diện một nút bấm siêu đơn giản.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 14: BẢNG GIÁ */}
            <section className="max-w-4xl mx-auto px-6 py-16">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-1.5 h-8 bg-[#e67e22] rounded-full"></div>
                    <h2 className="text-gray-900 text-xl md:text-2xl font-black tracking-tight uppercase">Bảng Giá Minh Bạch</h2>
                </div>
                <div className="overflow-hidden rounded-[30px] border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-black text-white">
                                <th className="py-5 px-6 text-xs font-black uppercase tracking-wider">Gói Dịch Vụ</th>
                                <th className="py-5 px-6 text-xs font-black uppercase tracking-wider text-right">Chi Phí</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { n: "Cài Đặt Cubase", p: "800,000 VNĐ" },
                                { n: "Combo Chuyên Nghiệp", p: "1,300,000 VNĐ" },
                                { n: "Laptop Trọn Gói", p: "Liên hệ báo giá" }
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-orange-50 transition-colors">
                                    <td className="py-5 px-6 font-bold text-sm md:text-base text-gray-900">{row.n}</td>
                                    <td className="py-5 px-6 text-right font-black text-[#e67e22] text-sm md:text-base">{row.p}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* SECTION 15: TẠI SAO NÊN CHỌN CMIC STUDIO? */}
            <section className="max-w-4xl mx-auto px-6 py-16 relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-100/30 rounded-full blur-3xl -z-10"></div>
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-1.5 h-8 bg-[#f18132] rounded-full"></div>
                    <h2 className="text-gray-900 text-xl md:text-2xl font-black tracking-tight uppercase">
                        Tại Sao Nên Chọn CMIC STUDIO?
                    </h2>
                </div>

                <div className="space-y-5">
                    {[
                        { icon: <CheckCircle2 className="text-white" size={18} />, label: "Chuyên Môn Cao", text: "Kỹ thuật viên am hiểu sâu về âm thanh và nhạc lý." },
                        { icon: <Clock className="text-white" size={18} />, label: "Hỗ Trợ 24/7", text: "Bảo hành phần mềm, hỗ trợ kỹ thuật trọn đời sau khi cài đặt." },
                        { icon: <Zap className="text-white" size={18} />, label: "Tối Ưu Tuyệt Đối", text: "Đảm bảo âm thanh sạch, không trễ tiếng (Latency), ổn định cao." },
                        { icon: <Heart className="text-white" size={18} />, label: "Tận Tâm", text: "Hướng dẫn sử dụng chi tiết, dễ hiểu cho cả người không rành máy tính." }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className="bg-[#f18132] p-1.5 rounded-full mt-0.5 shrink-0 shadow-md shadow-orange-100">
                                {item.icon}
                            </div>
                            <p className="text-gray-800 text-sm md:text-base leading-relaxed">
                                <span className="font-black">{item.label}:</span> {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 16: QUY TRÌNH */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <h2 className="text-gray-900 text-xl md:text-2xl font-black tracking-tight uppercase text-center mb-16">Quy Trình Làm Việc</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
                    <div className="hidden md:block absolute top-5 left-0 w-full h-0.5 bg-orange-100 -z-0"></div>
                    {["Tư Vấn", "Hẹn Lịch", "Cài Đặt", "Bàn Giao"].map((step, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center space-y-4">
                            <div className="w-10 h-10 rounded-full bg-[#e67e22] border-2 border-white shadow-md flex items-center justify-center text-white font-black text-sm">{i + 1}</div>
                            <div className="text-center">
                                <h3 className="text-[#e67e22] text-base md:text-lg font-black uppercase mb-0.5 tracking-tight">{step}</h3>
                                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Bước {i + 1}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CMICLandingPage;