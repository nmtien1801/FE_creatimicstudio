import React, { useState, useMemo, useEffect } from 'react';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard.jsx';
import { getListCategory } from '../redux/categorySlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearSearchResults } from '../redux/productSlice.js';
import ApiProduct from '../apis/ApiProduct.js';
import { slug } from '../utils/constants.js';

const priceRanges = [
    { value: 'all', label: 'Tất cả mức giá', min: 0, max: Infinity },
    { value: 'under2m', label: 'Dưới 2.000.000₫', min: 0, max: 2000000 },
    { value: '2mto4m', label: '2.000.000₫ - 4.000.000₫', min: 2000000, max: 4000000 },
    { value: '4mto8m', label: '4.000.000₫ - 8.000.000₫', min: 4000000, max: 8000000 },
    { value: 'over8m', label: 'Trên 8.000.000₫', min: 8000000, max: Infinity },
];

const getTitleByCategory = (selectedCategory, subCategory) => {
    if (selectedCategory === 'all') {
        return '';
    }

    if (subCategory && subCategory !== 'all') {
        return subCategory;
    }

    return selectedCategory;
};

// ================= FilterSidebar: BỘ LỌC GIÁ =================
const FilterSidebar = ({ filters, onFilterChange }) => {
    return (
        <div className=" w-full md:w-64 lg:w-72 flex-shrink-0 p-6 bg-white rounded-2xl shadow-xl top-4 self-start">
            <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5 text-orange-500" />
                Bộ Lọc
            </h2>

            {/* Price Filter */}
            <div className="mb-8 border-b border-gray-100 pb-6">
                <h3 className="text-lg font-bold text-gray-700 mb-3">Mức giá</h3>
                <div className="space-y-3">
                    {priceRanges.map(range => (
                        <label key={range.value} className="flex items-center space-x-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="priceRange"
                                value={range.value}
                                checked={filters.priceRange === range.value}
                                onChange={() => onFilterChange('priceRange', range.value)}
                                className="w-5 h-5 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500"
                            />
                            <span className={`text-base font-medium transition-colors ${filters.priceRange === range.value ? 'text-orange-600 font-semibold' : 'text-gray-600 group-hover:text-gray-800'}`}>
                                {range.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ================= CategoryTopMenu: BỘ LỌC CATEGORY =================
const CategoryTopMenu = ({ categoryList, selectedCategory, onCategoryClick, onSubClick }) => {
    return (
        <div className="flex justify-center mb-10">
            <div className="flex flex-wrap justify-center gap-4">
                <button
                    onClick={() => onCategoryClick('all')}
                    className={`px-6 py-3 rounded-2xl text-lg font-bold transition
                        ${selectedCategory === 'all'
                            ? 'bg-orange-500 text-white shadow-lg'
                            : 'bg-white shadow hover:bg-orange-50'}
                    `}
                >
                    Tất cả
                </button>

                {categoryList.map(cat => (
                    <div
                        key={cat.name}
                        className="relative group px-2 py-2" // 👈 tăng vùng hover
                    >
                        <button
                            onClick={() => onCategoryClick(cat)}
                            className={`px-6 py-3 rounded-2xl text-lg font-bold transition
                                ${selectedCategory === String(cat.id)
                                    ? 'bg-orange-500 text-white shadow-lg'
                                    : 'bg-white shadow hover:bg-orange-50'}
                            `}
                        >
                            {cat.name}
                        </button>

                        {/* Hover bridge (vùng đệm vô hình) */}
                        {cat.children.length > 0 && (
                            <>
                                <div className="absolute left-0 right-0 top-full h-4"></div>

                                <div
                                    className="absolute left-1/2 -translate-x-1/2 top-full mt-1
                                        hidden group-hover:block
                                        bg-white shadow-xl rounded-2xl
                                        min-w-[240px] z-50"
                                >
                                    {cat.children.map(sub => (
                                        <button
                                            key={sub.name}
                                            onClick={() => onSubClick(cat, sub)}
                                            className="block w-full text-left px-5 py-3
                                                text-base font-medium
                                                hover:bg-orange-50 text-gray-700"
                                        >
                                            {sub.name}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}

            </div>
        </div>
    );
};

// ================= ProductsList: SHOW SẢN PHẨM TỬ CATEGORY VÀ GIÁ + PHÂN TRANG =================
const ProductsList = ({ products, currentPage, totalPages, onPageChange, loading }) => {

    return (
        <div className="flex-1 md:pl-8">
            <div className="mb-6 pb-4 border-b border-gray-200 flex justify-between items-center">
                <h1 className="text-2xl font-black text-gray-900">
                    Sản Phẩm
                </h1>
                <p className="text-gray-600 font-medium">{products.length} kết quả</p>
            </div>

            {/* GRID + OVERLAY */}
            {products.length > 0 ? (
                <div className="relative">

                    {/* GRID */}
                    <div
                        className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6
            ${loading ? 'opacity-40 pointer-events-none' : ''}`}
                    >
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* OVERLAY LOADING */}
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                        </div>
                    )}
                </div>
            ) : (
                !loading && (
                    <div className="text-center p-12 bg-white rounded-xl shadow-inner mt-10">
                        <h3 className="text-xl font-bold text-gray-700">Không tìm thấy sản phẩm nào</h3>
                        <p className="text-gray-500 mt-2">Vui lòng thử điều chỉnh bộ lọc của bạn.</p>
                    </div>
                )
            )}


            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-10">
                    <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
                        className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => {
                        const page = i + 1;
                        return (
                            <button
                                key={`page-${page}-total-${totalPages}`}
                                onClick={() => onPageChange(page)}
                                className={`px-4 py-2 font-bold rounded-lg transition-all
                                    ${currentPage === page
                                        ? 'bg-orange-600 text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-orange-100 border border-gray-300'
                                    }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                    <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
                        className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                </div>
            )}
        </div>
    );
};

// ================= SanPham Component =================
export default function SanPham() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { CategoryList, CategoryTotal } = useSelector((state) => state.category);
    const { searchResults, isSearching } = useSelector((state) => state.product);
    const { id_category: urlCategoryId, id_product: urlSubCategoryId } = useParams();
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        priceRange: 'all',
    });
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isSearchMode, setIsSearchMode] = useState(searchParams.get('search') === 'true');

    // Tính selectedCategory từ URL params
    const selectedCategory = useMemo(() => {
        return urlCategoryId || 'all';
    }, [urlCategoryId]);

    // Tính subCategory từ URL params
    const subCategory = useMemo(() => {
        if (urlSubCategoryId === 'all' || !urlSubCategoryId) return 'all';
        const category = CategoryList.find(cat => cat.id === urlCategoryId);
        if (category) {
            const sub = category.children.find(child => child.id === urlSubCategoryId);
            return sub ? sub.name : 'all';
        }
        return 'all';
    }, [urlSubCategoryId, urlCategoryId, CategoryList]);

    // ================================================ INIT DATA ===========================================
    const fetchListCategory = async () => {
        let res = await dispatch(getListCategory({ page: 1, limit: 20 })).unwrap();
    };

    const fetchProducts = async (page = 1) => {
        setLoading(true);
        try {
            // Nếu ở chế độ tìm kiếm, sử dụng searchResults từ Redux
            if (isSearchMode && searchResults && searchResults.length > 0) {
                setProducts(searchResults);
                setTotalPages(1);
                setCurrentPage(1);
            } else {
                // Ngược lại, gọi API bình thường
                let categoryId = urlCategoryId || 'all';
                if (urlSubCategoryId && urlSubCategoryId !== 'all') {
                    categoryId = urlSubCategoryId;
                }

                const priceProduct = filters.priceRange;
                const res = await ApiProduct.filterProductApi(page, 9, categoryId, priceProduct);

                setProducts(res.DT.products || []);
                setTotalPages(Math.ceil(res.DT.total / res.DT.limit));
                setCurrentPage(res.DT.page);
            }
        } catch (error) {
            console.error(error);
            toast.error('Lỗi khi tải sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListCategory();
    }, []);

    useEffect(() => {
        if (searchParams.get('search') === 'true') {
            setIsSearchMode(true);
            fetchProducts(1);
        } else {
            setIsSearchMode(false);
            if (CategoryList.length > 0 && urlCategoryId !== undefined) {
                fetchProducts(1);
            }
        }
    }, [urlCategoryId, urlSubCategoryId, filters.priceRange, CategoryList, searchParams, searchResults]);
    // ============================================= ACTION ================================================

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleCategoryClick = (cat) => {
        if (cat === 'all') {
            navigate('/san-pham/all/all');
        } else {
            navigate(`/${slug(cat.name)}/${cat.id}/all`);
        }
    };

    const handleSubClick = (cat, sub) => {
        navigate(`/${slug(sub.name)}/${sub.id}/all`);
    };

    const handlePageChange = (page) => {
        setLoading(true);   // bật loading trước
        fetchProducts(page);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12 font-sans">
            {/* Thông báo chế độ tìm kiếm */}
            {isSearchMode && (
                <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🔍</span>
                        <div>
                            <p className="font-bold text-blue-900">Chế độ tìm kiếm</p>
                            <p className="text-sm text-blue-700">Đang hiển thị {searchResults?.length || 0} sản phẩm khớp</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            dispatch(clearSearchResults());
                            navigate('/san-pham/all/all');
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
                    >
                        Xóa tìm kiếm
                    </button>
                </div>
            )}

            {/* Top category menu */}
            {!isSearchMode && (
                <CategoryTopMenu
                    categoryList={CategoryList}
                    selectedCategory={selectedCategory}
                    onCategoryClick={handleCategoryClick}
                    onSubClick={handleSubClick}
                />
            )}

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Sidebar - ẩn khi ở chế độ tìm kiếm */}
                {!isSearchMode && (
                    <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
                )}

                {/* Product list */}
                <ProductsList
                    products={products}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    loading={loading}
                />
            </div>
        </div>
    );
}
