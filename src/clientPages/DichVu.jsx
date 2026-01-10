import React from 'react';

const CMICLandingPage = () => {
    return (
        <div className="bg-orange-50 min-h-screen font-sans text-gray-800 pb-20">
            {/* SECTION 0: HERO BANNER */}
            <section className="relative bg-gradient-to-br from-orange-600 to-orange-400 py-20 px-4 overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-orange-900/20 rounded-full blur-3xl"></div>

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center relative z-10">
                    <div className="md:w-1/2 text-white text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight mb-4 drop-shadow-md">
                            Nâng Tầm <span className="text-yellow-300">Buổi Livestream</span> Của Bạn
                        </h1>
                        <p className="text-lg md:text-xl opacity-90 mb-8 font-medium">
                            Giải pháp setup âm thanh, ánh sáng và không gian chuyên nghiệp giúp bạn tự tin tỏa sáng trước ống kính.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <button
                                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                                className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-orange-50 transition shadow-xl active:scale-95"
                            >
                                Nhận Tư Vấn Ngay
                            </button>
                            <button className="border-2 border-white/50 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white/10 transition">
                                Xem Dự Án
                            </button>
                        </div>
                    </div>

                    <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
                        <div className="relative">
                            {/* Placeholder cho ảnh sản phẩm/phòng live */}
                            <div className="w-64 h-80 md:w-80 md:h-[450px] bg-white/20 backdrop-blur-md border-4 border-white/30 rounded-[2rem] overflow-hidden shadow-2xl rotate-3">
                                <img
                                    src="/api/placeholder/400/600"
                                    alt="Livestream setup"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Badge trang trí */}
                            <div className="absolute -bottom-5 -left-10 bg-yellow-400 text-orange-900 px-6 py-3 rounded-2xl font-black shadow-lg -rotate-12 uppercase text-sm">
                                #1 Setup Livestream
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 1: GIỚI THIỆU DỊCH VỤ */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <p className="text-center text-lg mb-12 max-w-4xl mx-auto leading-relaxed">
                    Chất lượng livestream phụ thuộc trực tiếp vào âm thanh, ánh sáng và không gian.
                    Những vấn đề như hình ảnh thiếu sáng, âm thanh không ổn định thường khiến buổi livestream kém hiệu quả.
                    <span className="font-bold"> CMIC STUDIO</span> cung cấp dịch vụ setup góc livestream hát trọn gói.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white p-6 rounded-3xl border-2 border-orange-400 relative shadow-sm">
                        <div className="bg-orange-500 text-white px-6 py-2 rounded-xl absolute -top-5 left-6 font-bold">
                            Giải pháp âm thanh
                        </div>
                        <p className="mt-6 text-sm leading-relaxed">
                            Hệ thống âm thanh được thiết lập và cân chỉnh phù hợp cho livestream hát,
                            đảm bảo giọng hát rõ ràng, ổn định và hạn chế tối đa các lỗi hú, rè.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-6 rounded-3xl border-2 border-orange-400 relative shadow-sm">
                        <div className="bg-orange-500 text-white px-6 py-2 rounded-xl absolute -top-5 left-6 font-bold">
                            Hình ảnh và ánh sáng
                        </div>
                        <p className="mt-6 text-sm leading-relaxed">
                            CMIC STUDIO thiết kế bố cục ánh sáng phù hợp với từng không gian,
                            giúp hình ảnh lên sóng rõ nét, cân bằng sáng và nổi bật chủ thể.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-6 rounded-3xl border-2 border-orange-400 relative shadow-sm">
                        <div className="bg-orange-500 text-white px-6 py-2 rounded-xl absolute -top-5 left-6 font-bold">
                            Không gian livestream
                        </div>
                        <p className="mt-6 text-sm leading-relaxed">
                            Không gian được bố trí riêng tư, gọn gàng. Cách sắp xếp tối ưu giúp tạo cảm giác
                            chuyên nghiệp, nâng cao trải nghiệm cho cả người live và người xem.
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
                        "Đội ngũ kỹ thuật viên nhiều năm kinh nghiệm, từng setup cho idol và ca sĩ"
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