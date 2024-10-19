// File: index.js

const express = require('express'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const vacancyRoutes = require('./routes/vacancyRoutes');
const questionRoutes = require('./routes/questionRoutes');
const db = require('./config/database.js');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();

const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    allowedHeaders: '*',

};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Database
db(); // Call your database connection function

// Routes
app.use('/admin', adminRoutes);
app.use('/candidates', candidateRoutes);
app.use('/applications', applicationRoutes);
app.use('/vacancies', vacancyRoutes);
app.use('/questions', questionRoutes);

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
     res.status(200).json({ message: 'Welcome to my application.' })
    var userAgent = req.headers['user-agent'];
    console.log(userAgent);
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('IP address:', ip);
    console.log("s")
});

export default async function handler(req, res) {
    await new Promise((resolve) => {
        app(req, res, resolve); 
    });
}

// const PORT = process.env.PORT || 3000; // Default port
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });