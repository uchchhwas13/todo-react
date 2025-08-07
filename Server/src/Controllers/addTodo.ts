import { Request, Response } from 'express';
import { ToDoModel } from '../Models/Todo';
import {
  AddTodoRequestBody,
  TodoPostSuccessResponse,
  ErrorResponse,
} from '../Types/todo.types';

export const addTodo = async (
  req: Request<{}, {}, AddTodoRequestBody>,
  res: Response<TodoPostSuccessResponse | ErrorResponse>
) => {
  const { text, isComplete } = req.body.todo;
  try {
    const result = await ToDoModel.create({ text, isComplete });
    return res.status(201).json({ message: 'Todo added successfully', result });
  } catch (error) {
    console.error('Add error:', error);
    return res.status(500).json({ error: 'Failed to add todo' });
  }
};
