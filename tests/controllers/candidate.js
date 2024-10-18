const Candidate = require('../models/candidate');
const addCandidate = async (req, res) => {
    try {
        const { name, email, resume, coverLetter, vacancyId, submittedAt } = req.body;
        const newCandidate = new Candidate({
            name,
            email,
            resume,
            coverLetter,
            vacancyId,
            submittedAt
        });
        const savedCandidate = await newCandidate.save();
        res.status(201).json(savedCandidate);
    } catch (error) {
        res.status(500).json({ message: 'Müraciət göndərilməsində xəta baş verdi.', error });
    }
}

const getCandidates = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) {
          return res.status(404).json({ message: 'Müraciət tapılmadı.' });
        }
        res.json(candidate);
      } catch (error) {
        res.status(500).json({ message: 'Müraciət əldə edilərkən xəta baş verdi.', error });
      }
}

const updateCandidate = async (req, res) => {
    try {
        const updatedCandidate = await Candidate.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        if (!updatedCandidate) {
          return res.status(404).json({ message: 'Müraciət tapılmadı.' });
        }
        res.json(updatedCandidate);
      } catch (error) {
        res.status(500).json({ message: 'Müraciət yenilənərkən xəta baş verdi.', error });
      }
}

module.exports = { addCandidate };