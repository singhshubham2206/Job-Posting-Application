// models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ['Entry-level', 'Mid-level', 'Senior-level'],
    required: true,
  },
  candidates: [{
    type: String,  // Array of candidate emails
  }],
  endDate: {
    type: Date,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
