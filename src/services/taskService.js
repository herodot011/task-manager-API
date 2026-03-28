const taskRepository = require('../repositories/taskRepository');
const AppError = require('../utils/AppError');

exports.getAll = async ({ status, page = 1, limit = 10}) => {
    page = Math.max(1, Number(page));
    limit = Math.min(100, Math.max(1, Number(limit)));

    const { rows, total } = await taskRepository.findAll({ status, page, limit });

    return {
        total, 
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        data: rows
    };
}

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