import React, { useState, useEffect } from 'react';
import DropdownSearch from '../../components/FormFields/DropdownSearch';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getListStaff } from '../../redux/staffSlice';

export default function ResetPassNV() {
  const dispatch = useDispatch();
  const [selectedStaff, setSelectedStaff] = useState(null);
  const { listStaff } = useSelector((state) => state.staff);

  const handleSubmit = () => {
    console.log('Xử lý đổi mật khẩu cho nhân viên:', selectedStaff);
  };

  useEffect(() => {
    const fetchStaffList = async () => {
      let res = await dispatch(getListStaff());
      if (!res.payload || !res.payload.DT) {
        toast.error(res.payload?.EM);
      }
    };

    if (listStaff.length === 0) {
      fetchStaffList();
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-start">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full max-w-2xl">
        <h1 className="text-xl font-semibold text-gray-700 mb-6">Làm mới mật khẩu</h1>

        <div className="space-y-6">
          {/* Mã nhân viên */}
          <div className="flex items-center gap-3 flex-1 min-w-[200px] md:min-w-0">
            <label className="text-gray-600 text-sm whitespace-nowrap">Lớp</label>
            <DropdownSearch
              options={listStaff}
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

      </div>
    </div>
  );
}