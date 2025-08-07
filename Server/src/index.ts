import express from 'express';
import cors from 'cors';
import todoRoutes from './Routes/todoRoutes';
import connectDB from './Config/db';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
