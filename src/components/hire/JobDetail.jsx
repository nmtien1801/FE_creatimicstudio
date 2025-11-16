import React from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Calendar, ArrowRight, UserCheck, Zap } from 'lucide-react';

// Dữ liệu mẫu cho trang Chi tiết
const jobData = {
    title: "Chuyên Viên Phát Triển Front-end (React/NextJS)",
    company: "FutureTech Innovations",
    location: "Quận 1, TP. Hồ Chí Minh",
    salary: "15 - 30 Triệu VNĐ",
    type: "Toàn thời gian",
    experience: "2+ năm",
    postedDate: "15/11/2025",
    description: [
        { 
            title: "Mô tả công việc",
            content: "Tham gia vào quy trình phát triển sản phẩm từ A đến Z, bao gồm phân tích yêu cầu, thiết kế giao diện, và triển khai code. Xây dựng và duy trì các thành phần giao diện người dùng bằng React và NextJS. Đảm bảo hiệu suất và khả năng mở rộng của ứng dụng web. Làm việc chặt chẽ với đội ngũ Back-end và UX/UI Designer." 
        },
        { 
            title: "Yêu cầu kỹ năng",
            content: "Thành thạo JavaScript/TypeScript, ReactJS và NextJS. Có kinh nghiệm làm việc với các công cụ quản lý trạng thái (Redux/Zustand). Hiểu biết sâu về HTML5, CSS3 và Tailwind CSS. Có kinh nghiệm sử dụng Git, Docker là một lợi thế."
        },
        { 
            title: "Quyền lợi",
            content: "Mức lương cạnh tranh, xét tăng lương 2 lần/năm. Thưởng dự án, thưởng cuối năm hấp dẫn. Bảo hiểm đầy đủ, khám sức khỏe định kỳ. Môi trường làm việc trẻ trung, năng động, cơ hội thăng tiến rõ ràng." 
        }
    ],
    ctaLink: "/apply/frontend-specialist"
};

// Component chính
const JobDetail = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Header Section */}
                <header className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                        {jobData.title}
                    </h1>
                    <p className="text-xl text-orange-600 font-semibold mb-4">
                        {jobData.company}
                    </p>
                    
                    {/* Key Info Bar */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-t pt-4 mt-4">
                        <span className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-indigo-500" />
                            {jobData.location}
                        </span>
                        <span className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-green-500" />
                            {jobData.salary}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-500" />
                            {jobData.type}
                        </span>
                        <span className="flex items-center gap-2">
                            <UserCheck className="w-5 h-5 text-red-500" />
                            {jobData.experience}
                        </span>
                    </div>
                </header>

                {/* Main Content & Sidebar Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Content Section (2/3 cột) */}
                    <div className="lg:col-span-2 space-y-10">
                        {jobData.description.map((section, index) => (
                            <section key={index} className="bg-white p-6 rounded-xl shadow-md">
                                <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4 flex items-center gap-2">
                                    <Zap className="w-6 h-6 text-orange-600" />
                                    {section.title}
                                </h2>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {section.content}
                                </p>
                            </section>
                        ))}
                    </div>

                    {/* Sidebar & CTA (1/3 cột) */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-10 space-y-6">
                            
                            {/* CTA Box */}
                            <div className="bg-orange-500 p-6 rounded-xl shadow-xl text-white text-center">
                                <p className="text-lg font-semibold mb-3">Sẵn sàng thử thách?</p>
                                <a 
                                    href={jobData.ctaLink}
                                    className="w-full inline-flex items-center justify-center bg-white text-orange-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 text-lg group"
                                >
                                    Ứng Tuyển Ngay
                                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                                </a>
                            </div>

                            {/* Job Summary Box */}
                            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-orange-600">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Tóm Tắt</h3>
                                <div className="space-y-3 text-gray-700">
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-gray-500" /> Vị trí</span>
                                        <span className="font-medium text-right">{jobData.title.split('(')[0].trim()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2"><Calendar className="w-5 h-5 text-gray-500" /> Ngày đăng</span>
                                        <span className="font-medium">{jobData.postedDate}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-gray-500" /> Địa điểm</span>
                                        <span className="font-medium">{jobData.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2"><UserCheck className="w-5 h-5 text-gray-500" /> Kinh nghiệm</span>
                                        <span className="font-medium">{jobData.experience}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
                
            </main>
        </div>
    );
};

export default JobDetail;