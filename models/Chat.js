const mongoose = require('mongoose');

const chatObj = {
  name: { type: String, lowercase: true, unique: true },
  topic: String,
  users: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Profile',
    required: true
  }],
  updated_at: { type: Date, default: Date.now },
}

const chatSchema = new mongoose.Schema(chatObj);
module.exports = mongoose.model('Chat', chatSchema);
