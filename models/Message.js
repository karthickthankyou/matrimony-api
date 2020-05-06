const mongoose = require('mongoose');

const messageObj = {
  from: {
    type: mongoose.Schema.ObjectId,
    ref: 'Profile',
    required: true
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: 'Profile',
    required: true
  },
  message: {
    type: String,
    required: true,
    maxlength: [500, 'Message cannot be more than 500 characters']
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
const options = {
  toJSON: { virtuals: true }
};

const MessageSchema = new mongoose.Schema(messageObj, options);

MessageSchema.virtual('viewerInfo', {
  ref: 'Profile',
  localField: "viewer",
  foreignField: '_id',
  justOne: true
});

MessageSchema.virtual('targetInfo', {
  ref: 'Profile',
  localField: "target",
  foreignField: '_id',
  justOne: true
});

module.exports = mongoose.model('Message', MessageSchema);
