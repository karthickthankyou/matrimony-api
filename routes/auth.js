const router = require('express').Router();

const { register, login, logout, updateDetails, updatePassword, forgotPassword, resetPassword } = require('../controllers/auth');

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.put('/forgotpassword', forgotPassword);
router.put('/resetpassword', resetPassword);

module.exports = router;
