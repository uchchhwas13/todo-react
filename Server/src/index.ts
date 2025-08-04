import express from 'express';
const cors = require('cors');
const connectDB = require('./Config/db');
const todoRoutes = require('./Routes/todoRoutes');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
