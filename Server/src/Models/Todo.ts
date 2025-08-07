import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITodo extends Document {
  text: string;
  isComplete: boolean;
}

const TodoSchema: Schema<ITodo> = new Schema({
  text: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    required: true,
  },
});

export const ToDoModel: Model<ITodo> = mongoose.model<ITodo>(
  'todos',
  TodoSchema
);
