const AppError = require('../utils/AppError');

exports.validateTask = (data) => {
    if(!data.title) {
        throw new AppError('Title is required', 400);
    }

    if(data.title.length < 3) {
        throw new AppError('Title must me at least 3 characters', 400);
    }
}