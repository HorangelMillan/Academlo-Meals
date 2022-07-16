const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Models
const { Users } = require('../models/users.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { appError } = require('../utils/appError.util');

const protectSession = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    };

    if (!token) {
        return next(new appError('invalid session', 401 /* unauthorized */))
    };

    const decrypt = jwt.verify(token, process.env.SECRET_KEY);

    const user = await Users.findOne({
        where: {
            id: decrypt.id,
            status: 'active'
        }
    });

    if (!user) {
        return next(new appError('The owner of this token doesnt exist anymore', 410 /* gone / content deleted */))
    };

    req.user = user;
    next()
});

const comparePassword = catchAsync(async (req, res, next) => {
    const { password, user } = req.body;

    const validatedUser = await bcrypt.compare(password, user.password);

    if (!validatedUser) {
        return next(new appError('invalid credentials', 401));
    };

    next();
});

const protectUserAcounts = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await Users.findOne({
        where: {
            id
        }
    });

    if (!user) {
        return next(new appError('This acount does not belong to you', 403 /* Forbiden / denied access */))
    };

    next();
});

module.exports = {
    protectSession,
    comparePassword,
    protectUserAcounts
};