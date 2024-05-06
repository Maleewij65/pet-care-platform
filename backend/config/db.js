const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURL');     // your databse
//const db = config.get('mongoURLLocal');   // ruwan database

const connnctDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    // Exit procees with failure
    process.exit(1);
  }
};

module.exports = connnctDB;


