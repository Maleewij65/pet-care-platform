const mongoose = require('mongoose');

const EventFundRequestSchema = new mongoose.Schema({
   events: {
      type: String,
      required: true,
   },
   fundAmount: {
      type: Number,
      required: true,
   },
   fundState: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
   },
}, {
   timestamps: true,
});

module.exports = mongoose.model('eventFundRequest', EventFundRequestSchema);