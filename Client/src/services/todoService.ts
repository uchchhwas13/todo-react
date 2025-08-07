import axios from 'axios';
import { AddTodoPayload } from '../type/type';

const API_BASE = 'http://localhost:3000';

import { TodoModel, ApiResponse } from '../type/type';

export const fetchTodos = async (): Promise<ApiResponse<TodoModel[]>> => {
  try {
    const response = await axios.get<{ todos: TodoModel[] }>(
      `${API_BASE}/todos`
    );
    return { data: response.data.todos };
  } catch (error) {
    return { error: extractErrorMessage(error) };
  }
};

export const addTodo = async (
  todo: AddTodoPayload
): Promise<ApiResponse<TodoModel>> => {
  try {
    const response = await axios.post<{ message: string; result: TodoModel }>(
      `${API_BASE}/todos`,
      { todo }
    );
    return { data: response.data.result };
  } catch (error) {
    return { error: extractErrorMessage(error) };
  }
};

export const deleteTodo = async (id: string): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.delete<{ message: string }>(
      `${API_BASE}/todos/${id}`
    );
    return { data: response.data.message };
  } catch (error) {
    return { error: extractErrorMessage(error) };
  }
};

export const updateTodo = async (
  todo: TodoModel
): Promise<ApiResponse<TodoModel>> => {
  try {
    const response = await axios.put<{
      message: string;
      updatedTodo: TodoModel;
    }>(`${API_BASE}/todos/${todo._id}`, { todo });
    return { data: response.data.updatedTodo };
  } catch (error) {
    return { error: extractErrorMessage(error) };
  }
};

// Extract error message helper
function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as { error?: string } | undefined;
    if (apiError?.error) return apiError.error;
    return error.message;
  }
  return 'Unknown error occurred';
}
