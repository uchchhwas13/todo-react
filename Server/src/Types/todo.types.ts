import { ITodo } from '../Models/Todo';
import { z } from 'zod';
import { addTodoSchema, updateTodoSchema } from '../Validators/toDoValidators';

export type AddTodoRequestBody = z.infer<typeof addTodoSchema>;
export type UpdateTodoRequestBody = z.infer<typeof updateTodoSchema>;

export type ErrorResponse = {
  error: string;
};

export type TodosGetSuccessResponse = {
  todos: ITodo[];
};

export type TodoPostSuccessResponse = {
  message: string;
  result: ITodo;
};

export type TodoPutSuccessResponse = {
  message: string;
  updatedTodo: ITodo;
};

export type TodoDeleteSuccessResponse = {
  message: string;
};
