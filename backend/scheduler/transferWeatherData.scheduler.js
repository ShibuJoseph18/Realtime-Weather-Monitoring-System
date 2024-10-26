import cron from 'node-cron';
import transferWeatherData from '../services/transferWeatherData.service.js';

// // Schedule the job to run every 24 hours
// cron.schedule('0 0 * * *', () => {
//     console.log('Running daily weather data transfer...');
//     transferWeatherData();
// });

// Simulating a 24 hours once data transfer in 10 seconds for testing
cron.schedule('*/20 * * * * *', () => {
    console.log('Running daily weather data transfer...');
    transferWeatherData();
    console.log("Daily weather data transfer finsihed");
});