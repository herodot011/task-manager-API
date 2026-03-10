const taskRepository = require('../repositories/taskRepository');
const AppError = require('../utils/AppError');

exports.getAll = async ({ status, page = 1, limit = 10}) => {
    let tasks = await taskRepository.findAll();
    if(status) {
        tasks = tasks.filter(task => task.status === status);
    }
    page = Number(page);
    limit = Number(limit);
    
    const start = (page - 1) * limit;
    const end = start + Number(limit);

    console.log(tasks);

    return {
        total: tasks.length,
        page: Number(page),
        limit: Number(limit),
        data: tasks.slice(start, end)
    };
};

exports.getTasksWithUsers = async () => {
    const tasks = await taskRepository.getTasksWithUsers();
    return tasks;
}


exports.findById = async (id) => {
    const task = await taskRepository.findById(id);
    if (!task) {
        throw new AppError('Task not found', 404);
    };
    return task;
};

exports.getTasksByUserId = async (userId) => {
    const tasks = await taskRepository.getTasksByUserId(userId);
     if (!tasks) {
        throw new AppError('Tasks not found', 404);
    };
    return tasks;
}

exports.create = async (data) => {
    return await taskRepository.create(data);
};

exports.delete = async (id) => {
    const task = await taskRepository.delete(id);
    if (!task) {
        throw new AppError('Task not found', 404);
    }
    return task;
};

exports.update = async (id, data) => {
    const task = await taskRepository.findById(id);
    if(!task) {
        throw new AppError('Task not found', 404);
    }
    return await taskRepository.update(id, {
        ...task,
        ...data
    });
};