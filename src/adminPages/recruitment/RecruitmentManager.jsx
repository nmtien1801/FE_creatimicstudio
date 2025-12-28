import React, { useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function RecruitmentManager() {
  const navigate = useNavigate();
  const recruitments = [
    {
      id: 1,
      type: 'TOÀN THỜI GIAN',
      title: 'Thông báo sử dụng website tra cứu thông tin mới',
      content: 'Thông báo sử dụng website tra cứu thông tin lịch học, bảng điểm cho học viên, giảng viên. để thuận tiện cho việc tra cứu là sắp xếp lịch giảng dạy.'
    },
    {
      id: 2,
      type: 'THỰC TẬP SINH',
      title: 'Thông báo sử dụng website tra cứu thông tin lịch học, bảng điểm cho học viên, giảng viên',
      content: 'Thông báo sử dụng website tra cứu thông tin lịch học, bảng điểm cho học viên, giảng viên. để thuận tiện cho việc tra cứu là sắp xếp lịch giảng dạy.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">

            {/* Header với nút Thêm mới */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-700 uppercase tracking-tight">Quản lý tuyển dụng</h2>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                onClick={() => { navigate('/recruitment/detail') }}
              >
                <Plus size={18} />
                Thêm mới
              </button>
            </div>

            {/* Danh sách tin tuyển dụng */}
            <div className="p-6 space-y-6">
              {recruitments.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">

                  {/* Badge loại hình */}
                  <div className={`flex-shrink-0 w-28 h-12 flex items-center justify-center text-white text-[10px] font-bold rounded-lg uppercase shadow-sm ${item.type === 'TOÀN THỜI GIAN' ? 'bg-blue-600' : 'bg-orange-500'}`}>
                    {item.type}
                  </div>

                  {/* Nội dung tin */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-800 text-[15px] mb-1 group-hover:text-blue-600 transition-colors cursor-pointer">
                        {item.title}
                      </h3>

                      {/* Nhóm nút Sửa & Xóa */}
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all cursor-pointer"
                          title="Chỉnh sửa"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all cursor-pointer"
                          title="Xóa tin"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 italic leading-relaxed line-clamp-2">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-right text-xs text-gray-400 font-medium">
          Copyright © 2025 by <span className="text-gray-600">CREATIMICSTUDIO</span>
        </div>
      </div>
    </div>
  );
}