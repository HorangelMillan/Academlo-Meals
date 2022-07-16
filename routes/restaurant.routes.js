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

restaurantsRouter.get('/', getAllRestaurants);
restaurantsRouter.get('/:id', isRestaurant, getRestaurantById);

restaurantsRouter.use(protectSession);

restaurantsRouter.post('/', createRestaurantValidators, createRestaurant);

restaurantsRouter.use('/:id', isAdmin)
    .route('/:id')
    .patch(updateRestaurant)
    .delete(isRestaurant, disableRestaurant);

restaurantsRouter.post('/reviews/:restaurantId', isRestaurant, createRestaurantReview);

restaurantsRouter.use('/reviews/:id', isReview)
    .route('/reviews/:id')
    .patch(updateReview)
    .delete(deleteReview);

module.exports = { restaurantsRouter };