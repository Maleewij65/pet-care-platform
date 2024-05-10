const mongoose = require('mongoose');

const VolunteerRespondSchema = new mongoose.Schema({
   volunteerRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'volunteerRequest',
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
   },
   state: {
      type: String,
      enum: ['ACTIVE', 'DELETED'],
      default: 'ACTIVE',
   },
}, {
   timestamps: true,
});

module.exports = mongoose.model('volunteerRespond', VolunteerRespondSchema);