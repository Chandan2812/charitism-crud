// models/todo.js
const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
});

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = {TodoModel};
