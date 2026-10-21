import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Filter, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard.jsx';
import { getListCategory } from '../redux/categorySlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearSearchResults } from '../redux/productSlice.js';
import ApiProduct from '../apis/ApiProduct.js';
import { slug } from '../utils/constants.js';

// Component hiệu ứng xuất hiện và transition mượt mà khi lăn chuột cuộn trang
function RevealOnScroll({ children, className = "", delay = 0, duration = 600 }) {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (domRef.current) observer.unobserve(domRef.current);
                }
            },
            {
                threshold: 0.05,
                rootMargin: '0px 0px -30px 0px'
            }
        );

        const current = domRef.current;
        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, []);

    return (
        <div
            ref={domRef}
            style={{
                transitionDelay: `${delay}ms`,
                transitionDuration: `${duration}ms`,
                transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
            className={`transition-all transform will-change-transform will-change-opacity ${
                isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-6 scale-[0.985]'
            } ${className}`}
        >
            {children}
        </div>
    );
}

const priceRanges = [
    { value: 'all', label: 'Tất cả mức giá', min: 0, max: Infinity },
    { value: 'under2m', label: 'Dưới 2.000.000₫', min: 0, max: 2000000 },
    { value: '2mto4m', label: '2.000.000₫ - 4.000.000₫', min: 2000000, max: 4000000 },
    { value: '4mto8m', label: '4.000.000₫ - 8.000.000₫', min: 4000000, max: 8000000 },
    { value: 'over8m', label: 'Trên 8.000.000₫', min: 8000000, max: Infinity },
];

// ================= FilterSidebar: BỘ LỌC GIÁ =================
const FilterSidebar = ({ filters, onFilterChange }) => {
    return (
        <RevealOnScroll duration={500} className="w-full md:w-56 lg:w-64 flex-shrink-0">
            <div className="w-full p-3 sm:p-5 md:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm md:shadow-md top-4 self-start overflow-hidden">
                <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-5 flex items-center gap-1.5 sm:gap-2">
                    <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                    Bộ Lọc Giá
                </h2>

                <div className="border-b border-gray-100 pb-1 md:pb-6 w-full">
                    <div className="flex flex-nowrap overflow-x-auto md:flex-col gap-1.5 sm:gap-2 md:gap-3 pb-2 md:pb-0 scrollbar-none snap-x">
                        {priceRanges.map(range => {
                            const isChecked = filters.priceRange === range.value;
                            return (
                                <label
                                    key={range.value}
                                    className={`flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 cursor-pointer group py-1.5 px-3 sm:py-2 sm:px-3.5 md:p-0 rounded-lg sm:rounded-xl transition-all border md:border-none snap-center flex-shrink-0
                                        ${isChecked
                                            ? 'bg-orange-50 border-orange-500 md:bg-transparent'
                                            : 'bg-gray-50 border-gray-200 md:bg-transparent'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        value={range.value}
                                        checked={isChecked}
                                        onChange={() => onFilterChange('priceRange', range.value)}
                                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 cursor-pointer"
                                    />
                                    <span className={`text-xs sm:text-sm md:text-[15px] font-medium sm:font-semibold transition-colors whitespace-nowrap
                                        ${isChecked ? 'text-orange-600 font-bold' : 'text-gray-600 group-hover:text-gray-800'}`}>
                                        {range.label}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            </div>
        </RevealOnScroll>
    );
};

// ================= CategoryTopMenu: HỖ TRỢ SUB-CATEGORY CẢ DESKTOP & MOBILE =================
const CategoryTopMenu = ({
    categoryList = [],
    selectedCategory,
    selectedSubCategory,
    onCategoryClick,
    onSubClick
}) => {
    // 1. Chỉ lấy danh mục cha có status = true và danh mục con bên trong cũng có status = true
    const activeCategories = useMemo(() => {
        if (!Array.isArray(categoryList)) return [];

        return categoryList
            .filter(cat => cat.status === true || cat.status === 1)
            .map(cat => ({
                ...cat,
                children: (cat.children || []).filter(sub => sub.status === true || sub.status === 1)
            }));
    }, [categoryList]);

    // 2. Tìm danh mục cha đang active từ danh sách đã lọc
    const currentActiveCat = useMemo(() => {
        return activeCategories.find(cat => String(cat.id) === String(selectedCategory));
    }, [activeCategories, selectedCategory]);

    return (
        <RevealOnScroll duration={500} className="mb-6 sm:mb-8 md:mb-10 w-full relative z-20">
            {/* Thanh danh mục chính (Cấp 1) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 pb-2.5 sm:pb-3 md:pb-4 px-1 sm:px-2">
                <div className="flex-shrink-0">
                    <button
                        onClick={() => onCategoryClick('all')}
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-lg sm:rounded-xl md:rounded-2xl text-xs sm:text-sm md:text-base font-semibold md:font-bold transition whitespace-nowrap
                            ${selectedCategory === 'all'
                                ? 'bg-orange-500 text-white shadow-md'
                                : 'bg-white shadow-sm hover:bg-orange-50 text-gray-700'}`}
                    >
                        Tất cả
                    </button>
                </div>

                {activeCategories.map(cat => {
                    const isCatActive = String(selectedCategory) === String(cat.id);
                    const hasChildren = cat.children && cat.children.length > 0;

                    return (
                        <div
                            key={cat.id || cat.name}
                            className="relative group flex-shrink-0 md:hover:z-50"
                        >
                            <button
                                onClick={() => onCategoryClick(cat)}
                                className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-lg sm:rounded-xl md:rounded-2xl text-xs sm:text-sm md:text-base font-semibold md:font-bold transition whitespace-nowrap flex items-center gap-1
                                    ${isCatActive
                                        ? 'bg-orange-500 text-white shadow-md'
                                        : 'bg-white shadow-sm hover:bg-orange-50 text-gray-700'}`}
                            >
                                <span>{cat.name}</span>
                                {hasChildren && (
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform group-hover:rotate-180 ${isCatActive ? 'text-white' : 'text-gray-400'}`} />
                                )}
                            </button>

                            {/* Dropdown Menu Desktop khi Hover */}
                            {hasChildren && (
                                <div className="hidden md:block">
                                    <div className="absolute left-0 right-0 top-full h-2"></div>
                                    <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white shadow-xl rounded-xl min-w-[200px] z-[100] py-1.5 border border-gray-100">
                                        <button
                                            onClick={() => onCategoryClick(cat)}
                                            className={`block w-full text-left px-4 py-2 text-xs sm:text-sm font-semibold transition-colors
                                                ${isCatActive && selectedSubCategory === 'all'
                                                    ? 'bg-orange-100 text-orange-600 font-bold'
                                                    : 'text-gray-700 hover:bg-orange-50'}`}
                                        >
                                            Tất cả {cat.name}
                                        </button>

                                        {cat.children.map(sub => {
                                            const isSubActive = isCatActive && String(selectedSubCategory) === String(sub.id);
                                            return (
                                                <button
                                                    key={sub.id || sub.name}
                                                    onClick={() => onSubClick(cat, sub)}
                                                    className={`block w-full text-left px-4 py-2 text-xs sm:text-sm transition-colors
                                                        ${isSubActive
                                                            ? 'bg-orange-100 text-orange-600 font-bold'
                                                            : 'text-gray-700 hover:bg-orange-50 font-medium'}`}
                                                >
                                                    {sub.name}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Dải danh mục con cấp 2 (chỉ hiện các subcategory có status = true) */}
            {currentActiveCat && currentActiveCat.children && currentActiveCat.children.length > 0 && (
                <div className="mt-2.5 pt-2.5 border-t border-gray-200/60 flex flex-wrap items-center gap-2 px-1">
                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap mr-1 mb-1">Nhóm con:</span>
                    <button
                        onClick={() => onCategoryClick(currentActiveCat)}
                        className={`px-3 py-1 mb-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border
                            ${selectedSubCategory === 'all'
                                ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'}`}
                    >
                        Tất cả
                    </button>

                    {currentActiveCat.children.map(sub => {
                        const isSubActive = String(selectedSubCategory) === String(sub.id);
                        return (
                            <button
                                key={sub.id || sub.name}
                                onClick={() => onSubClick(currentActiveCat, sub)}
                                className={`px-3 py-1 mb-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border
                                    ${isSubActive
                                        ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'}`}
                            >
                                {sub.name}
                            </button>
                        );
                    })}
                </div>
            )}
        </RevealOnScroll>
    );
};

// ================= ProductsList: SHOW SẢN PHẨM =================
const getPaginationRange = (currentPage, totalPages) => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l > 2) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
};

const ProductsList = ({ products, currentPage, totalPages, onPageChange, loading, activeTitle }) => {
    return (
        <div className="flex-1 md:pl-4 lg:pl-8">
            <RevealOnScroll duration={500}>
                <div className="mb-6 pb-4 border-b border-gray-200 flex justify-between items-center">
                    <h1 className="text-xl font-black text-gray-900">
                        {activeTitle ? `Sản Phẩm - ${activeTitle}` : 'Tất Cả Sản Phẩm'}
                    </h1>
                    <p className="text-gray-600 font-medium">{products.length} kết quả</p>
                </div>
            </RevealOnScroll>

            {products.length > 0 ? (
                <div className="relative">
                    <div className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 ${loading ? 'opacity-40 pointer-events-none' : ''}`}>
                        {products.map((product, index) => (
                            <RevealOnScroll 
                                key={product.id} 
                                delay={(index % 4) * 60} 
                                duration={500}
                            >
                                <ProductCard product={product} />
                            </RevealOnScroll>
                        ))}
                    </div>

                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                        </div>
                    )}
                </div>
            ) : (
                !loading && (
                    <RevealOnScroll duration={500}>
                        <div className="text-center p-12 bg-white rounded-xl shadow-inner mt-10">
                            <h3 className="text-xl font-bold text-gray-700">Không tìm thấy sản phẩm nào</h3>
                            <p className="text-gray-500 mt-2">Vui lòng thử chọn danh mục khác hoặc điều chỉnh mức giá.</p>
                        </div>
                    </RevealOnScroll>
                )
            )}

            {totalPages > 1 && (
                <RevealOnScroll duration={500}>
                    <div className="flex justify-center items-center space-x-1 sm:space-x-2 mt-10 flex-wrap gap-y-2">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 sm:p-3 bg-white border border-gray-300 rounded-lg hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                        </button>

                        {getPaginationRange(currentPage, totalPages).map((page, index) => {
                            if (page === '...') {
                                return (
                                    <span key={`dots-${index}`} className="px-2 py-1 sm:px-4 sm:py-2 text-gray-500 font-bold">
                                        ...
                                    </span>
                                );
                            }

                            return (
                                <button
                                    key={`page-${page}`}
                                    onClick={() => onPageChange(page)}
                                    className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-bold rounded-lg transition-all
                                        ${currentPage === page
                                            ? 'bg-orange-600 text-white shadow-md'
                                            : 'bg-white text-gray-700 hover:bg-orange-100 border border-gray-300'}`}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 sm:p-3 bg-white border border-gray-300 rounded-lg hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                        </button>
                    </div>
                </RevealOnScroll>
            )}
        </div>
    );
};

// ================= SanPham Component =================
export default function SanPham() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { CategoryList } = useSelector((state) => state.category);
    const { searchResults } = useSelector((state) => state.product);
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

    const selectedCategory = useMemo(() => urlCategoryId || 'all', [urlCategoryId]);
    const selectedSubCategory = useMemo(() => urlSubCategoryId || 'all', [urlSubCategoryId]);

    // Tìm tên danh mục để gắn tiêu đề động
    const currentTitle = useMemo(() => {
        if (selectedCategory === 'all') return '';
        const parent = CategoryList?.find(c => String(c.id) === String(selectedCategory));
        if (!parent) return '';
        if (selectedSubCategory && selectedSubCategory !== 'all') {
            const sub = parent.children?.find(s => String(s.id) === String(selectedSubCategory));
            return sub ? `${parent.name} > ${sub.name}` : parent.name;
        }
        return parent.name;
    }, [selectedCategory, selectedSubCategory, CategoryList]);

    const fetchListCategory = async () => {
        try {
            await dispatch(getListCategory({ page: 1, limit: 100 })).unwrap();
        } catch (err) {
            console.error('Lỗi lấy categories:', err);
        }
    };

    const fetchProducts = async (page = 1) => {
        setLoading(true);
        try {
            if (isSearchMode && searchResults && searchResults.length > 0) {
                setProducts(searchResults);
                setTotalPages(1);
                setCurrentPage(1);
            } else {
                // Ưu tiên subCategory nếu có, nếu không thì lấy category cha
                let categoryId = 'all';
                if (urlSubCategoryId && urlSubCategoryId !== 'all') {
                    categoryId = urlSubCategoryId;
                } else if (urlCategoryId && urlCategoryId !== 'all') {
                    categoryId = urlCategoryId;
                }

                const priceProduct = filters.priceRange;
                const res = await ApiProduct.filterProductApi(page, 9, categoryId, priceProduct);

                setProducts(res.DT?.products || []);
                setTotalPages(Math.ceil((res.DT?.total || 0) / (res.DT?.limit || 9)));
                setCurrentPage(res.DT?.page || 1);
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
        const isSearch = searchParams.get('search') === 'true';
        setIsSearchMode(isSearch);
        fetchProducts(1);
    }, [urlCategoryId, urlSubCategoryId, filters.priceRange, searchParams, searchResults]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // Click danh mục cha -> reset subCategory về 'all'
    const handleCategoryClick = (cat) => {
        if (cat === 'all') {
            navigate('/san-pham/all/all');
        } else {
            navigate(`/${slug(cat.name)}/${cat.id}/all`);
        }
    };

    // Click danh mục con -> URL: /:slug-con/:id-cha/:id-con
    const handleSubClick = (cat, sub) => {
        navigate(`/${slug(sub.name)}/${cat.id}/${sub.id}`);
    };

    const handlePageChange = (page) => {
        fetchProducts(page);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12 font-sans scroll-smooth">
            {isSearchMode && (
                <RevealOnScroll duration={500}>
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
                </RevealOnScroll>
            )}

            {!isSearchMode && (
                <CategoryTopMenu
                    categoryList={CategoryList || []}
                    selectedCategory={selectedCategory}
                    selectedSubCategory={selectedSubCategory}
                    onCategoryClick={handleCategoryClick}
                    onSubClick={handleSubClick}
                />
            )}

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                {!isSearchMode && (
                    <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
                )}

                <ProductsList
                    products={products}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    loading={loading}
                    activeTitle={currentTitle}
                />
            </div>
        </div>
    );
}