import React, { useEffect, useMemo, useState } from "react";
import {
    BarChart3,
    Calendar,
    DollarSign,
    Download,
    PackageCheck,
    RefreshCw,
    Search,
    TrendingUp,
    UserCheck,
    Users,
} from "lucide-react";
import ApiOrder from "../../apis/ApiOrder";

const formatCurrency = (value) =>
    `${new Intl.NumberFormat("vi-VN").format(Number(value) || 0)}đ`;

export default function SalesReportPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState("all"); // 'all' hoặc 1 -> 12
    const [customerSearch, setCustomerSearch] = useState("");
    const [activeTab, setActiveTab] = useState("revenue"); // 'revenue' | 'customers'

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await ApiOrder.getAllOrdersApi();
            if (response?.EC === 0 && Array.isArray(response.DT)) {
                setOrders(response.DT);
            }
        } catch (err) {
            console.error("Lỗi khi tải đơn hàng:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Lọc chỉ các đơn ĐÃ HOÀN TẤT để tính doanh số chính xác
    const completedOrders = useMemo(() => {
        return orders.filter((o) => o.status === "completed");
    }, [orders]);

    // Danh sách các năm có đơn hàng
    const availableYears = useMemo(() => {
        const years = new Set(
            orders.map((o) => new Date(o.createdAt).getFullYear()).filter(Boolean)
        );
        if (!years.has(new Date().getFullYear())) {
            years.add(new Date().getFullYear());
        }
        return Array.from(years).sort((a, b) => b - a);
    }, [orders]);

    // Đơn hàng trong mốc thời gian lọc
    const filteredOrdersByTime = useMemo(() => {
        return completedOrders.filter((order) => {
            const d = new Date(order.createdAt);
            const matchYear = d.getFullYear() === Number(selectedYear);
            const matchMonth =
                selectedMonth === "all" || d.getMonth() + 1 === Number(selectedMonth);
            return matchYear && matchMonth;
        });
    }, [completedOrders, selectedYear, selectedMonth]);

    // Thống kê doanh số theo tháng trong năm đã chọn
    const monthlyBreakdown = useMemo(() => {
        const stats = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            revenue: 0,
            orderCount: 0,
        }));

        completedOrders.forEach((order) => {
            const d = new Date(order.createdAt);
            if (d.getFullYear() === Number(selectedYear)) {
                const m = d.getMonth(); // 0 -> 11
                stats[m].revenue += Number(order.totalAmount || 0);
                stats[m].orderCount += 1;
            }
        });

        return stats;
    }, [completedOrders, selectedYear]);

    // Thống kê khách hàng: Nhóm theo Số điện thoại
    const customerStats = useMemo(() => {
        const customerMap = {};

        // Tính trên các đơn đã hoàn tất
        completedOrders.forEach((order) => {
            const key = order.phone?.trim() || "Chưa có SĐT";
            if (!customerMap[key]) {
                customerMap[key] = {
                    phone: order.phone || "—",
                    fullName: order.fullName || "Khách vãng lai",
                    address: order.address || "—",
                    orderCount: 0,
                    totalSpent: 0,
                    lastOrderDate: order.createdAt,
                    orderIds: [],
                };
            }

            customerMap[key].orderCount += 1;
            customerMap[key].totalSpent += Number(order.totalAmount || 0);
            customerMap[key].orderIds.push(order.orderId);

            if (new Date(order.createdAt) > new Date(customerMap[key].lastOrderDate)) {
                customerMap[key].lastOrderDate = order.createdAt;
            }
        });

        const list = Object.values(customerMap);

        // Tìm kiếm khách hàng theo tên hoặc số điện thoại
        const term = customerSearch.trim().toLowerCase();
        return list
            .filter((c) => {
                if (!term) return true;
                return (
                    c.fullName.toLowerCase().includes(term) ||
                    c.phone.toLowerCase().includes(term)
                );
            })
            .sort((a, b) => b.orderCount - a.orderCount); // Ưu tiên khách mua nhiều lần lên đầu
    }, [completedOrders, customerSearch]);

    // Tổng số liệu KPI theo bộ lọc thời gian
    const totalRevenue = useMemo(() => {
        return filteredOrdersByTime.reduce(
            (sum, o) => sum + Number(o.totalAmount || 0),
            0
        );
    }, [filteredOrdersByTime]);

    const avgOrderValue = filteredOrdersByTime.length
        ? Math.round(totalRevenue / filteredOrdersByTime.length)
        : 0;

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                {/* THANH BỘ LỌC THỜI GIAN & TAB */}
                <section className="flex flex-col gap-3 border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setActiveTab("revenue")}
                            className={`border px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${activeTab === "revenue"
                                ? "border-teal-600 bg-teal-600 text-white"
                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            Doanh số theo thời gian
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("customers")}
                            className={`border px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${activeTab === "customers"
                                ? "border-teal-600 bg-teal-600 text-white"
                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            Chăm sóc khách hàng
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Calendar size={14} />
                            <span className="font-semibold">Năm:</span>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="border border-slate-200 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                            >
                                {availableYears.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <span className="font-semibold">Tháng:</span>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="border border-slate-200 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                            >
                                <option value="all">Cả năm</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        Tháng {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={fetchOrders}
                            disabled={loading}
                            className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-60"
                        >
                            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
                            Làm mới
                        </button>
                    </div>
                </section>

                {/* THẺ THỐNG KÊ NHANH */}
                <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center justify-between border border-slate-200 bg-white p-4 shadow-sm">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Tổng doanh số {selectedMonth !== "all" ? `(T${selectedMonth}/${selectedYear})` : `(${selectedYear})`}
                            </p>
                            <p className="mt-1 text-2xl font-black text-teal-700">
                                {formatCurrency(totalRevenue)}
                            </p>
                        </div>
                        <div className="border border-teal-100 bg-teal-50 p-3 text-teal-600">
                            <DollarSign size={20} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between border border-slate-200 bg-white p-4 shadow-sm">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Đơn thành công
                            </p>
                            <p className="mt-1 text-2xl font-black text-slate-900">
                                {filteredOrdersByTime.length}
                            </p>
                        </div>
                        <div className="border border-emerald-100 bg-emerald-50 p-3 text-emerald-600">
                            <PackageCheck size={20} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between border border-slate-200 bg-white p-4 shadow-sm">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Giá trị TB / đơn
                            </p>
                            <p className="mt-1 text-2xl font-black text-slate-900">
                                {formatCurrency(avgOrderValue)}
                            </p>
                        </div>
                        <div className="border border-amber-100 bg-amber-50 p-3 text-amber-600">
                            <TrendingUp size={20} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between border border-slate-200 bg-white p-4 shadow-sm">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Khách từng mua
                            </p>
                            <p className="mt-1 text-2xl font-black text-slate-900">
                                {customerStats.length}
                            </p>
                        </div>
                        <div className="border border-blue-100 bg-blue-50 p-3 text-blue-600">
                            <Users size={20} />
                        </div>
                    </div>
                </section>

                {/* TAB 1: BÁO CÁO DOANH THU CHI TIẾT */}
                {activeTab === "revenue" && (
                    <section className="space-y-4">
                        <div className="border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="mb-4 text-base font-black uppercase tracking-wide text-slate-900">
                                Doanh số các tháng trong năm {selectedYear}
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase">
                                        <tr>
                                            <th className="p-3">Tháng</th>
                                            <th className="p-3 text-center">Số đơn hoàn tất</th>
                                            <th className="p-3 text-right">Doanh số</th>
                                            <th className="p-3 text-right">Tỷ trọng năm</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                        {monthlyBreakdown.map((item) => {
                                            const percentage = totalRevenue
                                                ? ((item.revenue / totalRevenue) * 100).toFixed(1)
                                                : 0;
                                            return (
                                                <tr
                                                    key={item.month}
                                                    className="hover:bg-slate-50/80 transition"
                                                >
                                                    <td className="p-3 font-bold text-slate-900">
                                                        Tháng {item.month}
                                                    </td>
                                                    <td className="p-3 text-center">{item.orderCount}</td>
                                                    <td className="p-3 text-right font-bold text-teal-700">
                                                        {formatCurrency(item.revenue)}
                                                    </td>
                                                    <td className="p-3 text-right text-slate-500">
                                                        <span className="inline-block min-w-[45px]">
                                                            {percentage}%
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}

                {/* TAB 2: THỐNG KÊ KHÁCH HÀNG MUA MẤY LẦN */}
                {activeTab === "customers" && (
                    <section className="space-y-4">
                        <div className="flex flex-col gap-3 border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                            <div className="relative flex-1 max-w-md">
                                <Search
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    type="search"
                                    value={customerSearch}
                                    onChange={(e) => setCustomerSearch(e.target.value)}
                                    placeholder="Tìm theo tên khách hàng hoặc số điện thoại..."
                                    className="w-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs outline-none focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500"
                                />
                            </div>
                            <span className="text-xs text-slate-500 font-medium">
                                Hiển thị {customerStats.length} khách hàng
                            </span>
                        </div>

                        <div className="overflow-x-auto border border-slate-200 bg-white shadow-sm">
                            <table className="w-full text-left text-xs">
                                <thead className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase">
                                    <tr>
                                        <th className="p-3.5">Khách hàng</th>
                                        <th className="p-3.5">Số điện thoại</th>
                                        <th className="p-3.5">Địa chỉ</th>
                                        <th className="p-3.5 text-center">Số lần mua</th>
                                        <th className="p-3.5 text-right">Tổng chi tiêu</th>
                                        <th className="p-3.5 text-center">Lần mua gần nhất</th>
                                        <th className="p-3.5 text-center">Phân loại</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                    {customerStats.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center text-slate-400">
                                                Không có dữ liệu khách hàng phù hợp.
                                            </td>
                                        </tr>
                                    ) : (
                                        customerStats.map((customer, idx) => {
                                            const isVip = customer.orderCount >= 3;
                                            const isReturn = customer.orderCount === 2;

                                            return (
                                                <tr
                                                    key={idx}
                                                    className="hover:bg-slate-50 transition"
                                                >
                                                    <td className="p-3.5 font-bold text-slate-900">
                                                        {customer.fullName}
                                                    </td>
                                                    <td className="p-3.5 text-slate-600">{customer.phone}</td>
                                                    <td className="p-3.5 max-w-xs truncate text-slate-500">
                                                        {customer.address}
                                                    </td>
                                                    <td className="p-3.5 text-center">
                                                        <span className="inline-block border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-black text-slate-800">
                                                            {customer.orderCount} lần
                                                        </span>
                                                    </td>
                                                    <td className="p-3.5 text-right font-black text-teal-700">
                                                        {formatCurrency(customer.totalSpent)}
                                                    </td>
                                                    <td className="p-3.5 text-center text-slate-500">
                                                        {new Date(customer.lastOrderDate).toLocaleDateString("vi-VN")}
                                                    </td>
                                                    <td className="p-3.5 text-center">
                                                        {isVip ? (
                                                            <span className="border border-purple-200 bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700 uppercase">
                                                                Khách VIP (3+)
                                                            </span>
                                                        ) : isReturn ? (
                                                            <span className="border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 uppercase">
                                                                Khách quen (2)
                                                            </span>
                                                        ) : (
                                                            <span className="border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                                                                Mới (1 lần)
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}