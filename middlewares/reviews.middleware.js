// Models
const { Reviews } = require('../models/reviews.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { appError } = require('../utils/appError.util');

const isReview = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;

    const review = await Reviews.findOne({
        where: {
            id,
            userId: user.id,
            /* review: 'active' */
        }
    });

    if (user.role === 'admin') {
        req.body.reviewId = id;
        return next();
    };

    if (!review) {
        return next(new appError('this review don´t belongs to you'));
    };
    
    req.body.reviewId = id;
    next();
});

module.exports = { isReview };