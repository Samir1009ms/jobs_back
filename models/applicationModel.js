const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resume: { type: String, required: true }, // path to the resume file
    vacancyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vacancy', required: true },
    score: {
        correctAnswers: { type: Number, default: 0 },
        wrongAnswers: { type: Number, default: 0 },
    },
});

module.exports = mongoose.model('Application', applicationSchema);
