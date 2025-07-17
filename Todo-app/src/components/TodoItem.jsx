import React from 'react';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';

const TodoItem = ({ item, deleteTodoItem, updateCompletionStatus }) => {
  const handleToggle = () => updateCompletionStatus(item.id);
  const handleDelete = () => deleteTodoItem(item.id);

  const renderStatusIcon = () => (
    <img
      src={item.isComplete ? tick : not_tick}
      onClick={handleToggle}
      alt="Toggle Status"
      className="w-7 cursor-pointer"
    />
  );

  const renderTodoTitle = () => (
    <p
      className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${
        item.isComplete ? 'line-through' : ''
      }`}
    >
      {item.text}
    </p>
  );

  const renderDeleteButton = () => (
    <img
      src={delete_icon}
      onClick={handleDelete}
      alt="Delete"
      className="w-3.5 cursor-pointer"
    />
  );

  const renderTodoItem = () => (
    <div className="flex items-center my-3 gap-2">
      <div className="flex flex-1 items-center">
        {renderStatusIcon()}
        {renderTodoTitle()}
      </div>
      {renderDeleteButton()}
    </div>
  );

  return <>{renderTodoItem()}</>;
};

export default TodoItem;
