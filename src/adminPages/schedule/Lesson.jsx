import React, { useState } from 'react';
import { 
  ChevronRight, ChevronDown, Folder, Plus, Edit2, 
  Trash2, LayoutGrid, PackagePlus, X, Tag 
} from 'lucide-react';

// Dữ liệu mẫu (Gộp thêm số lượng sản phẩm)
const initialData = [
  {
    id: 1, name: "Điện tử", status: true, productCount: 5,
    children: [
      { id: 2, name: "Điện thoại", status: true, productCount: 12, children: [{ id: 4, name: "iPhone", status: true, productCount: 8 }] },
      { id: 3, name: "Laptop", status: true, productCount: 3, children: [] },
    ]
  },
  { id: 5, name: "Thời trang", status: true, productCount: 0, children: [] }
];

const CategoryItem = ({ item, depth = 0, onAddProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="select-none">
      <div 
        className={`flex items-center justify-between p-3 hover:bg-gray-50 border-b border-gray-100 transition-colors group`}
        style={{ paddingLeft: `${depth * 24 + 12}px` }}
      >
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`p-1 rounded hover:bg-gray-200 ${!hasChildren && 'invisible'}`}
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          <Folder size={18} className={depth === 0 ? "text-blue-500" : "text-gray-400"} />
          
          <div className="flex flex-col">
            <span className="font-medium text-gray-700">{item.name}</span>
            <span className="text-[10px] text-gray-400 flex items-center gap-1">
               <Tag size={10}/> {item.productCount || 0} sản phẩm
            </span>
          </div>
          
          {item.status ? (
            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded-full text-[10px]">Active</span>
          ) : (
            <span className="px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded-full text-[10px]">Hidden</span>
          )}
        </div>

        {/* Nhóm nút hành động */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onAddProduct(item)}
            className="flex items-center gap-1 p-1.5 text-green-600 hover:bg-green-50 rounded border border-green-100 text-xs font-medium" 
            title="Thêm sản phẩm"
          >
            <PackagePlus size={14} /> <span className="hidden sm:inline">Thêm SP</span>
          </button>
          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded border border-blue-100" title="Thêm con">
            <Plus size={14} />
          </button>
          <button className="p-1.5 text-amber-600 hover:bg-amber-50 rounded border border-amber-100" title="Sửa">
            <Edit2 size={14} />
          </button>
          <button className="p-1.5 text-red-600 hover:bg-red-50 rounded border border-red-100" title="Xóa">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {isOpen && hasChildren && (
        <div className="bg-gray-50/30">
          {item.children.map(child => (
            <CategoryItem key={child.id} item={child} depth={depth + 1} onAddProduct={onAddProduct} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function CategoryManager() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  const handleOpenAddProduct = (category) => {
    setSelectedCategory(category);
    setShowProductModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen relative">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <LayoutGrid className="text-indigo-600" /> Quản lý Danh mục
          </h1>
          <p className="text-gray-500 text-sm">Cấu trúc đa tầng & Quản lý sản phẩm</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-indigo-200">
          <Plus size={18} /> Thêm danh mục gốc
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 bg-gray-100/50 p-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="ml-10">Tên danh mục / Thông tin</div>
        </div>

        <div className="divide-y divide-gray-100">
          {initialData.map(cat => (
            <CategoryItem key={cat.id} item={cat} onAddProduct={handleOpenAddProduct} />
          ))}
        </div>
      </div>

      {/* MODAL THÊM SẢN PHẨM */}
      {showProductModal && (
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
      )}
    </div>
  );
}