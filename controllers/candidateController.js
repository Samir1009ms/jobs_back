// const Candidate = require('../models/candidateModel');

// exports.createCandidate = async (req, res) => {
//     const { name, email, phone } = req.body;

//     const candidate = new Candidate({
//         name,
//         email,
//         phone,
//     });

//     try {
//         const savedCandidate = await candidate.save();
//         res.status(201).json(savedCandidate);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// exports.getAllCandidates = async (req, res) => {
//     try {
//         const candidates = await Candidate.find();
//         res.json(candidates);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const Candidate = require('../models/candidateModel');
// const multer = require('multer');
// const path = require('path');

// // Configure storage for multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Specify the directory to save uploaded files
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + file.originalname; // Generate a unique filename
//         cb(null, uniqueSuffix);
//     }
// });

// // Initialize multer for CV upload
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype === 'application/pdf') {
//             cb(null, true);
//         } else {
//             cb(new Error('Only PDF files are allowed!'), false);
//         }
//     }
// });

// // Create candidate with test answers and CV upload
// exports.createCandidate = [
//     upload.single('cv'), // Middleware to handle CV file upload
//     async (req, res) => {
//         // Check if the file is uploaded
//         if (!req.file) {
//             return res.status(400).json({ message: 'No CV uploaded.' });
//         }

//         // Extract candidate data from the request body
//         const { name, email, phone, testAnswers } = req.body;

//         // Store the path of the uploaded CV
//         const cvPath = req.file.path;

//         // Create a new candidate instance
//         const candidate = new Candidate({
//             name,
//             email,
//             phone,
//             testAnswers: JSON.parse(testAnswers), // Store the test answers as an object
//             cv: cvPath, // Store the CV path in the candidate record
//         });

//         try {
//             // Save the candidate to the database
//             const savedCandidate = await candidate.save();
//             res.status(201).json(savedCandidate); // Return the saved candidate
//         } catch (error) {
//             res.status(400).json({ message: error.message }); // Return error message
//         }
//     }
// ];

// // Retrieve all candidates
// exports.getAllCandidates = async (req, res) => {
//     try {
//         const candidates = await Candidate.find();
//         res.json(candidates); // Return the list of candidates
//     } catch (error) {
//         res.status(500).json({ message: error.message }); // Return error message
//     }
// };



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

// Initialize multer for CV upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

// Create candidate with test answers and CV upload
// Create candidate with test answers and CV upload
exports.createCandidate = [
    upload.single('cv'), // Middleware to handle CV file upload
    async (req, res) => {
        // Access all fields directly from form-data
        const { name, email, phone, correctAnswersCount, incorrectAnswersCount,id } = req.body;

        // Check if the file is uploaded
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
                correct: parseInt(correctAnswersCount, 10) || 0, // Count of correct answers
                incorrect: parseInt(incorrectAnswersCount, 10) || 0, // Count of incorrect answers
            },
            cv: cvPath, // Store the CV path in the candidate record
        });

        try {
            // Save the candidate to the database
            const savedCandidate = await candidate.save();
            res.status(201).json({message: 'Müraciət ugurla qeyd edildi.',code:201}); // Return the saved candidate
        } catch (error) {
            res.status(400).json({ message: error.message }); // Return error message
        }
    }
];

// Retrieve all candidates
exports.getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates); // Return the list of candidates
    } catch (error) {
        res.status(500).json({ message: error.message }); // Return error message
    }
};
