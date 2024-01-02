// routes/todo.js
const express = require("express");
const {TodoModel} = require("../models/todo.model");
const authenticateToken = require('../middleware/authmiddleware');

const todoRouter = express.Router();


// Create a new Todo
todoRouter.post("/",authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = new TodoModel({ title, description });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all Todos
todoRouter.get("/", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a Todo by ID
todoRouter.put("/:id",authenticateToken, async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true }
    );
    res.status(200).json({msg:"Todo updated successfully",updatedTodo});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Todo by ID
todoRouter.delete("/:id",authenticateToken, async (req, res) => {
  try {
    await TodoModel.findByIdAndDelete(req.params.id);
    res.status(201).json({msg:"Todo deleted succesfully"});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {todoRouter};
