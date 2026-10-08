import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ApiProduct from '../../apis/ApiProduct';
import ApiReview from '../../apis/ApiReview';
import { toast } from 'react-toastify';
import ImageLoader from '../FormFields/ImageLoader';
import ApiProductImage from "../../apis/ApiProductImage";
import { loadImage } from '../../utils/constants';
import { addCartItem } from '../../redux/cartSlice';
import {
    Star,
    Truck,
    ShieldCheck,
    Minus,
    Plus,
    ShoppingCart,
    ChevronRight,
    User
} from 'lucide-react';

// Hàm tự động nhận diện và chuyển đổi link YouTube thành khung video <iframe>
const parseYouTubeEmbed = (htmlContent, defaultText = '<p>Đang cập nhật nội dung...</p>') => {
    if (!htmlContent) return defaultText;

    // 1. Chuyển đổi định dạng thẻ oembed (nếu dùng CKEditor)
    let formatted = htmlContent.replace(
        /<oembed[^>]*url=["'](?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})[^"']*["'][^>]*><\/oembed>/gi,
        (_, videoId) => `
            <div class="my-6 flex justify-center w-full">
                <div class="aspect-video w-full max-w-xl overflow-hidden rounded-lg shadow-sm">
                    <iframe
                        class="w-full h-full border-0"
                        src="https://www.youtube.com/embed/${videoId}"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
        `
    );

    // 2. Chuyển đổi link YouTube nằm trong thẻ <a> hoặc văn bản thường
    const youtubeRegex = /(?:<p>\s*)?(?:<a[^>]*href=["'])?(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[^\s<>"']*)?(?:["'][^>]*>.*?<\/a>)?(?:\s*<\/p>)?/gi;

    formatted = formatted.replace(youtubeRegex, (match, videoId) => {
        if (match.includes('src=') || match.includes('<iframe')) return match;

        return `
            <div class="my-6 flex justify-center w-full">
                <div class="aspect-video w-full max-w-xl overflow-hidden rounded-lg shadow-sm">
                    <iframe
                        class="w-full h-full border-0"
                        src="https://www.youtube.com/embed/${videoId}"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
        `;
    });

    return formatted;
};

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
    const [reviews, setReviews] = useState([]);
    const [reviewSummary, setReviewSummary] = useState({ averageRating: 0, totalReviews: 0 });
    const [reviewsPage, setReviewsPage] = useState(1);
    const [reviewEligibility, setReviewEligibility] = useState(null);
    const [reviewEligibilityLoading, setReviewEligibilityLoading] = useState(true);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState("");
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [reviewsMoreLoading, setReviewsMoreLoading] = useState(false);
    const [reviewSaving, setReviewSaving] = useState(false);
    const [reviewsError, setReviewsError] = useState("");

    // Tối ưu xử lý HTML nội dung với useMemo
    const parsedDetail = useMemo(() => {
        return parseYouTubeEmbed(product.detail, '<p>Đang cập nhật chi tiết sản phẩm...</p>');
    }, [product.detail]);

    const parsedDescription = useMemo(() => {
        return parseYouTubeEmbed(product.description, '<p>Đang cập nhật mô tả sản phẩm...</p>');
    }, [product.description]);

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

    useEffect(() => {
        let isActive = true;

        const fetchReviews = async () => {
            setReviewsLoading(true);
            setReviewsError("");
            try {
                const response = await ApiReview.getProductReviewsApi(id_product, { page: 1, limit: 20 });
                if (response?.EC !== 0 || !response?.DT) {
                    throw new Error(response?.EM || "Không thể tải đánh giá sản phẩm.");
                }
                if (isActive) {
                    setReviews(response.DT.reviews || []);
                    setReviewSummary(response.DT.summary || { averageRating: 0, totalReviews: 0 });
                    setReviewsPage(1);
                }
            } catch (error) {
                console.error("Lỗi tải đánh giá sản phẩm:", error);
                if (isActive) {
                    setReviewsError(error.response?.data?.EM || error.message || "Không thể tải đánh giá sản phẩm.");
                }
            } finally {
                if (isActive) setReviewsLoading(false);
            }
        };

        const fetchEligibility = async () => {
            if (!userInfo?.id) {
                setReviewEligibility(null);
                setReviewEligibilityLoading(false);
                return;
            }

            setReviewEligibilityLoading(true);
            try {
                const response = await ApiReview.getReviewEligibilityApi(id_product);
                if (isActive && response?.EC === 0) {
                    setReviewEligibility(response.DT);
                    if (response.DT.review) {
                        setReviewRating(response.DT.review.rating);
                        setReviewComment(response.DT.review.comment);
                    } else {
                        setReviewRating(5);
                        setReviewComment("");
                    }
                }
            } catch (error) {
                console.error("Lỗi kiểm tra điều kiện đánh giá:", error);
                if (isActive) {
                    setReviewEligibility({ canReview: false, error: error.response?.data?.EM || error.message });
                }
            } finally {
                if (isActive) setReviewEligibilityLoading(false);
            }
        };

        if (id_product) {
            fetchReviews();
            fetchEligibility();
        }

        return () => {
            isActive = false;
        };
    }, [id_product, userInfo?.id]);

    const handleSubmitReview = async (event) => {
        event.preventDefault();
        if (!reviewEligibility?.canReview) return;

        setReviewSaving(true);
        try {
            const response = await ApiReview.saveProductReviewApi(id_product, {
                rating: reviewRating,
                comment: reviewComment,
            });
            if (response?.EC !== 0 || !response?.DT) {
                throw new Error(response?.EM || "Không thể gửi đánh giá.");
            }

            setReviewEligibility((current) => ({ ...current, review: response.DT }));
            toast.success(response.EM);
            try {
                const reviewsResponse = await ApiReview.getProductReviewsApi(id_product, { page: 1, limit: 20 });
                if (reviewsResponse?.EC === 0 && reviewsResponse.DT) {
                    setReviews(reviewsResponse.DT.reviews || []);
                    setReviewSummary(reviewsResponse.DT.summary || { averageRating: 0, totalReviews: 0 });
                    setReviewsPage(1);
                    setReviewsError("");
                } else {
                    throw new Error(reviewsResponse?.EM || "Không thể làm mới danh sách đánh giá.");
                }
            } catch (refreshError) {
                console.error("Đánh giá đã lưu nhưng tải lại danh sách thất bại:", refreshError);
                toast.warning("Đánh giá đã lưu, nhưng chưa thể làm mới danh sách.");
            }
        } catch (error) {
            console.error("Lỗi gửi đánh giá sản phẩm:", error);
            toast.error(error.response?.data?.EM || error.message || "Không thể gửi đánh giá.");
        } finally {
            setReviewSaving(false);
        }
    };

    const handleLoadMoreReviews = async () => {
        const nextPage = reviewsPage + 1;
        setReviewsMoreLoading(true);
        try {
            const response = await ApiReview.getProductReviewsApi(id_product, {
                page: nextPage,
                limit: 20,
            });
            if (response?.EC !== 0 || !response?.DT) {
                throw new Error(response?.EM || "Không thể tải thêm đánh giá.");
            }
            setReviews((currentReviews) => [
                ...currentReviews,
                ...response.DT.reviews.filter(
                    (review) => !currentReviews.some((currentReview) => currentReview.id === review.id),
                ),
            ]);
            setReviewSummary(response.DT.summary || reviewSummary);
            setReviewsPage(nextPage);
        } catch (error) {
            console.error("Lỗi tải thêm đánh giá:", error);
            toast.error(error.response?.data?.EM || error.message || "Không thể tải thêm đánh giá.");
        } finally {
            setReviewsMoreLoading(false);
        }
    };

    const handleQuantityChange = (type) => {
        if (type === 'dec') {
            setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
        } else {
            setQuantity((prev) => prev + 1);
        }
    };

    // ==========================================
    // Lưu vào BE khi đăng nhập, localStorage khi là khách
    // ==========================================
    const handleAddToCart = async () => {
        const cartItem = {
            id: String(product.id || id_product || ""),
            name: String(product.name || ""),
            price: Number(product.price) || 0,
            image: typeof product.image === 'string' ? product.image : (selectedImage || ""),
            quantity: quantity,
        };

        try {
            await dispatch(addCartItem({ item: cartItem, userId: userInfo?.id })).unwrap();
            toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
        } catch (error) {
            toast.error(error.message || 'Không thể thêm sản phẩm vào giỏ hàng');
        }
    };

    const handleBuyNow = () => {
        if (!userInfo?.id) {
            toast.error('Vui lòng đăng nhập trước khi thanh toán');
            navigate('/login');
            return;
        }
        navigate('/payment', {
            state: {
                cartItems: [{
                    id: String(product.id || id_product),
                    name: String(product.name || ""),
                    price: Number(product.price) || 0,
                    image: typeof product.image === 'string' ? product.image : (selectedImage || ""),
                    quantity,
                }],
            },
        });
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
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

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

                            <div className="lg:col-span-7 flex flex-col">
                                <div className="flex items-start gap-2.5 mb-3">
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 leading-snug">
                                        {product.name}
                                    </h1>
                                </div>

                                <div className="flex items-center gap-4 text-sm pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-[#ed792f] text-base underline decoration-solid">
                                            {Number(reviewSummary.averageRating || 0).toFixed(1)}
                                        </span>
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    fill={i < Math.round(reviewSummary.averageRating || 0) ? "currentColor" : "none"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="h-4 w-px bg-gray-200" />
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <span className="font-bold text-gray-800 underline">{reviewSummary.totalReviews}</span>
                                        <span>Đánh Giá</span>
                                    </div>
                                    <div className="h-4 w-px bg-gray-200" />
                                    <div className="text-gray-500">
                                        Đã bán <span className="font-semibold text-gray-800">{Number(product.sold) || 0}</span>
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

                    {/* Chi tiết Sản Phẩm (Hỗ trợ nhúng video YouTube) */}
                    <div className="p-4 sm:p-6 lg:p-8">
                        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-3 mb-5">
                            Chi tiết Sản Phẩm
                        </h2>
                        <div
                            className="prose max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: parsedDetail,
                            }}
                        />
                    </div>

                    {/* Mô Tả Sản Phẩm (Hỗ trợ nhúng video YouTube) */}
                    <div className="p-4 sm:p-6 lg:p-8">
                        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-3 mb-5">
                            Mô Tả Sản Phẩm
                        </h2>
                        <div
                            className="prose max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: parsedDescription,
                            }}
                        />
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8">
                        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-4 mb-6">
                            ĐÁNH GIÁ KHÁCH HÀNG
                        </h2>

                        {reviewEligibility?.canReview && (
                            <form onSubmit={handleSubmitReview} className="mb-8 rounded-xl border border-orange-100 bg-orange-50/50 p-4 sm:p-5">
                                <h3 className="font-semibold text-gray-800">
                                    {reviewEligibility.review ? "Cập nhật đánh giá của bạn" : "Chia sẻ trải nghiệm sản phẩm"}
                                </h3>
                                <div className="mt-3 flex items-center gap-1" aria-label={`Đánh giá ${reviewRating} trên 5 sao`}>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <button
                                            key={rating}
                                            type="button"
                                            onClick={() => setReviewRating(rating)}
                                            aria-label={`${rating} sao`}
                                            className="p-0.5 text-amber-500"
                                        >
                                            <Star size={22} fill={rating <= reviewRating ? "currentColor" : "none"} />
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    value={reviewComment}
                                    onChange={(event) => setReviewComment(event.target.value)}
                                    maxLength={2000}
                                    required
                                    rows={4}
                                    placeholder="Nhập nhận xét của bạn về sản phẩm..."
                                    className="mt-3 w-full resize-y rounded-lg border border-gray-200 bg-white p-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                                />
                                <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                                    <span className="text-xs text-gray-500">{reviewComment.length}/2000 ký tự</span>
                                    <button
                                        type="submit"
                                        disabled={reviewSaving || !reviewComment.trim()}
                                        className="rounded-lg bg-[#ed792f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#d86620] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {reviewSaving ? "Đang gửi..." : reviewEligibility.review ? "Lưu đánh giá" : "Gửi đánh giá"}
                                    </button>
                                </div>
                            </form>
                        )}

                        {!reviewEligibilityLoading && !reviewEligibility?.canReview && (
                            <p className="mb-6 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
                                {!userInfo?.id
                                    ? "Đăng nhập và hoàn tất đơn hàng có sản phẩm này để gửi đánh giá."
                                    : "Bạn có thể đánh giá sản phẩm sau khi đơn hàng chứa sản phẩm này được hoàn tất."}
                            </p>
                        )}

                        {reviewsLoading ? (
                            <p className="py-6 text-center text-sm text-gray-500">Đang tải đánh giá...</p>
                        ) : reviewsError ? (
                            <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                                {reviewsError}
                            </div>
                        ) : reviews.length === 0 ? (
                            <p className="py-6 text-center text-sm text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</p>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {reviews.map((review) => (
                                    <article key={review.id} className="flex gap-3 py-5 first:pt-0">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100 text-gray-400">
                                            {review.user?.image
                                                ? <img src={review.user.image} alt="" className="h-full w-full object-cover" />
                                                : <User size={20} />}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-gray-800">
                                                {review.user?.userName || "Khách hàng"}
                                            </p>
                                            <div className="my-1 flex items-center gap-0.5 text-amber-500">
                                                {[1, 2, 3, 4, 5].map((rating) => (
                                                    <Star
                                                        key={rating}
                                                        size={14}
                                                        fill={rating <= review.rating ? "currentColor" : "none"}
                                                    />
                                                ))}
                                            </div>
                                            <time className="text-xs text-gray-400">
                                                {new Date(review.createdAt).toLocaleString("vi-VN")}
                                            </time>
                                            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
                                                {review.comment}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                        {!reviewsLoading && !reviewsError && reviews.length < reviewSummary.totalReviews && (
                            <button
                                type="button"
                                onClick={handleLoadMoreReviews}
                                disabled={reviewsMoreLoading}
                                className="mt-4 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {reviewsMoreLoading ? "Đang tải..." : "Xem thêm đánh giá"}
                            </button>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProductDetail;