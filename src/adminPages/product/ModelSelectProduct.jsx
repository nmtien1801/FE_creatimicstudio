import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getListProductDropdown } from '../../redux/productSlice.js';
import { toast } from 'react-toastify';
import { X, Search, BookOpen, Loader2, ArrowRight, Trash2, Database, Gauge, Edit, Save, Plus, RefreshCw } from 'lucide-react';
// import ApiTemplateSurveys from '../../apis/ApiTemplateSurveys.js';

export default function ModelSelectProduct({ visible, onClose, form }) {
    const dispatch = useDispatch();
    const { ProductDropdown } = useSelector((state) => state.product);

    console.log('sssssss ', form);
    
    // ---------------------------------------------- 1. STATES MỚI (CONTROL BOARD)
    const [statusValue, setStatusValue] = useState(false);
    const [evaluationName, setEvaluationName] = useState('');

    // Lấy ID từ form prop
    const initialCategoryID = form?.id || null;
    const isEditing = !!initialCategoryID;

    // Dữ liệu Control Board từ prop `form`
    const controlData = useMemo(() => ({
        id: initialCategoryID,
        name: form?.name || '',
        status: form?.status
    }), [form, initialCategoryID]);

    // Khởi tạo giá trị cho Control Board
    useEffect(() => {
        if (visible) {
            if (typeof controlData.status === 'boolean') {
                setStatusValue(controlData.status);
            } else {
                setStatusValue(false); // Default cho chế độ Thêm mới
            }
            setEvaluationName(controlData.name);
        }
    }, [visible, controlData.status, controlData.name]);


    // ---------------------------------------------- 2. STATES GỐC (SẢN PHẨM)
    const [query, setQuery] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [processingId, setProcessingId] = useState(null);

    // ---------------------------------------------- 3. FETCH DATA GỐC
    useEffect(() => {
        // lấy ds sản phẩm khả dụng
        const fetchProductDropdown = async () => {
            let res = await dispatch(getListProductDropdown());

            if (res.payload?.EC !== 0) {
                toast.error(res.payload?.EM);
            }
        };

        fetchProductDropdown();
    }, [dispatch]);

    // useEffect(() => {
    //     const fetchSelectedSubjects = async () => {
    //         if (!visible) return;

    //         setLoadingData(true);
    //         try {
    //             const TemplateSurveyID = controlData.TemplateSurveyID;

    //             if (TemplateSurveyID) {
    //                 // --- LẤY SẢN PHẨM ĐÃ CHỌN ---
    //                 const res = await ApiTemplateSurveys.getSurveySubjectByTemlateSurveyIDApi(TemplateSurveyID);

    //                 setSelectedSubjects(Array.isArray(res.data) ? res.data : []);
    //             } else {
    //                 setSelectedSubjects([]); // Nếu chưa có TemplateSurveyID thì không có sản phẩm nào được chọn
    //             }
    //         } catch (error) {
    //             toast.error('Lấy dữ liệu sản phẩm đã chọn thất bại');
    //         } finally {
    //             setLoadingData(false);
    //         }
    //     };

    //     if (visible) {
    //         setQuery('');
    //         fetchSelectedSubjects();
    //     }
    // }, [visible, controlData.TemplateSurveyID]);

    // 4. FILTER (Sử dụng useMemo để tối ưu)
    const filteredAvailable = useMemo(() => {
        const sourceData = Array.isArray(ProductDropdown) ? ProductDropdown : [];

        return sourceData.filter(item => {
            const name = item.name || "";
            const code = item.id || "";

            const matchQuery = name.toLowerCase().includes(query.toLowerCase()) ||
                code.toLowerCase().includes(query.toLowerCase());

            const notSelected = !(selectedSubjects || []).some(sel => sel.id === item.id);

            return matchQuery && notSelected;
        });
    }, [ProductDropdown, query, selectedSubjects]);

    // -------------------------------------------- 5. HANDLERS

    // Handler cho Status Select
    const handleStatusChange = (e) => {
        setStatusValue(e.target.value === 'true');
    };

    // Handler CRUD cho CONTROL BOARD (Evaluation)
    const handleControlAction = (actionType) => {
        if (!evaluationName) {
            toast.warning("Tên đánh giá không được để trống.");
            return;
        }

        const payload = {
            TemplateSurveyID: controlData.TemplateSurveyID,
            EvaluationName: evaluationName,
            StatusID: statusValue
        };

        switch (actionType) {
            case 'add_edit':
                // --- GỌI API THÊM/SỬA Ở ĐÂY ---
                toast.info(`Đang xử lý ${isEditing ? 'SỬA' : 'THÊM'} Template: ${payload.EvaluationName}...`);
                // Sau khi API trả về ID mới (nếu là Thêm mới), cần cập nhật form prop hoặc state cha.
                break;
            case 'delete':
                // --- GỌI API XÓA Ở ĐÂY ---
                toast.error(`Đang XÓA bản ghi ID: ${payload.TemplateSurveyID}...`);
                // Sau khi xóa thành công, cần đóng modal và refresh lưới.
                break;
            case 'clear':
                // Xóa trắng Control Board Form
                setEvaluationName('');
                setStatusValue(false);
                toast.info('Form đã được xóa trắng. Sẵn sàng cho thêm mới.');
                break;
            default:
                break;
        }
    };

    // -------------------------------------------- Handler Thêm/Xóa SẢN PHẨM  GỐC
    // const handleAddSubject = async (subject) => {
    //     const TemplateSurveyID = controlData.TemplateSurveyID;
    //     if (!TemplateSurveyID) {
    //         toast.warning("Vui lòng lưu thông tin đánh giá (Thêm mới/Cập nhật) trước khi thêm sản phẩm .");
    //         return;
    //     }
    //     setProcessingId(`add-${subject.SubjectID}`);
    //     try {
    //         const payload = { TemplateSurveyID: TemplateSurveyID, SubjectID: subject.SubjectID, StatusID: true };
    //         let res = await ApiTemplateSurveys.CreateSurveySubjectApi(payload);
    //         if (res.message) {
    //             toast.error(res.message);
    //         } else {
    //             setSelectedSubjects(prev => [...prev, { ...subject, SurveySubjectID: res.SurveySubjectID }]);
    //             toast.success(`Đã thêm: ${subject.SubjectName}`);
    //         }
    //     } catch (error) { toast.error('Lỗi thêm sản phẩm'); }
    //     finally { setProcessingId(null); }
    // };

    // const handleRemoveSubject = async (subject) => {
    //     const TemplateSurveyID = controlData.TemplateSurveyID;

    //     if (!TemplateSurveyID) return;
    //     setProcessingId(`remove-${subject.SubjectID}`);
    //     try {
    //         const payload = { TemplateSurveyID: TemplateSurveyID, SubjectID: subject.SubjectID, SurveySubjectID: subject.SurveySubjectID };
    //         let res = await ApiTemplateSurveys.DeleteSurveySubjectApi(payload);

    //         if (res.message) {
    //             toast.error(res.message);
    //         } else {
    //             setSelectedSubjects(prev => prev.filter(s => s.SubjectID !== subject.SubjectID));
    //             toast.success(`Đã xóa: ${subject.SubjectName}`);
    //         }
    //     } catch (error) { toast.error('Lỗi xóa sản phẩm'); }
    //     finally { setProcessingId(null); }
    // };

    if (!visible) return null;

    // Class CSS cho thanh cuộn
    const scrollbarClass = "overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl flex flex-col h-[90vh]">

                {/* HEADER */}
                <div className="flex-none flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                        <Edit className="w-5 h-5 text-teal-600" />
                        Chọn sản phẩm
                        {/* : **{evaluationName || 'Thêm mới'}** */}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500">
                        <X size={24} />
                    </button>
                </div>

                {/* BODY CONTAINER (LƯỚI DỮ LIỆU SẢN PHẨM  GỐC) */}
                <div className="flex-1 p-4 bg-gray-50 min-h-0">
                    <h4 className="text-base font-bold text-gray-700 mb-3 flex items-center gap-2">
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">

                        {/* --- CỘT TRÁI (Sản phẩm  khả dụng) --- */}
                        <div className="bg-white rounded border border-gray-200 shadow-sm flex flex-col h-full overflow-">
                            <div className="flex-none p-3 border-b bg-white">
                                <div className="relative">
                                    <input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Tìm kiếm sản phẩm ..."
                                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 outline-none"
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                </div>
                            </div>

                            {/* LIST SẢN PHẨM  KHẢ DỤ */}
                            <div className={`flex-1 ${scrollbarClass} p-2 space-y-2`}>
                                {filteredAvailable.length === 0 ? (
                                    <div className="text-center text-gray-500 py-10 text-sm">
                                        {Array.isArray(ProductDropdown) && ProductDropdown.length === 0 ? "Đang tải dữ liệu..." : "Không tìm thấy kết quả"}
                                    </div>
                                ) : (
                                    filteredAvailable.map(sub => (
                                        <div key={sub.SubjectID} className="flex items-center justify-between p-3 rounded hover:bg-teal-50 border border-transparent hover:border-teal-100 transition group bg-white shadow-sm mb-1">
                                            <div className="flex-1 pr-2 min-w-0">
                                                <div className="text-sm font-medium text-gray-800 truncate" title={sub.SubjectName}>
                                                    {sub.SubjectName}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-0.5">{sub.SubjectCode}</div>
                                            </div>
                                            <button
                                                onClick={() => handleAddSubject(sub)}
                                                disabled={!!processingId || !controlData.TemplateSurveyID}
                                                className="flex-none px-3 py-1.5 bg-white border border-teal-200 text-teal-600 rounded-full hover:bg-teal-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                title={!controlData.TemplateSurveyID ? "Lưu đánh giá trước" : "Thêm sản phẩm "}
                                            >
                                                {processingId === `add-${sub.SubjectID}` ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* --- CỘT PHẢI (Sản phẩm đã lưu) --- */}
                        <div className="bg-white rounded border border-teal-200 shadow-sm flex flex-col h-full overflow-">
                            <div className="flex-none p-3 border-b border-teal-100 bg-teal-50 flex justify-between items-center">
                                <span className="text-sm font-bold text-teal-800 flex items-center gap-2">
                                    <Database size={14} /> Sản phẩm đã lưu
                                </span>
                                <span className="text-xs bg-teal-200 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                                    {selectedSubjects.length}
                                </span>
                            </div>

                            <div className={`flex-1 ${scrollbarClass} p-2 space-y-2`}>
                                {loadingData ? (
                                    <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-teal-500" /></div>
                                ) : selectedSubjects.length === 0 ? (
                                    <div className="text-center text-gray-400 py-10 text-sm">Chưa có sản phẩm nào được chọn</div>
                                ) : (
                                    selectedSubjects.map(sub => (
                                        <div key={sub.SubjectID} className="flex items-center justify-between p-3 bg-white border-l-4 border-l-teal-500 border border-gray-100 rounded-r shadow-sm mb-1">
                                            <div className="flex-1 pr-2 min-w-0">
                                                <div className="text-sm font-medium text-gray-800 truncate" title={sub.SubjectName}>{sub.SubjectName}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">{sub.SubjectCode}</div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveSubject(sub)}
                                                disabled={!!processingId}
                                                className="flex-none p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition disabled:opacity-50"
                                            >
                                                {processingId === `remove-${sub.SubjectID}` ? <Loader2 size={16} className="animate-spin text-red-500" /> : <Trash2 size={16} />}
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                {/* FOOTER: Nút CRUD cho Control Board */}
                <div className="flex-none p-4 border-t flex justify-between bg-white">
                    {/* Cột phải: Thêm/Sửa và Xóa */}
                    <div className='flex gap-2 '>
                        {isEditing && (
                            <button
                                onClick={() => handleControlAction('delete')}
                                className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-medium flex items-center gap-1 transition"
                            >
                                <Trash2 size={16} /> Xóa
                            </button>
                        )}

                        <button
                            onClick={() => handleControlAction('add_edit')}
                            className="px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 font-medium flex items-center gap-1 transition"
                        >
                            {isEditing ? (<> <Save size={16} /> Sửa (Cập nhật)</>) : (<> <Plus size={16} /> Thêm mới</>)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}