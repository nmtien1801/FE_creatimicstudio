import React, { useState } from 'react';
import { Search, FileDown } from 'lucide-react';

export default function FormProduct(selectedCategory) {
    const [showProductModal, setShowProductModal] = useState(false);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
                    <h3 className="font-bold flex items-center gap-2">
                        <PackagePlus size={20} /> Thêm sản phẩm mới
                    </h3>
                    <button onClick={() => setShowProductModal(false)} className="hover:bg-indigo-500 rounded-full p-1 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowProductModal(false); }}>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Danh mục đã chọn</label>
                        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg text-gray-700 font-medium border border-gray-200">
                            <Folder size={16} className="text-indigo-500" /> {selectedCategory?.name}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Tên sản phẩm</label>
                        <input required type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Nhập tên sản phẩm..." />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Giá bán (VNĐ)</label>
                            <input required type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="0" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Tồn kho</label>
                            <input required type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="0" />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={() => setShowProductModal(false)}
                            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-colors"
                        >
                            Lưu sản phẩm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}