const User = require('../models/User');

const asyncHandler = require('../middleware/async');

// @desc      Create user
// @route     POST /api/v1/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });

});
