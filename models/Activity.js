const mongoose = require('mongoose');

const activityObj = {
  viewer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Profile',
    required: true
  },
  target: {
    type: mongoose.Schema.ObjectId,
    ref: 'Profile',
    required: true
  },
  action: {
    type: String,
    enum: ['shortlisted', 'interested']
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}

const ActivitySchema = new mongoose.Schema(activityObj);

module.exports = mongoose.model('Activity', ActivitySchema);
