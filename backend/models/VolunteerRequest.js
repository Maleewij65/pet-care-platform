const mongoose = require('mongoose');

const VolunteerRequestSchema = new mongoose.Schema({
   skill: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   district: {
      type: String,
      required: true,
   },
   maxVolunteers: {
      type: Number,
      required: true,
   },
   onDate: {
      type: String,
      required: true,
   },
   state: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE',],
      default: 'ACTIVE',
   },
}, {
   timestamps: true,
});

module.exports = mongoose.model('volunteerRequest', VolunteerRequestSchema);