const tasksService = require('../services/taskService');
const { validateTask } = require('../validators/taskValidator');
const catchAsync = require('../utils/catchAsync');
const success = require('../utils/response');

exports.getAllTasks = catchAsync(async(req, res)=> {
    const { status, page, limit } = req.query;
    const tasks = await tasksService.getAll({
        status, 
        page, 
        limit
    });

    success(res, tasks);
})

exports.findById = catchAsync(async(req, res) => {
    const { id } = req.params;
    const task = await tasksService.findById(id);
    success(res, task);
})

exports.getTasksWithUsers = catchAsync(async(req, res) => {
    const tasks = await tasksService.getTasksWithUsers();
    success(res, tasks);
})

exports.getTasksByUserId = catchAsync(async(req, res) => {
    const userId = req.params.id;
    const tasks = await tasksService.getTasksByUserId(userId);
    success(res, tasks);
})

exports.createTask = catchAsync(async(req, res) => {
    validateTask(req.body);
    const task = await tasksService.create({ ...req.body, user_id: req.user.id });
    success(res, task, 201);
});

exports.deleteTask = catchAsync(async(req, res) => {
    const { id } = req.params;
    const deleted = await tasksService.delete(id);
    success(res, deleted);
})

exports.updateTask = catchAsync(async(req, res) => {
    const { id } = req.params;
    const updatedTask = await tasksService.update(id, req.body);
    success(res, updatedTask);
})
