const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ToDoModel = require('./Models/Todo')
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/todoDB')
        .then(() => console.log('Connected to MongoDB'));

app.get('/todoItems', async (req, res) => {
  try {
    const todoItems = await ToDoModel.find({});
    console.log("Fetched items:", todoItems);
    return res.status(200).json({todoItems});
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({ error: 'Failed to fetch todo items' });
  }
});

app.post('/add', async (req,res) => {
    const todoItem = req.body.todo;
    //console.log("Received request body: ", JSON.stringify(todoItem))
    const result = await ToDoModel.create({
        id: todoItem.id,
        text: todoItem.text,
        isComplete: todoItem.isComplete
    })
    console.log("result: ", result);
    return res.status(201).json({message: 'Todo added successfully'});
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
