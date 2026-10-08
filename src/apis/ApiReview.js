import { ApiManager } from "./ApiManager";

const ApiReview = {
  getProductReviewsApi: (productId, params) =>
    ApiManager.get(`/product/${encodeURIComponent(productId)}/reviews`, { params }),
  getReviewEligibilityApi: (productId) =>
    ApiManager.get(`/product/${encodeURIComponent(productId)}/review-eligibility`),
  saveProductReviewApi: (productId, review) =>
    ApiManager.post(`/product/${encodeURIComponent(productId)}/reviews`, review),
};

export default ApiReview;
