const Activity = require('../models/Activity');
const asyncHandler = require('../middleware/async');

// @desc      Delete user
// @route     POST /api/v1/showinterest/:id
// @access    Private/Admin
exports.showInterest = asyncHandler(async (req, res, next) => {
  const targetId = req.params.id;
  const viewer = req.user.id;
  const { action } = req.body;
  const updatedAt = Date.now();

  const interest = await Activity.findOneAndUpdate(
    { target: targetId, viewer: viewer },
    { action, updatedAt },
    { upsert: true }
  );

  res.status(200).json({
    success: true
  });
});


// @desc      Get interests
// @route     GET /api/v1/interests
// @access    Private/Admin
exports.getInterests = asyncHandler(async (req, res, next) => {
  console.log("Get interests starts here!");

  const interested = await Activity.find();

  res.status(200).json({
    success: true,
    data: interested
  });
})
