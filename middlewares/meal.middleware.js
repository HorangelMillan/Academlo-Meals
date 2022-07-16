// Models
const { Meals } = require('../models/meals.model');
const { Restaurants } = require('../models/restaurants.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { appError } = require('../utils/appError.util');

const isMeal = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { mealId } = req.body;

    const catchId = id || mealId;

    const meal = await Meals.findOne({
        where: {
            id: catchId,
            status: 'active'
        },
        include: { model: Restaurants }
    });

    if (!meal) {
        return next(new appError('This meal is not exist', 410));
    };

    req.meal = meal;
    req.body.mealId = mealId;
    next();
});

module.exports = {
    isMeal
};