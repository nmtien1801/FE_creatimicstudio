import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ApiProduct from '../../apis/ApiProduct'
import { Mic, Radio, Battery, Zap, Shield, Phone, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import ImageLoader from '../FormFields/ImageLoader';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    let [product, setProduct] = useState({})

    useEffect(() => {
        let fetchDetail = async () => {
            let res = await ApiProduct.getProductByIdApi(id).unwrap()
            if (res && res.DT) {
                setProduct(res.DT)
            }
        }
        if (id) {
            fetchDetail()
        }
    }, [id, dispatch]);

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
            <section className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-10 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Hình ảnh sản phẩm */}
                        <div className="relative bg-[#f8f8f8] rounded-3xl p-8 flex justify-center items-center overflow-hidden group">
                            {product.discount && (
                                <div className="absolute top-0 left-0 bg-[#ed792f] text-white px-6 py-2 rounded-br-2xl font-bold uppercase tracking-widest shadow-lg">
                                    -{product.discount}%
                                </div>
                            )}
                            <ImageLoader
                                imagePath={product.image || product.images?.[0]}
                                className="w-auto h-[400px] object-contain transform group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Thông tin cơ bản */}
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
                                {product.name}
                            </h1>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {product.description}
                            </p>

                            <div className="flex items-center gap-4 mb-10">
                                <span className="text-4xl font-black text-[#ed792f]">{product.price?.toLocaleString?.('vi-VN')}₫</span>
                                {product.oldPrice && (
                                    <span className="text-xl text-gray-400 line-through">{product.oldPrice?.toLocaleString?.('vi-VN')}₫</span>
                                )}
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                                    {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 bg-black text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl">
                                    <ShoppingCart size={20} /> MUA NGAY
                                </button>
                                <a href={`tel:${product.phone || '0372672396'}`} className="flex-1 border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-50 transition-all">
                                    <Phone size={20} /> {product.phone || '037.267.2396'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. FEATURES GRID */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-2xl font-black mb-10 border-l-8 border-[#ed792f] pl-4 uppercase">Tính năng nổi bật</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={<Shield className="text-[#ed792f]" />}
                        title="Thiết kế chắc chắn"
                        desc="Thân micro làm hoàn toàn bằng kim loại với lớp sơn đen mờ tinh tế."
                    />
                    <FeatureCard
                        icon={<Radio className="text-[#ed792f]" />}
                        title="Sóng UHF ổn định"
                        desc="Hoạt động mượt mà trong phạm vi lên đến 30m, hạn chế nhiễu."
                    />
                    <FeatureCard
                        icon={<Zap className="text-[#ed792f]" />}
                        title="Chip xử lý DSP"
                        desc="Hỗ trợ giảm nhiễu và nâng cao chất lượng thu âm chuyên nghiệp."
                    />
                    <FeatureCard
                        icon={<Battery className="text-[#ed792f]" />}
                        title="Pin ấn tượng"
                        desc="Micro hoạt động liên tục 4-5 giờ, đầu thu dùng trên 10 giờ."
                    />
                    <FeatureCard
                        icon={<Mic className="text-[#ed792f]" />}
                        title="Chất âm vượt tầm giá"
                        desc="Phần lõi dynamic bắt tiếng rõ ràng, độ nhạy cao, trung thực."
                    />
                </div>
            </section>

            {/* 3. SPECIFICATIONS & DESCRIPTION */}
            <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-black mb-6 uppercase">Mô tả sản phẩm</h2>
                    <div className="prose prose-lg text-gray-600 max-w-none">
                        <p>
                            {product.fullDescription || product.description}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-black mb-6 uppercase">Thông số kỹ thuật</h2>
                    <div className="space-y-4">
                        {specs.map((item, idx) => (
                            <div key={idx} className="flex justify-between border-b border-gray-50 pb-2">
                                <span className="text-gray-500 text-sm">{item.label}</span>
                                <span className="font-semibold text-sm text-right">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

// Component con cho Feature
const FeatureCard = ({ icon, title, desc }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
        <div className="mb-4 bg-orange-50 w-12 h-12 rounded-xl flex items-center justify-center">
            {icon}
        </div>
        <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
);

export default ProductDetail;