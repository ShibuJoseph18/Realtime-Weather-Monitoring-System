import WeatherRealTime from '../models/weatherRealTime.js'; // Adjust the path if necessary
import { fetchWeatherData } from '../services/weatherRealTime.service.js';

export const updateWeatherForAllCities = async () => {
  try {
    const cities = await WeatherRealTime.findAll(); // Fetch all city data

    for (const city of cities) {
      await fetchWeatherData(city.lat, city.long, city.id); // Fetch and update for each city
    }
  } catch (error) {
    console.error('Error updating weather data:', error);
  }
};
