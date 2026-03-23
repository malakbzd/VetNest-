import axios from "axios";

const API = "http://localhost:5000/api/tasks";

// GET
export const getTasks = () => axios.get(API);

// CREATE
export const addTask = (data) => axios.post(API, data);

// UPDATE
export const updateTask = (id, data) => axios.put(`${API}/${id}`, data);

// DELETE
export const deleteTask = (id) => axios.delete(`${API}/${id}`);