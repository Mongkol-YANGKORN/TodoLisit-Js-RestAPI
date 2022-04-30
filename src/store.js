import axios from "axios";


const url = "http://34.124.220.187";

export const readTodo = () => axios.get(url);
export const createTodo = newTodo => axios.post(url, newTodo);
export const updateTodo = (id, updateTodo) => axios.put(`${url}//${id}`, updateTodo);
export const deleteTodo = (id) => axios.delete(`${url}//${id}`);

