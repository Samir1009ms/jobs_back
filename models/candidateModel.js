// const mongoose = require('mongoose');

// const candidateSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phone: { type: String, required: true },
// });

// module.exports = mongoose.model('Candidate', candidateSchema);
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    testAnswers: {
        correct: { type: Number, required: true }, // Count of correct answers
        incorrect: { type: Number, required: true }, // Count of incorrect answers
    },
    cv: { type: String, required: true }, // Store CV file path
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
