const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  resume: {
    type: String, // URL or file path to the resume
    required: true
  },
  coverLetter: {
    type: String
  },
  vacancyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vacancy',
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  testResults: {
    type: Number, // e.g., score
    default: null
  }
  // Add more fields as needed
});

module.exports = mongoose.model('Candidate', CandidateSchema);
