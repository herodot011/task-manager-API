const tasksService = require('../services/taskService');
const { validateTask } = require('../validators/taskValidator');
const catchAsync = require('../utils/catchAsync');

exports.getAllTasks = catchAsync(async(req, res)=> {
    const { status, page, limit } = req.query;
    const tasks = await tasksService.getAll({
        status, 
        page, 
        limit
    });
    res.json(tasks);
})

exports.findById = catchAsync(async(req, res) => {
    const { id } = req.params;
    const task = await tasksService.findById(id);
    res.json(task);
})

exports.getTasksWithUsers = catchAsync(async(req, res) => {
    const tasks = await tasksService.getTasksWithUsers();
    res.json(tasks);
})

exports.getTasksByUserId = catchAsync(async(req, res) => {
    const userId = req.params.id;
    const tasks = await tasksService.getTasksByUserId(userId);
    res.json(tasks);
})

exports.createTask = catchAsync(async(req, res) => {
    validateTask(req.body);
    const task = await tasksService.create(req.body);
    res.status(201).json(task);
});

exports.deleteTask = catchAsync(async(req, res) => {
    const { id } = req.params;
    const deleted = await tasksService.delete(id);
    res.json({
        message: 'Task deleted successfully',
        data: deleted
    });
})

exports.updateTask = catchAsync(async(req, res) => {
    const { id } = req.params;
    const updatedTask = await tasksService.update(id, req.body);
    res.json(updatedTask);
})
