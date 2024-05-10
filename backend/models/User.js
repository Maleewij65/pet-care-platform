const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['USER', 'SHELTER_OWNER', 'DOCTOR', 'EVENT_MANAGER'],
    default: 'USER',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('user', UserSchema);
