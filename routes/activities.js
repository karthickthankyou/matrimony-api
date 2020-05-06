const express = require('express');
const {
  getInterests, showInterest, getInterested
} = require('../controllers/activities');

const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .post('/:id', protect, showInterest)
  .get('/', protect, getInterests)
  .get('/mine', protect, getInterested)

module.exports = router;
