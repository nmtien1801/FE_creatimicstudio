import React, { useState, useMemo } from 'react';
import {Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/product/ProductCard.jsx';

// Chuyển đổi chuỗi giá tiếng Việt sang số để dễ dàng lọc và so sánh
const priceToNumber = (priceString) => {
    if (!priceString || priceString === "Liên hệ") return 0;
    return parseInt(priceString.replace(/\./g, '').replace('₫', '').trim());
};

// Dữ liệu sản phẩm mẫu
const rawProductsData = [
    { id: 1, name: "Micro thu âm BM-800", price: "990.000₫", oldPrice: "1.290.000₫", rating: 4.8, img: 'https://picsum.photos/id/1015/400/400', subCategory: 'Micro thu âm' },
    { id: 2, name: "Soundcard XOX K10", price: "1.250.000₫", oldPrice: "1.590.000₫", rating: 4.9, img: 'https://picsum.photos/id/1016/400/400', subCategory: 'Soundcard XOX' },
    { id: 3, name: "Tai nghe kiểm âm OneOdio", price: "750.000₫", oldPrice: "950.000₫", rating: 4.8, img: 'https://picsum.photos/id/1018/400/400', subCategory: 'Tai nghe kiểm âm' },
    { id: 4, name: "Combo Livestream Cao Cấp", price: "3.500.000₫", oldPrice: "4.200.000₫", rating: 5.0, img: 'https://picsum.photos/id/1020/400/400', subCategory: 'Combo Livestream' },
    { id: 5, name: "Loa kiểm âm Edifier R1280DB", price: "2.800.000₫", oldPrice: "3.200.000₫", rating: 4.8, img: 'https://picsum.photos/id/1024/400/400', subCategory: 'Loa kiểm âm' },
    { id: 6, name: "Phụ kiện chân đế Micro", price: "150.000₫", oldPrice: "190.000₫", rating: 4.9, img: 'https://picsum.photos/id/1027/400/400', subCategory: 'Chân đế Micro' },
    { id: 7, name: "Micro cài áo không dây", price: "690.000₫", oldPrice: "890.000₫", rating: 4.9, img: 'https://picsum.photos/id/1031/400/400', subCategory: 'Micro cài áo' },
    { id: 8, name: "Mixer Yamaha MG10XU", price: "5.500.000₫", oldPrice: "6.200.000₫", rating: 4.9, img: 'https://picsum.photos/id/1033/400/400', subCategory: 'Mixer Yamaha' },
    { id: 9, name: "Hộp Livestream Mini", price: "450.000₫", oldPrice: "590.000₫", rating: 4.8, img: 'https://picsum.photos/id/1035/400/400', subCategory: 'Hộp Livestream' },
    { id: 10, name: "Sản phẩm khác", price: "Liên hệ", oldPrice: "", rating: 5.0, img: 'https://picsum.photos/id/1037/400/400', subCategory: 'Khác' },
];

// Thêm trường priceNum
const productsData = rawProductsData.map(p => ({
    ...p,
    priceNum: priceToNumber(p.price)
}));

// Top categories + subcategories
const categories = {
    'Micro': ['Micro thu âm', 'Micro cài áo', 'Micro Condenser'],
    'Soundcard': ['Soundcard XOX', 'Soundcard Mini'],
    'Tai nghe': ['Tai nghe kiểm âm', 'Tai nghe DJ'],
    'Combo/Bộ': ['Combo Livestream', 'Combo Home Studio'],
    'Loa': ['Loa kiểm âm', 'Loa Bluetooth'],
    'Phụ kiện': ['Chân đế Micro', 'Hộp Livestream'],
    'Mixer': ['Mixer Yamaha'],
    'Khác': []
};

const priceRanges = [
    { value: 'all', label: 'Tất cả mức giá', min: 0, max: Infinity },
    { value: 'under500k', label: 'Dưới 500.000₫', min: 0, max: 499999 },
    { value: '500kto1m', label: '500.000₫ - 1.000.000₫', min: 500000, max: 1000000 },
    { value: 'over1m', label: 'Trên 1.000.000₫', min: 1000001, max: Infinity },
];

// ================= FilterSidebar =================
const FilterSidebar = ({ selectedCategory, filters, onFilterChange }) => {
    const subCategories = selectedCategory && selectedCategory !== 'all' ? categories[selectedCategory] : [];

    return (
        <div className="w-full md:w-64 lg:w-72 p-6 bg-white rounded-2xl shadow-xl sticky top-4 self-start">
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

            {/* SubCategory Filter */}
            {subCategories.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-700 mb-3">Danh mục con</h3>
                    <div className="space-y-3">
                        {subCategories.map(sub => (
                            <label key={sub} className="flex items-center space-x-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="subCategory"
                                    value={sub}
                                    checked={filters.subCategory === sub}
                                    onChange={() => onFilterChange('subCategory', sub)}
                                    className="w-5 h-5 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500"
                                />
                                <span className={`text-base font-medium transition-colors ${filters.subCategory === sub ? 'text-orange-600 font-semibold' : 'text-gray-600 group-hover:text-gray-800'}`}>
                                    {sub}
                                </span>
                            </label>
                        ))}
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="subCategory"
                                value="all"
                                checked={filters.subCategory === 'all'}
                                onChange={() => onFilterChange('subCategory', 'all')}
                                className="w-5 h-5 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500"
                            />
                            <span className="text-base font-medium text-gray-600 group-hover:text-gray-800">Tất cả</span>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

// ================= ProductsList =================
const ProductsList = ({ products, filters, selectedCategory }) => {
    const productsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Price filter
            const range = priceRanges.find(r => r.value === filters.priceRange);
            const priceMatch = filters.priceRange === 'all' || (product.priceNum >= range.min && product.priceNum <= range.max);

            // Category / SubCategory filter
            let categoryMatch = true;
            if (selectedCategory && selectedCategory !== 'all') {
                if (filters.subCategory && filters.subCategory !== 'all') {
                    categoryMatch = product.subCategory === filters.subCategory;
                } else {
                    categoryMatch = categories[selectedCategory].includes(product.subCategory);
                }
            }
            return priceMatch && categoryMatch;
        });
    }, [products, filters, selectedCategory]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * productsPerPage;
        return filteredProducts.slice(startIndex, startIndex + productsPerPage);
    }, [filteredProducts, currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    React.useEffect(() => {
        setCurrentPage(1);
    }, [filters, selectedCategory]);

    return (
        <div className="w-full md:w-3/4 md:pl-8">
            <div className="mb-6 pb-4 border-b border-gray-200 flex justify-between items-center">
                <h1 className="text-3xl font-black text-gray-900">
                    Sản Phẩm <span className="text-orange-600">Thu Âm & Livestream</span>
                </h1>
                <p className="text-gray-600 font-medium">{filteredProducts.length} kết quả</p>
            </div>

            {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {paginatedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center p-12 bg-white rounded-xl shadow-inner mt-10">
                    <h3 className="text-xl font-bold text-gray-700">Không tìm thấy sản phẩm nào</h3>
                    <p className="text-gray-500 mt-2">Vui lòng thử điều chỉnh bộ lọc của bạn.</p>
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-10">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
                        className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button key={index} onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 font-bold rounded-lg transition-all ${currentPage === index + 1 ? 'bg-orange-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-orange-100 border border-gray-300'}`}>
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}
                        className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                </div>
            )}
        </div>
    );
};

// ================= CategoryTopMenu =================
const CategoryTopMenu = ({ selectedCategory, onSelectCategory }) => (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-6">
        <button onClick={() => onSelectCategory('all')}
            className={`p-3 rounded-2xl font-semibold transition ${selectedCategory === 'all' ? 'bg-orange-500 text-white' : 'bg-white shadow hover:bg-orange-50'}`}>
            Tất cả
        </button>
        {Object.keys(categories).map(cat => (
            <button key={cat} onClick={() => onSelectCategory(cat)}
                className={`p-3 rounded-2xl font-semibold transition ${selectedCategory === cat ? 'bg-orange-500 text-white' : 'bg-white shadow hover:bg-orange-50'}`}>
                {cat}
            </button>
        ))}
    </div>
);

// ================= SanPham Component =================
export default function SanPham() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filters, setFilters] = useState({
        priceRange: 'all',
        subCategory: 'all',
    });

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12 font-sans">
            {/* Top category menu */}
            <CategoryTopMenu selectedCategory={selectedCategory} onSelectCategory={cat => {
                setSelectedCategory(cat);
                setFilters(prev => ({ ...prev, subCategory: 'all' })); // reset subCategory
            }} />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <FilterSidebar selectedCategory={selectedCategory} filters={filters} onFilterChange={handleFilterChange} />

                {/* Product list */}
                <ProductsList products={productsData} filters={filters} selectedCategory={selectedCategory} />
            </div>
        </div>
    );
}
