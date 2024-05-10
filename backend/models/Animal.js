const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   type: {
      type: String,
      enum: ['DOG', 'CAT'],
      default: 'DOG',
   },
   image: {
      type: String,
      required: true,
   },
   age: {
      type: Number,
      required: true,
   },
   color: {
      type: String,
      required: true,
   },
   weight: {
      type: Number,
      required: true,
   },
   adoptionFee: {
      type: Number,
      required: true,
   },
   state: {
      type: String,
      enum: ['AVAILABLE', 'ADOPTED'],
      default: 'AVAILABLE',
   },
   vaccinationFrequency: {
      type: String,
      enum: ['NOT_SET', 'ONCE_A_WEEK', 'TWICE_A_MONTH', 'ONCE_A_MONTH', 'ONCE_A_YEAR', 'TWICE_A_YEAR', 'THRISE_A_YEAR'],
      default: 'NOT_SET',
   },
}, {
   timestamps: true,
});

module.exports = mongoose.model('animal', AnimalSchema);