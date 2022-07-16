const express = require('express');

// Middlewares
const { isRestaurant } = require('../middlewares/restaurant.middleware');
const { protectSession } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/admin.middleware');

// Controllers
const {
    createMeal,
    getMeal,
    getAllMeals,
    updateMeal,
    disableMeal
} = require('../controllers/meals.controller');
const { isMeal } = require('../middlewares/meal.middleware');
const { createMealValidators } = require('../middlewares/validators.middleware');

// init router
const mealsRouter = express.Router();

mealsRouter.get('/', getAllMeals);
mealsRouter.get('/:id', isMeal, getMeal);

mealsRouter.use(protectSession);

mealsRouter.post('/:id', isRestaurant, createMealValidators, createMeal);

mealsRouter.use(':/id', isAdmin)
    .route('/:id')
    .patch(isMeal, updateMeal)
    .delete(isMeal, disableMeal);

module.exports = { mealsRouter };