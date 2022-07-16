const express = require('express');

// Controllers
const {
    createOrder,
    getUserOrders,
    completeOrder,
    cancelOrder
} = require('../controllers/orders.controller');

// Middlewares
const { protectSession } = require('../middlewares/auth.middleware');
const { isMeal } = require('../middlewares/meal.middleware');
const { isOrders, isOrder } = require('../middlewares/order.middleware');

// init router
const ordersRouter = express.Router();

ordersRouter.use(protectSession);

ordersRouter.post('/', isMeal, createOrder);

ordersRouter.get('/me', isOrders, getUserOrders);

ordersRouter.use('/:id', isOrder)
    .route('/:id')
    .patch(completeOrder)
    .delete(cancelOrder);

module.exports = { ordersRouter };