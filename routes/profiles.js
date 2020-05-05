const express = require('express');
const router = express.Router();

const { getProfiles, getProfile, addNewProfile, updateProfile, deleteProfile } = require('../controllers/profiles');

router
  .route('/')
  .get(getProfiles)
  .post(addNewProfile)

router
  .route('/:id')
  .get(getProfile)
  .put(updateProfile)
  .delete(deleteProfile)

module.exports = router;
