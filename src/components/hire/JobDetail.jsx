import React, { useEffect, useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Calendar, ArrowRight, UserCheck, Zap } from 'lucide-react';
import ApiRecruitment from '../../apis/ApiRecruitment'
import UploadField from '../../components/FormFields/UploadField';
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom';

// Component chính
const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [jobData, setJobData] = useState([])

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
                        className="lg:col-span-2 space-y-4 prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: jobData.detail }}
                    />

                    {/* Sidebar & CTA (1/3 cột) */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-10 space-y-6">

                            {/* CTA Box */}
                            <div className="bg-orange-500 p-6 rounded-xl shadow-xl text-white text-center">
                                <p className="text-lg font-semibold mb-3">Sẵn sàng thử thách?</p>
                                <a
                                    href={jobData.ctaLink}
                                    className="w-full inline-flex items-center justify-center bg-white text-orange-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 text-lg group cursor-pointer"
                                >
                                    Ứng Tuyển Ngay
                                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>

            </main>
        </div>
    );
};

export default JobDetail;