const Candidate = require('../models/candidateModel');
const multer = require('multer');
const path = require('path');

// Configure storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + file.originalname; // Generate a unique filename
        cb(null, uniqueSuffix);
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    },
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    }
    
}).single('cv');

exports.createCandidate = async (req, res) => {
    upload(req, res, async function (err) {
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
            cv: cvPath,
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
