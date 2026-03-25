import axios from "axios";

const API_BASE = "http://127.0.0.1:5000/api";

// Patient API
export const getPatients = () => axios.get(`${API_BASE}/patients`);
export const addPatient = (data) => axios.post(`${API_BASE}/patients`, data);
export const deletePatient = (id) => axios.delete(`${API_BASE}/patients/${id}`);
export const updatePatient = (id, data) => axios.put(`${API_BASE}/patients/${id}`, data);

// Doctor API
export const getDoctors = () => axios.get(`${API_BASE}/doctors`);
export const addDoctor = (data) => axios.post(`${API_BASE}/doctors`, data);
export const updateDoctor = (id, data) => axios.put(`${API_BASE}/doctors/${id}`, data);
export const deleteDoctor = (id) => axios.delete(`${API_BASE}/doctors/${id}`);