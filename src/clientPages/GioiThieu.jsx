import React from 'react';
import { Mic, Radio, Volume2, Users, DollarSign, Zap, ShieldCheck, TrendingDown, CheckCircle, Headphones, HeartHandshake, BookOpen } from 'lucide-react';

export default function CMICStudio() {
    return (
        <div className="min-h-screen bg-white">
            {/* Section 1: Câu chuyện thương hiệu */}
            <section className="max-w-7xl mx-auto px-4 py-16 bg-white">
                <h2 className="text-4xl font-bold text-orange-500 text-center mb-12">
                    CÂU CHUYỆN THƯƠNG HIỆU
                </h2>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative">
                        <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 shadow-lg">
                            <div className="aspect-video bg-white rounded-lg shadow-inner flex items-center justify-center">
                                <Mic className="w-24 h-24 text-gray-300" />
                            </div>
                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p className="text-gray-700 leading-relaxed">
                            Trong suốt thời gian làm nội dung, thu âm giọng nói hay hát live tại
                            nhà, hầu hết khách hàng đều gặp chung một vấn đề: Họ không biết
                            mình cần mua gì. Không phải vì họ thiếu đam mê, không phải vì họ lười
                            tìm hiểu, mà vì thị trường quá nhiều thông tin:
                        </p>

                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 font-bold">•</span>
                                <span>Thông số kỹ thuật phức tạp</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 font-bold">•</span>
                                <span>Nghe từ vấn mỗi nơi một kiểu</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 font-bold">•</span>
                                <span>Sợ mua sai rồi lại tốn tiền</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 font-bold">•</span>
                                <span>Cách setup phức tạp, mãi không ra được chất lượng như mong muốn</span>
                            </li>
                        </ul>

                        <p className="text-gray-700 leading-relaxed">
                            Người mới chỉ cần một thứ: sự rõ ràng và một người có thể đồng hành.
                            Nhưng thị trường lại chưa ai làm điều đó đúng nghĩa.
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                            Và đó là lúc hai con người - hai năng lực - gặp nhau. Một người am
                            hiểu sản phẩm, kỹ thuật nhưng chưa từng nghĩ đến việc xây dựng một
                            thương hiệu bài bản, có hệ thống hay có định hướng dài hạn. Người
                            còn lại, xuất phát điểm là một khách hàng, nhìn thấy được tiềm năng
                            và sẵn sàng bổ sung cho những điều còn thiếu sót:
                        </p>

                        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                            <p className="text-gray-700 italic">
                                "Nếu những kiến thức kỹ thuật kia được hệ thống lại, nếu có một thương hiệu thực sự quan tâm tới việc giúp khách hàng chọn đúng thiết bị ngay từ đầu, thì đấy không còn là việc bán lẻ, mà là một dịch vụ có giá trị thực sự."
                            </p>
                        </div>

                        <p className="text-gray-800 font-semibold">
                            Từ một cái bật tay, thương hiệu CMIC Studio từ đó ra đời.
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                            Tất cả hành trình thương hiệu từ ngày đầu đến hiện tại đều xoay
                            quanh một nguyên tắc:
                        </p>

                        <div className="text-center py-4">
                            <p className="text-xl font-bold text-gray-800 mb-2">
                                BÁN ĐÚNG - TƯ VẤN ĐÚNG - ĐỒNG HÀNH ĐÚNG
                            </p>
                            <p className="text-gray-600">
                                Chúng tôi không chạy theo việc bán nhiều nhất. Chúng tôi theo đuổi việc bán đúng nhất.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: TẦM NHÌN (Nền đen bọc trong nền trắng) */}
            <section className="bg-white px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-orange-500 text-center mb-10 tracking-wider">TẦM NHÌN</h2>

                    <div className="relative bg-black text-white rounded-[2rem] overflow-hidden py-20 px-6 md:px-12 shadow-2xl">
                        {/* Overlay ảnh nền tối */}
                        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2000')] bg-cover bg-center"></div>

                        <div className="relative z-10">
                            <div className="text-center mb-16 max-w-4xl mx-auto space-y-4">
                                <p className="text-lg md:text-xl font-semibold leading-relaxed">
                                    Trở thành hệ sinh thái audio toàn diện dành cho nhà sáng tạo nội dung âm thanh tại Việt Nam -
                                    nơi khách hàng được đồng hành từ thiết bị, kỹ thuật, đến kiến thức tối ưu âm thanh.
                                </p>
                                <p className="text-orange-400 italic text-sm md:text-base">
                                    Trong 3 - 5 năm tới, CMIC Studio hướng đến:
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-12 text-center">
                                <div className="flex flex-col items-center">
                                    <Headphones className="w-16 h-16 text-orange-500 mb-6" />
                                    <h3 className="font-bold text-lg mb-2 text-white">Xây dựng thương hiệu chuẩn mực
                                        tư vấn âm thanh cho người mới,
                                        uy tín nhất tại Việt Nam.</h3>
                                </div>

                                <div className="flex flex-col items-center">
                                    <Radio className="w-16 h-16 text-orange-500 mb-6" />
                                    <h3 className="font-bold text-lg mb-2 text-white">Phát triển hệ thống dịch vụ
                                        setup livestream -
                                        nâng cao chất lượng âm
                                        thanh và hình ảnh -
                                        lựa chọn thiết bị phù hợp và
                                        chuyên nghiệp</h3>
                                </div>

                                <div className="flex flex-col items-center">
                                    <Volume2 className="w-16 h-16 text-orange-500 mb-6" />
                                    <h3 className="font-bold text-lg mb-2 text-white">Tạo ra một hệ sinh thái nội
                                        dung, khóa học và tài
                                        nguyên chất lượng để bất
                                        kỳ ai cũng có thể bắt đầu
                                        hành trình trở thành nhà
                                        sáng tạo nội dung âm
                                        thanh không rào cản</h3>
                                </div>
                            </div>

                            <div className="mt-20 text-center max-w-4xl mx-auto border-t border-white/10 pt-8">
                                <p className="text-lg md:text-xl font-medium">Tầm nhìn của chúng tôi dựa trên một niềm tin đơn giản:</p>
                                <p className="italic text-gray-400 mb-2  ">
                                    Âm thanh chất lượng không nên là đặc quyền của những người chuyên về kỹ thuật, mà là quyền của mọi nhà sáng tạo nội dung.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: SỨ MỆNH (Nền đen bọc trong nền trắng + Card trắng) */}
            <section className="bg-white py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-orange-500 text-center mb-10 tracking-wider">SỨ MỆNH</h2>

                    <div className="relative bg-[#0a0a0a] text-white rounded-[2rem] overflow-hidden py-20 px-6 md:px-12 shadow-2xl">
                        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000')] bg-cover bg-center"></div>

                        <div className="relative z-10">
                            <div className="text-center mb-12 space-y-4 max-w-4xl mx-auto">
                                <p className="text-lg md:text-xl font-semibold">
                                    Giúp các nhà sáng tạo nội dung tạo ra âm thanh chất lượng một cách dễ dàng, đúng nhu cầu và không tốn kém sai lầm.
                                </p>
                                <p className="text-gray-300">
                                    CMIC Studio tồn tại với mục tiêu duy nhất: giải quyết nỗi lo <span className="text-white font-bold">"mua sai thiết bị"</span> và mang đến trải nghiệm âm thanh trọn vẹn cho khách hàng.
                                </p>
                                <p className="italic text-gray-400">Chúng tôi thực hiện điều đó bằng cách:</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Card 1 */}
                                <div className="bg-white text-black p-8 rounded-[1.5rem] relative min-h-[140px] flex items-center shadow-lg">
                                    <p className="font-bold text-lg pr-12 leading-tight">
                                        Tư vấn cá nhân hoá 1:1 dựa trên mục tiêu và nhu cầu của khách
                                    </p>
                                    <Users className="absolute bottom-4 right-6 w-10 h-10 text-orange-500" />
                                </div>

                                {/* Card 2 */}
                                <div className="bg-white text-black p-8 rounded-[1.5rem] relative min-h-[140px] flex items-center shadow-lg">
                                    <p className="font-bold text-lg pr-12 leading-tight">
                                        Đảm bảo bán đúng - không upsell - không lãng phí
                                    </p>
                                    <CheckCircle className="absolute bottom-4 right-6 w-10 h-10 text-orange-500" />
                                </div>

                                {/* Card 3 */}
                                <div className="bg-white text-black p-8 rounded-[1.5rem] relative min-h-[140px] flex items-center shadow-lg">
                                    <p className="font-bold text-lg pr-12 leading-tight">
                                        Đồng hành & hỗ trợ sau bán
                                    </p>
                                    <HeartHandshake className="absolute bottom-4 right-6 w-10 h-10 text-orange-500" />
                                </div>

                                {/* Card 4 */}
                                <div className="bg-white text-black p-8 rounded-[1.5rem] relative min-h-[140px] flex items-center shadow-lg">
                                    <p className="font-bold text-lg pr-12 leading-tight">
                                        Hệ thống hoá kiến thức âm thanh để giúp khách hàng hiểu - làm - kiểm soát chất lượng theo cách đơn giản nhất.
                                    </p>
                                    <BookOpen className="absolute bottom-4 right-6 w-10 h-10 text-orange-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Lĩnh vực hoạt động */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-orange-500 mb-6">
                                LĨNH VỰC HOẠT ĐỘNG
                            </h2>
                            <h1 className=" font-medium mb-6 text-gray-700 leading-relaxed">
                                Chúng tôi cung cấp thiết bị thu âm chính hãng, đồng thời hỗ trợ các dịch vụ đi kèm như set up live stream, cài cubase, cho thuê linh động các thiết bị tùy theo nhu cầu của khách hàng.
                            </h1>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h3 className="text-2xl font-bold text-center mb-6 text-orange-600">
                                TRỌN BỘ THIẾT BỊ
                                <br />
                                <span className="text-lg font-medium">TẠI CMIC STUDIO</span>
                            </h3>
                            <div className="aspect-square bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg flex items-center justify-center">
                                <Mic className="w-32 h-32 text-orange-400" />
                            </div>
                        </div>
                    </div>


                </div>
            </section>

            {/* Giá trị cốt lõi */}
            <section className="bg-white py-4 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-orange-500 inline-block relative pb-4">
                            GIÁ TRỊ CỐT LÕI
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-black"></span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-y-12 gap-x-8">
                        {/* 1. Nhiệt tình - Tận tâm */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="mb-6 p-5 bg-orange-50 rounded-full group-hover:bg-orange-500 transition-colors duration-300">
                                <Zap className="w-10 h-10 text-orange-500 group-hover:text-white" />
                            </div>
                            <h3 className="font-extrabold text-lg mb-3 uppercase tracking-tight">
                                NHIỆT TÌNH - TẬN TÂM - CHUYÊN NGHIỆP
                            </h3>
                            <p className="text-gray-600 leading-relaxed max-w-[280px]">
                                Mỗi khách hàng đều được hỗ trợ nghiêm túc
                            </p>
                        </div>

                        {/* 2. Minh bạch giá */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="mb-6 p-5 bg-orange-50 rounded-full group-hover:bg-orange-500 transition-colors duration-300">
                                <ShieldCheck className="w-10 h-10 text-orange-500 group-hover:text-white" />
                            </div>
                            <h3 className="font-extrabold text-lg mb-3 uppercase tracking-tight">
                                MINH BẠCH GIÁ
                            </h3>
                            <p className="text-gray-600 leading-relaxed max-w-[280px]">
                                Không đội giá, không "seller nói sao thì mua vậy".
                            </p>
                        </div>

                        {/* 3. Không Upsell */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="mb-6 p-5 bg-orange-50 rounded-full group-hover:bg-orange-500 transition-colors duration-300">
                                <CheckCircle className="w-10 h-10 text-orange-500 group-hover:text-white" />
                            </div>
                            <h3 className="font-extrabold text-lg mb-3 uppercase tracking-tight">
                                KHÔNG UPSELL
                            </h3>
                            <p className="text-gray-600 leading-relaxed max-w-[280px]">
                                Nếu thiết bị rẻ hơn mà dùng vẫn tốt - chúng tôi chọn phương án đó
                            </p>
                        </div>

                        {/* Phân cách giữa 2 hàng (Tùy chọn: Có thể dùng border-t hoặc khoảng cách grid) */}
                        <div className="hidden md:block col-span-3 h-px bg-gray-100 my-4"></div>

                        {/* 4. Tư vấn đúng nhu cầu */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="mb-6 p-5 bg-orange-50 rounded-full group-hover:bg-orange-500 transition-colors duration-300">
                                <Headphones className="w-10 h-10 text-orange-500 group-hover:text-white" />
                            </div>
                            <h3 className="font-extrabold text-lg mb-3 uppercase tracking-tight">
                                TƯ VẤN ĐÚNG NHU CẦU
                            </h3>
                            <p className="text-gray-600 leading-relaxed max-w-[280px]">
                                Không phải ai cũng cần soundcard 3-4 triệu; đôi khi chỉ cần micro 900k.
                            </p>
                        </div>

                        {/* 5. Đồng hành sau bán */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="mb-6 p-5 bg-orange-50 rounded-full group-hover:bg-orange-500 transition-colors duration-300">
                                <HeartHandshake className="w-10 h-10 text-orange-500 group-hover:text-white" />
                            </div>
                            <h3 className="font-extrabold text-lg mb-3 uppercase tracking-tight">
                                ĐỒNG HÀNH SAU BÁN
                            </h3>
                            <p className="text-gray-600 leading-relaxed max-w-[280px]">
                                Setup 1:1, hỗ trợ chỉnh và khắc phục vấn đề về âm thanh
                            </p>
                        </div>

                        {/* 6. Tối ưu chi phí */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="mb-6 p-5 bg-orange-50 rounded-full group-hover:bg-orange-500 transition-colors duration-300">
                                <TrendingDown className="w-10 h-10 text-orange-500 group-hover:text-white" />
                            </div>
                            <h3 className="font-extrabold text-lg mb-3 uppercase tracking-tight">
                                TỐI ƯU CHI PHÍ
                            </h3>
                            <p className="text-gray-600 leading-relaxed max-w-[280px]">
                                Giúp khách tránh mua sai, tránh lãng phí
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: Nhà sáng lập */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <h2 className="text-4xl font-bold text-orange-500 text-center mb-16">
                    NHÀ SÁNG LẬP CMIC STUDIO
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-white border border-gray-100 rounded-[2rem] p-10 shadow-xl text-center">
                        <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-orange-50 bg-gray-100">
                            <img
                                src="/thao.jpg"
                                alt="NGUYỄN THANH THẢO"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">NGUYỄN THANH THẢO</h3>
                        <p className="text-orange-600 font-bold text-lg tracking-widest">FOUNDER</p>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-[2rem] p-10 shadow-xl text-center">
                        <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-gray-50 bg-gray-100">
                            <img
                                src="/quynh.jpg"
                                alt="LÊ XUÂN QUỲNH"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">LÊ XUÂN QUỲNH</h3>
                        <p className="text-gray-500 font-bold text-lg tracking-widest">CO-FOUNDER</p>
                    </div>
                </div>
            </section>
        </div>
    );
}