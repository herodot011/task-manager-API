const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/taskController.js');
const auth = require('../middlewares/auth.js');
const checkRole = require('../middlewares/checkRole.js')

router.get('/', tasksController.getAllTasks);
router.get('/with-users', tasksController.getTasksWithUsers);
router.get('/:id', tasksController.findById);
router.get('/user/:id', tasksController.getTasksByUserId);
router.post('/', auth, tasksController.createTask);
router.delete('/:id', auth, checkRole('admin'), tasksController.deleteTask);
router.patch('/:id', auth, tasksController.updateTask);

module.exports = router;
