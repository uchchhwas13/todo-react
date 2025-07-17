import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoItem from './TodoItem';
import axios from 'axios';

const Todo = () => {
  const inputRef = useRef();
  const storedTodoList = JSON.parse(localStorage.getItem("todos")) || [];
  const [todoList, setTodoList] = useState(storedTodoList);

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === '') return;
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = '';
    axios.post('http://localhost:3000/add', {todo: newTodo})
    .then(result => console.log("Result: ", result.data))
    .catch(error => console.log("Error: ", error))
  };

  const deleteTodoItem = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const updateCompletionStatus = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  },[todoList]);

  const updateTodoText = (id, newText) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };


  const renderHeader = () => (
    <div className="flex items-center mt-7 gap-2">
      <img src={todo_icon} alt="To-Do icon" className="w-8" />
      <h1 className="text-3xl font-semibold">To-DO List</h1>
    </div>
  );

  const renderInputField = () => (
    <input
      ref={inputRef}
      className="bg-transparent border-0 outline-none flex-1 h-14 p-6 pr-2 placeholder:text-slate-600"
      type="text"
      placeholder="Add your task"
    />
  );

  const renderAddButton = () => (
    <button
      onClick={add}
      className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
    >
      Add +
    </button>
  );

  const renderInputSection = () => (
    <div className="flex items-center my-7 bg-gray-200 rounded-full">
      {renderInputField()}
      {renderAddButton()}
    </div>
  );

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {renderHeader()}
      {renderInputSection()}
      <div>
        {todoList.map((item) => {
          return (
            <TodoItem
              key={item.id}
              item={item}
              deleteTodoItem={deleteTodoItem}
              updateCompletionStatus={updateCompletionStatus}
              updateTodoText={updateTodoText}
            ></TodoItem>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
