const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/taskController.js')

router.get('/', tasksController.getAllTasks);
router.post('/', tasksController.createTask);
router.delete('/:id', tasksController.deleteTask);
router.patch('/:id', tasksController.updateTask);

module.exports = router;
