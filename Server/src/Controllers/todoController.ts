import type { Request, Response } from 'express';
import { ToDoModel } from '../Models/Todo';
import { z } from 'zod';
import { ITodo } from '../Models/Todo';
import { addTodoSchema, updateTodoSchema } from '../Validators/toDoValidators';

type AddTodoRequestBody = z.infer<typeof addTodoSchema>;
type UpdateTodoRequestBody = z.infer<typeof updateTodoSchema>;

type TodosGetSuccessResponse = {
  todos: ITodo[];
};

type ErrorResponse = {
  error: string;
};

type TodoPostSuccessResponse = {
  message: string;
  result: ITodo;
};

type TodoPutSuccessResponse = {
  message: string;
  updatedTodo: ITodo;
};

type TodoDeleteSuccessResponse = {
  message: string;
};

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

export const addTodo = async (
  req: Request<{}, {}, AddTodoRequestBody>,
  res: Response<TodoPostSuccessResponse | ErrorResponse>
): Promise<Response> => {
  const { id, text, isComplete } = req.body.todo;
  try {
    const result = await ToDoModel.create({ id, text, isComplete });
    return res.status(201).json({ message: 'Todo added successfully', result });
  } catch (error) {
    console.error('Add error:', error);
    return res.status(500).json({ error: 'Failed to add todo' });
  }
};

export const updateTodo = async (
  req: Request<{ id: string }, {}, UpdateTodoRequestBody>,
  res: Response<TodoPutSuccessResponse | ErrorResponse>
) => {
  const { todo } = req.body;

  try {
    const updatedTodo = await ToDoModel.findOneAndUpdate(
      { id: req.params.id },
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
