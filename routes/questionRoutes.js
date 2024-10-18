const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Question Routes
router.post('/', questionController.createQuestion);
router.get('/category/:category', questionController.getQuestionsByCategory);
router.get('/random/category/:category', questionController.getRandomQuestions);
router.put('/:id', questionController.updateQuestion);  // Güncelleme işlemi
router.delete('/:id', questionController.deleteQuestion); // Silme işlemi

module.exports = router;
