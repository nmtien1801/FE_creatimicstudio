import React from 'react';
import { Aperture, Mic2, Heart, TrendingUp, Zap, Users, Shield, Lightbulb, Smile } from 'lucide-react';

const CoreValueItem = ({ value, color, Icon, index }) => (
    <div className="flex items-center mb-6 last:mb-0 group cursor-pointer">
        <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-black text-xl transition-all duration-300 shadow-lg 
            ${color === 'yellow' ? 'bg-yellow-500 group-hover:bg-yellow-600' :
                color === 'pink' ? 'bg-pink-500 group-hover:bg-pink-600' :
                    'bg-purple-500 group-hover:bg-purple-600'}`}>
            <Icon className="w-6 h-6" />
        </div>
        <div className="ml-4 p-3 border-b-2 border-dashed transition-all duration-300 flex-1"
            style={{ borderColor: color === 'yellow' ? '#FBBF24' : color === 'pink' ? '#EC4899' : '#A855F7' }}>
            <span className={`text-lg font-semibold transition-colors duration-300 ${color === 'yellow' ? 'text-yellow-700 group-hover:text-yellow-900' :
                color === 'pink' ? 'text-pink-700 group-hover:text-pink-900' :
                    'text-purple-700 group-hover:text-purple-900'}`}>
                {value}
            </span>
        </div>
    </div>
);

const About = () => {
    // Dữ liệu Tầm Nhìn & Sứ Mệnh
    const vision = "CreatiMic Studio hướng tới trở thành đơn vị cung cấp giải pháp âm thanh và livestream đáng tin cậy hàng đầu tại Việt Nam – nơi khách hàng có thể tìm thấy mọi thứ họ cần, từ thiết bị, không gian thu hình đến dịch vụ set up, để sáng tạo nội dung dễ dàng và chuyên nghiệp hơn. Trong chặng đường dài hạn, chúng tôi không chỉ dừng lại ở phân phối, mà sẽ phát triển thương hiệu thiết bị thu âm riêng, mang dấu ấn Việt Nam vươn ra thị trường quốc tế.";
    const mission = "CreatiMic Studio đồng hành cùng cộng đồng người sáng tạo nội dung âm thanh bằng việc mang đến trải nghiệm toàn diện – từ thiết bị thu âm, không gian, đến dịch vụ hỗ trợ. Chúng tôi không chỉ bán thiết bị, mà kiến tạo một hành trình all-in-one, nơi khách hàng được tận hưởng chất lượng âm thanh tốt nhất để tự tin lan tỏa giọng nói và thanh âm của mình.";

    // Dữ liệu Giá Trị Cốt Lõi
    const coreValuesData = [
        { value: "Chất lượng & Uy tín", color: 'yellow', Icon: Shield },
        { value: "Tận tâm & Sáng tạo", color: 'orange', Icon: Lightbulb },
        { value: "Tiện lợi & Dễ tiếp cận", color: 'pink', Icon: Zap },
        { value: "Cập nhật & Phát triển", color: 'purple', Icon: TrendingUp },
        { value: "Trách nhiệm & Tôn trọng khách hàng", color: 'indigo', Icon: Users },
    ];

    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                {/* --- 1. CÂU CHUYỆN THƯƠNG HIỆU --- */}
                <section className="mb-20 sm:mb-28">
                    <h2 className="text-4xl font-black text-gray-800 mb-10 text-center">
                        <span className="text-orange-600">CÂU CHUYỆN</span> THƯƠNG HIỆU
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="h-96 w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-200 flex items-center justify-center text-center text-gray-500">
                            [Ảnh nội thất, thiết bị studio thực tế]
                        </div>
                        <div className="text-lg text-gray-700 leading-relaxed p-4 md:p-0">
                            <p className="mb-4">
                                <span className="font-bold text-orange-600">CreatiMic Studio</span> ra đời từ niềm đam mê không giới hạn đối với âm thanh và sự sáng tạo nội dung. Chúng tôi hiểu rằng, trong thời đại số, giọng nói và thông điệp của bạn cần được truyền tải một cách hoàn hảo nhất.
                            </p>
                            <p className="mb-4">
                                Khởi điểm là một không gian nhỏ, chúng tôi đã không ngừng lớn mạnh, không chỉ cung cấp những chiếc microphone chất lượng cao mà còn là nơi ươm mầm cho hàng ngàn ý tưởng podcast, livestream và sản phẩm âm nhạc. Mỗi sản phẩm, mỗi dịch vụ đều mang sứ mệnh giúp bạn **tìm thấy và lan tỏa thanh âm của riêng mình.**
                            </p>
                            <p className="font-bold italic text-pink-600">
                                Hành trình của chúng tôi là hành trình của âm thanh và sự kết nối.
                            </p>
                        </div>
                    </div>
                </section>

                <hr className="my-12 sm:my-20 border-dashed border-gray-300" />

                {/* --- 2. TẦM NHÌN & SỨ MỆNH — Layout Sole, Không dùng Card cũ --- */}
                <section className="mb-20 sm:mb-28 relative">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl p-10 sm:p-14 min-h-[520px] flex flex-col">
                        {/* Background ảnh mờ */}
                        <div className="absolute inset-0">
                            <img
                                src="/images/studio-bg.jpg"
                                alt="studio"
                                className="w-full h-full object-cover opacity-25 blur-[2px]"
                            />
                        </div>
                        {/* Overlay sáng */}
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-md"></div>

                        {/* Nội dung */}
                        <div className="relative z-10 flex flex-col justify-between h-full">
                            {/* Vision (trái trên) */}
                            <div className="max-w-2xl">
                                <h3 className="text-3xl font-black text-orange-600 mb-4 flex items-center">
                                    <Mic2 className="w-9 h-9 mr-3" />
                                    TẦM NHÌN
                                </h3>
                                <p className="text-gray-800 text-lg leading-relaxed">
                                    {vision}
                                </p>
                            </div>
                            {/* Mission (phải dưới) */}
                            <div className="max-w-2xl self-end text-right mt-12">
                                <h3 className="text-3xl font-black text-pink-600 mb-4 flex items-center justify-end">
                                    SỨ MỆNH
                                    <Heart className="w-9 h-9 ml-3" />
                                </h3>
                                <p className="text-gray-800 text-lg leading-relaxed">
                                    {mission}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="my-12 sm:my-20 border-dashed border-gray-300" />

                {/* --- 3. LĨNH VỰC HOẠT ĐỘNG (Dùng card nổi bật) --- */}
                <section className="mb-20 sm:mb-28">
                    <h2 className="text-4xl font-black text-gray-800 mb-10 text-center">
                        <span className="text-orange-600">LĨNH VỰC</span> HOẠT ĐỘNG
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="text-lg text-gray-700 leading-relaxed p-4 md:p-0">
                            <p className="mb-4">
                                Chúng tôi cung cấp thiết bị thu âm chính hãng và dịch vụ cho thuê micro, phục vụ podcast, voice talent và hát live. Đồng thời cung cấp không gian quay podcast, TVC và hỗ trợ sản xuất nội dung chất lượng cao.
                            </p>
                        </div>
                        <div className="h-96 w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-200 flex items-center justify-center text-center text-gray-500">
                            [Ảnh nội thất, thiết bị studio thực tế]
                        </div>
                    </div>
                </section>

                <hr className="my-12 sm:my-20 border-dashed border-gray-300" />

                {/* --- 4. GIÁ TRỊ CỐT LÕI (Thiết kế độc đáo dùng màu chủ đạo) --- */}
                <section className="mb-20 sm:mb-28">
                    <h2 className="text-4xl font-black text-gray-800 mb-12 text-center">
                        <span className="text-orange-600">GIÁ TRỊ</span> CỐT LÕI
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Cột 1: Tiêu đề và Mô tả */}
                        <div className="p-6">
                            <h3 className="text-5xl font-black text-gray-900 mb-4">
                                FOUNDATION <span className="text-orange-600">5</span>
                            </h3>
                            <p className="text-lg text-gray-600">
                                5 giá trị làm nên CreatiMic Studio, là cam kết của chúng tôi với khách hàng và cộng đồng.
                            </p>
                            <div className="mt-8 text-center">
                                <Aperture className="w-24 h-24 text-orange-400 mx-auto" />
                            </div>
                        </div>

                        {/* Cột 2: Danh sách Giá trị */}
                        <div className="space-y-4">
                            {coreValuesData.map((item, index) => (
                                <CoreValueItem key={index} {...item} index={index} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA - Dùng màu chủ đạo */}
                <div className="text-center mt-20">
                    <button className="px-10 py-4 text-xl font-bold rounded-full shadow-2xl transition-all duration-300 
                        bg-gradient-to-r from-orange-500 to-pink-500 text-white 
                        hover:shadow-3xl hover:scale-[1.03]">
                        Liên Hệ Tư Vấn Ngay
                    </button>
                </div>

            </main>
        </div>
    );
};

export default About;