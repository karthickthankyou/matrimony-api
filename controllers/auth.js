const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  sendTokenResponse(user, 200, res);
});


// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('email/password should not be empty', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid Credentials', 404));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    // return next(new ErrorResponse('Invalid Credentials', 404));
    authFailed(res);
  }

  sendTokenResponse(user, 200, res);
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});


// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  console.log('Request user populated: ', req.user.id);

  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { name, email }, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});


// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  const isMatching = await user.matchPassword(req.body.currentPassword);

  if (!isMatching) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  user.password = req.body.newPassword;
  await user.save();
  sendTokenResponse(user, 200, res);
})



// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const message = `Passcode: \n\n ${resetToken}`;

  res.status(200).json({ success: true, data: `Email sent ${message}` });

  // try {
  //   await sendEmail({
  //     email: user.email,
  //     subject: 'Password reset token',
  //     message
  //   });

  //   res.status(200).json({ success: true, data: 'Email sent', token: resetToken });
  // } catch (err) {
  //   console.log(err);
  //   user.resetPasswordToken = undefined;
  //   user.resetPasswordExpire = undefined;

  //   await user.save({ validateBeforeSave: false });

  //   return next(new ErrorResponse('Email could not be sent', 500));
  // }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { resetToken, password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  console.log(user, Date.now());


  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
})



const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};


// Invalidate token
const authFailed = (res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(404).json({
    success: false,
  });
}
