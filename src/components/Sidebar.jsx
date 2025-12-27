import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Settings,
  Package,
  Newspaper,
  Briefcase,
  Users,
  ChevronDown,
  User,
  KeyRound,
  LayoutDashboard,
  ShieldCheck,
  ListTree,
  Tags,
  PlusCircle
} from 'lucide-react';

export default function SlideBar({ isSidebarOpen }) {
  const [expandedMenu, setExpandedMenu] = useState('system');

  const toggleMenu = (menu) => {
    setExpandedMenu(prev => prev === menu ? null : menu);
  };

  // 1. Hệ thống - Tập trung vào quản trị tài khoản
  const systemItems = [
    { label: 'Trang chủ', path: '/home', icon: Home },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Đổi mật khẩu', path: '/profile/change-password', icon: KeyRound },
    { label: 'Làm mới mật khẩu nhân viên', path: '/profile/change-password-staff', icon: ShieldCheck },
    { label: 'Thông tin tài khoản', path: '/profile/info', icon: User },
  ];

  // 2. Quản lý sản phẩm - Tập trung vào kho hàng/phân loại
  const productItems = [
    { label: 'Danh mục chung', path: '/products/categories' },
    { label: 'Danh mục con', path: '/products/sub-categories' },
    { label: 'Danh sách sản phẩm', path: '/products/list' },
  ];

  // 3. Tin tức
  const newsItems = [
    { label: 'Đăng tin mới', path: '/news/manager' },
    { label: 'Quản lý bài viết', path: '/news/list' },
  ];

  // 4. Quản lý nhân sự
  const hrItems = [
    { label: 'Danh sách nhân viên', path: '/hr/employees' },
    { label: 'Phân quyền hệ thống', path: '/hr/roles' },
  ];

  return (
    <div className={`fixed top-0 left-0 h-screen flex flex-col text-white transition-all duration-300 overflow-y-auto flex-shrink-0 
      ${isSidebarOpen ? 'w-[260px]' : 'w-[80px]'} bg-[#0081cd]`}
    >
      <div className="font-semibold whitespace-nowrap overflow-hidden">
        {isSidebarOpen ? (
          <div>
            {/* Header */}
            <div className="bg-[#026aa8] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain" />
                <span className="font-semibold text-lg whitespace-nowrap text-white uppercase tracking-wider">
                  CREATIMICSTUDIO
                </span>
              </div>
            </div>

            {/* User Profile */}
            <div className="p-4 flex items-center gap-3 border-b border-blue-500">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
                <div className="bg-gray-300 rounded-full w-14 h-14 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-500" />
                </div>
              </div>
              <div>
                <div className="text-xs opacity-80">Xin chào,</div>
                <div className="font-semibold italic">d.ttha</div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 py-4 font-normal text-[13px]">

              {/* Menu: Hệ thống */}
              <div className="mb-1">
                <button
                  onClick={() => toggleMenu('system')}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#026aa8] transition-colors ${expandedMenu === 'system' ? 'bg-[#026aa8]' : ''}`}
                >
                  <Settings className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 text-left">Hệ thống</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenu === 'system' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMenu === 'system' && (
                  <div className="bg-[#026aa8]">
                    {systemItems.map((item, index) => (
                      <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                          `w-full px-4 py-2.5 pl-12 flex items-center gap-3 hover:bg-[#025a8a] transition-colors text-left text-sm no-underline text-white ${isActive ? 'bg-[#025a8a] font-semibold' : ''
                          }`
                        }
                      >
                        <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              {/* Menu: Quản lý sản phẩm */}
              <div className="mb-1">
                <button
                  onClick={() => toggleMenu('products')}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#026aa8] transition-colors ${expandedMenu === 'products' ? 'bg-[#026aa8]' : ''}`}
                >
                  <Package className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 text-left">Quản lý sản phẩm</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenu === 'products' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMenu === 'products' && (
                  <div className="bg-[#026aa8]">
                    {productItems.map((item, index) => (
                      <NavLink key={index} to={item.path} className={({ isActive }) => `w-full px-4 py-2.5 pl-12 flex items-center gap-3 hover:bg-[#025a8a] transition-colors text-white no-underline ${isActive ? 'bg-[#025a8a] font-bold' : ''}`}>
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              {/* Menu: Tin tức */}
              <div className="mb-1">
                <button
                  onClick={() => toggleMenu('news')}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#026aa8] transition-colors ${expandedMenu === 'grades' ? 'bg-[#026aa8]' : ''}`}
                >
                  <Newspaper className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 text-left">Tin tức</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenu === 'news' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMenu === 'news' && (
                  <div className="bg-[#026aa8]">
                    {newsItems.map((item, index) => (
                      <NavLink key={index} to={item.path} className={({ isActive }) => `w-full px-4 py-2.5 pl-12 flex items-center gap-3 hover:bg-[#025a8a] transition-colors text-white no-underline ${isActive ? 'bg-[#025a8a] font-bold' : ''}`}>
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              {/* Link lẻ: Đăng tuyển dụng */}
              <div className="mb-1">
                <NavLink
                  to="/recruitment/manager"
                  className={({ isActive }) =>
                    `w-full px-4 py-3 flex items-center gap-3 hover:bg-[#026aa8] transition-colors no-underline text-white ${isActive ? 'bg-[#026aa8]' : ''}`
                  }
                >
                  <Briefcase className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 text-left">Đăng tuyển dụng</span>
                </NavLink>
              </div>

              {/* Menu: Quản lý nhân sự */}
              <div className="mb-1">
                <button
                  onClick={() => toggleMenu('hr')}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#026aa8] transition-colors ${expandedMenu === 'notifications' ? 'bg-[#026aa8]' : ''}`}
                >
                  <Users className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 text-left">Quản lý nhân sự</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenu === 'hr' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMenu === 'hr' && (
                  <div className="bg-[#026aa8]">
                    {hrItems.map((item, index) => (
                      <NavLink key={index} to={item.path} className={({ isActive }) => `w-full px-4 py-2.5 pl-12 flex items-center gap-3 hover:bg-[#025a8a] transition-colors text-white no-underline ${isActive ? 'bg-[#025a8a] font-bold' : ''}`}>
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>
        ) : (
          <div className="p-4 flex flex-col items-center gap-6 pt-6">
            <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain" />
            <div className="flex flex-col gap-4">
              <Settings className="w-6 h-6 opacity-80" />
              <Package className="w-6 h-6 opacity-80" />
              <Newspaper className="w-6 h-6 opacity-80" />
              <Briefcase className="w-6 h-6 opacity-80" />
              <Users className="w-6 h-6 opacity-80" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}