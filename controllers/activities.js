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
  const types = req.body.type;

  const interested = await Activity.find({ target: req.user.id, 'action': { $in: types } }).populate({
    path: 'viewerInfo',
    select: 'basicInformation.name'
  }).sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    count: interested.length,
    data: interested
  });
})

// @desc      Get interests
// @route     GET /api/v1/interests/mine
// @access    Private/Admin
exports.getInterested = asyncHandler(async (req, res, next) => {
  const types = req.body.type;

  const interested = await Activity.find({ viewer: req.user.id, 'action': { $in: types } }).populate({
    path: 'targetInfo',
    select: 'basicInformation.name'
  }).sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    count: interested.length,
    data: interested
  });
})


// @desc      Get interests
// @route     GET /api/v1/interests/views
// @access    Private/Admin
exports.getViews = asyncHandler(async (req, res, next) => {
  const interested = await Activity.find({ target: req.user.id, 'action': "viewed" }).populate({
    path: 'targetInfo',
    select: 'basicInformation.name'
  }).sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    count: interested.length,
    data: interested
  });
})


// @desc      Get interests
// @route     GET /api/v1/interests/myviews
// @access    Private/Admin
exports.getMyViews = asyncHandler(async (req, res, next) => {
  const interested = await Activity.find({ viewer: req.user.id, 'action': "viewed" }).populate({
    path: 'targetInfo',
    select: 'basicInformation.name'
  }).sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    count: interested.length,
    data: interested
  });
})
