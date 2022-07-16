// Utils
const { catchAsync } = require('../utils/catchAsync.util');

// Models
const { Meals } = require('../models/meals.model');
const { Restaurants } = require('../models/restaurants.model');

// controllers
const createMeal = catchAsync(async (req,res, next) => {
    const { name, price, restaurantId } = req.body;

    const meal = await Meals.create({
        name,
        price,
        restaurantId
    });

    res.status(200).json({
        status: 'success',
        meal
    })
});

const getAllMeals = catchAsync(async (req, res, next) => {
    const meals = await Meals.findAll({
        where: {
            status: 'active'
        },
        include: { model: Restaurants }
    });

    res.status(200).json({
        status: 'success',
        meals
    });
});

const getMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;

    res.status(200).json({
        status: 'success',
        meal
    });
});

const updateMeal = catchAsync(async (req, res, next) => {
    const { name, price } = req.body;
    const { id } = req.meal;

    await Meals.update({
        name,
        price
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
       status: 'success',
    });
});

const disableMeal = catchAsync(async (req, res, next) => {
    const { id } = req.meal;

    await Meals.update({
        status: 'disabled'
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
       status: 'success',
    });
});

module.exports = {
    createMeal,
    getMeal,
    getAllMeals,
    updateMeal,
    disableMeal
};