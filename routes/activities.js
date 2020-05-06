const express = require('express');
const {
  getInterests, showInterest, getInterested, getViews, getMyViews
} = require('../controllers/activities');

const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .post('/:id', protect, showInterest)
  .get('/', protect, getInterests)
  .get('/mine', protect, getInterested)
  .get('/views', protect, getViews)
  .get('/myviews', protect, getMyViews)

module.exports = router;
