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

mealsRouter.post('/:id', protectSession, isRestaurant, createMealValidators, createMeal);
mealsRouter.get('/', getAllMeals);
mealsRouter.get('/:id', isMeal, getMeal);
mealsRouter.patch('/:id', protectSession, isAdmin, isMeal, updateMeal);
mealsRouter.delete('/:id', protectSession, isAdmin, isMeal, disableMeal);

module.exports = { mealsRouter };