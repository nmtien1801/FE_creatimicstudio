import React, { useState, useEffect } from 'react';
import { PackagePlus, X, Edit3 } from 'lucide-react';

export default function FormProduct({ initialData, onClose, onSubmit }) {
    // Khởi tạo state cho form
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        description: '',
        detail: '',
        status: true
    });

    // Nếu có initialData (chế độ sửa), đổ dữ liệu vào state
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                price: initialData.price || 0,
                description: initialData.description || '',
                detail: initialData.detail || '',
                status: initialData.status ?? true
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleLocalSubmit = (e) => {
        e.preventDefault();
        // Chuyển giá thành kiểu số trước khi gửi
        onSubmit({ ...formData, price: Number(formData.price) });
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className={`${initialData ? 'bg-blue-600' : 'bg-teal-600'} p-4 flex justify-between items-center text-white`}>
                    <h3 className="font-bold flex items-center gap-2">
                        {initialData ? <Edit3 size={20} /> : <PackagePlus size={20} />}
                        {initialData ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                    </h3>
                    <button onClick={onClose} className="hover:bg-black/20 rounded-full p-1 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form className="p-6 space-y-4" onSubmit={handleLocalSubmit}>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Tên sản phẩm</label>
                        <input
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                            placeholder="Ví dụ: iPhone 15 Pro Max..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Mô tả ngắn</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                            placeholder="Nhập mô tả sản phẩm..."
                            rows="2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Mô tả chi tiết
                        </label>
                        <textarea
                            name="detail"
                            value={formData.detail}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                            placeholder="Nhập mô tả chi tiết sản phẩm..."
                            rows="4"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Giá bán (VNĐ)</label>
                            <input
                                required
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                type="number"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                                placeholder="0"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Trạng thái</label>
                            <label className="relative inline-flex items-center cursor-pointer mt-2">
                                <input
                                    type="checkbox"
                                    name="status"
                                    checked={formData.status}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-700">
                                    {formData.status ? 'Đang bán' : 'Ngừng bán'}
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            className={`flex-1 px-4 py-2.5 text-white font-semibold rounded-lg shadow-md transition-colors ${initialData ? 'bg-blue-600 hover:bg-blue-700' : 'bg-teal-600 hover:bg-teal-700'
                                }`}
                        >
                            {initialData ? 'Cập nhật' : 'Lưu sản phẩm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}