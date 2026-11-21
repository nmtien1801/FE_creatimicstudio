import React, { useState, useEffect } from 'react';
import { X, Search, Loader2, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import ApiProduct from '../../apis/ApiProduct';

export default function AccessorySelectModal({
    isOpen,
    onClose,
    selectedItems = [], // Mảng object các sản phẩm đã chọn
    excludeProductId,   // ID sản phẩm đang sửa (để loại bỏ)
    onConfirm,          // Callback trả về mảng object đã chọn khi bấm Xác nhận
}) {
    const [keyword, setKeyword] = useState('');
    const [debouncedKeyword, setDebouncedKeyword] = useState('');
    const [page, setPage] = useState(1);
    const limit = 10;

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    // Lưu tạm danh sách đã chọn trong lúc thao tác trên modal
    const [draftSelected, setDraftSelected] = useState([]);

    // Đồng bộ danh sách đã chọn mỗi khi mở modal
    useEffect(() => {
        if (isOpen) {
            setDraftSelected(selectedItems);
            setKeyword('');
            setDebouncedKeyword('');
            setPage(1);
        }
    }, [isOpen, selectedItems]);

    // Debounce từ khóa tìm kiếm & reset về trang 1
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedKeyword(keyword.trim());
            setPage(1);
        }, 350);
        return () => clearTimeout(timer);
    }, [keyword]);

    // Gọi API phân trang & tìm kiếm
    useEffect(() => {
        if (!isOpen) return;
        let isActive = true;

        const fetchProducts = async () => {
            setIsLoading(true);
            setError(false);
            try {
                const response = await ApiProduct.getListProductApi(page, limit, debouncedKeyword);

                if (response?.EC !== 0 || !Array.isArray(response?.DT?.products)) {
                    throw new Error(response?.EM || 'Không thể tải danh sách sản phẩm.');
                }

                if (isActive) {
                    setProducts(response.DT.products);
                    setTotal(response.DT.total || 0);
                }
            } catch (err) {
                console.error('Error fetching products in modal:', err);
                if (isActive) setError(true);
            } finally {
                if (isActive) setIsLoading(false);
            }
        };

        fetchProducts();
        return () => {
            isActive = false;
        };
    }, [isOpen, page, limit, debouncedKeyword]);

    if (!isOpen) return null;

    const totalPages = Math.max(1, Math.ceil(total / limit));
    const draftIdsSet = new Set(draftSelected.map((item) => String(item.id)));

    const handleToggleItem = (product) => {
        const targetId = String(product.id);
        setDraftSelected((prev) => {
            if (prev.some((item) => String(item.id) === targetId)) {
                return prev.filter((item) => String(item.id) !== targetId);
            }
            return [...prev, product];
        });
    };

    const handleSave = () => {
        onConfirm(draftSelected);
        onClose();
    };

    // Lọc bỏ sản phẩm đang chỉnh sửa khỏi danh sách hiển thị
    const displayProducts = products.filter(
        (p) => String(p.id) !== String(excludeProductId)
    );

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="bg-teal-600 p-4 flex justify-between items-center text-white">
                    <h3 className="font-bold text-base">
                        Chọn sản phẩm phụ ({draftSelected.length} đã chọn)
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="hover:bg-black/20 rounded-full p-1 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Thanh tìm kiếm */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Nhập tên sản phẩm để tìm kiếm..."
                            className="w-full rounded-lg border border-gray-300 bg-white pl-9 pr-9 py-2 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                            autoFocus
                        />
                        {keyword && (
                            <button
                                type="button"
                                onClick={() => setKeyword('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 min-h-[280px]">
                    {isLoading ? (
                        <div className="h-60 flex flex-col items-center justify-center text-gray-500 gap-2">
                            <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
                            <span className="text-sm">Đang tải danh sách sản phẩm...</span>
                        </div>
                    ) : error ? (
                        <div className="h-60 flex items-center justify-center text-sm text-red-600">
                            Không thể tải danh sách sản phẩm. Vui lòng thử lại.
                        </div>
                    ) : displayProducts.length === 0 ? (
                        <div className="h-60 flex items-center justify-center text-sm text-gray-500">
                            {debouncedKeyword
                                ? `Không tìm thấy sản phẩm nào khớp với "${debouncedKeyword}"`
                                : 'Chưa có sản phẩm nào.'}
                        </div>
                    ) : (
                        displayProducts.map((product) => {
                            const isChecked = draftIdsSet.has(String(product.id));
                            return (
                                <label
                                    key={product.id}
                                    className={`flex cursor-pointer items-center gap-3 p-3 rounded-xl border transition-colors ${
                                        isChecked
                                            ? 'border-teal-500 bg-teal-50/50'
                                            : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => handleToggleItem(product)}
                                        className="h-4 w-4 accent-teal-600 shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate">
                                            {product.name}
                                        </p>
                                        {product.maSP && (
                                            <p className="text-xs text-gray-500 font-mono">
                                                Mã SP: {product.maSP}
                                            </p>
                                        )}
                                    </div>
                                    <span className="text-sm font-semibold text-teal-700 shrink-0">
                                        {Number(product.price || 0).toLocaleString('vi-VN')}₫
                                    </span>
                                </label>
                            );
                        })
                    )}
                </div>

                {/* Thanh phân trang */}
                <div className="px-4 py-2.5 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                        Trang <strong className="text-gray-900">{page}</strong> / {totalPages} (Tổng {total} SP)
                    </span>
                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            disabled={page <= 1 || isLoading}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className="p-1.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            type="button"
                            disabled={page >= totalPages || isLoading}
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            className="p-1.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Footer nút hành động */}
                <div className="p-4 border-t border-gray-200 flex items-center justify-between gap-3 bg-white">
                    {draftSelected.length > 0 ? (
                        <button
                            type="button"
                            onClick={() => setDraftSelected([])}
                            className="text-xs font-medium text-red-600 hover:underline"
                        >
                            Bỏ chọn tất cả ({draftSelected.length})
                        </button>
                    ) : (
                        <span />
                    )}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50"
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 shadow-sm"
                        >
                            <Check size={16} />
                            Xác nhận ({draftSelected.length})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}