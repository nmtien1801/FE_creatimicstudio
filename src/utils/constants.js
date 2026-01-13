import moment from "moment";
import ApiUpload from "../apis/ApiUpload.js";

const TypeUserIDCons = {
  client: "client",
  staff: "staff",
  admin: "admin",
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
    true
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

const getImageLink = (path) => {
  if (!path) return "";
  return import.meta.env.VITE_BACKEND_URL + "/upload/" + path;
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

const arrayBufferToUrl = (arrayBuffer) => {
  const blob = new Blob([arrayBuffer], { type: "image/png" });
  return URL.createObjectURL(blob);
};

export {
  TypeUserIDCons,
  formatDate,
  formatToISODate,
  getGenderDisplay,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getImageLink,
  loadImage,
  arrayBufferToUrl,
  formatToInputDate,
};
