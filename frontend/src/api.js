import axios from "axios";

const API = "http://localhost:5000/api/patients";

// GET
export const getPatients = () => axios.get(API);

// CREATE
export const addPatient = (data) => axios.post(API, data);

// UPDATE
export const updatePatient = (id, data) => axios.put(`${API}/${id}`, data);

// DELETE
export const deletePatient = (id) => axios.delete(`${API}/${id}`);