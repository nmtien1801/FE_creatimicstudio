import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AdminLayout from "../components/layout/AdminLayout.jsx";
import ClientLayout from "../components/layout/ClientLayout.jsx";
import Dashboard from "../adminPages/system/Dashboard";
import ProductManager from "../adminPages/product/ProductManager.jsx";
import Category from "../adminPages/product/Category.jsx";
import NewsManager from "../adminPages/news/NewsManager.jsx";
import EmployeeRole from "../adminPages/employee/employees_roles.jsx";
import NewsDetail from "../adminPages/news/NewsDetail.jsx";
import Employee from "../adminPages/employee/employees.jsx";
import ChangePassWord from "../adminPages/system/ChangePassWord.jsx";
import ResetPassNV from "../adminPages/system/ResetPassNV.jsx";
import Account from "../adminPages/system/Account.jsx";
import Login from "../adminPages/auth/Login.jsx";
import Register from "../adminPages/auth/Register.jsx";
import UserCutVideoManager from "../adminPages/userCutVideo/UserCutVideoManager.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { GetAccount } from "../redux/authSlice";
import Cookies from "js-cookie";

import Home from "../clientPages/TrangChu.jsx";
import ServiceLive from "../clientPages/dichVu/DvLiveStream.jsx";
import ServiceTone from "../clientPages/dichVu/DvAutoTone.jsx";
import ProductPageHandler from '../components/product/ProductPageHandler.jsx'
import PaymentMomoPage from '../clientPages/payment/PaymentMomoPage.jsx'
import PaymentVietQrPage from '../clientPages/payment/PaymentVietQrPage.jsx'
import GioHang from '../clientPages/GioHang.jsx'
import ThanhToan from '../clientPages/ThanhToan.jsx'
import Review from '../clientPages/Review.jsx'

import ChinhSach1 from '../components/chinhsach/Chinhsach1.jsx'
import ChinhSach2 from '../components/chinhsach/Chinhsach2.jsx'
import ChinhSach3 from '../components/chinhsach/Chinhsach3.jsx'
import ChinhSach4 from '../components/chinhsach/Chinhsach4.jsx'

const ProtectedRoute = ({ children }) => {
  const { userInfo, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!userInfo || Object.keys(userInfo).length === 0) {
    return <Navigate to="/login" replace />;
  }

  if (userInfo.role === "client") return <Navigate to="/profile/info" replace />;

  return children;
};

const PublicRoute = ({ children }) => {
  const { userInfo, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (userInfo && Object.keys(userInfo).length > 0) {
    return <Navigate to="/profile/info" replace />;
  }

  return children;
};

function RouterRoot() {
  const dispatch = useDispatch();
  const { userInfo, isLoading, hasCheckedAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = Cookies.get("fr");

    if (token && !hasCheckedAuth && !isLoading) {
      dispatch(GetAccount());
    }
  }, [dispatch, hasCheckedAuth, isLoading]);

  return (
    <Router>
      <Routes>
        {/* public route */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Client routes */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Navigate to="trang-chu" replace />} />
          <Route path="trang-chu" element={<Home />} />
          <Route path="review-detail" element={<Review />} />

          {/* path route: /product/ */}
          {/* <Route path="/product/:id_category/:id_product" element={<ProductPageHandler />} />  */}
          <Route path="/:name/:id_category/:id_product" element={<ProductPageHandler />} />
          <Route path="dich-vu/set-up-phong-livestream" element={<ServiceLive />} />
          <Route path="dich-vu/phan-mem-auto-tone" element={<ServiceTone />} />
          <Route path="payment-momo" element={<PaymentMomoPage />} />
          <Route path="payment-vietqr" element={<PaymentVietQrPage />} />
          <Route path="gio-hang" element={<GioHang />} />
          <Route path="payment" element={<ThanhToan />} />

          <Route path="dieu-khoan-dich-vu-va-dieu-kien-giao-dich-chung" element={<ChinhSach1 />} />
          <Route path="cac-phuong-thuc-thanh-toan" element={<ChinhSach2 />} />
          <Route path="chinh-sach-van-chuyen-va-giao-nhan" element={<ChinhSach3 />} />
          <Route path="chinh-sach-bao-mat-thong-tin-ca-nhan" element={<ChinhSach4 />} />

        </Route>

        {/* private route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* route system */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile/info" element={<Account />} />
          <Route path="profile/change-password" element={<ChangePassWord />} />
          <Route path="profile/change-password-staff" element={<ResetPassNV />} />

          {/* route products */}
          <Route path="products/categories" element={<Category />} />        {/* Danh mục chung */}
          <Route path="products/list" element={<ProductManager />} />      {/* Danh sách sản phẩm */}

          {/* route news */}
          <Route path="news/detail" element={<NewsDetail />} />   {/* Đăng tin */}
          <Route path="news/manager" element={<NewsManager />} />           {/* Danh sách tin (ví dụ) */}

          {/* route hr */}
          <Route path="hr/employees" element={<Employee />} />   {/* Nhân viên */}
          <Route path="hr/roles" element={<EmployeeRole />} />      {/* Phân quyền (ví dụ) */}

          {/* route user cut video */}
          <Route path="user-cut-video/manager" element={<UserCutVideoManager />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default RouterRoot;