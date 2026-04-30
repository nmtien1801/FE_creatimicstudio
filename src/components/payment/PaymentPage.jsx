import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ApiPayment from '../../apis/ApiPayment';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userInfo = useSelector(state => state.auth?.userInfo);

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [qrCode, setQrCode] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('momo');

    // Sử dụng useRef để quản lý interval, tránh lỗi memory leak và undefined properties
    const intervalRef = useRef(null);

    const product_data = location.state?.product;

    useEffect(() => {
        if (product_data) {
            setProduct(product_data);
        } else {
            toast.error('Không tìm thấy thông tin sản phẩm');
            navigate(-1);
        }

        // Cleanup function: xóa interval khi component bị hủy (người dùng thoát trang)
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [product_data, navigate]);

    const handleCreateMomoQr = async () => {
        if (!userInfo?.id) {
            toast.error('Vui lòng đăng nhập trước khi thanh toán');
            return;
        }

        if (!product) {
            toast.error('Không tìm thấy thông tin sản phẩm');
            return;
        }

        setIsLoading(true);
        try {
            const totalPrice = product.price * quantity;
            const paymentData = {
                userId: userInfo.id,
                productId: product.id,
                productName: product.name,
                quantity: quantity,
                amount: totalPrice,
                description: `Thanh toán cho ${product.name} x${quantity}`,
                paymentMethod: 'momo',
            };

            const response = await ApiPayment.createMomoQrApi(paymentData);

            if (response && response.DT) {
                setOrderId(response.DT.orderId);
                setQrCode(response.DT.qrCode);
                setPaymentStatus('pending');
                toast.success('QR Code MoMo được tạo thành công');
                pollPaymentStatus(response.DT.orderId);
            } else {
                toast.error(response.EM || 'Lỗi khi tạo QR Code');
            }
        } catch (error) {
            console.error('Error creating MoMo QR:', error);
            toast.error('Lỗi khi tạo QR Code thanh toán');
        } finally {
            setIsLoading(false);
        }
    };

    const pollPaymentStatus = (currentOrderId) => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(async () => {
            try {
                const response = await ApiPayment.checkPaymentStatusApi(currentOrderId);

                if (response && response.DT) {
                    if (response.DT.status === 'success' || response.DT.status === 'completed') {
                        setPaymentStatus('success');
                        toast.success('Thanh toán thành công!');
                        if (intervalRef.current) clearInterval(intervalRef.current);

                        // Quay lại trang trước đó sau 2 giây
                        setTimeout(() => {
                            navigate(-1); 
                        }, 2000);
                    } else if (response.DT.status === 'failed' || response.DT.status === 'cancelled') {
                        setPaymentStatus('failed');
                        toast.error('Thanh toán thất bại hoặc bị hủy');
                        if (intervalRef.current) clearInterval(intervalRef.current);
                    }
                }
            } catch (error) {
                console.error('Error checking payment status:', error);
            }
        }, 3000);

        // Tự động dừng sau 15 phút
        setTimeout(() => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }, 15 * 60 * 1000);
    };

    const totalPrice = product ? product.price * quantity : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-gray-900 mb-2">Thanh Toán MoMo</h1>
                    <p className="text-gray-600">Quét mã QR để hoàn tất đơn hàng</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Chi tiết đơn hàng</h2>
                            {product && (
                                <>
                                    <div className="flex gap-4 mb-4">
                                        <img
                                            src={product.image || null} // Sửa lỗi src="" thành null
                                            alt={product.name}
                                            className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">{product.name}</h3>
                                            <p className="text-red-600 font-bold">
                                                {Number(product.price).toLocaleString('vi-VN')} VNĐ
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-6 flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                                        <label className="text-gray-700 font-semibold">Số lượng:</label>
                                        <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="px-3 py-2 hover:bg-gray-100"
                                            > − </button>
                                            <span className="px-4 py-2 font-bold">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="px-3 py-2 hover:bg-gray-100"
                                            > + </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2 border-t pt-4">
                                        <div className="flex justify-between text-lg font-bold bg-red-50 p-3 rounded-lg mt-4">
                                            <span>Tổng cộng:</span>
                                            <span className="text-red-600">{totalPrice.toLocaleString('vi-VN')} VNĐ</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                            {!qrCode ? (
                                <>
                                    <div className="mb-6">
                                        <svg className="w-20 h-20 mx-auto text-orange-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Sẵn sàng thanh toán?</h3>
                                        <p className="text-gray-600">Nhấn nút bên dưới để tạo mã QR MoMo</p>
                                    </div>
                                    <button
                                        onClick={handleCreateMomoQr}
                                        disabled={isLoading}
                                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95"
                                    >
                                        {isLoading ? 'Đang tạo QR Code...' : 'Tạo Mã QR MoMo'}
                                    </button>
                                </>
                            ) : paymentStatus === 'pending' ? (
                                <>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Mã QR MoMo Sandbox</h3>
                                    <div className="bg-gray-100 p-4 rounded-lg mb-4 inline-block">
                                        {/* Sửa lỗi src="" tại đây bằng cách kiểm tra qrCode */}
                                        <img
                                            src={qrCode || null}
                                            alt="MoMo QR Code"
                                            className="w-64 h-64 object-contain"
                                        />
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">Quét mã bằng ứng dụng MoMo Sandbox</p>
                                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <p className="text-yellow-800 font-semibold text-sm">⏳ Hết hạn sau 15 phút</p>
                                    </div>
                                </>
                            ) : paymentStatus === 'success' ? (
                                <div className="py-8">
                                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-green-600 mb-2">Thành công!</h3>
                                    <p className="text-sm text-gray-500">Đang quay lại trang sản phẩm...</p>
                                </div>
                            ) : (
                                <div className="py-8">
                                    <h3 className="text-2xl font-bold text-red-600 mb-2">Thanh toán thất bại</h3>
                                    <button
                                        onClick={() => { setQrCode(null); setPaymentStatus(null); }}
                                        className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl mt-4"
                                    > Thử lại </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <button onClick={() => navigate(-1)} className="text-orange-600 hover:text-orange-700 font-semibold underline">
                        ← Quay lại trang trước
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;