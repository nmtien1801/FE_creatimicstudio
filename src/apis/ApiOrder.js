import { ApiManager } from "./ApiManager";

const ApiOrder = {
  // 1. Tạo đơn hàng mới (Nhận payload gồm thông tin nhận hàng và mảng items)
  createOrderApi: (orderData) => 
    ApiManager.post("/order/create", orderData),

  // 2. Lấy chi tiết đơn hàng theo orderId (Dùng cho trang StatusThanhToan)
  getOrderDetailApi: (orderId) => 
    ApiManager.get(`/order/detail/${encodeURIComponent(orderId)}`),

  // 3. Lấy lịch sử đơn hàng (Có thể truyền userId qua params nếu cần)
  getOrderHistoryApi: (params) => 
    ApiManager.get("/order/history", { params }),

  // 4. Lấy toàn bộ đơn hàng cho trang quản trị
  getAllOrdersApi: () =>
    ApiManager.get("/order/manager"),

  // 5. Cập nhật trạng thái đơn hàng
  updateOrderStatusApi: (orderId, status) =>
    ApiManager.patch(`/order/${encodeURIComponent(orderId)}/status`, { status }),
};

export default ApiOrder;