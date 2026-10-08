import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Settings,
  Package,
  Newspaper,
  ShoppingBag,
  ChevronDown,
  User,
  Calendar,
  X,
} from 'lucide-react';
import { useSelector } from "react-redux";

export default function SlideBar({ isSidebarOpen, onToggleSidebar }) {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState('system');

  const toggleMenu = (menu) => {
    if (!isSidebarOpen) {
      onToggleSidebar?.();
      setExpandedMenu(menu);
      return;
    }
    setExpandedMenu(prev => prev === menu ? null : menu);
  };

  const menuConfig = [
    {
      id: 'system',
      label: 'Hệ thống',
      icon: Settings,
      items: [
        { label: 'Trang chủ', path: '/trang-chu' },
        { label: 'Lịch sử đơn hàng', path: '/order-history' },
        { label: 'Đổi mật khẩu', path: '/profile/change-password' },
        userInfo?.role === 'admin' && { label: 'Làm mới mật khẩu NV', path: '/profile/change-password-staff' },
        { label: 'Thông tin tài khoản', path: '/profile/info' },
      ].filter(Boolean)
    },
    {
      id: 'products',
      label: 'Sản phẩm',
      icon: Package,
      items: [
        { label: 'Danh mục chung', path: '/products/categories' },
        { label: 'Danh sách sản phẩm', path: '/products/list' },
      ]
    },
    {
      id: 'post',
      label: 'Bài viết',
      icon: Newspaper,
      items: [
        { label: 'Đăng tin mới', path: '/news/detail' },
        { label: 'Danh sách bài viết', path: '/news/manager' },
      ]
    },
    userInfo?.role === 'admin' && {
      id: 'hr',
      label: 'Quản lý tài khoản',
      icon: Calendar,
      items: [
        { label: 'Danh sách tài khoản', path: '/hr/employees' },
      ]
    },
    userInfo?.role === 'admin' && {
      id: 'orders',
      label: 'Quản lý đơn hàng',
      icon: ShoppingBag,
      items: [
        { label: 'Danh sách đơn hàng', path: '/manager/orders' },
        { label: 'Báo cáo doanh thu', path: '/manager/revenue' },
      ]
    }
  ].filter(Boolean);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen flex flex-col text-white transition-all duration-300 z-50 shadow-xl
        ${isSidebarOpen ? 'w-[288px]' : 'w-0 lg:w-[80px]'} 
        bg-gradient-to-b from-[#0081cd] to-[#026aa8]`}
    >
      <div className={`h-full flex flex-col ${!isSidebarOpen && 'lg:flex hidden'}`}>

        {/* Header */}
        <div className="flex-shrink-0">
          {isSidebarOpen ? (
            <>
              <div className="bg-[#026aa8] p-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/profile/info")}>
                  <img src="/logo.png" alt="logo" className="w-10 h-10 object-contain rounded-lg" />
                  <span className="font-bold text-base lg:text-lg whitespace-nowrap">CMICSTUDIO</span>
                </div>
                <button onClick={onToggleSidebar} className="lg:hidden p-1 hover:bg-white/10 rounded-lg">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 flex items-center gap-3 border-b border-white/20 bg-[#026aa8]/50">
                <div className="bg-white rounded-full p-1 flex-shrink-0 shadow-md">
                  <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-full w-12 h-12 flex items-center justify-center">
                    <User className="w-7 h-7 text-gray-600" />
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs text-white/80">Xin chào,</div>
                  <div className="font-semibold text-sm truncate">
                    {userInfo?.userName || 'Người dùng'}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="hidden lg:flex p-4 items-center justify-center h-20 border-b border-white/20">
              <img
                src="/logo.png"
                alt="logo"
                className="w-10 h-10 object-contain rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
                onClick={onToggleSidebar}
                title="Mở rộng menu"
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 scrollbar-hide">
          <div className="px-2 space-y-1.5">
            {menuConfig.map((menu) => (
              <div key={menu.id} className="relative group">
                <button
                  type="button"
                  onClick={() => toggleMenu(menu.id)}
                  title={!isSidebarOpen ? menu.label : undefined}
                  className={`w-full py-2.5 flex items-center rounded-lg hover:bg-white/10 transition-all ${isSidebarOpen ? 'px-3 gap-3' : 'justify-center px-0'
                    } ${expandedMenu === menu.id && isSidebarOpen ? 'bg-white/15 shadow-sm' : ''}`}
                >
                  <menu.icon className="w-5 h-5 flex-shrink-0" />

                  {/* Chỉ hiện tên và mũi tên khi isSidebarOpen === true */}
                  {isSidebarOpen && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium whitespace-nowrap">
                        {menu.label}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${expandedMenu === menu.id ? 'rotate-180' : ''
                          }`}
                      />
                    </>
                  )}
                </button>

                {/* Khi mở Sidebar: Hiển thị dạng danh sách xổ xuống */}
                {isSidebarOpen && expandedMenu === menu.id && (
                  <div className="mt-1 ml-2 space-y-0.5">
                    {menu.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => window.innerWidth < 1024 && onToggleSidebar?.()}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-3 py-2 pl-10 rounded-lg transition-all text-sm text-white no-underline ${isActive ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
                          }`
                        }
                      >
                        <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></div>
                        <span className="truncate">{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}

                {/* Khi đóng Sidebar: Rê chuột vào icon sẽ hiện popup menu nổi bên phải */}
                {!isSidebarOpen && (
                  <div className="hidden lg:group-hover:block absolute left-full top-0 ml-2 w-52 bg-[#026aa8] border border-white/20 shadow-2xl py-2 z-50">
                    <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/70 border-b border-white/10 mb-1">
                      {menu.label}
                    </div>
                    {menu.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-3 py-2 text-xs text-white no-underline transition-colors ${isActive ? 'bg-white/20 font-bold' : 'hover:bg-white/10'
                          }`
                        }
                      >
                        <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></div>
                        <span className="truncate">{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}