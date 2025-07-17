const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true
    },
    isComplete: {
        type: Boolean,
        required: true
    }
})

const ToDoModel = mongoose.model("todos", TodoSchema);
module.exports = ToDoModel