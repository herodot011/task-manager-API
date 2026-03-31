const authService = require('../services/authService');
const catchAsync = require('../utils/catchAsync');
const { validateRegister } = require('../validators/authValidator');

exports.register = catchAsync(async(req, res) => {
    validateRegister(req.body);
    const user = await authService.register(req.body);
    res.status(201).json({
        status: 'success',
        data: user
    })
})

exports.login = catchAsync(async(req, res) => {
    const token = await authService.login(req.body);
    res.status(200).json({
        status: 'success',
        data: token
    })
})