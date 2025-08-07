import todo_icon from '../assets/todo_icon.png';

const TodoHeader = (): React.JSX.Element => (
  <div className="flex items-center mt-7 gap-2">
    <img src={todo_icon} alt="To-Do icon" className="w-8" />
    <h1 className="text-3xl font-semibold">To-DO List</h1>
  </div>
);

export default TodoHeader;
