const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Profile = require('../models/Profile');

const { convertToDotNotation } = require('../utils/misc');
// @desc    Get all profiles
// @route   GET /api/v1/profiles
// @access  Public
exports.getProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find();

  res.status(200).json({
    success: true,
    count: profiles.length,
    data: profiles
  });
});

// @desc    Get single profile
// @route   GET /api/v1/profiles/:id
// @access  Public
exports.getProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: profile
  });
});

// @desc    Add new profile
// @route   POST /api/v1/profiles
// @access  Public
exports.addNewProfile = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body._id = req.user.id;
  const profile = await Profile.create(req.body);

  res.status(200).json({
    success: true,
    data: profile
  });
});

// @desc    Add new profile
// @route   PUT /api/v1/profiles/:id
// @access  Public
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findByIdAndUpdate(req.params.id, convertToDotNotation(req.body), {
    new: true,
    runValidators: true
  });

  console.log(profile);

  res.status(200).json({
    success: true,
    data: profile
  });
});

// @desc    Delete profile
// @route   DELETE /api/v1/profiles/:id
// @access  Public
exports.deleteProfile = asyncHandler(async (req, res, next) => {
  await Profile.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});
