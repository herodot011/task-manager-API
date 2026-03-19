const AppError = require('../utils/AppError');

module.exports = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            throw new AppError('Access denied', 403)
        }
        next();
    };
};