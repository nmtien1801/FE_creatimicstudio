import React, { useEffect, useState } from 'react';
import { MapPin, Clock, ArrowRight, UserCheck, FileText, X } from 'lucide-react'; // Thêm icon
import ApiRecruitment from '../../apis/ApiRecruitment';
import ApiContact from '../../apis/ApiContact';
import ApiUpload from '../../apis/ApiUpload';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const JobDetail = () => {
    const { id } = useParams();
    const [jobData, setJobData] = useState({});
    const [showApplyModal, setShowApplyModal] = useState(false);

    // State mới để lưu file cục bộ thay vì URL
    const [selectedFile, setSelectedFile] = useState(null);
    const [applyForm, setApplyForm] = useState({
        name: '',
        phone: '',
        email: '',
    });
    const [isSendingApply, setIsSendingApply] = useState(false);

    // ============================================= INIT ========================================
    // 2. Tải dữ liệu cũ nếu là chế độ chỉnh sửa
    useEffect(() => {
        if (id) fetchDetail(id);
    }, [id]);

    const fetchDetail = async (id) => {
        const res = await ApiRecruitment.getRecruitmentByIdApi(id);
        if (res && res.DT) setJobData(res.DT);
    };

    const handleApplyInputChange = (e) => {
        const { name, value } = e.target;
        setApplyForm((prev) => ({ ...prev, [name]: value }));
    };

    // 1. Chỉ chọn file và lưu vào state, không gọi API
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Vui lòng chọn tệp PDF hoặc DOC/DOCX.');
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            toast.error('Kích thước tệp phải nhỏ hơn 5MB.');
            return;
        }

        setSelectedFile(file); // Lưu file vào state
        e.target.value = null; // Reset input để có thể chọn lại cùng 1 file nếu lỡ xóa
    };

    // 2. Hàm xóa file đã chọn
    const removeSelectedFile = () => {
        setSelectedFile(null);
    };

    // 3. Xử lý gửi toàn bộ dữ liệu khi bấm nút "Gửi"
    const handleSendApplication = async (e) => {
        e.preventDefault();

        if (!applyForm.name || !applyForm.phone) {
            toast.error('Vui lòng điền đầy đủ tên và số điện thoại.');
            return;
        }

        setIsSendingApply(true);

        try {
            // 1. Khởi tạo FormData - Đây là "thùng chứa" duy nhất để gửi đi
            const dataToSend = new FormData();

            // 2. Append các trường text vào FormData
            dataToSend.append('name', applyForm.name);
            dataToSend.append('email', applyForm.email);
            dataToSend.append('phone', applyForm.phone);

            // Nếu bạn muốn gửi thêm job title để HR dễ quản lý
            dataToSend.append('jobTitle', jobData.title || '');

            // 3. Append file vào FormData (Lưu ý: key 'file' phải khớp với phía Backend dùng Multer)
            if (selectedFile) {
                // Kiểm tra xem phía Backend bạn dùng req.file hay req.files
                // Nếu Backend dùng upload.single('file') thì key phải là 'file'
                dataToSend.append('message', selectedFile);
            }

            let res = await ApiContact.applyCVApi(dataToSend);

            toast.success('Đã gửi hồ sơ thành công!');
            setShowApplyModal(false);
            setApplyForm({ name: '', phone: '', email: '' });
            setSelectedFile(null);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Gửi hồ sơ thất bại. Vui lòng thử lại.');
        } finally {
            setIsSendingApply(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section */}
                <header className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{jobData.title}</h1>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-t pt-4 mt-4">
                        <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-indigo-500" /> Số 49 , Đường 45, P14, Gò Vấp, TP. HCM</span>
                        <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-blue-500" /> {jobData.type}</span>
                        <span className="flex items-center gap-2"><UserCheck className="w-5 h-5 text-red-500" /> {jobData.experience} năm</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 prose max-w-none" dangerouslySetInnerHTML={{ __html: jobData.detail }} />

                    <aside className="lg:col-span-1">
                        <div className="sticky top-10">
                            <div className="bg-orange-500 p-6 rounded-xl shadow-xl text-white text-center">
                                <p className="text-lg font-semibold mb-3">Sẵn sàng thử thách?</p>
                                <button onClick={() => setShowApplyModal(true)} className="w-full inline-flex items-center justify-center bg-white text-orange-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 group cursor-pointer">
                                    Ứng Tuyển Ngay <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    </aside>

                    {showApplyModal && (
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                                <div className="flex items-start justify-between mb-4">
                                    <h2 className="text-xl font-semibold">Ứng tuyển ngay</h2>
                                    <button onClick={() => setShowApplyModal(false)} className="text-gray-400 hover:text-gray-700 cursor-pointer">✕</button>
                                </div>

                                <form onSubmit={handleSendApplication} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Họ và tên *</label>
                                        <input
                                            name="name"
                                            value={applyForm.name}
                                            onChange={handleApplyInputChange}
                                            required
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="Nhập họ và tên"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Số điện thoại *</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            value={applyForm.phone}
                                            onChange={handleApplyInputChange}
                                            required
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="Nhập số điện thoại"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={applyForm.email}
                                            onChange={handleApplyInputChange}
                                            required
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="Nhập email"
                                        />
                                    </div>

                                    {/* Upload Section */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">Đính kèm CV</label>

                                        {!selectedFile ? (
                                            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-orange-400 transition-colors bg-gray-50 text-center">
                                                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                                <div className="flex flex-col items-center">
                                                    <FileText className="w-8 h-8 text-gray-400 mb-1" />
                                                    <span className="text-xs text-gray-500">Nhấn để chọn file (PDF, DOCX)</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                                <div className="flex items-center gap-2 overflow-hidden">
                                                    <FileText className="w-5 h-5 text-orange-600 flex-shrink-0" />
                                                    <span className="text-sm font-medium text-orange-800 truncate">{selectedFile.name}</span>
                                                </div>
                                                <button type="button" onClick={removeSelectedFile} className="p-1 hover:bg-orange-200 rounded-full transition-colors">
                                                    <X className="w-4 h-4 text-orange-600" />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        <button type="button" onClick={() => setShowApplyModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded font-semibold text-sm transition">Hủy</button>
                                        <button type="submit" disabled={isSendingApply} className={`flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded font-semibold text-sm transition ${isSendingApply ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                            {isSendingApply ? 'ĐANG XỬ LÝ...' : 'Gửi hồ sơ'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default JobDetail;