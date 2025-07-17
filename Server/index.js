const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/todo')
        .then(() => console.log('Connected to MongoDB'));

app.post('/add', (req,res) => {
    const todoItem = req.body.todo;
    console.log("Received request body: ", JSON.stringify(todoItem))
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
