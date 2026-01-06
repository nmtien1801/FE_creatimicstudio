import { ApiManager } from "./ApiManager";

const ApiAuth = {
  LoginApi: (data) => ApiManager.post(`/auth/login`, data),
  RegisterApi: (data) => ApiManager.post(`/auth/register`, data),
  GetAccountApi: () => ApiManager.get(`/auth/account`),

  ChangePasswordApi: (data) => ApiManager.post(`/auth/change-password`, data),
  UpdateProfileApi: (data) => ApiManager.put(`/auth/update-profile`, data),
  getListUserApi: (page, limit) => ApiManager.get(`/auth/getListUser?page=${page}&limit=${limit}`),
};

export default ApiAuth;
