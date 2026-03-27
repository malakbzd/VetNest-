import axios from "axios";

const API = "http://127.0.0.1:5000/api";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`, // 🔥 FIX
    },
  };
};

// AUTH
export const loginUser = (data) =>
  axios.post(`${API}/auth/login`, data);

export const registerUser = (data) =>
  axios.post(`${API}/auth/register`, data);

// DOCTORS
export const getDoctors = () =>
  axios.get(`${API}/doctors`, authHeader());

export const addDoctor = (data) =>
  axios.post(`${API}/doctors`, data, authHeader());

export const deleteDoctor = (id) =>
  axios.delete(`${API}/doctors/${id}`, authHeader());