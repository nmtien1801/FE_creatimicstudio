import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileEdit, BarChart3, TrendingUp, Calendar, ChevronDown, User,  } from 'lucide-react';

export default function SlideBar({ isSidebarOpen }) {
  const [expandedMenu, setExpandedMenu] = useState('system');

  const toggleMenu = (menu) => {
    setExpandedMenu(prev => prev === menu ? null : menu);
  };

  const systemItems = [
    { label: 'Trang chủ', path: '/home' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Đổi mật khẩu', path: '/change-pass-student' },
    { label: 'Làm mới mật khẩu nhân viên', path: '/dashboard' },
    { label: 'Thông tin tài khoản', path: '/account' },
  ];

  const scheduleItems = [
    { label: 'Danh mục chung', path: '/lesson' },
    { label: 'Danh mục con', path: '/lesson' },
    { label: 'Danh sách sản phẩm', path: '/lesson' },
  ];

  const gradesItems = [
    { label: 'Đăng tin', path: '/look-up-final-exam' },
  ];

  const notificationItems = [
    { label: 'Nhân viên', path: '/notification' },
    { label: 'Phân quyền', path: '/notification' },
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
                <span className="font-semibold text-lg whitespace-nowrap">
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
                <div className="text-sm">Welcome,</div>
                <div className="font-semibold italic">d.ttha</div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 py-4 font-normal text-[13px]">
              {/* Hệ thống */}
              <div className="mb-2">
                <button
                  onClick={() => toggleMenu('system')}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#026aa8] transition-colors ${expandedMenu === 'system' ? 'bg-[#026aa8]' : ''}`}
                >
                  <Home className="w-5 h-5 flex-shrink-0" />
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

              {/* Lịch học */}
              <div className="mb-2">
                <button
                  onClick={() => toggleMenu('schedule')}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#026aa8] transition-colors ${expandedMenu === 'schedule' ? 'bg-[#026aa8]' : ''}`}
                >
                  <FileEdit className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 text-left">Quản lý sản phẩm</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenu === 'schedule' ? 'rotate-180' : ''}`} />
                </button>

                {expandedMenu === 'schedule' && (
                  <div className="bg-[#026aa8]">
                    {scheduleItems.map((item, index) => (
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

              {/* Tra cứu điểm */}
              <div className="mb-2">
                <button
                  onClick={() => toggleMenu('grades')}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#026aa8] transition-colors ${expandedMenu === 'grades' ? 'bg-[#026aa8]' : ''}`}
                >
                  <BarChart3 className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 text-left">Tin tức</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenu === 'grades' ? 'rotate-180' : ''}`} />
                </button>

                {expandedMenu === 'grades' && (
                  <div className="bg-[#026aa8]">
                    {gradesItems.map((item, index) => (
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

              {/* Kết quả học tập */}
              <div className="mb-2">
                <NavLink
                  to="/learning-results"
                  className={({ isActive }) =>
                    `w-full px-4 py-3 flex items-center gap-3 hover:bg-[#026aa8] transition-colors no-underline text-white ${isActive ? 'bg-[#026aa8]' : ''
                    }`
                  }
                >
                  <TrendingUp className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 text-left">Đăng tuyển dụng</span>
                </NavLink>
              </div>

              {/* Thông báo */}
              <div className="mb-2">
                <button
                  onClick={() => toggleMenu('notifications')}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#026aa8] transition-colors ${expandedMenu === 'notifications' ? 'bg-[#026aa8]' : ''}`}
                >
                  <Calendar className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 text-left">Quản lý nhân sự</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenu === 'notifications' ? 'rotate-180' : ''}`} />
                </button>

                {expandedMenu === 'notifications' && (
                  <div className="bg-[#026aa8]">
                    {notificationItems.map((item, index) => (
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
            </nav>
          </div>
        ) : (
          <div className="p-4 flex items-center justify-center h-16">
            <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain" />
          </div>
        )}
      </div>
    </div>
  );
}