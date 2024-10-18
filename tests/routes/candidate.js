const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

// Submit a new application
router.post('/apply', candidateController.submitApplication);

// Get all applications
router.get('/', candidateController.getAllApplications);

// Get application by ID
router.get('/:id', candidateController.getApplicationById);

// Update application
router.put('/:id', candidateController.updateApplication);

module.exports = router;
