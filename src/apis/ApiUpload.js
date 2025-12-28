import { ApiManager } from "./ApiManager";

const ApiUpload = {
  UploadFileApi: (formData) => ApiManager.post(`/fileupload/upload`, formData),
  GetFileApi: (imagePath) => {
    return ApiManager.getImageBinary(`/file/image?fileName=${imagePath}`);
  },
  uploadApi: () => ApiManager.get(`/file/upload`),
};

export default ApiUpload;
