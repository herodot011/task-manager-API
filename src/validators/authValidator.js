const AppError = require('../utils/AppError');

exports.validateRegister = (data) => {
    if(!data.name) {
        throw new AppError('Name is required', 400);
    }

    if(!data.email) {
        throw new AppError('Email is required', 400);
    }

    if(!data.email.includes('@')) {
        throw new AppError('Email is invalid', 400);
    }

    if(!data.password) {
        throw new AppError('Password is required', 400);
    }

    if(data.password.length < 6) {
        throw new AppError('Password must be at least 6 characters', 400);
    }
}