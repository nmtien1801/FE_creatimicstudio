import { ApiManager } from "./ApiManager";

const ApiProduct = {
    getListProductApi: (page, limit) => ApiManager.get(`/product/list?page=${page}&limit=${limit}`),
    getProductByIdApi: (id) => ApiManager.get(`/product/${id}`),
    createProductApi: (data) => ApiManager.post(`/product/create`, data),
    updateProductApi: (id, data) => ApiManager.put(`/product/update/${id}`, data),
    deleteProductApi: (id) => ApiManager.delete(`/product/delete/${id}`),
};

export default ApiProduct;