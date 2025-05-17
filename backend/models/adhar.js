const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const aadhaarLogSchema = new mongoose.Schema({
  maskedAadhaar: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: String, 
    required: true,
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('AadhaarLog', aadhaarLogSchema);