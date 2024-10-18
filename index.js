const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const vacancyRoutes = require('./routes/vacancyRoutes');
const questionRoutes = require('./routes/questionRoutes');
const cors = require('cors');
const path = require('path');

const db = require('./config/database.js');
require('dotenv').config();
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(bodyParser.json());
app.use('/admin', adminRoutes);
app.use('/candidates', candidateRoutes);
app.use('/applications', applicationRoutes);
app.use('/vacancies', vacancyRoutes);
app.use('/questions', questionRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Make sure this line is present

// mongoose.connect('YOUR_MONGODB_URI', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Database connected');
//         app.listen(5500, () => {
//             console.log('Server is running on port 5500');
//         });
//     })
//     .catch(err => console.error(err));

db();


// back end prtda basdamasi ucun
const PORT = process.env.PORT || 5501;

app.listen(PORT, () => {
    try {
        
        console.log(`Server is running on port ${PORT}`);
    }catch (error) {
        console.log(error)
    }
});

module.exports = app