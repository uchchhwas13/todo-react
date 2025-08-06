import { Router } from 'express';
import { validateBody } from '../Middlewares/validateBody';
import { addTodoSchema, updateTodoSchema } from '../Validators/toDoValidators';
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from '../Controllers/todoController';

const router = Router();
router.get('/', getTodos);
router.post('/', validateBody(addTodoSchema), addTodo);
router.put('/:id', validateBody(updateTodoSchema), updateTodo);
router.delete('/:id', deleteTodo);

export default router;
