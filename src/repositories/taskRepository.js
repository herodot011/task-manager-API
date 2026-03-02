const { v4: uuidv4 } = require('uuid');

let tasks = [];

exports.findAll = () => tasks;

exports.findById = (id) => {
    return tasks.find(t => t.id === id);
}

exports.create = (data) => {
    const task = {
        id: uuidv4(),
        title: data.title || 'untitled',
        status: 'pending',
        createdAt: new Date().toISOString()
    }
    tasks.push(task);
    return task;
}

exports.delete = (id) => {
    let index = tasks.findIndex(t => t.id === id);
    if (index === -1) return null;
    const deleted = tasks[index];
    tasks.splice(index, 1);
    return deleted;
}

exports.update = (id, updatedTask) => {
    const index = tasks.findIndex(t => t.id === id);
    if(index === -1) {
        return null
    }
    tasks[index] = {
        ...tasks[index],
        ...updatedTask,
        updatedAt: new Date().toISOString()
    };
    return tasks[index];
}