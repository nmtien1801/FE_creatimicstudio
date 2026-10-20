import { ApiManager } from "./ApiManager";

const ApiOtp = {
  sendOtpApi: (data) => ApiManager.post(`/otp/send`, data),
  verifyOtpApi: (data) => ApiManager.post(`/otp/verify`, data),
};

export default ApiOtp;