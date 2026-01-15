import { ApiManager } from "./ApiManager";

const ApiCategory = {
  getListCategoryApi: (page, limit) => ApiManager.get(`/category/list?page=${page}&limit=${limit}`),
  getCategoryByIdApi: (id) => ApiManager.get(`/category/${id}`),
  createCategoryApi: (data) => ApiManager.post(`/category/create`, data),
  updateCategoryApi: (id, data) => ApiManager.put(`/category/update/${id}`, data),
  deleteCategoryApi: (id) => ApiManager.delete(`/category/delete/${id}`),
  filterCategoryApi: (page, limit, categoryId, priceProduct) => ApiManager.get(`/category/filter?page=${page}&limit=${limit}&categoryId=${categoryId}&priceProduct=${priceProduct}`),
};

export default ApiCategory;
