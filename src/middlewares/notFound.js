const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
    next(new AppError(`Not Found - ${req.originalUrl}`, 404));
}