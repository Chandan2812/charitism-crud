const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: { type: String, required: true, maxlength: 255 },
  description: { type: String, maxlength: 1000 },
  isCompleted: { type: Boolean, default: false },
  category: { type: String, default: "General", enum: ["General", "Work", "Personal"] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
});

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = { TodoModel };
