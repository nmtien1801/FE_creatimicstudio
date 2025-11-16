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
import ScheduleMonth from "../adminPages/schedule/Schedule_teach_month.jsx";
import Lookup from "../adminPages/schedule/Lookup.jsx";
import ScheduleExamMonth from "../adminPages/schedule/Schedule_exam_month.jsx";
import TimetableClass from "../adminPages/schedule/Timetable_class.jsx";
import Timetable from "../adminPages/schedule/Timetable.jsx";
import Lesson from "../adminPages/schedule/Lesson.jsx";
import ScheduleDay from "../adminPages/schedule/Schedule_day.jsx";
import FinalExam from "../adminPages/grades/FinalExam.jsx";
import GraduationExam from "../adminPages/grades/GraduationExam.jsx";
import LookUpFinalExam from "../adminPages/grades/LookupFinalExam.jsx";
import LookUpGraduationExam from "../adminPages/grades/LookupGraduationExam.jsx";
import PrintTranscript from "../adminPages/grades/PrintTranscript.jsx";
import LearningResults from "../adminPages/result/LearningResults.jsx";
import Notification from "../adminPages/notification/Notification.jsx";
import ChangePassStudent from "../adminPages/system/ChangePassStudent.jsx";
import ChangePassTC from "../adminPages/system/ChangePassTC.jsx";
import Account from "../adminPages/system/Account.jsx";
import Login from "../adminPages/auth/Login.jsx";
import Register from "../adminPages/auth/Register.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { GetAccount } from "../redux/authSlice";
import Cookies from "js-cookie";

import Home from "../clientPages/TrangChu.jsx";
import About from "../clientPages/GioiThieu.jsx";
import Products from "../clientPages/SanPham.jsx";
import News from "../clientPages/TinTuc.jsx";
import Careers from "../clientPages/TuyenDung.jsx";
import Contact from "../clientPages/LienHe.jsx";
import JobDetail from '../components/hire/JobDetail';

const ProtectedRoute = ({ children, role }) => {
  const { userInfo, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!userInfo || Object.keys(userInfo).length === 0) {
    return <Navigate to="/login" replace />;
  }

  if (role && userInfo.role !== role) return <Navigate to="/" replace />;

  return children;
};

const PublicRoute = ({ children }) => {
  const { userInfo, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (userInfo && Object.keys(userInfo).length > 0) {
    return <Navigate to="/dashboard" replace />;
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

  console.log('userInfo ', userInfo);

  return (
    <Router>
      <Routes>
        {/* public route */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Client routes */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="news" element={<News />} />
          <Route path="careers" element={<Careers />} />
          <Route path="/careers/:id" element={<JobDetail />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* private route */}
        <Route
          path="/"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* route system */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="change-pass-student" element={<ChangePassStudent />} />
          <Route path="change-pass-tc" element={<ChangePassTC />} />
          <Route path="account" element={<Account />} />

          {/* route schedule */}
          <Route path="scheduleMonth" element={<ScheduleMonth />} />
          <Route path="lookup" element={<Lookup />} />
          <Route path="schedule-exam-month" element={<ScheduleExamMonth />} />
          <Route path="timetable-class" element={<TimetableClass />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="lesson" element={<Lesson />} />
          <Route path="schedule-day" element={<ScheduleDay />} />

          {/* route grades */}
          <Route path="final-exam" element={<FinalExam />} />
          <Route path="graduation-exam" element={<GraduationExam />} />
          <Route path="look-up-final-exam" element={<LookUpFinalExam />} />
          <Route path="look-up-graduation-exam" element={<LookUpGraduationExam />} />
          <Route path="print-transcript" element={<PrintTranscript />} />

          {/* route result */}
          <Route path="learning-results" element={<LearningResults />} />

          {/* Notification */}
          <Route path="notification" element={<Notification />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default RouterRoot;