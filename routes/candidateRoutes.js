const express = require('express');
const candidateController = require('../controllers/candidateController');

const router = express.Router();
// Candidate Routes
router.post('/', candidateController.createCandidate);
router.get('/', candidateController.getAllCandidates);

module.exports = router;

