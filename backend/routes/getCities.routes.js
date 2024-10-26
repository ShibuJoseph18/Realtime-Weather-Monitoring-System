import express from 'express';
import { getAllCities, getCityWeather } from '../api/getCities.api.js'; // Import API functions

const router = express.Router();

// Route to get all cities
router.get('/cities', getAllCities);

// Route to get weather data for a specific city
router.get('/weather/:cityname', getCityWeather);

export default router;
