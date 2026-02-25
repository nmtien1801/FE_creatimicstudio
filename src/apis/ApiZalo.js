import { ApiManager } from "./ApiManager";

const ApiZalo = {
  getZaloStatus: () => ApiManager.get(`/zalo-status`),
};

export default ApiZalo;
