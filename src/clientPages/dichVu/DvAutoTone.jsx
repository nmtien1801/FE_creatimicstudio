import React, { useState, useEffect, useRef } from 'react';
import {
    XCircle,
    ChevronDown,
    ArrowRight,
    Check,
    PhoneCall,
    ChevronRight
} from 'lucide-react';

export default function AutoTuneLandingPage() {
    // Accordion State cho FAQ (chọn mở mặc định câu 1)
    const [openFaq, setOpenFaq] = useState(0);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Auto scroll cho carousel hàng dưới mục Feedback
    const carouselRef = useRef(null);
    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
                }
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // 1. Dữ liệu Giải pháp dành cho ai (Ảnh 2)
    const targetAudiences = [
        { title: "Người thích hát karaoke tại nhà", img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500&q=80" },
        { title: "Người không rành công nghệ", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&q=80" },
        { title: "Người mới bắt đầu thu âm", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80" },
        { title: "Người sử dụng laptop để hát karaoke", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80" },
        { title: "Người lớn tuổi muốn có một phần mềm hát đơn giản, dễ thao tác", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80" },
        { title: "Người đã có soundcard và micro nhưng chưa cài AutoTune", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&q=80" }
    ];

    // 2. Dữ liệu Tính năng nổi bật (Ảnh 3)
    const features = [
        {
            title: "Tự động nhận diện tone trong 1 giây",
            desc: [
                "Không cần ngồi dò tone thủ công.",
                "AutoTune AI hỗ trợ tự động nhận diện tone bài hát bằng AI, giúp quá trình thiết lập nhanh chóng và thuận tiện hơn.",
                "Bạn chỉ cần chọn bài hát và sử dụng chức năng dò tone, hệ thống sẽ hỗ trợ xác định tone để bạn bắt đầu hát.",
                "Phù hợp với người không rành công nghệ hoặc không muốn mất thời gian dò tone thủ công."
            ]
        },
        {
            title: "Bật/tắt các chức năng chỉ với một cú click",
            desc: [
                "Không cần phải hiểu hàng loạt thông số kỹ thuật trong Project.",
                "Giao diện được thiết kế theo hướng trực quan, giúp người dùng dễ dàng thao tác với những chức năng thường sử dụng khi hát như:",
                "• Bật/tắt micro",
                "• Bật/tắt nhạc",
                "• Điều chỉnh vang",
                "• Điều khiển các chức năng hát",
                "• Thao tác nhanh trong quá trình sử dụng"
            ]
        },
        {
            title: "Ẩn Project mở rộng màn hình karaoke",
            desc: [
                "Một vấn đề thường gặp khi hát bằng máy tính là giao diện phần mềm chiếm nhiều diện tích màn hình.",
                "Với hệ thống AutoTune AI tại CMIC STUDIO, bạn có thể ẩn giao diện Project khi cần, giúp tập trung nhiều hơn vào màn hình karaoke.",
                "Đặc biệt phù hợp với những người sử dụng laptop màn hình nhỏ và muốn trải nghiệm hát đơn giản, trực quan hơn."
            ]
        },
        {
            title: "Tích hợp sẵn các hiệu ứng PK",
            desc: [
                "AutoTune AI được tích hợp sẵn các hiệu ứng PK ngay trên bảng điều khiển.",
                "Bạn có thể sử dụng những hiệu ứng như:",
                "🎉 Tiếng cười",
                "👏 Vỗ tay",
                "📣 Cổ vũ",
                "...",
                "trực tiếp trong quá trình hát mà không cần mở thêm ứng dụng bên ngoài."
            ]
        }
    ];

    // 3. Feedback hình ảnh thực tế (Ảnh 4)
    const feedbackTop = ["/feedback/fb1.png", "/feedback/fb2.png", "/feedback/fb3.png"];
    const feedbackBottom = [
        "/feedback/setup1.png",
        "/feedback/setup2.png",
        "/feedback/setup3.png",
        "/feedback/setup4.png",
        "/feedback/setup5.png"
    ];

    // 4. Quy trình 5 bước (Ảnh 5)
    const processSteps = [
        {
            step: "Bước 1: Kiểm tra thiết bị",
            desc: "Bạn gửi thông tin laptop/PC, hệ điều hành, soundcard cho CMIC STUDIO."
        },
        {
            step: "Bước 2: Tư vấn gói cài đặt và thanh toán",
            desc: "CMIC STUDIO kiểm tra tình trạng thiết bị hiện có và tư vấn gói cài đặt phù hợp. Sau đó khách hàng tiến hành thanh toán gói phần mềm đã chọn."
        },
        {
            step: "Bước 3: Cài đặt",
            desc: "Thực hiện cài đặt phần mềm và AutoTune AI theo cấu hình thiết bị. Kiểm tra tín hiệu âm thanh, micro, soundcard và các chức năng cần thiết."
        },
        {
            step: "Bước 4: Hướng dẫn sử dụng",
            desc: "Hướng dẫn bạn cách sử dụng hệ thống, dò tone và thao tác các chức năng chính."
        },
        {
            step: "Bước 5: Hoàn tất",
            desc: "Kiểm tra lại toàn bộ hệ thống trước khi bàn giao."
        }
    ];

    // 5. Bảng giá 4 card (Ảnh 6)
    const pricingPackages = [
        {
            os: "CHỈ DÀNH CHO HỆ ĐIỀU HÀNH WINDOW",
            sub: "Cài 1 lần sử dụng trọn đời",
            type: "win",
            features: [
                "Cài đặt bảng dò AutoTune AI",
                "Thiết lập để sử dụng với project hiện có",
                "Hướng dẫn sử dụng",
                "Hỗ trợ kỹ thuật & bảo hành 1 năm trong quá trình sử dụng"
            ],
            price: "600.000 VNĐ"
        },
        {
            os: "CHỈ DÀNH CHO HỆ ĐIỀU HÀNH WINDOW",
            sub: "Cài 1 lần sử dụng trọn đời",
            type: "win",
            features: [
                "Cài đặt phần mềm project",
                "Cài đặt bảng dò AutoTune AI",
                "Thiết lập hệ thống cơ bản",
                "Hướng dẫn sử dụng",
                "Hỗ trợ kỹ thuật & bảo hành 1 năm trong quá trình sử dụng"
            ],
            price: "1.300.000 VNĐ"
        },
        {
            os: "CHỈ DÀNH CHO HỆ ĐIỀU HÀNH MACOS",
            sub: "Cài 1 lần sử dụng trọn đời",
            type: "mac",
            features: [
                "Cài đặt bảng dò AutoTune AI",
                "Thiết lập để sử dụng với project hiện có",
                "Hướng dẫn sử dụng",
                "Hỗ trợ kỹ thuật & bảo hành 1 năm trong quá trình sử dụng"
            ],
            price: "1.200.000 VNĐ"
        },
        {
            os: "CHỈ DÀNH CHO HỆ ĐIỀU HÀNH MACOS",
            sub: "Cài 1 lần sử dụng trọn đời",
            type: "mac",
            features: [
                "Cài đặt phần mềm project",
                "Cài đặt bảng dò AutoTune AI",
                "Thiết lập hệ thống cơ bản",
                "Hướng dẫn sử dụng",
                "Hỗ trợ kỹ thuật & bảo hành 1 năm trong quá trình sử dụng"
            ],
            price: "3.000.000 VNĐ"
        }
    ];

    // 6. Câu hỏi thường gặp (Ảnh 7, 8, 9)
    const faqList = [
        {
            q: "1. Hình thức cài đặt dịch vụ Autotune AI tại CMIC STUDIO như thế nào?",
            a: (
                <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
                    <p className="font-semibold text-black">CMIC STUDIO hỗ trợ khách hàng cài đặt online hoặc trực tiếp.</p>
                    <div>
                        <p className="font-bold text-gray-900 mb-1">A. Với hình thức cài đặt từ xa:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Cài đặt thông qua Ultraview, phù hợp với khách hàng ở tỉnh/thành phố khác.</li>
                            <li>Bạn không nhất thiết phải mang máy đến cửa hàng.</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 mb-1">Bạn chỉ cần chuẩn bị:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Máy tính/laptop có cài đặt Ultraview (đối với Window) hoặc TeamViewer (đối với MacBook) được kết nối với đường truyền Internet ổn định.</li>
                            <li>Soundcard tương thích với phần mềm.</li>
                        </ul>
                        <p className="mt-2 text-gray-600 italic">Đội ngũ kỹ thuật sẽ hướng dẫn trực tiếp qua Zalo Call và thực hiện quá trình cài đặt từ xa.</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 mb-1">B. Cài đặt trực tiếp tại Cửa hàng:</p>
                        <p>Nếu bạn ở gần hoặc muốn được hỗ trợ trực tiếp, có thể mang thiết bị đến CMIC STUDIO để được kiểm tra và cài đặt.</p>
                        <p className="mt-1 font-medium text-black">Địa chỉ cửa hàng: 252/21/18 Phạm Văn Chiêu, Phường Thông Tây Hội, Quận Gò Vấp, TP.HCM.</p>
                        <p className="text-gray-500 text-xs mt-1">Trước khi đến, Quý khách hàng vui lòng gọi trước cho Hotline 037.2672.396 để sắp xếp kỹ thuật viên.</p>
                    </div>
                </div>
            )
        },
        {
            q: "2. Cần những thiết bị gì để cài đặt Autotune?",
            a: (
                <div className="space-y-3 text-gray-700 text-sm md:text-base">
                    <p>Để sử dụng AutoTune AI ổn định, bạn cần có một máy tính/laptop có cấu hình đủ khả năng chạy phần mềm cùng thiết bị soundcard/mixer tương thích.</p>
                    <p className="font-bold text-gray-900">Một số dòng soundcard được CMIC STUDIO hỗ trợ thiết lập gồm:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Icon Upod Pro</li>
                        <li>M-Audio</li>
                        <li>Focusrite</li>
                        <li>...</li>
                    </ul>
                    <p className="text-orange-600 font-medium">Nếu bạn chưa biết thiết bị của mình có tương thích hay không, hãy gửi model laptop + soundcard cho CMIC STUDIO trước khi đặt dịch vụ.</p>
                </div>
            )
        },
        {
            q: "3. Chính sách bảo hành và hỗ trợ kỹ thuật sau khi cài đặt phần mềm Autotune sẽ như thế nào?",
            a: (
                <div className="space-y-2 text-gray-700 text-sm md:text-base">
                    <p>CMIC STUDIO không chỉ cài phần mềm xong rồi để khách hàng tự tìm hiểu.</p>
                    <p>Sau khi cài đặt, bạn được hướng dẫn sử dụng và hỗ trợ kỹ thuật theo chính sách của dịch vụ.</p>
                    <p className="font-semibold text-gray-900">Cam kết bảo hành kỹ thuật 1 năm trên 1 máy, hỗ trợ cài đặt lại 1 lần trong thời gian bảo hành nếu máy gặp lỗi Windows ảnh hưởng đến hệ thống.</p>
                    <p>Trong thời gian bảo hành, CMIC STUDIO hỗ trợ các vấn đề kỹ thuật liên quan đến hệ thống đã cài đặt theo phạm vi dịch vụ theo thời gian từ 10:00 sáng đến 20:00 tối hàng ngày.</p>
                </div>
            )
        },
        {
            q: "4. Phần mềm Autotune tại CMIC STUDIO có phải trả phí hàng tháng không?",
            a: (
                <div className="space-y-2 text-gray-700 text-sm md:text-base">
                    <p className="font-bold text-black">Không. Dịch vụ cài đặt phần mềm AutoTune tại CMIC STUDIO không thu phí duy trì hàng tháng.</p>
                    <p>Bạn chỉ thanh toán chi phí cài đặt một lần theo gói dịch vụ đã lựa chọn là có thể sử dụng trọn đời.</p>
                </div>
            )
        }
    ];

    return (
        <div className="w-full bg-white font-sans text-gray-900">

            {/* ẢNH FULL WIDTH SAU BANNER */}
            <div className="w-full">
                <img
                    src="/banner-autotune-full.png"
                    alt="Banner Dịch Vụ AutoTune AI"
                    className="w-full h-auto object-cover max-h-[500px]"
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&q=80";
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-20">

                {/* ============================================================== */}
                {/* 1. BẠN MUỐN HÁT HAY HƠN NHƯNG... (Ảnh 1)                       */}
                {/* ============================================================== */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-6 space-y-6">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-black leading-tight tracking-tight uppercase">
                            BẠN MUỐN HÁT HAY HƠN<br />NHƯNG...
                        </h2>
                        <div className="space-y-4 pt-2">
                            <div className="flex items-start space-x-3">
                                <XCircle className="w-7 h-7 text-red-600 flex-shrink-0 fill-red-600 text-white" />
                                <span className="text-base md:text-lg font-medium text-gray-800">
                                    Giọng hát bị phô, lệch tone
                                </span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <XCircle className="w-7 h-7 text-red-600 flex-shrink-0 fill-red-600 text-white" />
                                <span className="text-base md:text-lg font-medium text-gray-800">
                                    Không biết sử dụng phần mềm để chỉnh sao cho hay
                                </span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <XCircle className="w-7 h-7 text-red-600 flex-shrink-0 fill-red-600 text-white" />
                                <span className="text-base md:text-lg font-medium text-gray-800">
                                    Không tìm được beat nhạc có cao độ phù hợp
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-6">
                        <div className="w-full aspect-video rounded-3xl border-2 border-black overflow-hidden flex items-center justify-center p-2 bg-black shadow-lg">
                            <iframe
                                className="w-full h-full rounded-2xl"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
                                title="YouTube video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </section>

                {/* ============================================================== */}
                {/* 2. GIẢI PHÁP AUTOTUNE AI TOÀN DIỆN... (Ảnh 2)                  */}
                {/* ============================================================== */}
                <section>
                    <h2 className="text-xl md:text-2xl font-black uppercase text-black mb-6 tracking-wide">
                        GIẢI PHÁP AUTOTUNE AI TOÀN DIỆN TỪ CMIC STUDIO DÀNH CHO AI?
                    </h2>

                    <div className="bg-gradient-to-b from-[#ed792f] via-[#f28e46] to-[#f4741f] rounded-2xl p-6 md:p-10 shadow-lg">
                        <p className="text-center text-black text-sm md:text-base max-w-3xl mx-auto mb-8">
                            Thay vì phải biết nhạc lý, tìm tone bài hát hoặc tự điều chỉnh nhiều thông số trong phần mềm, bạn có thể sử dụng tính năng dò tone tự động để thiết lập nhanh hơn
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {targetAudiences.map((item, idx) => (
                                <div key={idx} className="bg-white overflow-hidden shadow-md flex flex-col group">
                                    <div className="h-48 w-full overflow-hidden bg-gray-100">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4 flex-1 flex items-center justify-center text-center">
                                        <p className="text-xs md:text-sm font-bold text-gray-900 leading-snug">
                                            {item.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============================================================== */}
                {/* 3. MỘT SỐ TÍNH NĂNG NỔI BẬT CỦA AUTOTUNE AI (Ảnh 3)            */}
                {/* ============================================================== */}
                <section>
                    <h2 className="text-xl md:text-2xl font-black uppercase text-black mb-8 tracking-wide">
                        MỘT SỐ TÍNH NĂNG NỔI BẬT CỦA AUTOTUNE AI
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feat, idx) => (
                            <div
                                key={idx}
                                className="relative rounded-t-[100px] rounded-b-3xl bg-[#141212] border border-orange-950/40 p-5 pt-8 text-white flex flex-col items-center shadow-xl overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/30 via-transparent to-transparent pointer-events-none"></div>

                                {/* Header badge màu cam */}
                                <div className="w-full min-h-[72px] bg-gradient-to-r from-[#e8702a] to-[#f48d48] rounded-2xl flex items-center justify-center px-4 py-3 text-center mb-6 shadow-md z-10">
                                    <h3 className="text-xs md:text-sm text-black leading-tight">
                                        {feat.title}
                                    </h3>
                                </div>

                                {/* Nội dung mô tả */}
                                <div className="w-full text-xs text-gray-300 space-y-3 leading-relaxed z-10 flex-1">
                                    {feat.desc.map((d, dIdx) => (
                                        <p key={dIdx} className={d.startsWith('•') ? "pl-2 font-medium text-white" : ""}>
                                            {d}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ============================================================== */}
                {/* 4. FEEDBACK THỰC TẾ (Ảnh 4)                                     */}
                {/* ============================================================== */}
                <section className="space-y-6">
                    {/* Hàng trên: 3 hình feedback đứng im */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {feedbackTop.map((src, i) => (
                            <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 shadow-md">
                                <img
                                    src={src}
                                    alt={`Feedback ${i + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80";
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Hàng dưới: Cho chạy ngang carousel */}
                    <div
                        ref={carouselRef}
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        className="flex gap-4 overflow-x-auto scroll-smooth py-2 [&::-webkit-scrollbar]:hidden"
                    >
                        {feedbackBottom.map((src, i) => (
                            <div key={i} className="w-64 sm:w-80 flex-shrink-0 rounded-xl overflow-hidden shadow-md border border-gray-200 aspect-[4/3] bg-black">
                                <img
                                    src={src}
                                    alt={`Setup thực tế ${i + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80";
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Nút Xem bảng giá cuộn thẳng xuống Section Bảng giá */}
                    <div className="pt-6 text-center">
                        <a
                            href="#bang-gia"
                            className="inline-flex items-center gap-3 px-8 py-3 bg-white hover:bg-orange-50 text-black border-2 border-[#e8702a] font-extrabold rounded-full shadow-md transition-all duration-300 uppercase text-sm tracking-wider"
                        >
                            <span>XEM BẢNG GIÁ</span>
                            <div className="w-7 h-7 bg-[#e8702a] rounded-full flex items-center justify-center text-white">
                                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                            </div>
                        </a>
                    </div>
                </section>

                {/* ============================================================== */}
                {/* 5. QUY TRÌNH CÀI ĐẶT AUTOTUNE AI                               */}
                {/* ============================================================== */}
                <section className="py-6">
                    {/* Tiêu đề */}
                    <h2 className="text-xl md:text-2xl font-black uppercase text-black mb-8 tracking-wide">
                        QUY TRÌNH CÀI ĐẶT AUTOTUNE AI
                    </h2>

                    {/* Danh sách quy trình Timeline */}
                    <div className="relative">
                        {/* Đường kẻ dọc màu đen nối liền tâm các ô vuông (tính từ tâm ô 1 đến tâm ô cuối) */}
                        <div className="absolute left-[7px] top-3 bottom-8 w-[2px] bg-black"></div>

                        <div className="space-y-6">
                            {processSteps.map((step, idx) => (
                                <div key={idx} className="relative flex items-start pl-8 group">
                                    {/* Icon ô vuông viền đen ruột trắng nằm đè lên đường kẻ dọc */}
                                    <div className="absolute left-0 top-[3px] w-4 h-4 bg-white border-[3px] border-black rounded-[2px] z-10"></div>

                                    {/* Nội dung Bước */}
                                    <div>
                                        <h3 className="text-base md:text-lg font-bold text-black leading-snug">
                                            {step.step}
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-800 mt-2 leading-relaxed font-normal">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============================================================== */}
                {/* 6. BẢNG GIÁ CÀI AUTOTUNE AI (DÀI RA, KHÔNG BO GÓC)            */}
                {/* ============================================================== */}
                <section id="bang-gia" className="scroll-mt-6">
                    <h2 className="text-xl md:text-2xl font-black uppercase text-black mb-8 tracking-wide">
                        BẢNG GIÁ CÀI AUTOTUNE AI
                    </h2>

                    {/* Lưới 4 ảnh: góc vuông hoàn toàn (rounded-none), khe hở hẹp chuẩn mẫu */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 items-stretch">
                        {[
                            { id: 1, src: "/pricing/goi-win-600k.png", alt: "Gói Window 600.000 VNĐ" },
                            { id: 2, src: "/pricing/goi-win-1300k.png", alt: "Gói Window 1.300.000 VNĐ" },
                            { id: 3, src: "/pricing/goi-mac-1200k.png", alt: "Gói macOS 1.200.000 VNĐ" },
                            { id: 4, src: "/pricing/goi-mac-3000k.png", alt: "Gói macOS 3.000.000 VNĐ" },
                        ].map((item) => (
                            <div
                                key={item.id}
                                className="w-full h-full rounded-none overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
                            >
                                <a
                                    href="tel:0372672396"
                                    title={`Bấm để liên hệ tư vấn: ${item.alt}`}
                                    className="block cursor-pointer w-full h-full"
                                >
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        className="w-full h-full object-fill rounded-none block min-h-[460px] md:min-h-[540px]"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80";
                                        }}
                                    />
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ============================================================== */}
                {/* 7. NHỮNG CÂU HỎI THƯỜNG GẶP (CHUẨN BỐ CỤC THEO ẢNH MẪU)         */}
                {/* ============================================================== */}
                <section className="space-y-6">
                    <h2 className="text-xl md:text-2xl font-black uppercase text-black mb-8 tracking-wide">
                        NHỮNG CÂU HỎI THƯỜNG GẶP
                    </h2>

                    <div className="space-y-6">
                        {[
                            {
                                q: "1. Hình thức cài đặt dịch vụ Autotune AI tại CMIC STUDIO như thế nào?",
                                a: (
                                    <div className="space-y-4 text-black text-sm md:text-base leading-relaxed pl-7 md:pl-9 font-normal">
                                        <p>
                                            CMIC STUDIO hỗ trợ khách hàng cài đặt online hoặc trực tiếp.
                                        </p>

                                        <div className="space-y-2">
                                            <p>A. Với hình thức cài đặt từ xa:</p>
                                            <ul className="list-disc pl-5 space-y-1 text-gray-800">
                                                <li>Cài đặt thông qua Ultraview, phù hợp với khách hàng ở tỉnh/thành phố khác.</li>
                                                <li>Bạn không nhất thiết phải mang máy đến cửa hàng.</li>
                                            </ul>
                                        </div>

                                        <div className="space-y-2">
                                            <p>Bạn chỉ cần chuẩn bị:</p>
                                            <ul className="list-disc pl-5 space-y-1 text-gray-800">
                                                <li>
                                                    Máy tính/laptop có cài đặt Ultraview (đối với Window) hoặc TeamViewer (đối với MacBook) được kết nối với đường truyền Internet ổn định
                                                </li>
                                                <li>Soundcard tương thích với phần mềm</li>
                                            </ul>
                                        </div>

                                        <p>
                                            Đội ngũ kỹ thuật sẽ hướng dẫn trực tiếp qua Zalo Call và thực hiện quá trình cài đặt từ xa.
                                        </p>

                                        <div className="space-y-2 pt-1">
                                            <p>B. Cài đặt trực tiếp tại Cửa hàng:</p>
                                            <p className="text-gray-800">
                                                Nếu bạn ở gần hoặc muốn được hỗ trợ trực tiếp, có thể mang thiết bị đến CMIC STUDIO để được kiểm tra và cài đặt.
                                            </p>
                                            <p className="font-medium text-black">
                                                Địa chỉ cửa hàng: 252/21/18 Phạm Văn Chiêu, Phường Thông Tây Hội, Quận Gò Vấp, TP.HCM.
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                Trước khi đến, Quý khách hàng vui lòng gọi trước cho Hotline <span className="font-semibold text-black">037.2672.396</span> để sắp xếp kỹ thuật viên.
                                            </p>
                                        </div>
                                    </div>
                                )
                            },
                            {
                                q: "2. Cần những thiết bị gì để cài đặt Autotune?",
                                a: (
                                    <div className="space-y-3 text-black text-sm md:text-base leading-relaxed pl-7 md:pl-9 font-normal">
                                        <p>
                                            Để sử dụng AutoTune AI ổn định, bạn cần có một máy tính/laptop có cấu hình đủ khả năng chạy phần mềm cùng thiết bị soundcard/mixer tương thích.
                                        </p>
                                        <div>
                                            <p>Một số dòng soundcard được CMIC STUDIO hỗ trợ thiết lập gồm:</p>
                                            <ul className="list-disc pl-5 space-y-1 text-gray-800 mt-1">
                                                <li>Icon Upod Pro</li>
                                                <li>M-Audio</li>
                                                <li>Focusrite</li>
                                                <li>...</li>
                                            </ul>
                                        </div>
                                        <p className="text-gray-800">
                                            Nếu bạn chưa biết thiết bị của mình có tương thích hay không, hãy gửi model laptop + soundcard cho CMIC STUDIO trước khi đặt dịch vụ.
                                        </p>
                                    </div>
                                )
                            },
                            {
                                q: "3. Chính sách bảo hành và hỗ trợ kỹ thuật sau khi cài đặt phần mềm Autotune sẽ như thế nào?",
                                a: (
                                    <div className="space-y-3 text-black text-sm md:text-base leading-relaxed pl-7 md:pl-9 font-normal">
                                        <p>
                                            CMIC STUDIO không chỉ cài phần mềm xong rồi để khách hàng tự tìm hiểu.
                                        </p>
                                        <p>
                                            Sau khi cài đặt, bạn được hướng dẫn sử dụng và hỗ trợ kỹ thuật theo chính sách của dịch vụ.
                                        </p>
                                        <p className="font-medium text-black">
                                            Cam kết bảo hành kỹ thuật 1 năm trên 1 máy, hỗ trợ cài đặt lại 1 lần trong thời gian bảo hành nếu máy gặp lỗi Windows ảnh hưởng đến hệ thống.
                                        </p>
                                        <p>
                                            Trong thời gian bảo hành, CMIC STUDIO hỗ trợ các vấn đề kỹ thuật liên quan đến hệ thống đã cài đặt theo phạm vi dịch vụ theo thời gian từ 10:00 sáng đến 20:00 tối hàng ngày.
                                        </p>
                                    </div>
                                )
                            },
                            {
                                q: "4. Phần mềm Autotune tại CMIC STUDIO có phải trả phí hàng tháng không?",
                                a: (
                                    <div className="space-y-3 text-black text-sm md:text-base leading-relaxed pl-7 md:pl-9 font-normal">
                                        <p className="font-bold text-black">
                                            Không. Dịch vụ cài đặt phần mềm AutoTune tại CMIC STUDIO không thu phí duy trì hàng tháng.
                                        </p>
                                        <p>
                                            Bạn chỉ thanh toán chi phí cài đặt một lần theo gói dịch vụ đã lựa chọn là có thể sử dụng trọn đời.
                                        </p>
                                    </div>
                                )
                            }
                        ].map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div key={idx} className="space-y-3">
                                    {/* Tiêu đề câu hỏi dạng accordion click mở/đóng */}
                                    <div
                                        onClick={() => toggleFaq(idx)}
                                        className="flex items-start gap-2.5 cursor-pointer select-none group"
                                    >
                                        <svg
                                            className={`w-5 h-5 md:w-6 md:h-6 text-black fill-black flex-shrink-0 mt-0.5 transition-transform duration-200 ${isOpen ? "rotate-90" : "rotate-0"
                                                }`}
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M5.5 4l7.5 8-7.5 8h3l7.5-8-7.5-8h-3zm6 0l7.5 8-7.5 8h3l7.5-8-7.5-8h-3z" />
                                        </svg>
                                        <h3 className="text-base md:text-lg font-bold text-black group-hover:text-[#ed792f] transition-colors leading-snug">
                                            {faq.q}
                                        </h3>
                                    </div>

                                    {/* Nội dung câu trả lời bung ra */}
                                    {isOpen && (
                                        <div className="animate-fadeIn">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

            </div>
        </div>
    );
}