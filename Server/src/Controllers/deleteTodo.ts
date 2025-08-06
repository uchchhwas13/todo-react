import { Request, Response } from 'express';
import { ToDoModel } from '../Models/Todo';
import { TodoDeleteSuccessResponse, ErrorResponse } from '../Types/todo.types';

export const deleteTodo = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response<TodoDeleteSuccessResponse | ErrorResponse>
) => {
  try {
    const deleted = await ToDoModel.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: 'Todo not found' });
    return res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ error: 'Failed to delete todo' });
  }
};
