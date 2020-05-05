
// @desc    Get all profiles
// @route   GET /api/v1/profiles
// @access  Public
exports.getProfiles = (req, res, next) => {
  res.status(200).send({ success: true, data: 'Get all profiles here!' })
}

// @desc    Get single profile
// @route   GET /api/v1/profiles/:id
// @access  Public
exports.getProfile = (req, res, next) => {
  res.status(200).send({ success: true, data: 'Get single profile!' })
}

// @desc    Add new profile
// @route   POST /api/v1/profiles
// @access  Public
exports.addNewProfile = (req, res, next) => {
  res.status(200).send({ success: true, data: 'Get single profile!' })
}

// @desc    Add new profile
// @route   PUT /api/v1/profiles/:id
// @access  Public
exports.updateProfile = (req, res, next) => {
  res.status(200).send({ success: true, data: `Update profile! ${req.params.id}` })
}


// @desc    Delete profile
// @route   DELETE /api/v1/profiles/:id
// @access  Public
exports.deleteProfile = (req, res, next) => {
  res.status(200).send({ success: true, data: `Deleting profile! ${req.params.id}` })
}
