const Vacancy = require('../models/vacancyModel');
const Candidate = require('../models/candidateModel');

exports.getAllVacanciesAdmin = async (req, res) => {
    try {
        const vacancies = await Vacancy.find();
        res.json(vacancies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVacancyApplications = async (req, res) => {
    const { id } = req.params;

    try {
        const applications = await Candidate.find({ vacancyId: id });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateVacancyStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedVacancy = await Vacancy.findByIdAndUpdate(id, { status }, { new: true });
        res.json(updatedVacancy);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
