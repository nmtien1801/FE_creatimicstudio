import React, { useEffect, useState } from 'react';
import { MapPin, Clock, ArrowRight, UserCheck } from 'lucide-react';
import ApiRecruitment from '../../apis/ApiRecruitment';
import ApiContact from '../../apis/ApiContact';
import ApiUpload from '../../apis/ApiUpload';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

// Component chính
const JobDetail = () => {
    const { id } = useParams();
    const [jobData, setJobData] = useState({});

    const [showApplyModal, setShowApplyModal] = useState(false);
    const [applyForm, setApplyForm] = useState({
        name: '',
        phone: '',
        email: '',
    });
    const [cvUrl, setCvUrl] = useState('');
    const [isUploadingCV, setIsUploadingCV] = useState(false);
    const [isSendingApply, setIsSendingApply] = useState(false);

    // ============================================= INIT ========================================
    // 2. Tải dữ liệu cũ nếu là chế độ chỉnh sửa
    useEffect(() => {
        if (id) {
            fetchDetail(id);
        }
    }, [id]);

    const fetchDetail = async (id) => {
        const res = await ApiRecruitment.getRecruitmentByIdApi(id);

        if (res && res.DT) {
            const data = res.DT;
            setJobData(res.DT)
        }
    };

    const handleApplyInputChange = (e) => {
        const { name, value } = e.target;
        setApplyForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUploadCV = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Optional: restrict file types for CVs
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Vui lòng chọn tệp PDF hoặc DOC/DOCX.');
            e.target.value = null;
            return;
        }

        // Optional: limit file size (~5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            toast.error('Kích thước tệp phải nhỏ hơn 5MB.');
            e.target.value = null;
            return;
        }

        const formData = new FormData();
        formData.append('myFiles', file);

        setIsUploadingCV(true);
        try {
            const res = await ApiUpload.UploadFileApi(formData);
            if (res && res.DT) {
                setCvUrl(res.DT);
                toast.success('Tải CV lên thành công.');
            } else {
                toast.error('Tải CV lên thất bại.');
            }
        } catch (error) {
            console.error('Upload CV error:', error);
            toast.error('Lỗi khi tải CV lên. Vui lòng thử lại.');
        } finally {
            setIsUploadingCV(false);
            e.target.value = null;
        }
    };

    const handleSendApplication = async (e) => {
        e.preventDefault();

        if (!applyForm.name || !applyForm.phone) {
            toast.error('Vui lòng điền đầy đủ tên và số điện thoại.');
            return;
        }

        setIsSendingApply(true);

        try {
            const messageLines = [
                `Ứng tuyển vị trí: ${jobData.title || ''}`,
                `Họ tên: ${applyForm.name}`,
                `Số điện thoại: ${applyForm.phone}`,
                `Email: ${applyForm.email}`,
            ];

            if (cvUrl) {
                messageLines.push(`Link CV: ${cvUrl}`);
            }

            const contactData = {
                name: applyForm.name,
                email: applyForm.email,
                message: messageLines.join('\n'),
            };

            await ApiContact.sendContactApi(contactData);
            toast.success('Đã gửi hồ sơ thành công! HR sẽ liên hệ bạn sớm.');
            setShowApplyModal(false);
            setApplyForm({ name: '', phone: '', email: '' });
            setCvUrl('');
        } catch (error) {
            console.error('Error sending application:', error);
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
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                        {jobData.title}
                    </h1>
                    <p className="text-xl text-orange-600 font-semibold mb-4">
                        CMIC STUDIO
                    </p>

                    {/* Key Info Bar */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-t pt-4 mt-4">
                        <span className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-indigo-500" />
                            Số 49 , Đường 45, P14, Gò Vấp, TP. HCM
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-500" />
                            {jobData.type}
                        </span>
                        <span className="flex items-center gap-2">
                            <UserCheck className="w-5 h-5 text-red-500" />
                            {jobData.experience} năm
                        </span>
                    </div>
                </header>

                {/* Main Content & Sidebar Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Content Section (2/3 cột) */}
                    <div
                        className="lg:col-span-2 prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: jobData.detail }}
                    />

                    {/* Sidebar & CTA (1/3 cột) */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-10 space-y-6">

                            {/* CTA Box */}
                            <div className="bg-orange-500 p-6 rounded-xl shadow-xl text-white text-center">
                                <p className="text-lg font-semibold mb-3">Sẵn sàng thử thách?</p>
                                <button
                                    type="button"
                                    onClick={() => setShowApplyModal(true)}
                                    className="w-full inline-flex items-center justify-center bg-white text-orange-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 text-lg group cursor-pointer"
                                >
                                    Ứng Tuyển Ngay
                                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Apply modal - Ứng tuyển */}
                    {showApplyModal && (
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h2 className="text-xl font-semibold">Ứng tuyển ngay</h2>
                                        <p className="text-sm text-gray-500">Vui lòng điền thông tin và đính kèm CV.</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowApplyModal(false)}
                                        className="text-gray-400 hover:text-gray-700 cursor-pointer"
                                    >
                                        ✕
                                    </button>
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

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Đính kèm CV</label>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleUploadCV}
                                            disabled={isUploadingCV}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        {cvUrl && (
                                            <p className="text-xs text-green-600 mt-2">CV đã được tải lên: <span className="font-medium">{cvUrl}</span></p>
                                        )}
                                    </div>

                                    <div className="flex gap-3 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowApplyModal(false)}
                                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm font-semibold cursor-pointer"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSendingApply}
                                            className={`flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm font-semibold cursor-pointer transition ${isSendingApply ? 'opacity-70 cursor-not-allowed' : ''
                                                }`}
                                        >
                                            {isSendingApply ? 'ĐANG GỬI...' : 'Gửi hồ sơ'}
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