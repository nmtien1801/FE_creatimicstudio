import React, { useState, useEffect } from 'react';
import { Search, FileDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2, AlertCircle, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import FormProduct from './FormProduct';

export default function ProductManager() {
  const [isShowProduct, setIsShowProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // States
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch Data (Mock API call)
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // Thay bằng link API thật của bạn:
      // const res = await axios.get(`/api/products?page=${currentPage}&limit=${pageSize}`);
      // setProducts(res.data.data);
      // setTotal(res.data.total);

      // Giả lập dữ liệu
      setProducts([
        { id: 1, name: "iPhone 15 Pro", description: "Chip A17 Pro", image: "https://via.placeholder.com/50", price: 28000000, status: true },
        { id: 2, name: "Samsung S24 Ultra", description: "AI Phone", image: "https://via.placeholder.com/50", price: 25000000, status: false },
      ]);
      setTotal(2);
    } catch (error) {
      toast.error("Không thể tải danh sách sản phẩm");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, pageSize]);

  // Export Excel

  // 1. Lọc danh sách sản phẩm dựa trên searchTerm
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hàm mở form thêm mới
  const handleAddNewProduct = () => {
    setSelectedProduct(null); // Reset về null để hiểu là thêm mới
    setIsShowProduct(true);
  };

  // Hàm mở form chỉnh sửa
  const handleEditProduct = (product) => {
    setSelectedProduct(product); // Truyền dữ liệu sản phẩm vào
    setIsShowProduct(true);
  };

  // Hàm xử lý khi FormProduct gửi dữ liệu về
  const handleSubmitForm = (formData) => {
    if (selectedProduct) {
      // Logic Update
      setProducts(products.map(p => p.id === selectedProduct.id ? { ...p, ...formData } : p));
      toast.success("Cập nhật sản phẩm thành công!");
    } else {
      // Logic Create (giả lập ID)
      const newProduct = { ...formData, id: Date.now(), image: "https://via.placeholder.com/50" };
      setProducts([newProduct, ...products]);
      toast.success("Thêm sản phẩm thành công!");
    }
    setIsShowProduct(false);
  };

  const handleExportExcel = () => {
    const dataExport = products.map((p, index) => ({
      "STT": index + 1,
      "Tên sản phẩm": p.name,
      "Mô tả": p.description,
      "Giá": p.price,
      "Trạng thái": p.status ? "Kinh doanh" : "Ngừng bán"
    }));
    const ws = XLSX.utils.json_to_sheet(dataExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sản phẩm");
    XLSX.writeFile(wb, "Danh_sach_san_pham.xlsx");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">

        {/* Header & Actions */}
        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Quản lý kho hàng</h1>
            <p className="text-sm text-gray-500">Xem và quản lý thông tin các sản phẩm trong hệ thống</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleExportExcel} className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              <FileDown size={18} /> Xuất file
            </button>
            <button className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
              onClick={() => handleAddNewProduct()}
            >
              <Plus size={18} /> Thêm mới
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 bg-gray-50/50 border-b border-gray-200 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm tên sản phẩm..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4 text-center w-16">STT</th>
                <th className="px-6 py-4">Sản phẩm</th>
                <th className="px-6 py-4">Mô tả</th>
                <th className="px-6 py-4">Giá bán</th>
                <th className="px-6 py-4 text-center">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {isLoading ? (
                <tr><td colSpan="6" className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-teal-600" size={40} /></td></tr>
              ) : filteredProducts.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-center text-gray-500 font-medium">
                    {(currentPage - 1) * pageSize + idx + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt="" className="w-10 h-10 rounded-md border object-cover" />
                      <span className="font-semibold text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 italic max-w-xs truncate">{item.description}</td>
                  <td className="px-6 py-4 font-bold text-teal-700">
                    {item.price.toLocaleString('vi-VN')} đ
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.status ? 'Đang bán' : 'Tạm ngưng'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      onClick={() => handleEditProduct(item)}>
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm text-gray-500">Hiển thị {products.length}/{total} sản phẩm</span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
            ><ChevronsLeft size={16} /></button>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(v => v - 1)}
              className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
            ><ChevronLeft size={16} /></button>
            <span className="text-sm font-medium px-4">Trang {currentPage}</span>
            <button
              disabled={currentPage * pageSize >= total}
              onClick={() => setCurrentPage(v => v + 1)}
              className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
            ><ChevronRight size={16} /></button>
          </div>
        </div>

        {/* Form Product */}
        {isShowProduct &&
          <FormProduct
            initialData={selectedProduct}
            onClose={() => setIsShowProduct(false)}
            onSubmit={handleSubmitForm} />
        }
      </div>
    </div>
  );
}