const jsw = require('jsonwebtoken');
require('dotenv').config();

// Models
const { Users } = require('../models/users.model');
const { Orders } = require('../models/orders.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

// create controllers
const createUser = catchAsync(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const user = await Users.create({
        name,
        email,
        password,
        role
    });

    res.status(200).json({
        status: 'success',
        user
    });
});

const login = catchAsync(async (req, res, next) => {
    const { id } = req.body.user;

    const token = jsw.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: '10m'
    });

    res.status(200).json({
        status: 'success',
        token
    });
});

const updateUser = catchAsync(async (req, res, next) => {
    const { id } = req.user;
    const { name, email } = req.body;

    await Users.update({
        name,
        email
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
        status: 'success'
    });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const { id } = req.user;

    await Users.update({
        status: 'disabled'
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
        status: 'success'
    });
});

const getUserOrders = catchAsync(async (req, res, next) => {
    const { orders } = req;

    res.status(200).json({
        status: 'success',
        orders
    });
});

const getUserOrder = catchAsync(async (req, res, next) => {
    const { order } = req;

    res.status(200).json({
        status: 'success',
        order
    });
});

module.exports = {
    createUser,
    login,
    updateUser,
    deleteUser,
    getUserOrders,
    getUserOrder
};