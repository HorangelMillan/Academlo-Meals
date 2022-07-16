const express = require('express');
const morgan = require('morgan');

// Routes
const { usersRouter } = require('./routes/user.routes');
const { ordersRouter } = require('./routes/order.routes');
const { mealsRouter } = require('./routes/meal.routes');
const { restaurantsRouter } = require('./routes/restaurant.routes');

// init express
const app = express();

// use middlewares
app.use(express.json());
app.use(morgan('dev'));

// main routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/restaurants', restaurantsRouter);


// global error handler
app.use('*', (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: err.status,
        statusCode: err.statusCode,
        message: err.message,
        err
    });
});

module.exports = { app };