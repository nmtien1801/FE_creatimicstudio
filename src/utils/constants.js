import moment from "moment";
import ApiUpload from "../apis/ApiUpload.js";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const TypeUserIDCons = {
  client: "client",
  staff: "staff",
  admin: "admin",
};

const typeCategory_obligatory = {
  comboLivestream: 1,
  resPhuKienThuAm: 11,
  Loa: 12,
  Soundcard: 7,
};

const formatDate = (isoDate) => {
  if (isoDate && isoDate !== "0001-01-01T00:00:00") {
    return moment(isoDate).format("DD/MM/YYYY");
  }
  return "";
};

const formatToISODate = (displayDate) => {
  if (!displayDate) return "01/01/0001";

  const m = moment(
    displayDate,
    ["YYYY-MM-DDTHH:mm:ss.SSS", "DD/MM/YYYY"],
    true,
  );

  if (!m.isValid()) return "01/01/0001";

  return m.format("DD/MM/YYYY");
};

const getGenderDisplay = (id) => {
  return id === 0 ? "Nữ" : id === 1 ? "Nam" : "";
};

// lấy ngày đầu -> cuối tháng
const getFirstDayOfMonth = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  return firstDay.toISOString().split("T")[0];
};

const getLastDayOfMonth = () => {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return lastDay.toISOString().split("T")[0];
};

const formatToInputDate = (isoDate) => {
  if (isoDate && isoDate !== "0001-01-01T00:00:00") {
    // Cắt bỏ phần T và giờ, chỉ lấy YYYY-MM-DD
    return isoDate.split("T")[0];
  }
  return "";
};

const loadImage = async (url) => {
  try {
    if (!url) return null;

    // Gọi API lấy buffer của ảnh dựa trên path lưu trong DB
    const imageRes = await ApiUpload.GetFileApi(url);

    // Tạo blob từ arraybuffer nhận được
    const blob = new Blob([imageRes]); // Trình duyệt tự hiểu định dạng
    const previewUrl = URL.createObjectURL(blob);

    return previewUrl;
  } catch (error) {
    console.error("Lỗi khi tải ảnh:", error);
    return null;
  }
};

const loadImage2 = (path) => {
  if (!path) return null;

  // Nếu đã là URL hoàn chỉnh thì giữ nguyên
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Loại bỏ dấu '/' ở đầu nếu có để tránh xuất hiện '//' giữa base và path
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return `${BASE_URL}/upload/${normalizedPath}`;
};

const arrayBufferToUrl = (arrayBuffer) => {
  const blob = new Blob([arrayBuffer], { type: "image/png" });
  return URL.createObjectURL(blob);
};

const slug = (text) => {
  if (!text) return "";

  return text
    .toString()
    // 1. Chuyển đổi các ký tự Unicode đặc biệt (Bold, Italic từ font social) về chữ thường
    .normalize("NFKC") 
    .toLowerCase()
    // 2. Xử lý tiếng Việt (đảm bảo các chữ đ, ô, ơ... được chuyển về d, o, o)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    // 3. Xử lý các ký tự đặc biệt khác
    .replace(/([^0-z\s])/g, "-")        // Thay thế tất cả ký tự không phải chữ/số bằng dấu gạch ngang
    .replace(/\s+/g, "-")               // Thay khoảng trắng bằng gạch ngang
    .replace(/-+/g, "-")                // Loại bỏ nhiều gạch ngang liên tiếp
    .replace(/^-+/, "")                 // Cắt gạch ngang ở đầu
    .replace(/-+$/, "");                // Cắt gạch ngang ở cuối
};

export {
  TypeUserIDCons,
  typeCategory_obligatory,
  formatDate,
  formatToISODate,
  getGenderDisplay,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  loadImage,
  loadImage2,
  arrayBufferToUrl,
  formatToInputDate,
  slug,
};
