import React, { useState, useEffect } from 'react';
import { Search, FileDown, Edit2, Trash2, Plus } from 'lucide-react';
import ApiStaff from '../../apis/ApiStaff';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [roles, setRoles] = useState([]);

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    image: '',
    phone: '',
    address: '',
    role: ''
  });

  // Fetch employees and roles on mount
  useEffect(() => {
    fetchEmployees();
    fetchRoles();
  }, []);

  // Filter employees when search or role filter changes
  useEffect(() => {
    filterEmployees();
  }, [searchTerm, roleFilter, employees]);

  const fetchEmployees = async () => {
    // try {
    //   setIsLoading(true);
    //   const response = await ApiStaff.getAll();
    //   setEmployees(response.data || []);
    // } catch (error) {
    //   console.error('Error fetching employees:', error);
    //   alert('Không thể tải danh sách nhân viên');
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const fetchRoles = async () => {
    try {
      const response = await ApiStaff.getAllRoles();
      setRoles(response.data || []);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const filterEmployees = () => {
    let filtered = employees;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(emp => 
        emp.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.phone?.includes(searchTerm)
      );
    }

    // Filter by role
    if (roleFilter) {
      filtered = filtered.filter(emp => emp.role === roleFilter);
    }

    setFilteredEmployees(filtered);
  };

  const handleAddClick = () => {
    setEditingEmployee(null);
    setFormData({
      userName: '',
      email: '',
      password: '',
      image: '',
      phone: '',
      address: '',
      role: ''
    });
    setShowModal(true);
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setShowModal(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      try {
        await ApiStaff.delete(id);
        setEmployees(employees.filter(emp => emp.id !== id));
        alert('Xóa nhân viên thành công');
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Không thể xóa nhân viên');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.userName || !formData.email || !formData.phone || !formData.role) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    try {
      if (editingEmployee) {
        // Update employee
        await ApiStaff.update(editingEmployee.id, formData);
        setEmployees(employees.map(emp => emp.id === editingEmployee.id ? { ...emp, ...formData } : emp));
        alert('Cập nhật nhân viên thành công');
      } else {
        // Add new employee
        const response = await ApiStaff.create(formData);
        setEmployees([...employees, response.data]);
        alert('Thêm nhân viên thành công');
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving employee:', error);
      alert('Không thể lưu thông tin nhân viên');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExport = () => {
    // CSV export logic
    const headers = ['STT', 'Tên người dùng', 'Email', 'Số điện thoại', 'Địa chỉ', 'Vai trò'];
    const rows = filteredEmployees.map((emp, index) => [
      index + 1,
      emp.userName,
      emp.email,
      emp.phone,
      emp.address,
      emp.role
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employees.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <h1 className="text-2xl text-gray-600 mb-6">Quản lý nhân viên</h1>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 flex-1 min-w-[250px]">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm w-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Tất cả vai trò</option>
              {roles.map(role => (
                <option key={role.id} value={role.name}>{role.name}</option>
              ))}
            </select>

            <button
              onClick={handleAddClick}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
            >
              <Plus size={16} />
              Thêm mới
            </button>

            <button
              onClick={handleExport}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
            >
              <FileDown size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg text-gray-700 font-semibold">Danh sách nhân viên ({filteredEmployees.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="px-4 py-3 text-center text-gray-700 font-semibold border-r border-gray-300 whitespace-nowrap w-16">STT</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold border-r border-gray-300 whitespace-nowrap">Tên người dùng</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold border-r border-gray-300 whitespace-nowrap">Email</th>
                  <th className="px-4 py-3 text-center text-gray-700 font-semibold border-r border-gray-300 whitespace-nowrap">Số điện thoại</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold border-r border-gray-300 whitespace-nowrap">Địa chỉ</th>
                  <th className="px-4 py-3 text-center text-gray-700 font-semibold border-r border-gray-300 whitespace-nowrap">Vai trò</th>
                  <th className="px-4 py-3 text-center text-gray-700 font-semibold whitespace-nowrap">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      Đang tải...
                    </td>
                  </tr>
                ) : filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      Không có dữ liệu
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((employee, index) => (
                    <tr key={employee.id} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
                      <td className="px-4 py-3 border-r border-gray-200 text-center">{index + 1}</td>
                      <td className="px-4 py-3 border-r border-gray-200">{employee.userName}</td>
                      <td className="px-4 py-3 border-r border-gray-200">{employee.email}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-center">{employee.phone}</td>
                      <td className="px-4 py-3 border-r border-gray-200">{employee.address}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-center">
                        <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {employee.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEditClick(employee)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Chỉnh sửa"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(employee.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Xóa"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-right text-xs text-gray-500">
          Copyright © 2025 by CREATIMICSTUDIO
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {editingEmployee ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tên người dùng *
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Nhập tên người dùng"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Nhập email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Mật khẩu {!editingEmployee && '*'}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Nhập mật khẩu"
                  required={!editingEmployee}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Nhập địa chỉ"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Ảnh đại diện
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="URL ảnh hoặc đường dẫn"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Vai trò *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">Chọn vai trò</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.name}>{role.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded text-sm font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded text-sm font-semibold"
                >
                  {editingEmployee ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}