// Models
const { Orders } = require('../models/orders.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

// create controllers
const createOrder = catchAsync(async (req, res, next) => {
    const { mealId, quantity } = req.body;
    const { price } = req.meal;
    const { id } = req.user;

    const order = await Orders.create({
        userId: id,
        mealId,
        quantity,
        totalPrice: price * quantity
    });

    res.status(200).json({
        status: 'success',
        order
    });
});

const getUserOrders = catchAsync(async (req, res, next) => {
    const { orders } = req;

    res.status(200).json({
        status: 'success',
        orders
    });
});

const completeOrder = catchAsync(async (req, res, next) => {
    const { id } = req.order;

    await Orders.update({
        status: 'completed'
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
        status: 'success'
    });
});

const cancelOrder = catchAsync(async (req, res, next) => {
    const { id } = req.order;

    await Orders.update({
        status: 'cancelled'
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
        status: 'success'
    });
});

module.exports = {
    createOrder,
    getUserOrders,
    completeOrder,
    cancelOrder
};