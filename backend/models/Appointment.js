const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
   animal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'animal',
      required: true
   },
   requestedDate: {
      type: Date,
      required: true
   },
   reason: {
      type: String,
      required: true
   },
   state: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'],
      default: 'PENDING'
   },
}, {
   timestamps: true,
});

module.exports = mongoose.model('appointment', AppointmentSchema);