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
const options = {
  toJSON: { virtuals: true }
};

const ActivitySchema = new mongoose.Schema(activityObj, options);

ActivitySchema.virtual('viewerInfo', {
  ref: 'Profile',
  localField: "viewer",
  foreignField: '_id',
  justOne: true
});

ActivitySchema.virtual('targetInfo', {
  ref: 'Profile',
  localField: "target",
  foreignField: '_id',
  justOne: true
});

module.exports = mongoose.model('Activity', ActivitySchema);
