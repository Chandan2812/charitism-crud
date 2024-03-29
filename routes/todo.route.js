const express = require("express");
const { TodoModel } = require("../models/todo.model");
const authenticateToken = require('../middleware/authmiddleware');

const todoRouter = express.Router();

// Create a new Todo
todoRouter.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    // Get the user ID from the JWT token
    const createdBy = req.user.userId;
    const todo = new TodoModel({ title, description, category, createdBy });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all Todos
todoRouter.get("/", authenticateToken, async (req, res) => {
  try {
    const todos = await TodoModel.find({ createdBy: req.user.userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a Todo by ID
todoRouter.put("/:id", authenticateToken, async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    // Check if the Todo exists and if the user has permission
    if (!todo || todo.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Permission denied" });
    }

    const { title, description, isCompleted, category } = req.body;
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      req.params.id,
      { title, description, isCompleted, category },
      { new: true }
    );
    res.status(200).json({ msg: "Todo updated successfully", updatedTodo });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Todo by ID
todoRouter.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    // Check if the Todo exists and if the user has permission
    if (!todo || todo.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Permission denied" });
    }

    await TodoModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { todoRouter };
