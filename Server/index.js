const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ToDoModel = require('./Models/Todo');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/todoDB')
  .then(() => console.log('Connected to MongoDB'));

app.get('/todos', async (req, res) => {
  try {
    const todoItems = await ToDoModel.find({});
    console.log('Fetched items:', todoItems);
    return res.status(200).json({ todoItems });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return res.status(500).json({ error: 'Failed to fetch todo items' });
  }
});

app.post('/add', async (req, res) => {
  const todoItem = req.body.todo;
  const result = await ToDoModel.create({
    id: todoItem.id,
    text: todoItem.text,
    isComplete: todoItem.isComplete,
  });
  console.log('result: ', result);
  return res.status(201).json({ message: 'Todo added successfully' });
});

app.put('/update/:id', async (req, res) => {
  console.log("Update request received for id,", req.params.id);
  const todoItem = req.body.todo;
  try {
    const result = await ToDoModel.findOneAndUpdate(
      { id: req.params.id },
      todoItem,
      { new: true, runValidators: true }
    );
    console.log('Update result: ', result);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error updating todos:', error);
    return res.status(500).json({ error: 'Failed to update todo items' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await ToDoModel.findOneAndDelete({ id: req.params.id }); // or `_id` if you're using MongoDB IDs
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    return res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return res.status(500).json({ error: 'Failed to delete todo item' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
