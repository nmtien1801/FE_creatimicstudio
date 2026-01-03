import React, { useState, useEffect } from 'react';
import {
  ChevronRight, ChevronDown, Folder, Plus, Edit2,
  Trash2, LayoutGrid, PackagePlus, X, Tag
} from 'lucide-react';
import ModelSelectProduct from './ModelSelectProduct.jsx'
import ApiCategory from '../../apis/ApiCategory.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getListCategory } from '../../redux/categorySlice.js';

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
              <Tag size={10} /> {item.productCount || 0} sản phẩm
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
  const dispatch = useDispatch();
  const { CategoryList, CategoryTotal } = useSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = Math.ceil(CategoryTotal / pageSize);

  // ================================================ STATE DATA ===========================================
  const fetchList = async () => {
    setIsLoading(true);
    try {
      const res = await dispatch(getListCategory({ page: currentPage, limit: pageSize })).unwrap();
    } catch (error) {
      toast.error("Không thể tải danh sách danh mục");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [currentPage, pageSize]);

  // ================================================ CRUD ================================================
  // THÊM SẢN PHẨM VÀO DANH MỤC
  const handleOpenAddProduct = (category) => {
    setSelectedCategory(category);
    setShowProductModal(true);
  };

  return (
    <div className="max-w-0xl mx-auto p-6 bg-gray-50 min-h-screen relative">
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

      <ModelSelectProduct
        visible={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          // fetchList();
        }}
        form={[]}
      />
    </div>
  );
}