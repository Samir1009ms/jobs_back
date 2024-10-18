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

// Middleware
app.use(cors());
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

// Serve static files
app.use('/uploads', express.static('uploads'));

// Default route
app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello from Vercel!" });
});

// Export the serverless function
export default async function handler(req, res) {
    await new Promise((resolve) => {
        app(req, res, resolve); // Call the express app with the request and response
    });
}
