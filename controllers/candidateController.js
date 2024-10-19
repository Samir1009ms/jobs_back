const Candidate = require('../models/candidateModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin');
require('dotenv').config()
// const serviceAccount = require('../serviceAccountKey.json.json'); 
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'upload-4a061.appspot.com', // Bucket adını buraya ekleyin
});
const storage = multer.memoryStorage(); // Dosyaları hafızada tut
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit dosya boyutu 5MB
    fileFilter: async (req, file, cb) => {
        const { email } = req.body;
        const existingCandidate = await Candidate.findOne({ email });
        if (existingCandidate) {
            return cb(new Error('Bu email ilə bir müraciət artıq qeyd edilib'), false);
        }
        if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            cb(null, true);
        } else {
            cb(new Error('PDF və ya Word faylları qəbul edilməlidir'), false);
        }
    }
}).single('cv');
// Create candidate with CV upload
exports.createCandidate = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message }); // Multer-specific errors
        } else if (err) {
            return res.status(400).json({ message: err.message }); // Genel hatalar
        }

        const { name, email, phone, correctAnswersCount, incorrectAnswersCount, id } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'No CV uploaded.' });
        }

        // Firebase Storage'a dosya yükle
        const bucket = admin.storage().bucket();
        const fileName = `uploads/${Date.now()}-${req.file.originalname}`;; // Benzersiz dosya adı oluştur
        const file = bucket.file(fileName);

        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
            },
        });

        stream.on('error', (error) => {
            return res.status(500).json({ message: 'Dosya yüklenirken bir hata oluştu: ' + error.message });
        });

        stream.on('finish', async () => {
            // Firebase Storage'da dosya yüklendikten sonra, yeni aday örneği oluştur
            const candidate = new Candidate({
                name,
                email,
                phone,
                vacancyId: id,
                testAnswers: {
                    correct: parseInt(correctAnswersCount, 10) || 0,
                    incorrect: parseInt(incorrectAnswersCount, 10) || 0,
                },
                cv: `https://storage.googleapis.com/${bucket.name}/${fileName}`, // Yüklenen dosyanın URL'si
            });

            try {
                const savedCandidate = await candidate.save();
                return res.status(201).json({ message: 'Müraciət uğurla qeyd edildi.', code: 201 });
            } catch (error) {
                return res.status(400).json({ message: "Müraciət qeyd edilərkən xəta baş verdi. Lütfən yenidən cəhd edin" });
            }
        });

        stream.end(req.file.buffer); // Hafızadan dosya akışını başlat
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
