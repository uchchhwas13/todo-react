import { useState } from 'react';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';
import edit_icon from '../assets/edit.png';

const TodoItem = ({
  item,
  deleteTodoItem,
  updateTodoItem,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.text);

  const handleDelete = () => deleteTodoItem(item.id);
  const handleEditClick = () => setIsEditing(true);

  const handleChange = (e) => setEditedText(e.target.value);

  const handleSave = () => {
    const trimmedText = editedText.trim();
    if (trimmedText === '') return;
    item.text = trimmedText;
    updateTodoItem(item);
    setIsEditing(false);
  };

  const handleToggle = () => {
    item.isComplete = !item.isComplete
    updateTodoItem(item);
  }

  const handleCancel = () => {
    setEditedText(item.text);
    setIsEditing(false);
  };

  const renderStatusIcon = () => (
    <img
      src={item.isComplete ? tick : not_tick}
      onClick={handleToggle}
      alt="Toggle Status"
      className="w-7 cursor-pointer"
    />
  );

  const renderEditableInput = () => (
    <input
      type="text"
      value={editedText}
      onChange={handleChange}
      onBlur={handleSave}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') handleCancel();
      }}
      className="ml-4 text-[17px] border border-gray-300 rounded px-2 py-1 flex-1 overflow-x-auto"
      style={{ maxWidth: '100%' }}
      autoFocus
    />
  );

  const renderStaticTitle = () => (
    <p
      className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 break-words ${
        item.isComplete ? 'line-through' : ''
      }`}
    >
      {item.text}
    </p>
  );

  const renderTodoTitle = () => {
    return isEditing ? renderEditableInput() : renderStaticTitle();
  };

  const renderDeleteButton = () => (
    <img
      src={delete_icon}
      onClick={handleDelete}
      alt="Delete"
      className="w-3.5 cursor-pointer"
    />
  );

  const renderEditButton = () => (
    <img
      src={edit_icon}
      onClick={handleEditClick}
      alt="Edit"
      className="w-3.5 cursor-pointer"
    />
  );

  return (
    <div className="flex items-center my-3 gap-2">
      <div className="flex flex-1 items-center">
        {renderStatusIcon()}
        {renderTodoTitle()}
      </div>
      {renderEditButton()}
      {renderDeleteButton()}
    </div>
  );
};

export default TodoItem;
