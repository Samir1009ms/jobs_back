const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

// Application Routes
router.post('/', applicationController.createApplication);
router.get('/vacancies/:id/applications', applicationController.getApplicationsByVacancy);

module.exports = router;
