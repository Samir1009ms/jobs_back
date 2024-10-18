const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vacancyController');

// Vacancy Routes
router.post('/', vacancyController.createVacancy);
router.get('/', vacancyController.getAllVacancies); // Sadece aktif vakansiyalar
router.get('/:id', vacancyController.getVacancyById);
router.put('/:id', vacancyController.updateVacancy);
router.delete('/:id', vacancyController.deleteVacancy);
router.get('/search', vacancyController.searchVacancies); // Arama rotası ekle

module.exports = router;
