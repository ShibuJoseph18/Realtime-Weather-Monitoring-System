// src/app.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
// import './scheduler/weatherRealTime.scheduler.js'; // Ensure the scheduler is imported
// import './scheduler/transferWeatherData.scheduler.js'; // Ensure the scheduler is imported
// import './scheduler/checkThreshold.scheduler.js';
import createThreshold from './routes/userThreshold.routes.js';
import getCities from './routes/getCities.routes.js';
// import users from './routes/users.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for PORT

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/api', createThreshold);
app.use('/api', getCities);
// app.use('/api', users);

// Database connection and model synchronization
if (process.env.NODE_ENV !== 'test') {
    sequelize.authenticate()
        .then(() => {
            console.log('Database connected');
            // Synchronize models with the database
            return sequelize.sync();
        })
        .then(() => {
            console.log('Models synchronized');
        })
        .catch(err => console.error('Database connection error:', err));

    // Basic test route
    app.get('/', (req, res) => {
        res.send('Weather Monitoring API is running...');
    });

    // Start the server only if it's not in the test environment
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;
