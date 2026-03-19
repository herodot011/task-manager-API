const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const AppError = require('../utils/AppError');

exports.register = async(data) => {
    const { name, email, password } = data;

    const existingUser = await userRepository.findByEmail(email);
    if(existingUser) {
        throw new AppError('Email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
        name,
        email,
        password: hashedPassword
    });

    delete user.password;

    return user;
}

exports.login = async(data) => {
    const {email, password } = data;
    const user = await userRepository.findByEmail(email);
    if(!user) {
        throw new AppError('Invalid email or password', 401);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) {
        throw new AppError('Invalid email or password', 401);
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role},
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    return { token }
}