const mongoose = require('mongoose');

const AdoptionSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
   },
   animal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'animal',
   },
   applicant_name: {
      type: String,
      required: true,
   },
   spouse_name: {
      type: String,
      required: true,
   },
   applicant_occupation: {
      type: String,
      required: true,
   },
   spouse_occupation: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   address: {
      type: String,
      required: true,
   },
   phone: {
      type: String,
      required: true,
   },
   cell: {
      type: String,
      required: true,
   },
   no_of_children: {
      type: Number,
      required: true,
   },
   no_of_adults: {
      type: Number,
      required: true,
   },
   animal_cruelty: {
      type: String,
      required: true,
   },
   animal_cruelty_explanation: {
      type: String,
      required: true,
   },
   housing_type: {
      type: String,
      required: true,
   },
   live_in: {
      type: String,
      required: true,
   },
   housing_time: {
      type: String,
      required: true,
   },
   pet_location_when_you_out: {
      type: String,
      required: true,
   },
   fence_description: {
      type: String,
      required: true,
   },
   not_allowed_pet_explanation: {
      type: String,
      required: true,
   },
   traveling_often: {
      type: String,
      required: true,
   },
   pet_when_travel: {
      type: String,
      required: true,
   },
   applicant_work_time: {
      type: String,
      required: true,
   },
   spouse_work_time: {
      type: String,
      required: true,
   },
   household_person_explanation: {
      type: String,
      required: true,
   },
   pet_location: {
      type: String,
      required: true,
   },
   pet_location_explanation: {
      type: String,
      required: true,
   },
   reason: {
      type: String,
      default: '',
   },
   state: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'],
      default: 'PENDING',
   },
}, {
   timestamps: true,
});

module.exports = mongoose.model('adoption', AdoptionSchema);