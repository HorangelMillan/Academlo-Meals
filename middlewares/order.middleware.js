// Models
const { Orders } = require('../models/orders.model');
const { Restaurants } = require('../models/restaurants.model');
const { Meals } = require('../models/meals.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { appError } = require('../utils/appError.util');

const isOrder = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;

    console.log(id)

    const order = await Orders.findOne({
        where: {
            id,
            userId: user.id,
            status: 'active'
        },
        include: {
            model: Meals,
            attributes: { exclude: ['createdAt', 'updatedAt', 'restaurantId'] },
            include: {
                model: Restaurants,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
        }
    });

    if (!order) {
        return next(new appError('You dont have this order'));
    };

    req.order = order;
    next();
});

const isOrders = catchAsync(async (req, res, next) => {
    const { id } = req.user;

    const orders = await Orders.findAll({
        where: {
            userId: id
        },
        include: {
            model: Meals,
            attributes: { exclude: ['createdAt', 'updatedAt', 'restaurantId'] },
            include: {
                model: Restaurants,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
        }
    });

    if (!orders) {
        return next(new appError('You dont have orders'));
    };

    req.orders = orders;
    next();
});

module.exports = {
    isOrders,
    isOrder
};