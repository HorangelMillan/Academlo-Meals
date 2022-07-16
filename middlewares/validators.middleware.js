const { body, validationResult } = require('express-validator');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { appError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
        const errorMsg = errors.array().map(err => err.msg);
        const msg = errorMsg.join(', ');

        return next(new appError(msg, 400));
    };

    next();
};

// user validators
const createUserValidators = [
    body('name').isString().withMessage('name cannot be empty'),
    body('email').isEmail().withMessage('email must be a valid email'),
    body('password').isAlphanumeric().withMessage('password must content numbers and letters'),
    checkResult
];

const loginValidators = [
    body('email').isEmail().withMessage('must provide a valid email'),
    body('password').isAlphanumeric().withMessage('password must content numbers and letters'),
    checkResult
];

const updateUserValidators = [
    body('name').isString().withMessage('name cannot be empty'),
    body('email').isEmail().withMessage('email must be a valid email'),
    checkResult
];

// restaurant validators
const createRestaurantValidators = [
    body('name').isString().withMessage('name cannot be empty'),
    body('address').isEmail().withMessage('email must be a valid email'),
    body('rating')
        .isInt({ max: 5 }).withMessage('rating must be least than 5')
        .isNumeric().withMessage('must be a number'),
    checkResult
];

// meal validators
const createMealValidators = [
        body('name').isString().withMessage('name cannot be empty'),
        body('price')
            .isInt({ max: 1000 }).withMessage('this is very much money, put another price less than 1000')
            .isNumeric().withMessage('must be a number'),
        checkResult
];

module.exports = {
    createUserValidators,
    loginValidators,
    updateUserValidators,
    createRestaurantValidators,
    createMealValidators
};