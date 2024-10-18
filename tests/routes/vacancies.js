const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vacancyController');

// Get all vacancies
router.get('/', vacancyController.getAllVacancies);

// Get vacancy by ID
router.get('/:id', vacancyController.getVacancyById);

// Create a new vacancy
router.post('/', vacancyController.createVacancy);

// Update a vacancy
router.put('/:id', vacancyController.updateVacancy);

// Delete a vacancy
router.delete('/:id', vacancyController.deleteVacancy);

module.exports = router;
