const Candidate = require('../models/candidateModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Use the uploads directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + file.originalname; // Generate a unique filename
        cb(null, uniqueSuffix);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true); // Accept PDF files
        } else {
            cb(new Error('Only PDF files are allowed!'), false); // Reject non-PDF files
        }
    }
}).single('cv'); // Expect a single file with the field name 'cv'

// Create candidate with CV upload
exports.createCandidate = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message }); // Multer-specific errors
        } else if (err) {
            return res.status(400).json({ message: err.message }); // General errors
        }

        const { name, email, phone, correctAnswersCount, incorrectAnswersCount, id } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'No CV uploaded.' });
        }

        // Store the path of the uploaded CV
        const cvPath = req.file.path;

        // Create a new candidate instance
        const candidate = new Candidate({
            name,
            email,
            phone,
            vacancyId: id,
            testAnswers: {
                correct: parseInt(correctAnswersCount, 10) || 0,
                incorrect: parseInt(incorrectAnswersCount, 10) || 0,
            },
            cv: cvPath, // Store the CV path
        });

        try {
            const savedCandidate = await candidate.save();
            return res.status(201).json({ message: 'Müraciət uğurla qeyd edildi.', code: 201 });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });
};

// Retrieve all candidates
exports.getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates); // Return the list of candidates
    } catch (error) {
        res.status(500).json({ message: error.message }); // Return error message
    }
};
