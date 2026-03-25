import axios from "axios";

const API_BASE = "http://127.0.0.1:5000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: token || ""
    }
  };
};

// AUTH
export const registerUser = (data) =>
  axios.post(`${API_BASE}/auth/register`, data);

export const loginUser = (data) =>
  axios.post(`${API_BASE}/auth/login`, data);

// PATIENTS
export const getPatients = () =>
  axios.get(`${API_BASE}/patients`, getAuthHeader());

export const addPatient = (data) =>
  axios.post(`${API_BASE}/patients`, data, getAuthHeader());

export const deletePatient = (id) =>
  axios.delete(`${API_BASE}/patients/${id}`, getAuthHeader());

export const updatePatient = (id, data) =>
  axios.put(`${API_BASE}/patients/${id}`, data, getAuthHeader());

// DOCTORS
export const getDoctors = () =>
  axios.get(`${API_BASE}/doctors`, getAuthHeader());

export const addDoctor = (data) =>
  axios.post(`${API_BASE}/doctors`, data, getAuthHeader());

export const updateDoctor = (id, data) =>
  axios.put(`${API_BASE}/doctors/${id}`, data, getAuthHeader());

export const deleteDoctor = (id) =>
  axios.delete(`${API_BASE}/doctors/${id}`, getAuthHeader());