import { ApiManager } from "./ApiManager";

const ApiContact = {
  sendContactApi: (data) => ApiManager.post(`/contact/send`, data),
};

export default ApiContact;