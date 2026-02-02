import React, { useEffect, useState } from "react";
import { X, Plus, Trash2, Edit3, Check, RotateCcw } from "lucide-react";
import ApiProductImage from "../../apis/ApiProductImage";
import { toast } from "react-toastify";

export default function ProductImageModal({ productId, onClose, onSelect }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // State phục vụ việc thêm mới
  const [newColor, setNewColor] = useState("");
  
  // State phục vụ việc sửa màu tại chỗ
  const [editingId, setEditingId] = useState(null);
  const [editingColor, setEditingColor] = useState("");

  useEffect(() => {
    if (productId) fetchImages();
  }, [productId]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await ApiProductImage.getProductImagesByProductIdApi(productId);
      if (res?.DT) setImages(res.DT);
    } catch (error) {
      toast.error("Không thể tải danh sách ảnh");
    } finally {
      setLoading(false);
    }
  };

  // --- XỬ LÝ THÊM MỚI ---
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!newColor.trim()) {
      toast.warning("Vui lòng nhập màu sắc trước khi chọn ảnh");
      return;
    }

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("image", file); // Backend nhận file và lưu thành STRING path
    formData.append("color", newColor);

    setUploading(true);
    try {
      const res = await ApiProductImage.createProductImageApi(formData);
      if (res && res.EC === 0) {
        toast.success("Thêm ảnh thành công");
        setNewColor(""); // Reset input
        fetchImages();   // Reload
      } else {
        toast.error(res.EM || "Lỗi khi tải ảnh lên");
      }
    } catch (error) {
      toast.error("Lỗi server");
    } finally {
      setUploading(false);
    }
  };

  // --- XỬ LÝ XÓA ---
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ảnh này?")) {
      try {
        const res = await ApiProductImage.deleteProductImageApi(id);
        if (res && res.EC === 0) {
          setImages(images.filter((img) => img.id !== id));
          toast.success("Đã xóa ảnh");
        }
      } catch (error) {
        toast.error("Không thể xóa ảnh");
      }
    }
  };

  // --- XỬ LÝ CẬP NHẬT MÀU ---
  const handleUpdateColor = async (id) => {
    try {
      const res = await ApiProductImage.updateProductImageApi({
        id: id,
        color: editingColor
      });
      if (res && res.EC === 0) {
        toast.success("Cập nhật màu thành công");
        setEditingId(null);
        fetchImages();
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b bg-gray-50">
          <div>
            <h2 className="font-bold text-xl text-gray-800">Quản lý hình ảnh</h2>
            <p className="text-xs text-gray-500 italic font-medium">ID sản phẩm: #{productId}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          
          {/* Section: Thêm mới */}
          <div className="mb-8 p-4 border-2 border-dashed border-teal-200 rounded-xl bg-teal-50/30">
            <h3 className="text-sm font-bold text-teal-700 mb-3 uppercase tracking-wider">Tải ảnh mới</h3>
            <div className="flex flex-col md:flex-row gap-3">
              <input 
                type="text"
                placeholder="Nhập màu (VD: Đen nhám, Trắng...)"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
              />
              <label className={`flex-[1] flex items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${uploading ? 'bg-gray-300' : 'bg-teal-600 hover:bg-teal-700 text-white shadow-md'}`}>
                {uploading ? <RotateCcw className="animate-spin" size={18} /> : <Plus size={18} />}
                <span className="font-medium">{uploading ? "Đang xử lý..." : "Chọn ảnh & Upload"}</span>
                <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
              </label>
            </div>
          </div>

          {/* Section: Danh sách */}
          {loading ? (
            <div className="text-center py-10 text-gray-500">Đang tải dữ liệu...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {images.map((img) => (
                <div key={img.id} className="group border rounded-xl overflow-hidden bg-white hover:shadow-xl transition-all border-gray-100">
                  {/* Ảnh */}
                  <div className="relative aspect-square bg-gray-100">
                    <img
                      src={img.image}
                      alt="product"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => onSelect({ image: img.image, previewUrl: img.image })}
                    />
                    <button 
                      onClick={() => handleDelete(img.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Thông tin màu sắc & Sửa */}
                  <div className="p-3">
                    {editingId === img.id ? (
                      <div className="flex items-center gap-1">
                        <input 
                          autoFocus
                          className="w-full border rounded px-2 py-1 text-xs"
                          value={editingColor}
                          onChange={(e) => setEditingColor(e.target.value)}
                        />
                        <button onClick={() => handleUpdateColor(img.id)} className="text-green-600"><Check size={16}/></button>
                        <button onClick={() => setEditingId(null)} className="text-gray-400"><X size={16}/></button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 truncate">Màu: {img.color}</span>
                        <button 
                          onClick={() => { setEditingId(img.id); setEditingColor(img.color); }}
                          className="text-gray-400 hover:text-teal-600 transition-colors"
                        >
                          <Edit3 size={14} />
                        </button>
                      </div>
                    )}
                    <button 
                      onClick={() => onSelect(img)}
                      className="w-full mt-3 py-1.5 bg-gray-100 hover:bg-teal-500 hover:text-white text-gray-600 text-xs font-bold rounded-lg transition-colors uppercase"
                    >
                      Chọn ảnh này
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && images.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed">
              <p className="text-gray-400">Chưa có hình ảnh nào cho sản phẩm này.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}