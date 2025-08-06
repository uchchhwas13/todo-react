import { Request, Response } from 'express';
import { ToDoModel } from '../Models/Todo';
import { TodosGetSuccessResponse, ErrorResponse } from '../Types/todo.types';

export const getTodos = async (
  req: Request,
  res: Response<TodosGetSuccessResponse | ErrorResponse>
) => {
  try {
    const todos = await ToDoModel.find({});
    return res.status(200).json({ todos });
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch todos' });
  }
};
