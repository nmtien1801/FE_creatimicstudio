import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import { useDispatch, useSelector } from 'react-redux';
import ApiProduct from '../../apis/ApiProduct'
import { toast } from 'react-toastify';
import ImageLoader from '../FormFields/ImageLoader';
import ApiProductImage from "../../apis/ApiProductImage";
import { loadImage } from '../../utils/constants';

const ProductDetail = () => {
    const { id_product } = useParams();
    const navigate = useNavigate(); // Hook để chuyển trang
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
                setSelectedImage(res.DT.image);

                setIsLoadingImages(true);
                try {
                    let imageRes = await ApiProductImage.getProductImagesByProductIdApi(id_product);
                    if (imageRes && imageRes.DT) {
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

    // Hàm xử lý thanh toán
    const handleCheckout = () => {
        toast.success("Đang chuyển hướng đến trang thanh toán...");
        navigate('/payment', { state: { product } });
    };

    if (!product || Object.keys(product).length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-xl text-gray-600">Đang tải...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 py-10 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Hình ảnh sản phẩm */}
                        <div className="space-y-4">
                            <div className="relative bg-[#f8f8f8] rounded-3xl p-2 flex justify-center items-center overflow-hidden group">
                                {product.discount && (
                                    <div className="absolute top-0 left-0 bg-[#ed792f] text-white px-6 py-2 rounded-br-2xl font-bold uppercase tracking-widest shadow-lg z-10">
                                        -{product.discount}%
                                    </div>
                                )}
                                <ImageLoader
                                    imagePath={selectedImage || product.image}
                                    className="w-auto h-[400px] object-contain transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Gallery */}
                            {productImages.length > 0 && (
                                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                                    <button
                                        onClick={() => setSelectedImage(product.image)}
                                        className={`relative bg-[#f8f8f8] rounded-xl p-2 overflow-hidden transition-all hover:ring-2 hover:ring-orange-400 ${selectedImage === product.image ? 'ring-2 ring-orange-500' : ''}`}
                                    >
                                        <ImageLoader imagePath={product.image} className="w-full h-20 object-contain" />
                                    </button>
                                    {productImages.map((img) => (
                                        <button
                                            key={img.id}
                                            onClick={() => setSelectedImage(img.image)}
                                            className={`relative bg-[#f8f8f8] rounded-xl p-2 overflow-hidden transition-all hover:ring-2 hover:ring-orange-400 ${selectedImage === img.image ? 'ring-2 ring-orange-500' : ''}`}
                                        >
                                            <img src={img.previewUrl || img.image} alt={product.name} className="w-full h-20 object-contain" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Thông tin sản phẩm */}
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
                                {product.name}
                            </h1>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {product.description}
                            </p>

                            <div className="flex flex-col gap-6 mb-10">
                                {/* Khối giá */}
                                <div className="flex flex-col">
                                    <span className="text-lg text-gray-400 line-through">
                                        Giá gốc: {(Number(product.price || 0) * 1.25).toLocaleString('vi-VN')} VNĐ
                                    </span>
                                    <span className="text-3xl font-black text-red-600">
                                        {(Number(product.price || 0)).toLocaleString('vi-VN')} VNĐ
                                    </span>
                                </div>

                                {/* NÚT THANH TOÁN MỚI */}
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleCheckout}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider"
                                    >
                                        Mua ngay - Thanh toán
                                    </button>

                                    {/* Giữ lại số hotline nhỏ nếu cần hỗ trợ */}
                                    <a
                                        href="tel:0372672396"
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-4 rounded-xl flex items-center justify-center transition"
                                        title="Gọi tư vấn"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 mt-10">
                <h2 className="text-2xl font-black uppercase mb-6">Mô tả sản phẩm</h2>
                <div
                    className="prose prose-lg text-gray-600 max-w-none break-words bg-white p-8 rounded-3xl shadow-sm"
                    dangerouslySetInnerHTML={{ __html: product.detail }}
                />
            </section>
        </div>
    );
};

export default ProductDetail;