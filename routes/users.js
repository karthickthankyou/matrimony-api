const express = require('express');
const {
  createUser,
} = require('../controllers/users');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(createUser);


module.exports = router;
