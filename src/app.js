const express = require('express');
const app = express();
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const tasksRouter = require('./routes/tasks');

app.use(express.json());
app.use(logger);

app.use('/tasks', tasksRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`)
})

module.exports = app;