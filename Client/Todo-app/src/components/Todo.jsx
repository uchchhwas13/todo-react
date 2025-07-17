// components/Todo.jsx
import React, { useEffect, useRef, useState } from 'react';
import TodoItem from './TodoItem';
import TodoHeader from './TodoHeader';
import TodoInputSection from './TodoInputSection';
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  updateTodo
} from '../services/todoService';

const Todo = () => {
  const inputRef = useRef();
  const [todoList, setTodoList] = useState([]);

  const handleAdd = async () => {
    const inputText = inputRef.current.value.trim();
    if (!inputText) return;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = '';

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
      .then((res) => {
        setTodoList(res.data.todoItems);
      })
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <TodoHeader />
      <TodoInputSection inputRef={inputRef} onAdd={handleAdd} />
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
