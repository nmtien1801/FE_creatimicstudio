import React, { useState } from 'react';
import ApiContact from "../../apis/ApiContact";
import { toast } from 'react-toastify';

const ContactForm = ({ onSubmitSuccess }) => {
    const [loading, setLoading] = useState(false);

    // Đổi 'content' thành 'note' cho đồng bộ với thẻ textarea
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        note: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra định dạng email nếu có nhập
        if (formData.email.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email.trim())) {
                toast.error('Địa chỉ email không đúng định dạng!');
                return;
            }
        }

        try {
            setLoading(true);
            const contactData = {
                name: formData.fullName,
                email: formData.email,
                message: formData.note + ` .Tôi đang quan tâm đến sản phẩm của bạn. Hãy liên hệ tới số điện thoại: ` + formData.phone,
            };

            await ApiContact.sendContactApi(contactData);
            toast.success('Đã gửi thông tin liên hệ thành công!');

            if (onSubmitSuccess) {
                onSubmitSuccess(formData);
            }

            // Reset form sau khi gửi thành công
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                note: ''
            });
        } catch (error) {
            console.error('Error sending contact:', error);
            toast.error('Gửi thông tin liên hệ thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            id="form-tu-van"
            className="bg-white border-2 border-[#ed792f] rounded-2xl p-5 shadow-sm"
        >
            <h3 className="text-2xl font-bold text-[#ed792f] text-center mb-5">
                Bạn cần tư vấn?
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
                {/* Tên (bắt buộc) */}
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                        Tên*
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="Nhập họ và tên"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#ed792f]"
                    />
                </div>

                {/* SĐT (bắt buộc) */}
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                        SĐT*
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Nhập số điện thoại"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#ed792f]"
                    />
                </div>

                {/* Email (không bắt buộc) */}
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                        Email <span className="font-normal text-gray-400 text-[11px]">(không bắt buộc)</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Nhập địa chỉ email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#ed792f]"
                    />
                </div>

                {/* Lời nhắn */}
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                        Để lại lời nhắn
                    </label>
                    <textarea
                        rows="3"
                        name="note"
                        placeholder="Nội dung cần hỗ trợ..."
                        value={formData.note}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#ed792f] resize-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2.5 font-bold text-sm rounded-xl shadow-md transition-colors text-white 
                        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ed792f] hover:bg-[#d8681e]'}`}
                >
                    {loading ? 'Đang gửi...' : 'Gửi đi'}
                </button>

                <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                    Thông tin của bạn sẽ được bảo mật. Tuyệt đối không gửi mật khẩu.
                </p>
            </form>
        </div>
    );
};

export default ContactForm;