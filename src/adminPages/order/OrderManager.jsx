import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Package,
  RefreshCw,
  Search,
  XCircle,
  Eye,
} from "lucide-react";
import { toast } from "react-toastify";
import ApiOrder from "../../apis/ApiOrder";
import OrderDetailModal from "./PopupOrder";

const ORDER_STATUSES = [
  { value: "pending", label: "Chờ xác nhận" },
  { value: "completed", label: "Đã hoàn tất" },
  { value: "cancelled", label: "Đã hủy" },
];

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const STATUS_LABELS = Object.fromEntries(
  ORDER_STATUSES.map(({ value, label }) => [value, label]),
);

const formatCurrency = (value) =>
  `${new Intl.NumberFormat("vi-VN").format(Number(value) || 0)}đ`;

const getErrorMessage = (error, fallback) =>
  error.response?.data?.EM || error.response?.data?.message || error.message || fallback;

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [statusDrafts, setStatusDrafts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [savingOrderId, setSavingOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const response = await ApiOrder.getAllOrdersApi();
      if (response?.EC !== 0 || !Array.isArray(response.DT)) {
        throw new Error(response?.EM || "Không thể tải danh sách đơn hàng.");
      }
      setOrders(response.DT);
      setStatusDrafts(
        Object.fromEntries(response.DT.map((order) => [order.orderId, order.status])),
      );
    } catch (error) {
      console.error("Lỗi tải danh sách đơn hàng:", error);
      setLoadError(getErrorMessage(error, "Không thể tải danh sách đơn hàng."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setFromDate("");
    setToDate("");
    fetchOrders();
    toast.info("Đã làm mới danh sách và đặt lại bộ lọc.");
  };

  const filteredOrders = useMemo(() => {
    const term = searchTerm.trim().toLocaleLowerCase("vi");
    return orders.filter((order) => {
      if (statusFilter !== "all" && order.status !== statusFilter) return false;

      if (fromDate || toDate) {
        const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
        if (fromDate && orderDate < fromDate) return false;
        if (toDate && orderDate > toDate) return false;
      }

      if (!term) return true;

      return [
        order.orderId,
        order.fullName,
        order.phone,
        order.address,
        ...(order.items || []).map((item) => item.name),
      ]
        .filter(Boolean)
        .some((value) => String(value).toLocaleLowerCase("vi").includes(term));
    });
  }, [orders, searchTerm, statusFilter, fromDate, toDate]);

  const handleUpdateStatus = async (order) => {
    const status = statusDrafts[order.orderId];
    if (!status || status === order.status) return;

    setSavingOrderId(order.orderId);
    try {
      const response = await ApiOrder.updateOrderStatusApi(order.orderId, status);
      if (response?.EC !== 0 || !response.DT) {
        throw new Error(response?.EM || "Không thể cập nhật trạng thái đơn hàng.");
      }

      setOrders((currentOrders) =>
        currentOrders.map((currentOrder) =>
          currentOrder.orderId === order.orderId
            ? { ...currentOrder, status: response.DT.status }
            : currentOrder,
        ),
      );
      toast.success(response.EM || "Cập nhật trạng thái đơn hàng thành công.");

      if (selectedOrder && selectedOrder.orderId === order.orderId) {
        setSelectedOrder({ ...selectedOrder, status: response.DT.status });
      }
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái đơn hàng:", error);
      setStatusDrafts((currentDrafts) => ({
        ...currentDrafts,
        [order.orderId]: order.status,
      }));
      toast.error(getErrorMessage(error, "Không thể cập nhật trạng thái đơn hàng."));
    } finally {
      setSavingOrderId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Thống kê */}
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard label="Tổng đơn hàng" value={orders.length} icon={Package} />
          <SummaryCard
            label="Chờ xác nhận"
            value={orders.filter((order) => order.status === "pending").length}
            icon={Clock3}
            color="text-amber-600"
          />
          <SummaryCard
            label="Đã hoàn tất"
            value={orders.filter((order) => order.status === "completed").length}
            icon={CheckCircle2}
            color="text-emerald-600"
          />
          <SummaryCard
            label="Đã hủy"
            value={orders.filter((order) => order.status === "cancelled").length}
            icon={XCircle}
            color="text-rose-600"
          />
        </section>

        {/* Bộ lọc & Tìm kiếm */}
        <section className="flex flex-col gap-2.5 rounded-none border border-slate-200 bg-white p-3 shadow-sm lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Tìm mã đơn, khách hàng, số điện thoại hoặc sản phẩm..."
              className="w-full rounded-none border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs outline-none transition focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500"
            />
          </label>

          <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="whitespace-nowrap font-medium">Từ</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="cursor-pointer rounded-none border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="whitespace-nowrap font-medium">Đến</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="cursor-pointer rounded-none border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Lọc theo trạng thái đơn hàng"
            className="rounded-none border border-slate-200 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          >
            <option value="all">Tất cả trạng thái</option>
            {ORDER_STATUSES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleResetFilters}
            disabled={loading}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-none border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Làm mới
          </button>
        </section>

        {/* Danh sách thẻ đơn hàng (4 thẻ / hàng) */}
        {loading ? (
          <div className="rounded-none border border-slate-200 bg-white py-16 text-center text-sm text-slate-500">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-teal-100 border-t-teal-600" />
            Đang tải danh sách đơn hàng...
          </div>
        ) : loadError ? (
          <div className="rounded-none border border-rose-200 bg-white p-8 text-center">
            <p className="font-semibold text-rose-700">Không thể tải đơn hàng</p>
            <p className="mt-2 text-sm text-slate-500">{loadError}</p>
            <button
              type="button"
              onClick={fetchOrders}
              className="mt-4 rounded-none bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
            >
              Thử lại
            </button>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="rounded-none border border-slate-200 bg-white py-16 text-center">
            <Package size={32} className="mx-auto text-slate-300" />
            <p className="mt-3 text-sm font-semibold text-slate-700">
              {orders.length ? "Không tìm thấy đơn hàng phù hợp." : "Chưa có đơn hàng nào."}
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredOrders.map((order) => {
              const draftStatus = statusDrafts[order.orderId] ?? order.status;
              const isSaving = savingOrderId === order.orderId;
              return (
                <article
                  key={order.orderId}
                  className="flex flex-col overflow-hidden rounded-none border border-slate-200 bg-white shadow-sm"
                >
                  <div className="flex flex-col gap-2 border-b border-slate-100 p-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <h2 className="truncate text-sm font-extrabold text-slate-900">
                        {order.orderId}
                      </h2>
                      <span
                        className={`rounded-none border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${STATUS_STYLES[order.status] || "border-slate-200 bg-slate-100 text-slate-700"
                          }`}
                      >
                        {STATUS_LABELS[order.status] || order.status}
                      </span>
                    </div>
                    <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <CalendarDays size={13} />
                      {new Date(order.createdAt).toLocaleString("vi-VN")}
                    </p>
                  </div>

                  <div className="flex-1 p-3.5">
                    <p className="mb-0.5 truncate text-sm font-semibold text-slate-800">
                      {order.fullName || "Khách hàng ẩn danh"}
                    </p>
                    <p className="mb-2 text-xs text-slate-500">{order.phone || "—"}</p>
                    <p className="text-base font-black text-teal-700">
                      {formatCurrency(order.totalAmount)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 border-t border-slate-100 p-3.5">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      className="flex w-full items-center justify-center gap-1.5 rounded-none border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      <Eye size={14} /> Xem chi tiết
                    </button>
                    <div className="flex gap-1.5">
                      <select
                        value={draftStatus}
                        onChange={(event) =>
                          setStatusDrafts((currentDrafts) => ({
                            ...currentDrafts,
                            [order.orderId]: event.target.value,
                          }))
                        }
                        disabled={isSaving}
                        className="flex-1 rounded-none border border-slate-200 bg-white px-1.5 py-1.5 text-[11px] outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 disabled:opacity-60"
                      >
                        {ORDER_STATUSES.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order)}
                        disabled={isSaving || draftStatus === order.status}
                        className="rounded-none bg-teal-600 px-2.5 py-1.5 text-xs font-bold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                      >
                        {isSaving ? "..." : "Lưu"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Gọi Modal Popup */}
      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}

function SummaryCard({ label, value, icon: Icon, color = "text-teal-600" }) {
  return (
    <div className="flex items-center justify-between rounded-none border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="mt-1 text-2xl font-black text-slate-900">{value}</p>
      </div>
      <div className={`rounded-none border border-slate-100 bg-slate-50 p-3 ${color}`}>
        <Icon size={20} />
      </div>
    </div>
  );
}