const Question = require('../models/questionModel');

exports.createQuestion = async (req, res) => {
    const question = new Question(req.body);

    try {
        const savedQuestion = await question.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getQuestionsByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const questions = await Question.find({ category });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRandomQuestions = async (req, res) => {
    const { category } = req.params;

    try {
        const questions = await Question.aggregate([
            { $match: { category } },
            { $sample: { size: 15 } }
        ]);
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateQuestion = async (req, res) => {
    const { id } = req.params;
    
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        await Question.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
