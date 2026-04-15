import axios from "axios";

const API = "http://127.0.0.1:5000/api";

// 🔐 token
const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ================= AUTH =================
export const loginUser = (data) =>
  axios.post(`${API}/auth/login`, data);

export const registerUser = (data) =>
  axios.post(`${API}/auth/register`, data);

// ================= PETS =================
export const getPets = () =>
  axios.get(`${API}/pets`, authHeader());

export const addPet = (data) =>
  axios.post(`${API}/pets`, data, authHeader());

export const deletePet = (id) =>
  axios.delete(`${API}/pets/${id}`, authHeader());

// ================= APPOINTMENTS =================
export const getAppointments = () =>
  axios.get(`${API}/appointments`, authHeader());

export const addAppointment = (data) =>
  axios.post(`${API}/appointments`, data, authHeader());

export const updateAppointment = (id, data) =>
  axios.put(`${API}/appointments/${id}`, data, authHeader());

export const deleteAppointment = (id) =>
  axios.delete(`${API}/appointments/${id}`, authHeader());

// ================= PRODUCTS =================
export const getProducts = () =>
  axios.get(`${API}/products`);

export const addProduct = (data) =>
  axios.post(`${API}/products`, data, authHeader());

export const deleteProduct = (id) =>
  axios.delete(`${API}/products/${id}`, authHeader());

// ================= ARTICLES =================
export const getArticles = () =>
  axios.get(`${API}/articles`);

export const addArticle = (data) =>
  axios.post(`${API}/articles`, data, authHeader());

export const deleteArticle = (id) =>
  axios.delete(`${API}/articles/${id}`, authHeader());

// ================= DASHBOARD =================
export const getDashboard = () =>
  axios.get(`${API}/dashboard`, authHeader());
// ================= CART =================
export const getCart = () => axios.get(`${API}/cart`, authHeader());
export const addToCart = (productId, quantity = 1) => axios.post(`${API}/cart/add`, { productId, quantity }, authHeader());
export const updateCartItem = (productId, quantity) => axios.put(`${API}/cart/update`, { productId, quantity }, authHeader());
export const removeFromCart = (productId) => axios.delete(`${API}/cart/remove/${productId}`, authHeader());
export const clearCart = () => axios.delete(`${API}/cart/clear`, authHeader());

// ================= FAVORITES =================
export const getFavorites = () => axios.get(`${API}/favorites`, authHeader());
export const addFavorite = (productId) => axios.post(`${API}/favorites/add`, { productId }, authHeader());
export const removeFavorite = (productId) => axios.delete(`${API}/favorites/remove/${productId}`, authHeader());

// ================= ORDERS =================
export const createOrder = (orderData) => axios.post(`${API}/orders`, orderData, authHeader());
export const getOrders = () => axios.get(`${API}/orders`, authHeader());
export const getOrderById = (id) => axios.get(`${API}/orders/${id}`, authHeader());