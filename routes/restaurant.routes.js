const express = require('express');

// Controllers
const {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    disableRestaurant,
    createRestaurantReview,
    updateReview,
    deleteReview
} = require('../controllers/restaurant.controller');

// Middlewares
const { isRestaurant } = require('../middlewares/restaurant.middleware');
const { protectSession } = require('../middlewares/auth.middleware');
const {
    createRestaurantValidators
} = require('../middlewares/validators.middleware');
const { isAdmin } = require('../middlewares/admin.middleware');
const { isReview } = require('../middlewares/reviews.middleware');

// init router
const restaurantsRouter = express.Router();

restaurantsRouter.post('/', protectSession, createRestaurantValidators, createRestaurant);
restaurantsRouter.get('/', getAllRestaurants);
restaurantsRouter.get('/:id', isRestaurant, getRestaurantById);
restaurantsRouter.patch('/:id', protectSession, isAdmin, updateRestaurant);
restaurantsRouter.delete('/:id', protectSession, isAdmin, isRestaurant, disableRestaurant);
restaurantsRouter.post('/reviews/:restaurantId', protectSession, isRestaurant, createRestaurantReview);
restaurantsRouter.patch('/reviews/:id', protectSession, isReview, updateReview);
restaurantsRouter.delete('/reviews/:id', protectSession, isReview, deleteReview);
module.exports = { restaurantsRouter };