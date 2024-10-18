const Vacancy = require('../models/vacancyModel');

exports.createVacancy = async (req, res) => {
    const vacancy = new Vacancy(req.body);

    try {
        const savedVacancy = await vacancy.save();
        res.status(201).json(savedVacancy);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllVacancies = async (req, res) => {
    try {
        const vacancies = await Vacancy.find({ status: 'active' }); // Sadece aktif vakansiyalar
        res.json(vacancies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVacancyById = async (req, res) => {
    const { id } = req.params;

    try {
        const vacancy = await Vacancy.findById(id);
        if (!vacancy) return res.status(404).json({ message: 'Vacancy not found' });
        res.json(vacancy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateVacancy = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedVacancy = await Vacancy.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedVacancy);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteVacancy = async (req, res) => {
    const { id } = req.params;

    try {
        await Vacancy.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchVacancies = async (req, res) => {
    const { query } = req.query;
    try {
        const vacancies = await Vacancy.find({
            $or: [
                { jobTitle: { $regex: query, $options: 'i' } }, 
                { 'company.name': { $regex: query, $options: 'i' } }, 
                { description: { $regex: query, $options: 'i' } }, 
                { category: { $regex: query, $options: 'i' } } 
            ]
        });
        res.json(vacancies);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving vacancies', error });
    }
};