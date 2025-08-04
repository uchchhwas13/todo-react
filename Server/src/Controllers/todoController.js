const ToDoModel = require('../Models/Todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await ToDoModel.find({});
    return res.status(200).json({ todos });
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

exports.addTodo = async (req, res) => {
  const { id, text, isComplete } = req.body.todo;
  try {
    const result = await ToDoModel.create({ id, text, isComplete });
    return res.status(201).json({ message: 'Todo added successfully', result });
  } catch (error) {
    console.error('Add error:', error);
    return res.status(500).json({ error: 'Failed to add todo' });
  }
};

exports.updateTodo = async (req, res) => {
  const todo = req.body.todo;
  try {
    const updated = await ToDoModel.findOneAndUpdate(
      { id: req.params.id },
      todo,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Todo not found' });
    return res.status(200).json(updated);
  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({ error: 'Failed to update todo' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const deleted = await ToDoModel.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: 'Todo not found' });
    return res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ error: 'Failed to delete todo' });
  }
};
