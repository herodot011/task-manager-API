require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const tasksRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');

app.use(helmet());

app.use(express.json());
app.use(logger);

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,                  
    message: {
        status: 'fail',
        message: 'Too many requests, please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/tasks', apiLimiter, tasksRouter);
app.use('/auth', authLimiter, authRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.end.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`)
})

module.exports = app;