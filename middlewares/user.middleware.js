// Models
const { Users } = require('../models/users.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { appError } = require('../utils/appError.util');

const isEmail = catchAsync(async (req, res, next) => {3
    const { email } = req.body;

    const user = await Users.findOne({
        where: {
            email,
            status: 'active'
        }
    });

    if (!user) {
        return next(new appError('This user is not exist anymore', 410));
    };

    req.body.user = user;
    next();
});

module.exports = { isEmail };