import cron from 'node-cron';
import { updateWeatherForAllCities } from '../controllers/weatherRealTime.controller.js';


// // Schedule the task every 5 minutes
// cron.schedule('*/5 * * * *', () => {
//   console.log('Fetching weather data for all cities...');
//   updateWeatherForAllCities();
// });

// Simulating a 5 minutes once Api call in 40 seconds for testing
cron.schedule('*/40 * * * * *', () => {
    console.log('Fetching weather data for all cities...');
    updateWeatherForAllCities();
    console.log("Weather data for all cities fetched and updated successfully");
  });

