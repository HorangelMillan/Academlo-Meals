const express = require('express');

// Controllers
const {
    createUser,
    login,
    updateUser,
    deleteUser,
    getUserOrders,
    getUserOrder
} = require('../controllers/users.controller');

// Middlewares
const {
    createUserValidators,
    loginValidators,
    updateUserValidators
} = require('../middlewares/validators.middleware');
const { hashPasswordd } = require('../middlewares/security.middleware');
const { isEmail } = require('../middlewares/user.middleware');
const { isOrders, isOrder } = require('../middlewares/order.middleware');
const { comparePassword, protectSession, protectUserAcounts } = require('../middlewares/auth.middleware');

// init router
const usersRouter = express.Router();

// child routes
usersRouter.post('/signup', createUserValidators, hashPasswordd, createUser);
usersRouter.post('/login', loginValidators, isEmail, comparePassword, login);
usersRouter.patch('/:id', updateUserValidators, protectSession, protectUserAcounts, updateUser);
usersRouter.delete('/:id', protectSession, protectUserAcounts, deleteUser);
usersRouter.get('/orders', protectSession, isOrders, getUserOrders);
usersRouter.get('/orders/:id', protectSession, isOrder, getUserOrder);

module.exports = { usersRouter };