const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  isCompleted: { type: Boolean, default: false },
  category: { type: String, default: "General" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
});

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = { TodoModel };
