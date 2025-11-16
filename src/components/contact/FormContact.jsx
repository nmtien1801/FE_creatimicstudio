import React, { useState } from 'react';

const CustomInput = ({ name, placeholder, required = true, type = 'text', value, onChange }) => (
    <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className=" bg-white w-full px-4 py-3 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition duration-200 text-base placeholder-gray-500"
    />
);

const ContactForm = () => {
    // State để quản lý dữ liệu form
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
        alert('Đã gửi thông tin liên hệ!');
        
        // Tùy chọn: Reset form sau khi gửi thành công
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            content: ''
        });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-indigo-400 uppercase">Liên hệ với chúng tôi</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <CustomInput 
                    name="fullName" 
                    placeholder="Họ và tên"
                    value={formData.fullName}
                    onChange={handleChange}
                />
                <CustomInput 
                    name="email" 
                    placeholder="Email (không bắt buộc)"
                    required={false}
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <CustomInput 
                    name="phone" 
                    placeholder="Số điện thoại"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <textarea
                    name="content"
                    placeholder="Nội dung"
                    rows="5"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    className="bg-white w-full px-4 py-3 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition duration-200 text-base resize-none"
                ></textarea>

                <button
                    type="submit"
                    className="bg-black text-white px-8 py-3 text-lg font-bold hover:bg-gray-800 transition duration-300"
                >
                    GỬI
                </button>
            </form>
        </div>
    );
};

export default ContactForm;