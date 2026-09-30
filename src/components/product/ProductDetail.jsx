import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ApiProduct from '../../apis/ApiProduct';
import { toast } from 'react-toastify';
import ImageLoader from '../FormFields/ImageLoader';
import ApiProductImage from "../../apis/ApiProductImage";
import { loadImage } from '../../utils/constants';
import {
    Star,
    Truck,
    ShieldCheck,
    Minus,
    Plus,
    ShoppingCart,
    ChevronRight,
    ThumbsUp,
    MoreVertical,
    User
} from 'lucide-react';

const ProductDetail = () => {
    const { id_product } = useParams();
    const userInfo = useSelector((state) => state.auth?.userInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [product, setProduct] = useState({});
    const [allImages, setAllImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoadingImages, setIsLoadingImages] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    useEffect(() => {
        let fetchDetail = async () => {
            let res = await ApiProduct.getProductByIdApi(id_product);
            if (res && res.DT) {
                setProduct(res.DT);

                let mainPreviewUrl = res.DT.image;
                if (res.DT.image) {
                    try {
                        mainPreviewUrl = await loadImage(res.DT.image);
                    } catch (e) {
                        mainPreviewUrl = res.DT.image;
                    }
                }
                setSelectedImage(mainPreviewUrl);

                const list = [];
                if (res.DT.image) {
                    list.push({
                        id: 'main-img',
                        raw: res.DT.image,
                        previewUrl: mainPreviewUrl
                    });
                }

                setIsLoadingImages(true);
                try {
                    let imageRes = await ApiProductImage.getProductImagesByProductIdApi(id_product);
                    if (imageRes && imageRes.DT && Array.isArray(imageRes.DT)) {
                        const imagesWithPreview = await Promise.all(
                            imageRes.DT.map(async (img) => {
                                try {
                                    const previewUrl = await loadImage(img.image);
                                    return { ...img, raw: img.image, previewUrl };
                                } catch (error) {
                                    return { ...img, raw: img.image, previewUrl: img.image };
                                }
                            })
                        );

                        imagesWithPreview.forEach((img) => {
                            if (img.raw !== res.DT.image) {
                                list.push(img);
                            }
                        });
                    }
                } catch (error) {
                    console.error('Error loading product images:', error);
                } finally {
                    setAllImages(list);
                    setIsLoadingImages(false);
                }
            }
        };

        if (id_product) {
            fetchDetail();
        }
    }, [id_product, dispatch]);

    const handleQuantityChange = (type) => {
        if (type === 'dec') {
            setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
        } else {
            setQuantity((prev) => prev + 1);
        }
    };

    const handleAddToCart = () => {
        toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
    };

    const handleBuyNow = () => {
        if (!userInfo?.id) {
            toast.error('Vui lòng đăng nhập trước khi thanh toán');
            navigate('/dang-nhap');
            return;
        }
        setShowPaymentModal(true);
    };

    const goToPayment = (type) => {
        const cleanProduct = {
            id: String(product.id || id_product || ""),
            name: String(product.name || ""),
            price: Number(product.price) || 0,
            image: typeof product.image === 'string' ? product.image : "",
            quantity: quantity,
        };

        const path = type === 'momo' ? '/payment-momo' : '/payment-vietqr';
        navigate(path, { state: { product: cleanProduct } });
        setShowPaymentModal(false);
    };

    if (!product || Object.keys(product).length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <p className="text-base text-gray-500 font-medium">Đang tải chi tiết sản phẩm...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#f5f5f5] min-h-screen py-6 sm:py-8">
            <div className="max-w-[1300px] mx-auto px-4">

                {/* KHỐI LIỀN TOÀN BỘ TRANG SẢN PHẨM */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                    {/* PHẦN 1: HÌNH ẢNH & THÔNG TIN MUA HÀNG */}
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

                            {/* CỘT TRÁI: ẢNH LỚN & THUMBNAILS (5/12) */}
                            <div className="lg:col-span-5 flex flex-col">
                                <div className="relative w-full aspect-[4/3] rounded-lg border border-gray-100 flex items-center justify-center p-2 overflow-hidden bg-[#fafafa]">
                                    {selectedImage ? (
                                        <img
                                            src={selectedImage}
                                            alt={product.name || 'product'}
                                            className="w-full h-full object-contain transition-all duration-300"
                                        />
                                    ) : (
                                        <ImageLoader
                                            imagePath={product.image || null}
                                            className="w-full h-full object-contain"
                                        />
                                    )}
                                </div>

                                <div className="relative mt-4">
                                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200">
                                        {allImages.length > 0 ? (
                                            allImages.map((img, idx) => {
                                                const isActive = selectedImage === img.previewUrl;

                                                return (
                                                    <button
                                                        key={img.id || idx}
                                                        type="button"
                                                        onMouseEnter={() => setSelectedImage(img.previewUrl)}
                                                        onClick={() => setSelectedImage(img.previewUrl)}
                                                        className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md border-2 overflow-hidden p-1 bg-white cursor-pointer transition-all ${isActive
                                                            ? 'border-[#ed792f] shadow-sm ring-1 ring-[#ed792f]'
                                                            : 'border-gray-200 hover:border-[#ed792f]/70'
                                                            }`}
                                                    >
                                                        <img
                                                            src={img.previewUrl}
                                                            alt={`thumb-${idx}`}
                                                            className="w-full h-full object-contain pointer-events-none"
                                                        />
                                                    </button>
                                                );
                                            })
                                        ) : (
                                            <div className="h-16 flex items-center text-xs text-gray-400">
                                                {isLoadingImages ? 'Đang tải thêm ảnh...' : 'Không có ảnh phụ'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* CỘT PHẢI: CHI TIẾT & HÀNH ĐỘNG (7/12) */}
                            <div className="lg:col-span-7 flex flex-col">
                                <div className="flex items-start gap-2.5 mb-3">
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 leading-snug">
                                        {product.name}
                                    </h1>
                                </div>

                                <div className="flex items-center gap-4 text-sm pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-[#ed792f] text-base underline decoration-solid">
                                            4.8
                                        </span>
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill="currentColor" />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="h-4 w-px bg-gray-200" />
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <span className="font-bold text-gray-800 underline">295</span>
                                        <span>Đánh Giá</span>
                                    </div>
                                    <div className="h-4 w-px bg-gray-200" />
                                    <div className="text-gray-500">
                                        Đã bán <span className="font-semibold text-gray-800">1.2k</span>
                                    </div>
                                </div>

                                <div className="my-5 p-4 rounded-lg bg-[#fafafa] flex items-baseline gap-3">
                                    <span className="text-3xl sm:text-4xl font-black text-[#ed792f] tracking-tight">
                                        {Number(product.price || 0).toLocaleString('vi-VN')}₫
                                    </span>
                                    <span className="text-xs font-medium text-gray-400">
                                        Giá niêm yết chính hãng
                                    </span>
                                </div>

                                <div className="space-y-5 text-sm text-gray-600">
                                    <div className="flex items-start gap-6">
                                        <span className="w-28 shrink-0 text-gray-500 font-medium">Vận Chuyển</span>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Truck size={18} className="text-[#ed792f]" />
                                            <span>Giao hàng toàn quốc - Quốc tế</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6">
                                        <span className="w-28 shrink-0 text-gray-500 font-medium leading-tight">
                                            An Tâm <br /> Mua Sắm Cùng <strong className="text-gray-700 block">CMIC STUDIO</strong>
                                        </span>
                                        <div className="flex items-start gap-2 text-gray-700">
                                            <ShieldCheck size={18} className="text-[#ed792f] shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">
                                                Hàng chính hãng 100% - Hỗ trợ kỹ thuật 24/7 - Bảo hành lên đến 12 tháng
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <span className="w-28 shrink-0 text-gray-500 font-medium">Phân Loại</span>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3.5 py-1.5 rounded border border-[#ed792f] bg-orange-50 text-[#ed792f] font-semibold text-xs">
                                                {product.maSP || product.Category?.name || "Tiêu chuẩn"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 pt-2">
                                        <span className="w-28 shrink-0 text-gray-500 font-medium">Số Lượng</span>
                                        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange('dec')}
                                                className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 transition"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <input
                                                type="text"
                                                value={quantity}
                                                readOnly
                                                className="w-12 h-8 text-center text-sm font-bold text-gray-800 border-x border-gray-300 focus:outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange('inc')}
                                                className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 transition"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <span className="text-xs text-gray-400">Có sẵn sản phẩm tại cửa hàng</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 items-stretch gap-3 sm:gap-4 mt-8 pt-6 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={handleAddToCart}
                                        className="w-full min-h-[52px] flex items-center justify-center gap-2 border border-[#ed792f] bg-[#ed792f]/10 text-[#ed792f] hover:bg-[#ed792f]/20 font-bold px-4 rounded-lg transition text-sm sm:text-base"
                                    >
                                        <ShoppingCart size={20} className="shrink-0" />
                                        <span className="whitespace-nowrap">Thêm Vào Giỏ Hàng</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleBuyNow}
                                        className="w-full min-h-[52px] flex flex-col items-center justify-center bg-[#ed792f] hover:bg-[#d86620] text-white font-bold px-4 rounded-lg shadow-sm transition active:scale-98"
                                    >
                                        <span className="text-xs sm:text-sm leading-tight font-medium opacity-95">Mua Ngay</span>
                                        <span className="text-sm sm:text-base font-extrabold leading-tight">
                                            {Number(product.price || 0).toLocaleString('vi-VN')}₫
                                        </span>
                                    </button>

                                    <a
                                        href="https://zalo.me/0372672396"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full min-h-[52px] flex items-center justify-center gap-2.5 border border-blue-400 bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold px-4 rounded-lg transition text-sm sm:text-base"
                                    >
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black shrink-0">
                                            Zalo
                                        </span>
                                        <span className="whitespace-nowrap">Tư vấn Zalo</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="h-px bg-gray-100 mx-4 sm:mx-6 lg:mx-8" />

                    {/* PHẦN 2: CHI TIẾT SẢN PHẨM */}
                    <div className="p-4 sm:p-6 lg:p-8">
                        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-3 mb-5">
                            Chi tiết Sản Phẩm
                        </h2>
                        <div
                            className="prose max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: product.detail || '<p>Đang cập nhật chi tiết sản phẩm...</p>',
                            }}
                        />
                    </div>

                    <div className="h-px bg-gray-100 mx-4 sm:mx-6 lg:mx-8" />

                    {/* PHẦN 3: MÔ TẢ SẢN PHẨM */}
                    <div className="p-4 sm:p-6 lg:p-8">
                        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-3 mb-5">
                            Mô Tả Sản Phẩm
                        </h2>
                        <div
                            className="prose max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: product.description || '<p>Đang cập nhật mô tả sản phẩm...</p>',
                            }}
                        />
                    </div>

                    <div className="h-px bg-gray-100 mx-4 sm:mx-6 lg:mx-8" />

                    {/* PHẦN 4: ĐÁNH GIÁ KHÁCH HÀNG */}
                    <div className="p-4 sm:p-6 lg:p-8">
                        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-4 mb-6">
                            ĐÁNH GIÁ KHÁCH HÀNG
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200 text-gray-400">
                                    <User size={22} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-gray-800">
                                        s*****1
                                    </div>

                                    <div className="flex items-center gap-0.5 text-[#ed792f] my-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill="currentColor" />
                                        ))}
                                    </div>

                                    <div className="text-xs text-gray-400 mb-3">
                                        2025-05-28 17:03 | Phân loại hàng: {product.maSP || "43 Inch"}
                                    </div>

                                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                                        <div>
                                            <span className="text-gray-400">Đúng với mô tả: </span>
                                            <span className="text-gray-800 font-medium">Okay</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Tính năng nổi bật: </span>
                                            <span className="text-gray-800 font-medium">Đẹp</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Chất lượng sản phẩm: </span>
                                            <span className="text-gray-800 font-medium">Tốt</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-800 leading-relaxed mb-3">
                                        Shop giao hàng nhanh, đóng gói cẩn thận, được biết shop là chính hãng, nhiệt tình lắp đặt, mua hàng ở shop rất an tâm, giá cực tốt, chất lượng sản phẩm rất okay, ủng hộ shop.
                                    </p>

                                    <div className="mb-4">
                                        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-md border border-gray-200 overflow-hidden bg-gray-50 inline-block p-1">
                                            <img
                                                src={product.image ? (selectedImage || product.image) : "https://via.placeholder.com/150"}
                                                alt="Review feedback"
                                                className="w-full h-full object-cover rounded"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <button
                                            type="button"
                                            className="flex items-center gap-1.5 hover:text-[#ed792f] transition text-gray-500"
                                        >
                                            <ThumbsUp size={14} />
                                            <span>9</span>
                                        </button>

                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-gray-600 p-1"
                                        >
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* MODAL CHỌN PHƯƠNG THỨC THANH TOÁN */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in-up">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-black uppercase text-gray-900">
                                Chọn phương thức thanh toán
                            </h3>
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <button
                                onClick={() => goToPayment('momo')}
                                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-pink-500 hover:bg-pink-50/50 transition group"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="w-11 h-11 bg-pink-100 rounded-lg flex items-center justify-center font-bold text-pink-600">
                                        M
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-gray-900">Ví MoMo</div>
                                        <div className="text-xs text-gray-500">Thanh toán qua ứng dụng MoMo</div>
                                    </div>
                                </div>
                                <div className="text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight size={20} />
                                </div>
                            </button>

                            <button
                                onClick={() => goToPayment('vietqr')}
                                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-[#ed792f] hover:bg-orange-50/50 transition group"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="w-11 h-11 bg-orange-100 rounded-lg flex items-center justify-center font-bold text-[#ed792f]">
                                        QR
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-gray-900">VietQR / Ngân hàng</div>
                                        <div className="text-xs text-gray-500">Quét mã QR từ mọi ngân hàng</div>
                                    </div>
                                </div>
                                <div className="text-[#ed792f] opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight size={20} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;