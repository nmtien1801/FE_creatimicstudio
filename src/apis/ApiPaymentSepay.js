/**
 * 🔐 FRONTEND: API Client for Sepay Payment
 * ============================================================
 * API client để giao tiếp với backend Sepay payment endpoints
 *
 * Usage:
 * const response = await ApiPaymentSepay.createOrder({...})
 * const status = await ApiPaymentSepay.getOrderStatus(orderId)
 */

import { ApiManager } from "./ApiManager";

/**
 * Tạo đơn hàng thanh toán VietQR + Sepay
 * ========================================
 *
 * @param {Object} orderData
 * @returns {Promise<Object>} Response từ backend
 */
const createOrder = (orderData) =>
  ApiManager.post(`/payment/sepay/create-order`, {
    totalAmount: orderData.totalAmount,
    description: orderData.description,
    items: orderData.items || [],
    bankBin: orderData.bankBin,
    accountNo: orderData.accountNo,
    accountName: orderData.accountName,
    acqId: orderData.acqId || null,
  });

/**
 * Lấy trạng thái đơn hàng
 * ========================================
 * @param {string} orderId - ID của đơn hàng
 */
const getOrderStatus = (orderId) =>
  ApiManager.get(`/payment/sepay/order/${orderId}`);

/**
 * Xác nhận thanh toán (Manual confirm - test only)
 * ========================================
 */
const confirmPayment = (orderId, transactionId) =>
  ApiManager.post(`/payment/sepay/confirm/${orderId}`, { transactionId });

/**
 * Poll order status với retry logic
 * ========================================
 */
const pollOrderStatus = async (orderId, maxRetries = 60, interval = 5000) => {
  let retries = 0;

  return new Promise((resolve, reject) => {
    const timer = setInterval(async () => {
      try {
        const response = await getOrderStatus(orderId);
        const { order } = response;

        console.log(
          `📊 Polling status (${retries + 1}/${maxRetries}):`,
          order.status,
        );

        // ✅ Payment success
        if (order.status === "paid") {
          clearInterval(timer);
          resolve(response);
          return;
        }

        // ❌ Payment failed or expired
        if (order.status === "cancelled" || order.status === "failed") {
          clearInterval(timer);
          reject(new Error(`Payment ${order.status}`));
          return;
        }

        retries++;

        // Timeout
        if (retries >= maxRetries) {
          clearInterval(timer);
          reject(new Error("Payment polling timeout"));
        }
      } catch (error) {
        console.error("❌ Polling error:", error.message);
        // Continue polling
      }
    }, interval);
  });
};

/**
 * Format VietQR URL
 * ========================================
 */
const formatVietQRUrl = ({
  bankBin,
  accountNo,
  amount,
  description,
  template = "compact2",
}) => {
  const baseUrl = "https://img.vietqr.io/image";
  return `${baseUrl}/${bankBin}-${accountNo}-${template}.png?amount=${
    amount || ""
  }&addInfo=${description || ""}`;
};

const ApiPaymentSepay = {
  createOrder,
  getOrderStatus,
  confirmPayment,
  pollOrderStatus,
  formatVietQRUrl,
};

export default ApiPaymentSepay;
