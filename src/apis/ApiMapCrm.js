import { ApiManagerCrm } from "./ApiManagerCrm";

const ApiMapCrm = {
  searchCustomerByPhoneOrEmailApi: (phone, email) =>
    ApiManagerCrm.get(`/customer/search?phone=${phone}&email=${email}&ecosystem=CMIC_STUDIO`),
  createPurchaseHistory: (customerId, data) =>
    ApiManagerCrm.post("/purchase-history", { customerId, ...data }),
  createCustomer: (data) => ApiManagerCrm.post(`/customers`, data),
};

export default ApiMapCrm;
