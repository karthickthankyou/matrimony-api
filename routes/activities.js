const express = require('express');
const {
  getInterests, showInterest
} = require('../controllers/activities');

const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .post('/:id', protect, showInterest)
  .get('/', getInterests)

module.exports = router;
