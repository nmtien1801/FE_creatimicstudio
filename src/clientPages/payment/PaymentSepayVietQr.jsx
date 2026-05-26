/**
 * 🎨 FRONTEND: VietQR + Sepay Payment Component
 * ============================================================
 * FIX: Cleanup interval đúng cách, auto-create order khi mount,
 *      xử lý expiresAt từ server thay vì tính lại client-side
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import ApiPaymentSepay from "../../apis/ApiPaymentSepay";

const PaymentSepayVietQr = ({ orderItems, totalAmount, onPaymentSuccess, bankInfo }) => {
    // ============ STATE ============
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState("idle"); // idle | pending | paid | expired | error
    const [error, setError] = useState(null);
    const [pollingActive, setPollingActive] = useState(false);

    // ✅ FIX: Dùng ref để lưu interval IDs → cleanup đúng khi unmount
    const pollIntervalRef = useRef(null);
    const countdownIntervalRef = useRef(null);

    // ============ CLEANUP ============

    const stopPolling = useCallback(() => {
        if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
        }
        setPollingActive(false);
    }, []);

    const stopCountdown = useCallback(() => {
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
        }
    }, []);

    // ✅ FIX: Cleanup khi unmount — tránh memory leak và state update trên component đã unmount
    useEffect(() => {
        return () => {
            stopPolling();
            stopCountdown();
        };
    }, [stopPolling, stopCountdown]);

    // ============ HELPERS ============

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    const formatTimeRemaining = (ms) => {
        if (!ms || ms <= 0) return "0:00";
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    // ============ API CALLS ============

    const handleCreateOrder = useCallback(async () => {
        // Cleanup bất kỳ interval nào đang chạy từ order cũ
        stopPolling();
        stopCountdown();

        try {
            setLoading(true);
            setError(null);
            setPaymentStatus("idle");

            if (!bankInfo?.bankBin || !bankInfo?.accountNo) {
                throw new Error("Thiếu thông tin tài khoản ngân hàng");
            }

            if (!totalAmount || totalAmount <= 0) {
                throw new Error("Số tiền không hợp lệ");
            }

            const response = await ApiPaymentSepay.createOrder({
                totalAmount,
                description: `Thanh toan don hang ${Date.now()}`,
                items: orderItems,
                bankBin: bankInfo.bankBin,
                accountNo: bankInfo.accountNo,
                accountName: bankInfo.accountName || "CREATIMIC STUDIO",
                acqId: bankInfo.acqId || null,
            });

            if (!response.success) {
                throw new Error(response.message || "Lỗi tạo đơn hàng");
            }

            console.log("✅ Order created:", response.order);

            setOrder(response);
            setPaymentStatus("pending");

            // ✅ FIX: Dùng expiresAt từ server thay vì tính lại (15*60*1000) ở client
            // Tránh lệch thời gian giữa client và server
            const expiresAt = new Date(response.order.expiresAt).getTime();
            startCountdown(expiresAt);
            startPolling(response.order.orderId, expiresAt);
        } catch (err) {
            console.error("❌ Create order error:", err);
            setError(err.message || "Lỗi tạo đơn hàng");
            setPaymentStatus("error");
        } finally {
            setLoading(false);
        }
    }, [bankInfo, totalAmount, orderItems, stopPolling, stopCountdown]);

    // ✅ FIX: Auto-create order khi component mount thay vì yêu cầu user bấm nút
    // (vì component này chỉ được render khi user đã chọn Sepay ở modal)
    useEffect(() => {
        handleCreateOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Chỉ chạy 1 lần khi mount

    /**
     * ✅ FIX: Nhận expiresAt từ server, dừng poll khi expired
     */
    const startPolling = useCallback((orderId, expiresAt) => {
        setPollingActive(true);

        pollIntervalRef.current = setInterval(async () => {
            // Dừng poll nếu đã hết hạn
            if (Date.now() >= expiresAt) {
                stopPolling();
                return;
            }

            try {
                const response = await ApiPaymentSepay.getOrderStatus(orderId);
                const { order: updatedOrder } = response;

                console.log("📊 Polling result:", updatedOrder.status);

                if (updatedOrder.status === "paid") {
                    setPaymentStatus("paid");
                    setOrder(prev => ({ ...prev, order: updatedOrder }));
                    stopPolling();
                    stopCountdown();
                    if (onPaymentSuccess) onPaymentSuccess(response);
                    return;
                }

                if (updatedOrder.status === "cancelled" || updatedOrder.status === "failed") {
                    setPaymentStatus("expired");
                    setError("Đơn hàng đã hết hạn hoặc thanh toán thất bại");
                    stopPolling();
                    stopCountdown();
                    return;
                }
            } catch (err) {
                console.error("❌ Polling error:", err.message);
                // Tiếp tục poll dù có lỗi mạng tạm thời
            }
        }, 5000);
    }, [stopPolling, stopCountdown, onPaymentSuccess]);

    /**
     * ✅ FIX: Nhận expiresAt tuyệt đối từ server thay vì tính client-side
     */
    const startCountdown = useCallback((expiresAt) => {
        countdownIntervalRef.current = setInterval(() => {
            const remaining = expiresAt - Date.now();

            if (remaining <= 0) {
                setTimeRemaining(0);
                setPaymentStatus("expired");
                stopCountdown();
                stopPolling();
            } else {
                setTimeRemaining(remaining);
            }
        }, 1000);

        // Cập nhật ngay lập tức lần đầu (không chờ 1 giây)
        setTimeRemaining(expiresAt - Date.now());
    }, [stopCountdown, stopPolling]);

    const handleRetry = () => {
        setOrder(null);
        setPaymentStatus("idle");
        setError(null);
        setTimeRemaining(null);
        handleCreateOrder();
    };

    // ============ RENDER ============

    // 🔄 Loading state — hiện khi đang tạo order
    if (loading) {
        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col items-center justify-center min-h-80">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
                <p className="text-gray-600 font-medium">Đang tạo mã QR...</p>
            </div>
        );
    }

    // ❌ Error state — không có order
    if (paymentStatus === "error" && !order) {
        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
                <div className="text-5xl mb-4">⚠️</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Lỗi tạo đơn hàng</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <button
                    onClick={handleRetry}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                    Thử lại
                </button>
            </div>
        );
    }

    // ✅ Payment success
    if (paymentStatus === "paid") {
        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">Thanh toán thành công!</h3>
                <p className="text-gray-600 mb-6">Cảm ơn bạn đã sử dụng dịch vụ.</p>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-left space-y-2">
                    <p className="text-sm">
                        <strong className="text-green-700">Mã đơn hàng:</strong> {order?.order?.orderId}
                    </p>
                    <p className="text-sm">
                        <strong className="text-green-700">Số tiền:</strong>{" "}
                        {formatCurrency(order?.order?.totalAmount || totalAmount)}
                    </p>
                    {order?.order?.paidAt && (
                        <p className="text-sm">
                            <strong className="text-green-700">Thời gian:</strong>{" "}
                            {new Date(order.order.paidAt).toLocaleString("vi-VN")}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // ⏰ Pending — hiển thị QR
    if (!order) return null; // Tránh render khi chưa có data

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">📱 Quét mã QR để thanh toán</h2>

                {/* Timer */}
                {timeRemaining !== null && (
                    <div
                        className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold mt-4 ${
                            timeRemaining < 60000
                                ? "bg-red-100 text-red-800 border-l-4 border-red-500"
                                : timeRemaining < 3 * 60 * 1000
                                ? "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500"
                                : "bg-blue-100 text-blue-800 border-l-4 border-blue-500"
                        }`}
                    >
                        ⏱️ Thời gian còn lại:{" "}
                        <strong>{formatTimeRemaining(timeRemaining)}</strong>
                    </div>
                )}
            </div>

            {/* VietQR QR Code */}
            {order?.payment?.vietqr?.qrImageUrl && (
                <div className="text-center mb-8">
                    <div className="inline-block bg-white p-4 border-2 border-dashed border-blue-600 rounded-lg">
                        <img
                            src={order.payment.vietqr.qrImageUrl}
                            alt="VietQR Payment Code"
                            className="w-64 h-64 rounded"
                            loading="lazy"
                        />
                        <p className="text-gray-600 text-sm font-medium mt-2">
                            Quét mã bằng ứng dụng ngân hàng
                        </p>
                    </div>
                </div>
            )}

            {/* Payment Details */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">💰 Thông tin chuyển khoản</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Ngân hàng:</span>
                        <span className="font-medium text-gray-800">
                            {bankInfo?.bankName || "Vietcombank"}
                        </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Số tài khoản:</span>
                        <span className="font-medium text-gray-800">
                            {order?.payment?.vietqr?.accountNumber}
                        </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Tên tài khoản:</span>
                        <span className="font-medium text-gray-800">
                            {order?.payment?.vietqr?.accountName}
                        </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Số tiền:</span>
                        <span className="font-bold text-blue-600">
                            {order?.payment?.vietqr?.amount}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Nội dung CK:</span>
                        <span className="font-medium text-gray-800 text-right max-w-xs break-all">
                            {order?.payment?.vietqr?.description}
                        </span>
                    </div>
                </div>
            </div>

            {/* Polling indicator */}
            {pollingActive && paymentStatus !== "expired" && (
                <div className="flex items-center justify-center p-3 bg-blue-50 rounded-lg mb-4 border border-blue-200">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-200 border-t-blue-600 mr-2"></div>
                    <span className="text-blue-800 text-sm font-medium">
                        Đang kiểm tra thanh toán...
                    </span>
                </div>
            )}

            {/* Expired state */}
            {paymentStatus === "expired" && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
                    <strong className="text-red-800 block mb-1">⏰ Đơn hàng hết hạn</strong>
                    <p className="text-red-700 text-sm mb-3">
                        Vui lòng thực hiện thanh toán trong thời gian quy định
                    </p>
                    <button
                        onClick={handleRetry}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition text-sm"
                    >
                        Tạo mã mới
                    </button>
                </div>
            )}

            {/* Instructions */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">📖 Hướng dẫn:</h4>
                <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                    <li>Mở ứng dụng ngân hàng trên điện thoại</li>
                    <li>Chọn "Quét mã QR" hoặc "Thanh toán QR"</li>
                    <li>Quét mã QR ở trên</li>
                    <li>Kiểm tra nội dung chuyển khoản và xác nhận</li>
                </ol>
            </div>
        </div>
    );
};

export default PaymentSepayVietQr;