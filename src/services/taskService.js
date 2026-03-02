const taskRepository = require('../repositories/taskRepository');
const AppError = require('../utils/AppError');

exports.getAll = ({ status, page = 1, limit = 10}) => {
    let tasks = taskRepository.findAll();
    if(status) {
        tasks = tasks.filter(task => task.status === status);
    }
    page = Number(page);
    limit = Number(page);
    
    const start = (page - 1) * limit;
    const end = start + Number(limit);

    return {
        total: tasks.length,
        page: Number(page),
        limit: Number(limit),
        data: tasks.slice(start, end)
    };
};

exports.findById = (id) => {
    const task = taskRepository.findById(id);
    if (!task) {
        throw new AppError('Task not found', 404);
    };
    return task;
};

exports.create = (data) => {
    return taskRepository.create(data);
};

exports.delete = (id) => {
    const task = taskRepository.delete(id);
    if (!task) {
        throw new AppError('Task not found', 404);
    }
    return task;
};

exports.update = (id, data) => {
    const task = taskRepository.findById(id);
    if(!task) {
        throw new AppError('Task not found', 404);
    }
    return taskRepository.update(id, {
        ...task,
        ...data
    });
};