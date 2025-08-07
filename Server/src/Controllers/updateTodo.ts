import { Request, Response } from 'express';
import { ToDoModel } from '../Models/Todo';
import {
  UpdateTodoRequestBody,
  TodoPutSuccessResponse,
  ErrorResponse,
} from '../Types/todo.types';

export const updateTodo = async (
  req: Request<{ id: string }, {}, UpdateTodoRequestBody>,
  res: Response<TodoPutSuccessResponse | ErrorResponse>
) => {
  const { todo } = req.body;

  try {
    const updatedTodo = await ToDoModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: todo },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    return res
      .status(200)
      .json({ message: 'Todo updated successfully', updatedTodo });
  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({ error: 'Failed to update todo' });
  }
};
