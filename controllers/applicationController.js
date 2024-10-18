const Application = require('../models/applicationModel');
const multer = require('multer');
const path = require('path');

// Configure storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename
    }
});

// Initialize multer
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Accept only PDF files
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

// Create application with PDF upload
exports.createApplication = [
    upload.single('resume'), // Middleware to handle file upload
    async (req, res) => {
        const { name, email, phone, vacancyId } = req.body;
        const resume = req.file ? req.file.path : null; // Get the path of the uploaded PDF

        const application = new Application({
            name,
            email,
            phone,
            resume, // Store the resume path in the application
            vacancyId,
        });

        try {
            const savedApplication = await application.save();
            res.status(201).json(savedApplication); // Return the saved application
        } catch (error) {
            res.status(400).json({ message: error.message }); // Return error message
        }
    }
];

// Retrieve applications by vacancy ID
exports.getApplicationsByVacancy = async (req, res) => {
    const { id } = req.params;

    try {
        const applications = await Application.find({ vacancyId: id });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message }); // Return error message
    }
};
