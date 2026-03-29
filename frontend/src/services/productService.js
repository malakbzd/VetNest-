import API from "./api";

// 🔹 GET products
export const getProducts = () => API.get("/products");

// 🔹 ADD product (اختياري)
export const addProduct = (data) =>
  API.post("/products", data);

// 🔹 DELETE product (اختياري)
export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);