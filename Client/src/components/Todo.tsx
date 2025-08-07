// components/Todo.jsx
import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import TodoHeader from './TodoHeader';
import TodoInputSection from './TodoInputSection';
import { TodoModel } from '../type/type';

import {
  fetchTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from '../services/todoService';

const Todo = (): React.JSX.Element => {
  const [todoList, setTodoList] = useState<TodoModel[]>([]);

  const handleAdd = async (text: string) => {
    const tempId = Date.now().toString();
    const tempTodo: TodoModel = { _id: tempId, text, isComplete: false };
    setTodoList((prev) => [...prev, tempTodo]);

    try {
      const response = await addTodo({ text, isComplete: false });

      if (response.data) {
        const realTodo = response.data;
        setTodoList((prev) =>
          prev.map((todo) => (todo._id === tempId ? realTodo : todo))
        );
        return;
      }
    } catch (error) {
      console.error('Add failed', error);
    }
    setTodoList((prev) => prev.filter((todo) => todo._id !== tempId));
  };

  const handleDelete = async (id: string) => {
    setTodoList((prev) => prev.filter((todo) => todo._id !== id));
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleUpdate = async (modifiedTodo: TodoModel) => {
    setTodoList((prev) =>
      prev.map((todo) => (todo._id === modifiedTodo._id ? modifiedTodo : todo))
    );
    try {
      await updateTodo(modifiedTodo);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  useEffect(() => {
    fetchTodos()
      .then((response) => {
        if (response.error) {
          // show error in UI
          console.error(response.error);
        } else {
          setTodoList(response.data || []);
          console.log(response.data);
        }
      })
      .catch((error) => {
        // handle unexpected errors (network issues, etc)
        console.error('Unexpected error:', error);
      });
  }, []);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <TodoHeader />
      <TodoInputSection onAdd={handleAdd} />
      <div>
        {todoList.map((item) => (
          <TodoItem
            key={item._id}
            item={item}
            deleteTodoItem={handleDelete}
            updateTodoItem={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
