const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ToDoModel = require('./Models/Todo');
const connectDB = require('./Config/db');
const todoRoutes = require('./Routes/todoRoutes');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/', todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
