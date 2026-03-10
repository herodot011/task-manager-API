const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/taskController.js')

router.get('/', tasksController.getAllTasks);
router.get('/with-users', tasksController.getTasksWithUsers);
router.get('/:id', tasksController.findById);
router.get('/user/:id', tasksController.getTasksByUserId);
router.post('/', tasksController.createTask);
router.delete('/:id', tasksController.deleteTask);
router.patch('/:id', tasksController.updateTask);

module.exports = router;
