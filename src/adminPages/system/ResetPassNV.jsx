import React, { useState, useEffect } from 'react';
import DropdownSearch from '../../components/FormFields/DropdownSearch';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function ResetPassNV() {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const { ClassLearn } = useSelector((state) => state.staff);

  const handleSubmit = () => {
    console.log('Xử lý đổi mật khẩu cho nhân viên:', selectedStaff);
  };

  useEffect(() => {
    const fetchStaffList = async () => {
      setIsLoadingClassLearn(true);
      try {
        let res = await dispatch(getClassLearnByUserID());
        if (!res.payload || !res.payload.data) {
          toast.error(res.payload?.message);
        }

        // Tự động chọn lớp nếu là Học viên và chỉ có 1 lớp
        if (IS_STUDENT && Array.isArray(res.payload.data) && res.payload.data.length === 1) {
          const singleClass = res.payload.data[0];
          const classID = Number(singleClass.ClassID);

          setSelectedClass(classID);

        } else if (!IS_STUDENT) {
          setSelectedClass(0);
        }
      } catch (err) {
        toast.error('Đã có lỗi xảy ra khi tải danh sách môn học');
      } finally {
        setIsLoadingClassLearn(false);
      }
    };

    if (ClassLearn.length === 0) {
      fetchStaffList();
    }
  }, [dispatch]);

  const StaffList = [
    { id: 'C001', userName: 'Lớp A' },
    { id: 'C002', userName: 'Lớp B' },
    { id: 'C003', userName: 'Lớp C' },
    // Thêm các lớp khác nếu cần
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-start">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full max-w-2xl">
        <h1 className="text-xl font-semibold text-gray-700 mb-6">Làm mới mật khẩu</h1>

        <div className="space-y-6">
          {/* Mã nhân viên */}
          <div className="flex items-center gap-3 flex-1 min-w-[200px] md:min-w-0">
            <label className="text-gray-600 text-sm whitespace-nowrap">Lớp</label>
            <DropdownSearch
              options={StaffList}
              placeholder="------ chọn Nhân viên ------"
              labelKey="userName"
              valueKey="id"
              onChange={(e) => setSelectedStaff(e.id)}
            />
          </div>

          {/* Nút thao tác */}
          <div className="flex items-center border-t border-gray-100 pt-6">
            <div className="w-40"></div>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors shadow-sm"
            >
              Đổi mật khẩu
            </button>
          </div>
        </div>

        <div className="mt-8 text-right text-[10px] text-gray-400">
          Copyright © 2025 by CREATIMICSTUDIO
        </div>
      </div>
    </div>
  );
}