import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ApiProduct from '../../apis/ApiProduct'
import { toast } from 'react-toastify';
import ImageLoader from '../FormFields/ImageLoader';
import ApiProductImage from "../../apis/ApiProductImage";
import { loadImage } from '../../utils/constants';

const ProductDetail = () => {
    const { id_product } = useParams();
    const dispatch = useDispatch();
    let [product, setProduct] = useState({})
    let [productImages, setProductImages] = useState([]);
    let [selectedImage, setSelectedImage] = useState(null);
    let [isLoadingImages, setIsLoadingImages] = useState(false);

    useEffect(() => {
        let fetchDetail = async () => {
            let res = await ApiProduct.getProductByIdApi(id_product)
            if (res && res.DT) {
                setProduct(res.DT)
                setSelectedImage(res.DT.image); // Set ảnh chính làm ảnh được chọn

                // Fetch các ảnh phụ
                setIsLoadingImages(true);
                try {
                    let imageRes = await ApiProductImage.getProductImagesByProductIdApi(id_product);
                    if (imageRes && imageRes.DT) {
                        // Load preview cho tất cả ảnh
                        const imagesWithPreview = await Promise.all(
                            imageRes.DT.map(async (img) => {
                                try {
                                    const previewUrl = await loadImage(img.image);
                                    return { ...img, previewUrl };
                                } catch (error) {
                                    console.error('Failed to load image:', error);
                                    return { ...img, previewUrl: img.image };
                                }
                            })
                        );
                        setProductImages(imagesWithPreview);
                    }
                } catch (error) {
                    console.error('Error loading product images:', error);
                } finally {
                    setIsLoadingImages(false);
                }
            }
        }
        if (id_product) {
            fetchDetail()
        }
    }, [id_product, dispatch]);

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-xl text-gray-600">Đang tải...</p>
                </div>
            </div>
        );
    }

    const specs = [
        { label: "Kiểu micro", value: product.specifications?.type || "Dynamic" },
        { label: "Tần số đáp ứng", value: product.specifications?.frequency || "40Hz – 18kHz" },
        { label: "Phạm vi hoạt động", value: product.specifications?.range || "Tối đa 30 mét" },
        { label: "Pin micro", value: product.specifications?.batteryMic || "1200mAh (4-5 giờ)" },
        { label: "Pin đầu thu", value: product.specifications?.batteryReceiver || "Dùng trên 10 giờ" },
        { label: "Thời gian sạc", value: product.specifications?.chargeTime || "1-2 giờ" },
        { label: "Trọng lượng", value: product.specifications?.weight || "230g" },
        { label: "Kết nối đầu ra", value: product.specifications?.connection || "Jack TRS 3.5mm" },
        { label: "Tần số UHF", value: product.specifications?.uhfFrequency || "2 dải A/B, 30 kênh mỗi dải" },
    ];

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* 1. HERO SECTION */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 py-10 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Hình ảnh sản phẩm với gallery */}
                        <div className="space-y-4">
                            {/* Ảnh chính */}
                            <div className="relative bg-[#f8f8f8] rounded-3xl p-2 flex justify-center items-center overflow-hidden group">
                                {product.discount && (
                                    <div className="absolute top-0 left-0 bg-[#ed792f] text-white px-6 py-2 rounded-br-2xl font-bold uppercase tracking-widest shadow-lg z-10">
                                        -{product.discount}%
                                    </div>
                                )}
                                <ImageLoader
                                    imagePath={selectedImage || product.image || product.images?.[0]}
                                    className="w-auto h-[400px] object-contain transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Gallery ảnh phụ */}
                            {productImages.length > 0 && (
                                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                                    {/* Ảnh chính */}
                                    <button
                                        onClick={() => setSelectedImage(product.image)}
                                        className={`relative bg-[#f8f8f8] rounded-xl p-2 overflow-hidden transition-all hover:ring-2 hover:ring-orange-400 ${selectedImage === product.image ? 'ring-2 ring-orange-500' : ''
                                            }`}
                                    >
                                        <ImageLoader
                                            imagePath={product.image}
                                            className="w-full h-20 object-contain"
                                        />
                                    </button>

                                    {/* Các ảnh phụ */}
                                    {productImages.map((img, index) => (
                                        <button
                                            key={img.id}
                                            onClick={() => setSelectedImage(img.image)}
                                            className={`relative bg-[#f8f8f8] rounded-xl p-2 overflow-hidden transition-all hover:ring-2 hover:ring-orange-400 ${selectedImage === img.image ? 'ring-2 ring-orange-500' : ''
                                                }`}
                                        >
                                            <img
                                                src={img.previewUrl || img.image}
                                                alt={`${product.name} - ${img.color}`}
                                                className="w-full h-20 object-contain"
                                            />
                                            {img.color && (
                                                <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded truncate max-w-[90%]">
                                                    {img.color}
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Loading state cho gallery */}
                            {isLoadingImages && (
                                <div className="text-center py-4">
                                    <p className="text-sm text-gray-500">Đang tải thêm ảnh...</p>
                                </div>
                            )}
                        </div>

                        {/* Thông tin cơ bản */}
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
                                {product.name}
                            </h1>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {product.description}
                            </p>

                            <div className="flex items-start gap-6 mb-10">
                                {/* Khối giá: Xếp chồng dọc */}
                                <div className="flex flex-col">
                                    <span className="text-lg text-gray-400 line-through mt-1">
                                        Giá gốc: {(Number(product.price || 0) * 1.25).toLocaleString('vi-VN')} VNĐ
                                    </span>
                                    <span className="text-2xl font-black text-red-600">
                                        Giá khuyễn mãi: {(Number(product.price || 0)).toLocaleString('vi-VN')} VNĐ
                                    </span>
                                </div>
                                <div className="self-center bg-green-700 rounded-full flex items-center shadow-md transition-all hover:bg-green-800 w-fit px-4 py-2 cursor-pointer">
                                    <span className="text-[10px] uppercase tracking-wider text-white/90 font-bold mr-2">
                                        Liên Hệ:
                                    </span>
                                    <span className="font-bold text-white tracking-wider text-[13px]">
                                        037.2672.396
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SPECIFICATIONS & DESCRIPTION */}
            <section className="max-w-7xl mx-auto px-4 grid gap-8">
                <h2 className="text-2xl font-black uppercase">Mô tả sản phẩm</h2>
                <div
                    className="prose prose-lg text-gray-600 max-w-none break-words"
                    dangerouslySetInnerHTML={{ __html: product.detail }}
                />
            </section>
        </div>
    );
};

export default ProductDetail;