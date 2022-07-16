const bcrypt = require('bcrypt');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const hashPasswordd = catchAsync(async (req, res, next) => {
    const { password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    req.body.password = hash;
    next();
});

module.exports = { hashPasswordd };