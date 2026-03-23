import axios from "axios";

// Replace with your friends' backend URL
const API = "http://localhost:5000/api/tasks";

export const getPatients = () => axios.get(API);
export const addPatient = (data) => axios.post(API, data);
export const updatePatient = (id, data) => axios.put(`${API}/${id}`, data);
export const deletePatient = (id) => axios.delete(`${API}/${id}`);