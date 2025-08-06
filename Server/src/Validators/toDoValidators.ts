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
  todo: z
    .object({
      text: z.string().optional(),
      isComplete: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided for update',
    }),
});
