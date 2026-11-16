import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw, Search, Star, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import ApiProduct from "../../apis/ApiProduct";
import ApiReview from "../../apis/ApiReview";
import ImageLoader from "../../components/FormFields/ImageLoader";

const PAGE_SIZE = 20;

const getErrorMessage = (error, fallback) =>
  error.response?.data?.EM || error.response?.data?.message || error.message || fallback;

const formatDate = (date) =>
  date
    ? new Intl.DateTimeFormat("vi-VN", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date(date))
    : "—";

export default function ProductReviews() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [deletingReviewId, setDeletingReviewId] = useState(null);
  const [loadError, setLoadError] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const response = await ApiProduct.getListProductDropdownApi();
      if (response?.EC !== 0 || !Array.isArray(response.DT)) {
        throw new Error(response?.EM || "Không thể tải danh sách sản phẩm.");
      }
      setProducts(response.DT);
    } catch (error) {
      console.error("Lỗi tải danh sách sản phẩm khi quản lý đánh giá:", error);
      toast.error(getErrorMessage(error, "Không thể tải danh sách sản phẩm."));
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  const fetchReviews = useCallback(async () => {
    setLoadingReviews(true);
    setLoadError("");
    try {
      const response = await ApiReview.getReviewsForAdminApi({
        page,
        limit: PAGE_SIZE,
        ...(productId ? { productId } : {}),
      });
      if (response?.EC !== 0 || !Array.isArray(response.DT?.reviews)) {
        throw new Error(response?.EM || "Không thể tải danh sách đánh giá.");
      }
      setReviews(response.DT.reviews);
      setTotal(Number(response.DT.total) || 0);
    } catch (error) {
      console.error("Lỗi tải danh sách đánh giá:", error);
      setLoadError(getErrorMessage(error, "Không thể tải danh sách đánh giá."));
    } finally {
      setLoadingReviews(false);
    }
  }, [page, productId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const filteredReviews = useMemo(() => {
    const term = searchTerm.trim().toLocaleLowerCase("vi");
    return reviews.filter((review) => {
      if (ratingFilter && Number(review.rating) !== Number(ratingFilter)) return false;
      if (!term) return true;
      return [
        review.comment,
        review.user?.userName,
        review.product?.name,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLocaleLowerCase("vi").includes(term));
    });
  }, [reviews, searchTerm, ratingFilter]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleDeleteReview = async (review) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đánh giá này không?")) return;

    setDeletingReviewId(review.id);
    try {
      const response = await ApiReview.deleteReviewAdminApi(review.id);
      if (response?.EC !== 0) {
        throw new Error(response?.EM || "Không thể xóa đánh giá.");
      }

      toast.success(response.EM || "Xóa đánh giá thành công.");
      setTotal((currentTotal) => Math.max(0, currentTotal - 1));
      if (reviews.length === 1 && page > 1) {
        setPage((currentPage) => currentPage - 1);
      } else {
        setReviews((currentReviews) =>
          currentReviews.filter((currentReview) => currentReview.id !== review.id),
        );
      }
    } catch (error) {
      console.error("Lỗi xóa đánh giá:", error);
      toast.error(getErrorMessage(error, "Không thể xóa đánh giá."));
    } finally {
      setDeletingReviewId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Quản lý đánh giá sản phẩm</h1>
            <p className="mt-1 text-sm text-gray-500">Theo dõi đánh giá và nhận xét của khách hàng.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              fetchProducts();
              fetchReviews();
            }}
            disabled={loadingReviews || loadingProducts}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw size={16} className={loadingReviews ? "animate-spin" : ""} />
            Làm mới
          </button>
        </div>

        <section className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-3">
            <label className="text-sm font-medium text-gray-700">
              Sản phẩm
              <select
                value={productId}
                onChange={(event) => {
                  setPage(1);
                  setProductId(event.target.value);
                }}
                disabled={loadingProducts}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Tất cả sản phẩm</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-gray-700">
              Đánh giá
              <select
                value={ratingFilter}
                onChange={(event) => setRatingFilter(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Tất cả số sao</option>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>{rating} sao</option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-gray-700">
              Tìm trong trang hiện tại
              <span className="mt-1 flex items-center gap-2 rounded-lg border border-gray-300 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <Search size={16} className="shrink-0 text-gray-400" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Tên khách, sản phẩm, nội dung..."
                  className="w-full py-2 text-sm font-normal outline-none"
                />
              </span>
            </label>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <h2 className="font-semibold text-gray-800">Danh sách đánh giá</h2>
            <span className="text-sm text-gray-500">{total} đánh giá</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-3">Khách hàng</th>
                  <th className="px-5 py-3">Sản phẩm</th>
                  <th className="px-5 py-3">Đánh giá</th>
                  <th className="px-5 py-3">Nhận xét</th>
                  <th className="px-5 py-3">Thời gian</th>
                  <th className="px-5 py-3 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loadingReviews ? (
                  <tr><td colSpan="6" className="px-5 py-10 text-center text-gray-500">Đang tải đánh giá...</td></tr>
                ) : loadError ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-10 text-center text-rose-600">
                      {loadError}
                      <button type="button" onClick={fetchReviews} className="ml-2 font-semibold underline">Thử lại</button>
                    </td>
                  </tr>
                ) : filteredReviews.length === 0 ? (
                  <tr><td colSpan="6" className="px-5 py-10 text-center text-gray-500">Không có đánh giá phù hợp.</td></tr>
                ) : filteredReviews.map((review) => (
                  <tr key={review.id} className="align-top hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-gray-800">{review.user?.userName || "Người dùng"}</td>
                    <td className="px-5 py-4 text-gray-700">{review.product?.name || "Sản phẩm đã xóa"}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
                        <Star size={15} fill="currentColor" />
                        {review.rating}/5
                      </span>
                    </td>
                    <td className="max-w-xl whitespace-pre-wrap break-words px-5 py-4 text-gray-600">
                      <p>{review.comment}</p>
                      {Array.isArray(review.images) && review.images.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {review.images.map((image, index) => (
                            <ImageLoader
                              key={`${review.id}-${image}`}
                              imagePath={image}
                              alt={`Ảnh đánh giá ${index + 1}`}
                              className="h-16 w-16 rounded-lg border border-gray-200 object-cover"
                            />
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-gray-500">{formatDate(review.createdAt)}</td>
                    <td className="px-5 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteReview(review)}
                        disabled={deletingReviewId !== null}
                        title="Xóa đánh giá"
                        aria-label={`Xóa đánh giá của ${review.user?.userName || "người dùng"}`}
                        className="rounded-lg p-2 text-rose-600 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-5 py-4 text-sm">
            <span className="text-gray-500">
              Trang {totalPages === 0 ? 0 : page} / {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page <= 1 || loadingReviews}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Trước
              </button>
              <button
                type="button"
                onClick={() => setPage((current) => current + 1)}
                disabled={page >= totalPages || loadingReviews}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Tiếp
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
