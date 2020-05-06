const express = require('express');
const {

} = require('../controllers/messages');

const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .post('/:id', protect, showInterest)


module.exports = router;
