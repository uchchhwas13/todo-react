import { z } from 'zod';

export const todoSchema = z.object({
  id: z.string(),
  text: z.string(),
  isComplete: z.boolean(),
});

export const addTodoSchema = z.object({
  todo: todoSchema,
});

export const updateTodoSchema = z.object({
  todo: todoSchema,
});
