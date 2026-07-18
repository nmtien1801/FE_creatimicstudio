import React, { useState } from 'react';
import { Home, Phone, Mail } from 'lucide-react';
import ContactForm from '../components/contact/FormContact';

const ContactPage = () => {
    // State để quản lý dữ liệu form (tùy chọn)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        content: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        // Logic xử lý gửi form (ví dụ: gọi API) sẽ được thêm ở đây
        alert('Đã gửi thông tin liên hệ!');
    };

    // Component Input Field tùy chỉnh - Đã sửa thu nhỏ chữ khi responsive
    const CustomInput = ({ name, placeholder, required = true, type = 'text' }) => (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            required={required}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition duration-200 text-xs sm:text-sm md:text-base"
        />
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Giảm padding dọc trên thiết bị di động */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">

                {/* Tiêu đề trang tự co giãn */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-10 text-left">
                    Liên Hệ Với Chúng Tôi
                </h1>

                {/* Grid chính */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">

                    {/* Left Column: Contact Info & Form */}
                    <div className="space-y-6 sm:space-y-8 text-left">

                        {/* 1. Contact Information - Điều chỉnh text và icon nhỏ gọn */}
                        <div className="space-y-3 sm:space-y-4 text-gray-800 text-xs sm:text-sm md:text-base">
                            {/* Địa chỉ */}
                            <div className="flex items-start gap-3 sm:gap-4">
                                <Home className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mt-0.5 sm:mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold leading-snug">252/21/18 Phạm Văn Chiêu, Khu phố 30, Phường Thông Tây Hội, TP.HCM</p>
                                </div>
                            </div>

                            {/* Hotline đặt hàng */}
                            <div className="flex items-center gap-3 sm:gap-4">
                                <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                                <p className="leading-none"><span className="font-medium">Hotline đặt hàng:</span> 037.2672.396</p>
                            </div>

                            {/* Hotline truyền thông */}
                            <div className="flex items-center gap-3 sm:gap-4">
                                <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                                <p className="leading-none"><span className="font-medium">Hotline truyền thông:</span> 034. 7577. 034</p>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-3 sm:gap-4">
                                <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                                <p className="leading-none">contact@creatimichub.vn</p>
                            </div>
                        </div>

                        {/* 2. Contact Form */}
                        <div className="w-full">
                            <ContactForm />
                        </div>
                    </div>

                    {/* Right Column: Bản đồ Google Map */}
                    <div className="lg:min-h-full">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d979.6282912292106!2d106.64989492846674!3d10.848519316465875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDUwJzU0LjciTiAxMDbCsDM5JzAxLjkiRQ!5e0!3m2!1svi!2sus!4v1777905703551!5m2!1svi!2sus"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-[260px] sm:h-[350px] lg:h-[550px] border-0 rounded-xl shadow-md md:shadow-lg"
                        ></iframe>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ContactPage;