// Models
const { Restaurants } = require('../models/restaurants.model');
const { Reviews } = require('../models/reviews.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { sorting } = require('../utils/sorting.util');

// controller
const createRestaurant = catchAsync(async (req, res, next) => {
    const { name, address, rating } = req.body;

    const restaurant = await Restaurants.create({
        name,
        address,
        rating
    });

    console.log(restaurant, name, address, rating)

    res.status(200).json({
        status: 'success',
        restaurant
    });
});

const getAllRestaurants = catchAsync(async (req, res, next) => {
    const restaurants = await Restaurants.findAll({
        where: {
            status: 'active'
        }
    });

    res.status(200).json({
        status: 'success',
        restaurants
    });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
    const { restaurant } = req;

    res.status(200).json({
        status: 'success',
        restaurant
    });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
    const { name, address } = req.body;
    const { id } = req.params;

    await Restaurants.update({
        name,
        address
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
        status: 'success'
    });
});

const disableRestaurant = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    await Restaurants.update({
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

const createRestaurantReview = catchAsync(async (req, res, next) => {
    const { restaurantId, user } = req;
    const { comment, rating } = req.body;

    const restaurantReview = await Reviews.create({
        userId: user.id,
        restaurantId,
        comment,
        rating
    });

    const reviews = await Reviews.findAll({
        where: {
            restaurantId
        }
    });

    const arrRatings = reviews.map(review => review.rating);
    const average = sorting(arrRatings);

    await Restaurants.update({
        rating: average
    }, {
        where: {
            id: restaurantId
        }
    });
    
    res.status(200).json({
        status: 'success',
        restaurantReview
    });
});

const updateReview = catchAsync(async (req, res, next) => {
    const { reviewId, comment, rating } = req;

    await Reviews.update({
        comment,
        rating
    }, {
        where: {
            reviewId
        }
    });

    res.status(200).json({
       status: 'success'
    });
});

const deleteReview = catchAsync(async (req, res, next) => {
    const { reviewId } = req.body;

    await Reviews.update({
        status: 'deleted'
    }, {
        where: {
            id: reviewId
        }
    });

    res.status(200).json({
       status: 'success',
    });
});

module.exports = {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    disableRestaurant,
    createRestaurantReview,
    updateReview,
    deleteReview
};