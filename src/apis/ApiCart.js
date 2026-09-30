import { ApiManager } from "./ApiManager";

const ApiCart = {
  getCartApi: () => ApiManager.get("/cart"),
  addCartApi: (productId, quantity = 1) =>
    ApiManager.post("/cart", { productId, quantity }),
  updateCartApi: (id, quantity) =>
    ApiManager.patch(`/cart/${id}`, { quantity }),
  removeCartApi: (id) => ApiManager.delete(`/cart/${id}`),
};

export default ApiCart;
