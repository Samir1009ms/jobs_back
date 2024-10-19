// File: index.js

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes';
import candidateRoutes from './routes/candidateRoutes';
import applicationRoutes from './routes/applicationRoutes';
import vacancyRoutes from './routes/vacancyRoutes';
import questionRoutes from './routes/questionRoutes';
import db from './config/database.js';
import dotenv from 'dotenv';

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
