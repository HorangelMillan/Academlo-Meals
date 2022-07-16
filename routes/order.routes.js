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

ordersRouter.post('/', protectSession, isMeal, createOrder);
ordersRouter.get('/me', protectSession, isOrders, getUserOrders);
ordersRouter.patch('/:id', protectSession, isOrder, completeOrder);
ordersRouter.delete('/:id', protectSession, isOrder, cancelOrder);

module.exports = { ordersRouter };