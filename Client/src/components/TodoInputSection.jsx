const TodoInputSection = ({ inputRef, onAdd: addToDoItem }) => (
  <div className="flex items-center my-7 bg-gray-200 rounded-full">
    <input
      ref={inputRef}
      className="bg-transparent border-0 outline-none flex-1 h-14 p-6 pr-2 placeholder:text-slate-600"
      type="text"
      placeholder="Add your task"
      onKeyDown={(e) => {
        if (e.key === 'Enter') addToDoItem();
      }}
    />
    <button
      onClick={addToDoItem}
      className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
    >
      Add +
    </button>
  </div>
);

export default TodoInputSection;
