const Message = require('../models/Message');
const asyncHandler = require('../middleware/async');

// @desc      Delete user
// @route     POST /api/v1/showinterest/:id
// @access    Private/Admin
exports.sendMessage = asyncHandler(async (req, res, next) => {
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
