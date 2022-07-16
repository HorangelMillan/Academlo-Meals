// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { appError } = require('../utils/appError.util');

// Models
const { Restaurants } = require('../models/restaurants.model');

const isRestaurant = catchAsync(async (req, res, next) => {
    const { id, restaurantId } = req.params;

    const dinamicId = id || restaurantId;

    const restaurant = await Restaurants.findOne({
        where: {
            id: dinamicId,
            status: 'active'
        }
    });

    if (!restaurant) {
        return next(new appError('restaurant is not exist anymore'));
    };

    req.restaurantId = dinamicId;
    req.restaurant = restaurant;
    next();
})

module.exports = { isRestaurant };