// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
// taskRoutes.js
const Task = require('../models/Task'); // Ensure this path is correct


// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    const { task } = req.body;
    const newTask = new Task({ task });

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: 'Error creating task' });
    }
});

// Edit a task
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { task }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task' });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
});

module.exports = router;
