// services/todoService.js
import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export const fetchTodos = () => axios.get(`${API_BASE}/todoItems`);
export const addTodo = (todo) => axios.post(`${API_BASE}/add`, { todo });
export const deleteTodo = (id) => axios.delete(`${API_BASE}/todos/${id}`);
export const updateTodo = (todo) => axios.put(`${API_BASE}/update/${todo.id}`, { todo });
