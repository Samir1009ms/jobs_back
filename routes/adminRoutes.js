const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin Routes
router.get('/vacancies', adminController.getAllVacanciesAdmin);
router.get('/vacancy/:id/applications', adminController.getVacancyApplications);
router.put('/vacancy/:id/status', adminController.updateVacancyStatus); // Status güncelleme

module.exports = router;
