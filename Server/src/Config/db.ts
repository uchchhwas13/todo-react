import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://localhost:27017/todoDB');
    console.log('Connected to MongoDB');
  } catch (error) {
    if (error instanceof Error) {
      console.error('MongoDB connection failed:', error.message);
    } else {
      console.error('An unknown error occurred during MongoDB connection.');
    }
  }
};

export default connectDB; 