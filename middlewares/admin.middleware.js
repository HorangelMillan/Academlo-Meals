// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { appError } = require('../utils/appError.util');

const isAdmin = catchAsync(async (req, res, next) => {
    const { role } = req.user;

    if (role != 'admin') {
        return next(new appError('permision denied', 403));

    };

    next();
});

module.exports = { isAdmin };