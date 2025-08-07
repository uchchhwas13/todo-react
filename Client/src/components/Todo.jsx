// components/Todo.jsx
import { useEffect, useRef, useState } from 'react';
import TodoItem from './TodoItem';
import TodoHeader from './TodoHeader';
import TodoInputSection from './TodoInputSection';
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from '../services/todoService';

const Todo = () => {
  const [todoList, setTodoList] = useState([]);

  const handleAdd = async (inputText) => {
    console.log('Adding todo:', inputText);
    const newTodo = {
      id: Date.now().toString(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    try {
      await addTodo(newTodo);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const handleDelete = async (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleUpdate = async (modifiedTodo) => {
    setTodoList((prev) =>
      prev.map((todo) => (todo.id === modifiedTodo.id ? modifiedTodo : todo))
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
          setTodoList(response.data);
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
            key={item.id}
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
