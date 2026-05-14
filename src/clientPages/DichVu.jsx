import React from 'react';
import { Phone, MapPin, Disc, Music, Sparkles, CheckCircle2, Clock, Zap, Heart } from 'lucide-react';

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

const CMICLandingPage = () => {
    return (
        <div className="bg-orange-50 min-h-screen font-sans text-gray-800 pb-20">
            {/* SECTION 0: HERO BANNER */}
            <section className="relative w-full bg-[#f9f4f0] pt-16 pb-32 overflow-hidden">
                {/* Họa tiết chấm bi */}
                <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20"
                    style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }}>
                </div>

                {/* Dải màu cam chạy ngang phía sau */}
                <div className="absolute bottom-24 right-0 w-[55%] h-20 bg-orange-500 -z-0 rounded-l-full hidden md:block"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 items-center gap-4">

                        {/* CỘT TRÁI: TEXT & CONTACT */}
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

                        {/* CỘT PHẢI: HEXAGON LAYOUT */}
                        <div className="relative h-[450px] mt-12 md:mt-0 hidden md:block">

                            {/* Decor Dấu + phía trên góc phải */}
                            <div className="absolute top-0 left-20 grid grid-cols-5 gap-2 z-0">
                                {[...Array(10)].map((_, i) => <div key={i} className="font-bold text-xl">+</div>)}
                            </div>

                            {/* Lục giác Vừa (Nằm sau, phía trên bên phải) */}
                            <div className="absolute -right-6 -top-38  w-90 h-90 drop-shadow-xl z-10">
                                <div className="w-full h-full bg-orange-500 p-1.5" style={hexagonStyle}>
                                    <div className="w-full h-full bg-white overflow-hidden" style={hexagonStyle}>
                                        <img src="/dichvu1.png"
                                            className="w-full h-full object-cover" alt="setup 1" />
                                    </div>
                                </div>
                            </div>

                            {/* Lục giác Lớn (Nằm trước, chính giữa bên trái) */}
                            <div className="absolute left-6 top-[20%] translate-y-1 w-90 h-90 drop-shadow-2xl z-20">
                                <div className="w-full h-full bg-orange-500 p-1.5" style={hexagonStyle}>
                                    <div className="w-full h-full bg-white overflow-hidden" style={hexagonStyle}>
                                        <img src="/dichvu2.png"
                                            className="w-full h-full object-cover" alt="setup 2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 1: GIỚI THIỆU DỊCH VỤ */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <p className="text-center text-lg mb-12 max-w-4xl mx-auto leading-relaxed">
                    Chất lượng livestream phụ thuộc trực tiếp vào âm thanh, ánh sáng và không gian. Những vấn đề như
                    hình ảnh thiếu sáng, âm thanh không ổn định hoặc không gian không phù hợp thường khiến buổi
                    livestream kém hiệu quả và thiếu chuyên nghiệp. CMIC STUDIO cung cấp dịch vụ setup góc livestream
                    hát trọn gói, giúp người dùng sẵn sàng lên sóng với chất lượng ổn định ngay từ đầu.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white p-6 rounded-3xl border-2 border-orange-400 relative shadow-sm">
                        <div className="bg-orange-500 text-white px-6 py-2 rounded-xl absolute -top-5 left-6 font-bold">
                            Giải pháp âm thanh
                        </div>
                        <p className="mt-6 text-sm leading-relaxed">
                            Hệ thống âm thanh được thiết lập
                            và cân chỉnh phù hợp cho
                            livestream hát, đảm bảo giọng hát
                            rõ ràng, ổn định và hạn chế tối đa
                            các lỗi thường gặp như hú, rè hoặc
                            vỡ tiếng. Thiết bị được lựa chọn
                            dựa trên nhu cầu sử dụng và ngân
                            sách thực tế của khách hàng.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-6 rounded-3xl border-2 border-orange-400 relative shadow-sm">
                        <div className="bg-orange-500 text-white px-6 py-2 rounded-xl absolute -top-5 left-6 font-bold">
                            Hình ảnh và ánh sáng
                        </div>
                        <p className="mt-6 text-sm leading-relaxed">
                            CMIC STUDIO thiết kế bố cục ánh
                            sáng phù hợp với từng không gian
                            và góc quay, giúp hình ảnh lên
                            sóng rõ nét, cân bằng sáng và nổi
                            bật chủ thể. Người dùng có thể
                            livestream ngay mà không cần xử
                            lý hình ảnh phức tạp.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-6 rounded-3xl border-2 border-orange-400 relative shadow-sm">
                        <div className="bg-orange-500 text-white px-6 py-2 rounded-xl absolute -top-5 left-6 font-bold">
                            Không gian livestream
                        </div>
                        <p className="mt-6 text-sm leading-relaxed">
                            Không gian được bố trí riêng tư,
                            gọn gàng và phù hợp cho hoạt
                            động livestream hát. Cách sắp xếp
                            tối ưu giúp tạo cảm giác chuyên
                            nghiệp, đồng thời nâng cao trải
                            nghiệm cho cả người livestream và
                            người xem.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 2: QUY TRÌNH SETUP */}
            <section className="max-w-5xl mx-auto px-4 py-16">
                <h2 className="text-orange-600 text-3xl font-bold text-center mb-12 uppercase tracking-wide">
                    Quy trình setup hát livestream
                </h2>

                <div className="relative flex flex-col md:flex-row justify-between gap-16 md:gap-4 mt-10">
                    {/* Đường kẻ dash - Chỉ hiện trên Desktop */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-gray-300 -z-0"></div>

                    {[
                        { title: "Tiếp nhận nhu cầu & ngân sách", color: "cyan" },
                        { title: "Tư vấn giải pháp phù hợp", color: "slate" },
                        { title: "Setup âm thanh - ánh sáng - góc quay", color: "yellow" },
                        { title: "Hướng dẫn sử dụng & hỗ trợ", color: "orange" }
                    ].map((step, index) => (
                        <div
                            key={index}
                            className={`relative z-10 bg-white border-2 ${stepBorderMap[step.color]} rounded-2xl p-6 w-full md:w-60 shadow-md text-center flex flex-col items-center`}
                        >
                            {/* Hình tròn: Trên mobile sẽ đẩy card xuống, trên desktop sẽ bay lên trên */}
                            <div className={`
                                absolute -top-10 w-20 h-20 rounded-full 
                                flex items-center justify-center text-white font-bold text-xl
                                ${stepColorMap[step.color]}
                            `}>
                            </div>

                            {/* Nội dung text: Cách top một khoảng để không bị hình tròn che */}
                            <p className="mt-8 text-base font-semibold leading-relaxed">
                                {step.title}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 3: TẠI SAO CHỌN CMIC */}
            <section className="max-w-4xl mx-auto px-4 py-8">
                <h2 className="text-orange-600 text-3xl font-bold text-center mb-10 uppercase">Tại sao chọn CMIC Studio?</h2>
                <div className="space-y-6">
                    {[
                        "Phòng live mẫu thực tế tại TP.HCM – test live trước khi triển khai",
                        "Giải pháp live trọn gói: ánh sáng – âm thanh – thiết bị đầy đủ",
                        "Đội ngũ kỹ thuật viên nhiều năm kinh nghiệm, từng setup cho idol live và ca sĩ tại nhiều tỉnh thành"
                    ].map((text, i) => (
                        <div key={i} className="flex items-center bg-white rounded-full shadow-md p-1 border border-orange-200">
                            <div className="bg-white border-2 border-orange-500 text-black font-bold w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-inner">
                                {i + 1}
                            </div>
                            <p className="font-medium pr-6">{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 4: DỰ ÁN TIÊU BIỂU */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-orange-600 text-3xl font-bold text-center mb-10 uppercase">Một số dự án tiêu biểu</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-4 border-yellow-200 p-6 rounded-3xl bg-white">
                    <div className="aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden shadow-lg">
                        <img src="/duan1.jpg" alt="Project 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden shadow-lg">
                        <img src="/duan2.jpg" alt="Project 2" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden shadow-lg">
                        <img src="/duan3.jpg" alt="Project 3" className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            {/* SECTION 5: FORM ĐĂNG KÝ */}
            <section className="max-w-xl mx-auto px-4 py-16 text-center">
                <h2 className="text-orange-600 text-3xl font-bold mb-8 uppercase">Đăng ký tư vấn ngay</h2>
                <form className="space-y-6 text-left">
                    <div>
                        <label className="block font-bold mb-2">*Họ và tên</label>
                        <input type="text" placeholder="Nhập họ và tên" className="w-full p-3 border-2 border-orange-400 rounded-xl focus:outline-none focus:ring-2 ring-orange-200" />
                    </div>
                    <div>
                        <label className="block font-bold mb-2">*Số điện thoại</label>
                        <input type="text" placeholder="Nhập số điện thoại" className="w-full p-3 border-2 border-orange-400 rounded-xl focus:outline-none focus:ring-2 ring-orange-200" />
                    </div>
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition shadow-lg text-xl uppercase">
                        Gửi
                    </button>
                </form>
                <p className="mt-6 text-gray-500 italic text-sm">
                    CMIC STUDIO sẽ liên hệ trong vòng 24h. Thông tin của bạn sẽ được bảo mật.
                </p>
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

            {/* SECTION 9: TRẢI NGHIỆM THỰC TẾ - Dựa trên image_2dedad.png */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-1.5 h-10 bg-[#f18132] rounded-full"></div>
                    <h2 className="text-gray-900 text-2xl md:text-4xl font-black tracking-tight">
                        Trải Nghiệm Thực Tế
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* CỘT TRÁI: VIDEO YOUTUBE */}
                    <div className="relative group">
                        {/* Khung viền đứt đoạn cam (Dashed Border) bao quanh video */}
                        <div className="absolute -inset-3 border-2 border-dashed border-[#f18132] rounded-[32px] opacity-50 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative aspect-video bg-black rounded-[24px] overflow-hidden shadow-2xl border-4 border-gray-900">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/YOUR_VIDEO_ID" // Thay YOUR_VIDEO_ID bằng mã video của bạn
                                title="CMIC Studio Demo Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* CỘT PHẢI: NỘI DUNG */}
                    <div className="space-y-6">
                        <h3 className="text-[#f18132] text-2xl md:text-3xl font-black">
                            Âm Thanh Đỉnh Cao
                        </h3>

                        <div className="space-y-4">
                            <p className="text-gray-700 text-xl font-semibold leading-relaxed">
                                Xem video để cảm nhận sự khác biệt khi sử dụng bộ Plugin
                                chuyên nghiệp từ CMIC STUDIO.
                            </p>

                            <p className="text-gray-500 text-lg leading-relaxed">
                                Hỗ trợ tinh chỉnh theo từng chất giọng riêng biệt, giúp bạn tự tin
                                tỏa sáng khi Livestream hoặc thu âm.
                            </p>
                        </div>
                    </div>

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

            {/* SECTION 12: LINH HOẠT MỌI NƠI - Dựa trên image_2c9fb4.png */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* CỘT TRÁI: NỘI DUNG DỊCH VỤ */}
                    <div className="space-y-10">
                        {/* Header với gạch đứng cam */}
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-12 bg-[#f18132] rounded-full"></div>
                            <h2 className="text-gray-900 text-2xl md:text-3xl font-black tracking-tight leading-tight">
                                Linh Hoạt Mọi Nơi
                            </h2>
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-gray-800 text-1xl md:text-2xl font-black">
                                Cài Đặt Online & Offline
                            </h3>

                            <div className="space-y-6 text-gray-600 text-lg md:text-xl leading-relaxed">
                                <p>
                                    <span className="font-bold text-gray-900">Cài đặt Offline:</span> Kỹ thuật viên hỗ trợ tận nhà tại khu vực TP. Hồ Chí Minh.
                                </p>

                                <p>
                                    <span className="font-bold text-gray-900">Cài đặt Online:</span> Toàn quốc và hải ngoại qua UltraView / TeamViewer cực kỳ nhanh chóng và bảo mật.
                                </p>

                                <p className="font-medium">
                                    Hỗ trợ kiểm tra Soundcard, Micro và tối ưu hệ điều hành máy tính để đạt độ trễ thấp nhất.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI: HÌNH ẢNH MINH HỌA (image_2c9fb4.png) */}
                    <div className="relative rounded-[40px] overflow-hidden shadow-2xl group border-4 border-white">
                        {/* 
                Lưu ý: Thay '/studio-setup.jpg' bằng đường dẫn ảnh thực tế của bạn 
                để hiển thị không gian làm việc giống trong image_2c9fb4.png
            */}
                        <img
                            src="/path-to-your-studio-image.jpg"
                            alt="Studio Setup"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* Lớp phủ gradient nhẹ để ảnh trông sâu hơn */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                </div>
            </section>

            {/* SECTION 13: GIẢI PHÁP CHO NGƯỜI NGẠI CÔNG NGHỆ - Dựa trên image_2c9833.png */}
            <section className="max-w-7xl mx-auto px-6 py-24 relative overflow-hidden">

                {/* Hiệu ứng mờ góc phải trên */}
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-100/20 rounded-full blur-3xl -z-10"></div>

                {/* Header Section */}
                <div className="flex items-center gap-4 mb-20">
                    <div className="w-1.5 h-12 bg-[#f18132] rounded-full"></div>
                    <h2 className="text-gray-900 text-3xl md:text-5xl font-black tracking-tight">
                        Giải Pháp Cho Người Ngại Công Nghệ
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* CỘT TRÁI: HÌNH ẢNH TRÒN (image_2c9833.png) */}
                    <div className="relative flex justify-center">
                        {/* Vòng tròn cam bao quanh */}
                        <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] p-2 border-4 border-[#f18132] rounded-full shadow-2xl overflow-hidden group">
                            <img
                                src="/laptop-setup.jpg"
                                alt="Laptop cài sẵn"
                                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
                            />
                            {/* Text cong hoặc đè nhẹ lên ảnh nếu cần (như trong ảnh mẫu) */}
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-1 rounded-full shadow-sm">
                                <p className="text-xs md:text-sm font-bold text-gray-800 uppercase tracking-widest">Người lớn tuổi hát vui</p>
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI: NỘI DUNG */}
                    <div className="space-y-8">
                        <h3 className="text-[#f18132] text-3xl md:text-4xl font-black leading-tight">
                            Laptop Cài Sẵn – Hát Ngay!
                        </h3>

                        <div className="space-y-6">
                            <p className="text-gray-700 text-xl md:text-2xl font-semibold leading-relaxed">
                                Dành riêng cho cô chú lớn tuổi hoặc người không thích phức tạp.
                                Chúng tôi cung cấp Laptop đã setup hoàn chỉnh mọi thứ.
                            </p>

                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed italic border-l-4 border-gray-200 pl-6">
                                <span className="font-bold text-gray-900 not-italic">Chìa Khóa Trao Tay:</span> Mua về chỉ cần cắm điện, kết nối Micro là có thể hát hay như ca sĩ ngay lập tức. Giao diện đơn giản, một nút bấm.
                            </p>
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

            {/* SECTION 15: TẠI SAO NÊN CHỌN CMIC STUDIO? - Dựa trên image_2bc53b.png */}
            <section className="max-w-7xl mx-auto px-6 py-20 relative">

                {/* Hiệu ứng mờ trang trí góc trên */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -z-10"></div>

                {/* Header Section */}
                <div className="flex items-center gap-4 mb-16">
                    <div className="w-1.5 h-12 bg-[#f18132] rounded-full"></div>
                    <h2 className="text-gray-900 text-2xl md:text-4xl font-black tracking-tight">
                        Tại Sao Nên Chọn CMIC STUDIO?
                    </h2>
                </div>

                {/* List of Reasons */}
                <div className="space-y-8 max-w-5xl">

                    {/* Reason 1: Chuyên Môn Cao */}
                    <div className="flex items-start gap-6 group">
                        <div className="bg-[#f18132] p-2 rounded-full mt-1 shrink-0 shadow-lg shadow-orange-200">
                            <CheckCircle2 className="text-white" size={24} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-800 text-xl md:text-2xl leading-relaxed">
                                <span className="font-black">Chuyên Môn Cao:</span> Kỹ thuật viên am hiểu sâu về âm thanh và nhạc lý.
                            </p>
                        </div>
                    </div>

                    {/* Reason 2: Hỗ Trợ 24/7 */}
                    <div className="flex items-start gap-6 group">
                        <div className="bg-[#f18132] p-2 rounded-full mt-1 shrink-0 shadow-lg shadow-orange-200">
                            <Clock className="text-white" size={24} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-800 text-xl md:text-2xl leading-relaxed">
                                <span className="font-black">Hỗ Trợ 24/7:</span> Bảo hành phần mềm, hỗ trợ kỹ thuật trọn đời sau khi cài đặt.
                            </p>
                        </div>
                    </div>

                    {/* Reason 3: Tối Ưu Tuyệt Đối */}
                    <div className="flex items-start gap-6 group">
                        <div className="bg-[#f18132] p-2 rounded-full mt-1 shrink-0 shadow-lg shadow-orange-200">
                            <Zap className="text-white" size={24} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-800 text-xl md:text-2xl leading-relaxed">
                                <span className="font-black">Tối Ưu Tuyệt Đối:</span> Đảm bảo âm thanh sạch, không trễ tiếng (Latency), ổn định cao.
                            </p>
                        </div>
                    </div>

                    {/* Reason 4: Tận Tâm */}
                    <div className="flex items-start gap-6 group">
                        <div className="bg-[#f18132] p-2 rounded-full mt-1 shrink-0 shadow-lg shadow-orange-200">
                            <Heart className="text-white" size={24} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-800 text-xl md:text-2xl leading-relaxed">
                                <span className="font-black">Tận Tâm:</span> Hướng dẫn sử dụng chi tiết, dễ hiểu cho cả người không rành máy tính.
                            </p>
                        </div>
                    </div>

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