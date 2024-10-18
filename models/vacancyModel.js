const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    company: {
        name: { type: String, required: true },
        logoUrl: { type: String },
        website: { type: String },
        location: { type: String, required: true }
    },
    employmentType: { type: String, required: true },
    tags: [String],
    salary: {
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
        frequency: { type: String, required: true }
    },
    description: { type: String, required: true },
    responsibilities: [String],
    requirements: [String],
    location: {
        type: { type: String, enum: ['onsite', 'remote'], required: true },
        address: { type: String, required: true }
    },
    postedDate: { type: Date, default: Date.now },
    contactInfo: {
        email: { type: String, required: true },
        phone: { type: String }
    },
    category: { type: String, required: true }, // Kategori eklendi
    status: { type: String, enum: ['active', 'inactive'], default: 'active' } // Status eklendi
});

module.exports = mongoose.model('Vacancy', vacancySchema);
