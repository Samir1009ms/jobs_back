const mongoose = require('mongoose');

const TestQuestionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  }
});

const VacancySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: [String],
    required: true
  },
  testQuestions: [TestQuestionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
  // Add more fields as needed
});

module.exports = mongoose.model('Vacancy', VacancySchema);
