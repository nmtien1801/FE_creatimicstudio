import React from 'react';
import { Phone } from 'lucide-react';

const hexagonStyle = {
    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)'
};

const CMICLandingPage = () => {
    return (
        <div className="bg-orange-50 min-h-screen font-sans text-gray-800 pb-20">
            {/* SECTION 0: HERO BANNER */}
            <section className="relative w-full bg-[#f9f4f0] pt-16 pb-32">
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
                        <div className="relative h-[450px] mt-12 md:mt-0">

                            {/* Decor Dấu + phía trên góc phải */}
                            <div className="absolute top-0 left-20 grid grid-cols-5 gap-2 z-0">
                                {[...Array(10)].map((_, i) => <div key={i} className="font-bold text-xl">+</div>)}
                            </div>

                            {/* Lục giác Vừa (Nằm sau, phía trên bên phải) */}
                            <div className="absolute -right-6 -top-38  w-90 h-90 drop-shadow-xl z-10">
                                <div className="w-full h-full bg-orange-500 p-1.5" style={hexagonStyle}>
                                    <div className="w-full h-full bg-white overflow-hidden" style={hexagonStyle}>
                                        <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500"
                                            className="w-full h-full object-cover" alt="setup 1" />
                                    </div>
                                </div>
                            </div>

                            {/* Lục giác Lớn (Nằm trước, chính giữa bên trái) */}
                            <div className="absolute left-6 top-[20%] translate-y-1 w-90 h-90 drop-shadow-2xl z-20">
                                <div className="w-full h-full bg-orange-500 p-1.5" style={hexagonStyle}>
                                    <div className="w-full h-full bg-white overflow-hidden" style={hexagonStyle}>
                                        <img src="https://images.unsplash.com/photo-1478737270239-2fccd2c7862a?w=600"
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

                <div className="relative flex flex-wrap justify-between gap-4">
                    {/* Nối các bước bằng đường kẻ dash */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-gray-300 -z-0"></div>

                    {[
                        { title: "Tiếp nhận nhu cầu & ngân sách", color: "border-cyan-400" },
                        { title: "Tư vấn giải pháp phù hợp", color: "border-slate-700" },
                        { title: "Setup âm thanh - ánh sáng - góc quay", color: "border-yellow-400" },
                        { title: "Hướng dẫn sử dụng & hỗ trợ", color: "border-orange-400" }
                    ].map((step, index) => (
                        <div key={index} className="z-10 bg-white border-2 border-gray-100 rounded-2xl p-4 w-full md:w-56 shadow-md text-center flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full mb-4 ${step.color.replace('border', 'bg')}`}></div>
                            <p className="text-sm font-semibold">{step.title}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 3: TẠI SAO CHỌN CMIC */}
            <section className="max-w-4xl mx-auto px-4 py-12">
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
                        <img src="/api/placeholder/400/600" alt="Project 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden shadow-lg">
                        <img src="/api/placeholder/400/600" alt="Project 2" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden shadow-lg">
                        <img src="/api/placeholder/400/600" alt="Project 3" className="w-full h-full object-cover" />
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
        </div>
    );
};

export default CMICLandingPage;