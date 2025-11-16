import { ApiManager } from "./ApiManager";

const ApiAuth = {
    LoginApi: (data) => ApiManager.post(`/auth/login`, data),
    RegisterApi: (data) => ApiManager.post(`/auth/register`, data),
    GetAccountApi: () => ApiManager.get(`/auth/account`),
}

export default ApiAuth;
