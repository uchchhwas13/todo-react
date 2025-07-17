import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoItem from './TodoItem';
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
        console.log('Fetched:', res.data.todoItems);
        setTodoList(res.data.todoItems);
      })
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <Header />
      <InputSection inputRef={inputRef} onAdd={handleAdd} />
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

const Header = () => (
  <div className="flex items-center mt-7 gap-2">
    <img src={todo_icon} alt="To-Do icon" className="w-8" />
    <h1 className="text-3xl font-semibold">To-DO List</h1>
  </div>
);

const InputSection = ({ inputRef, onAdd }) => (
  <div className="flex items-center my-7 bg-gray-200 rounded-full">
    <input
      ref={inputRef}
      className="bg-transparent border-0 outline-none flex-1 h-14 p-6 pr-2 placeholder:text-slate-600"
      type="text"
      placeholder="Add your task"
    />
    <button
      onClick={onAdd}
      className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
    >
      Add +
    </button>
  </div>
);

export default Todo;
