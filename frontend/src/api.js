import axios from "axios";

const API = "http://127.0.0.1:5000/api/patients";

export const getPatients = () => axios.get(API);
export const addPatient = (data) => axios.post(API, data);
export const deletePatient = (id) => axios.delete(`${API}/${id}`);
export const updatePatient = (id, data) =>
  axios.put(`${API}/${id}`, data);