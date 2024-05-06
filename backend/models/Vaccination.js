const mongoose = require('mongoose');

const VaccinationSchema = new mongoose.Schema({
   animal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'animal',
   },
   vaccine: {
      type: String,
      ref: 'vaccine',
   },
   state: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'],
      default: 'COMPLETED',
   },
}, {
   timestamps: true,
});

module.exports = mongoose.model('vaccination', VaccinationSchema);