const express = require('express');
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getUsers)
  .post(createUser)

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)


module.exports = router;
